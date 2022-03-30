import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { projectAuth } from '../firebase/config';
import { useAuthContext } from './useAuthContext';
import { useFireStore } from './useFirestore';
import useSnackBars from './useSnackbar';

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { dispatch } = useAuthContext();
  const { addUser } = useFireStore('users');
  const { addAlert } = useSnackBars();

  const signup = async (email: string, password: string, displayName: string) => {
    setError(null);
    setIsPending(true);

    try {
      // signup user
      const response = await createUserWithEmailAndPassword(projectAuth, email, password);

      if (!response) {
        addAlert({ type: 'error', text: 'Could not complete signup' });
        throw new Error('Could not complete signup');
      }

      //  add display name to user
      const { uid } = response.user;
      await updateProfile(response.user, { displayName });
      addUser({
        uid,
        supervisorId: '',
        email,
        displayName,
        admin: false,
        createdAt: new Date().toISOString()
      });

      //   dispatch login action
      dispatch({ type: 'LOGIN', payload: response.user });

      //   update state
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (e) {
      const result = (e as Error).message;
      //   Show error
      addAlert({ type: 'error', text: result });
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    }
  };

  useEffect(() => {
    return () => {
      setIsCancelled(true);
    };
  }, []);

  return { error, isPending, signup };
};
