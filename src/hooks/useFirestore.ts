import { useReducer, useEffect, useState, Reducer } from 'react';
import { projectDb } from '../firebase/config';
import { collection, addDoc, getDocs, query, where, DocumentData, deleteDoc, doc, updateDoc } from '@firebase/firestore';
import useSnackBars from './useSnackbar';
import { User } from 'firebase/auth';

const initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};
export type NewUser = {
  uid: string,
  supervisorId: string,
  email: string,
  displayName: string,
  admin: boolean
};

export type Task = {
  uid: string;
  title: string;
  description: string;
  deadline: string;
  done: boolean;
  assigned: string;
};

export interface UserWithProps extends User {
  supervisorId?: string | null
  admin?: boolean
}

type State = {
  isPending: boolean;
  error: string | null;
  success: boolean | null;
  document: any;
};

type Action = {
  type: string;
  payload: any;
};

const firestoreReducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'IS_PENDING':
      return {
        isPending: true,
        document: null,
        success: false,
        error: null,
      };
    case 'ADDED_DOCUMENT':
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case 'UPDATE_DOCUMENT':
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case 'DELETED_DOCUMENT':
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case 'ERROR':
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
    const userQuery = query(ref, where(queryDoc, '==', guid));
    const querySnapshot = await getDocs(userQuery);
    let result: DocumentData = [];
    await querySnapshot.forEach((docSnapshot) => {
      result = docSnapshot.data();
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
  const getCollectionsBy = async (queryDoc: string, guid: string) => {
    const userQuery = await query(ref, where(queryDoc, '==', guid));
    const querySnapshot = await getDocs(userQuery);
    const results: any[] = [];
    querySnapshot.forEach((docSnapshot) => {
      results.push({ ...docSnapshot.data(), id: docSnapshot.id });
    });
    return results;
  };

  const getCollection = async () => {
    const docSnap = await getDocs(ref);
    const myArray: DocumentData = [];
    docSnap.forEach((docSnapshot) => {
      myArray.push(docSnapshot.data());
    });
    return myArray;
  };

  // add document
  const addDocument = async (document: Task) => {
    dispatch({ type: 'IS_PENDING', payload: null });
    try {
      const addedDocument = await addDoc(ref, document);
      dispatchIfNotCancelled({
        type: 'ADDED_DOCUMENT',
        payload: addedDocument,
      });
      addAlert({ type: 'success', text: `Task "${document.title}" was added. ` });
    } catch (error) {
      addAlert({ type: 'error', text: 'Unknow error' });
      dispatchIfNotCancelled({ type: 'ERROR', payload: error });
    }
  };


  // update doc
  /**
   * 
   * @param uid string
   * @param formData object to update
   * @returns the error if any
   */
  const updateDocument = async (uid: string, formData: any) => {
    try {
      if (uid) {
        const docRef = doc(projectDb, 'tasks', uid);
        await updateDoc(docRef, formData);
        dispatchIfNotCancelled({
          type: 'UPDATE_DOCUMENT',
          payload: formData,
        });
        addAlert({ type: 'success', text: `Task ${formData.title} was updated` });
      }
    } catch (err) {
      addAlert({ type: 'error', text: 'Unknow error' });
      dispatchIfNotCancelled({ type: 'ERROR', payload: err });
    }
  };

  // add user
  const addUser = async (user: NewUser) => {
    dispatch({ type: 'IS_PENDING', payload: null });
    try {
      const addedDocument = await addDoc(ref, user);
      addAlert({ type: 'success', text: 'User has been created, welcome!' });
      dispatchIfNotCancelled({
        type: 'ADDED_DOCUMENT',
        payload: addedDocument,
      });
    } catch (error) {
      addAlert({ type: 'error', text: 'Unknow error' });
      dispatchIfNotCancelled({ type: 'ERROR', payload: error });
    }
  };

  // delete document
  const deleteDocument = async (id: string) => {
    dispatch({ type: 'IS_PENDING', payload: null });
    try {
      const deletedDocument = await deleteDoc(doc(projectDb, collectionSelect, id));
      addAlert({ type: 'success', text: 'Task was deleted' });
      dispatchIfNotCancelled({
        type: 'DELETED_DOCUMENT',
        payload: deletedDocument,
      });
    } catch (error) {
      addAlert({ type: 'error', text: 'Unknow error' });
      dispatchIfNotCancelled({ type: 'ERROR', payload: error });
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { addDocument, updateDocument, addUser, deleteDocument, getCollectionBy, getCollection, getCollectionsBy, response };
};