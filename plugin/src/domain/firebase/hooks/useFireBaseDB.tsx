import { useEffect, useState } from 'react';
import { onValue, ref } from 'firebase/database';
import { firebaseDataBase } from '@/domain/firebase/FirebaseClient';

interface FireBaseDBProps {
  path: string;
}

/**
 * firebaseのRealTimeDatabaseの値のサブスクライブをする
 */
export const useFireBaseDB = ({ path }: FireBaseDBProps) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const dataRef = ref(firebaseDataBase, path); // Firebase Realtime Database内のパス
    onValue(dataRef, (snapshot) => {
      const fetchedData = snapshot.val();
      setData(fetchedData);
    });
  }, [path]);

  return { data };
};
