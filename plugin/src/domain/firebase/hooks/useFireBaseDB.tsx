import { useCallback, useEffect, useState } from 'react';
import { onValue, ref } from 'firebase/database';
import { firebaseDataBase } from '@/domain/firebase/FirebaseClient';
import { FirebaseDBRepository } from '@/domain/firebase/repositories/FirebaseDBRepository';

/**
 * const
 */
const dbRepository = new FirebaseDBRepository(firebaseDataBase);

/**
 * props
 */
interface FireBaseDBProps {
  path: string;
}

/**
 * firebase RealTimeDatabase: 値のサブスクライブをする
 */
export const useFireBaseDBSubscribe = ({ path }: FireBaseDBProps) => {
  const [data, setData] = useState<any | null>(null);

  useEffect(() => {
    const dataRef = ref(firebaseDataBase, path); // Firebase Realtime Database内のパス
    onValue(dataRef, (snapshot) => {
      const fetchedData = snapshot.val();
      setData(fetchedData);
    });
  }, [path]);

  return { data };
};

/**
 * firebase RealTimeDatabase: 情報を書き込む
 */
export const useFirebaseDBWrite = () => {
  return useCallback(
    async (path: string, data: object | number | string | boolean) => {
      return dbRepository.write(path, data);
    },
    [dbRepository],
  );
};

/**
 * firebase RealTimeDatabase: 情報を部分更新する
 */
export const useFirebaseDBUpdate = () => {
  return useCallback(
    async (path: string, data: object) => {
      return dbRepository.update(path, data);
    },
    [dbRepository],
  );
};

/**
 * firebase RealTimeDatabase: 情報を追加する
 */
export const useFirebaseDBPush = () => {
  return useCallback(
    async (path: string, data: object | number | string | boolean) => {
      return dbRepository.push(path, data);
    },
    [dbRepository],
  );
};

/**
 * firebase RealTimeDatabase: 情報を削除する
 */
export const useFirebaseDBDelete = () => {
  return useCallback(
    async (path: string) => {
      return dbRepository.remove(path);
    },
    [dbRepository],
  );
};
