import { createContext, Reducer, useEffect, useReducer } from "react";
import { projectAuth } from "../firebase/config";
import { Query } from "@firebase/firestore-types";
import { useFireStore } from "../hooks/useFirestore";

type ContextProps = {
  user: {
    email: string;
    password: string;
    displayName: string;
    uid: string;
    admin: boolean;
  } | null;
  authIsReady: boolean;
  dispatch: Function;
};

type User = {
  email: string;
  displayName: string;
  uid: string;
  admin: boolean;
};

type Action = { type: string; payload: User | any };

const initialState = {
  user: null,
  authIsReady: false,
  dispatch: Function,
};

type State = {
  user: User | any;
  authIsReady: boolean;
};

export const authReducer: Reducer<State, Action> = (
  state: State,
  action: Action
) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null, authIsReady: false };
    case "AUTH_IS_READY":
      return { ...state, user: action.payload, authIsReady: true };
    default:
      return state;
  }
};

export const AuthContext = createContext<ContextProps>(initialState);

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const { getCollectionBy } = useFireStore('users')

  console.log("auth context state ", state);

  useEffect(() => {
    projectAuth.onAuthStateChanged((user) => {
      (async () => {
        /**
         * Check if user belong to current db after resume session
         */
        if (user) {
          const isAdmin: any = await getCollectionBy('uid', user?.uid);
          const userWithProps = { ...user, admin: isAdmin.admin };
          dispatch({ type: "AUTH_IS_READY", payload: userWithProps });
        }
      })()
    });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};