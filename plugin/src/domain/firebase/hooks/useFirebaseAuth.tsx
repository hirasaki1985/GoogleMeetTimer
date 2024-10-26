import { firebaseAuth } from '@/domain/firebase/FirebaseClient';

export const useFirebaseAuth = () => {
  return firebaseAuth;
};
