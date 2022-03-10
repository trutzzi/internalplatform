import {
  createContext, Reducer, Dispatch, useEffect, useReducer,
} from 'react';
import { projectAuth } from '../firebase/config';
import { useFireStore, UserWithProps } from '../hooks/useFirestore';

type ContextProps = {
  user: UserWithProps | null;
  authIsReady: boolean;
  dispatch: Dispatch<Action>;
};

type Action = { type: string, payload: any };

const initialState = {
  user: null,
  authIsReady: false,
  dispatch: () => null,
};

type State = {
  user: UserWithProps | null;
  authIsReady: boolean;
};

export const authReducer: Reducer<State, Action> = (
  state: State,
  action: Action,
) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, user: null, authIsReady: false };
    case 'AUTH_IS_READY':
      return { ...state, user: action.payload, authIsReady: true };
    default:
      return state;
  }
};

export const AuthContext = createContext<ContextProps>(initialState);

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const { getCollectionBy } = useFireStore('users');

  console.log('auth context state ', state);

  useEffect(() => {
    projectAuth.onAuthStateChanged((user) => {
      (async () => {
        if (user) {
          const isAdmin = await getCollectionBy('uid', user?.uid);
          const userWithProps = { ...user, admin: isAdmin?.admin, supervisorId: '' };
          dispatch({ type: 'AUTH_IS_READY', payload: userWithProps });
        }
      })();
    });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}
