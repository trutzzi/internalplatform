import { useState, useEffect } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useFireStore, User } from "./useFirestore";

export const useLogin = () => {
  const { getCollectionBy } = useFireStore('users')
  const [isCancelled, setIsCancelled] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { dispatch } = useAuthContext();

  const login = async (email: string, password: string) => {
    setError(null);
    setIsPending(true);

    // signout user
    try {
      const res = await signInWithEmailAndPassword(projectAuth, email, password);
      
      // TODO: FIx this type
      const isAdmin: any = await getCollectionBy('uid', res.user.uid);
      
      const userWithProps = { ...res.user, admin: isAdmin.admin };
      dispatch({ type: "LOGIN", payload: userWithProps });

      //   update state
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (error: any) {
      if (!isCancelled) {
        setError(error.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => {
      setIsCancelled(true);
    };
  }, []);

  return { error, isPending, login };
};