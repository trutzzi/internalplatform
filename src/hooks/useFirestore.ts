import { useReducer, useEffect, useState, Reducer } from "react";
import { projectDb } from "../firebase/config";
import { collection, addDoc, getDocs, query, where, DocumentData, deleteDoc, doc, onSnapshot } from '@firebase/firestore';
import useSnackBars from "./useSnackbar";

const initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

type Task = {
  uid: string;
  title: string;
  description: string;
  deadline: string;
  done: boolean;
  assigned: string;
};

export type User = {
  uid: string;
  supervisorId: string;
  email: string;
  displayName: string;
  admin: boolean;
};

type State = {
  isPending: boolean;
  error: string;
  success: boolean;
  document: Task;
};

type Action = {
  type: string;
  payload: Task;
};

const firestoreReducer: Reducer<any, any> = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return {
        isPending: true,
        document: null,
        success: false,
        error: null,
      };
    case "ADDED_DOCUMENT":
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case "DELETED_DOCUMENT":
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case "ERROR":
      return {
        document: null,
        isPending: false,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const useFireStore = (collectionSelect: string) => {
  const { addAlert } = useSnackBars();
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  //collection ref
  const ref = collection(projectDb, collectionSelect);

  // only dispatch if not cancelled
  const dispatchIfNotCancelled = (action: any) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  // get collection by specific field return one
  /**
   * 
   * @param queryDoc Document name
   * @param guid Search in query
   * @returns  return collection [] of {}
   */
  const getCollectionBy = async (queryDoc: string, guid: string) => {
    const userQuery = query(ref, where(queryDoc, "==", guid))
    const querySnapshot = await getDocs(userQuery);
    let result;
    querySnapshot.forEach((doc) => {
      result = doc.data();
    });
    return result;
  };

  // Get collection by specific field return all
  /**
   * 
   * @param queryDoc Document name
   * @param guid guid to query
   * @param callback callback refresh or any function
   * @returns return collections with multipe results as  [] of {}
   */
  const getCollectionsBy = async (queryDoc: string, guid: string, callback: Function = () => null) => {
    const userQuery = await query(ref, where(queryDoc, "==", guid))
    onSnapshot(userQuery, (doc) => {
      callback(doc)
    });
    const querySnapshot = await getDocs(userQuery);
    const results: any[] = [];
    querySnapshot.forEach((doc) => {
      results.push({ ...doc.data(), id: doc.id })
    });
    return results;
  };

  const getCollection = async () => {
    const docSnap = await getDocs(ref);
    let myArray: DocumentData = [];
    docSnap.forEach((doc) => {
      myArray.push(doc.data())
    })
    return myArray;
  };

  // add document
  const addDocument = async (doc: Task) => {
    dispatch({ type: "IS_PENDING" });
    try {
      const addedDocument = await addDoc(ref, doc);
      dispatchIfNotCancelled({
        type: "ADDED_DOCUMENT",
        payload: addedDocument,
      });
      addAlert({ type: "success", text: `Task "${doc.title}" was added. ` })
    } catch (error) {
      addAlert({ type: "error", text: "Unknow error" })
      dispatchIfNotCancelled({ type: "ERROR", payload: error });
    }
  };


  // add user
  const addUser = async (user: User) => {
    dispatch({ type: "IS_PENDING" });
    try {
      const addedDocument = await addDoc(ref, user);
      addAlert({ type: "success", text: "User has been created, welcome!" })
      dispatchIfNotCancelled({
        type: "ADDED_DOCUMENT",
        payload: addedDocument,
      });
    } catch (error) {
      addAlert({ type: "error", text: "Unknow error" })
      dispatchIfNotCancelled({ type: "ERROR", payload: error });
    }
  };

  // delete document
  const deleteDocument = async (id: string) => {
    dispatch({ type: "IS_PENDING" });
    try {
      const deletedDocument = await deleteDoc(doc(projectDb, collectionSelect, id));
      addAlert({ type: "success", text: "Task was deleted" })
      dispatchIfNotCancelled({
        type: "DELETED_DOCUMENT",
        payload: deletedDocument,
      });
    } catch (error) {
      addAlert({ type: "error", text: "Unknow error" })
      dispatchIfNotCancelled({ type: "ERROR", payload: error });
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { addDocument, addUser, deleteDocument, getCollectionBy, getCollection, getCollectionsBy, response };
};