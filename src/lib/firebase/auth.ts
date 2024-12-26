import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { app } from './config';
import { handleFirebaseError } from './error-handler';

export const auth = getAuth(app);

export const signIn = async (email: string, password: string) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
  } catch (error) {
    throw handleFirebaseError(error);
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw handleFirebaseError(error);
  }
};