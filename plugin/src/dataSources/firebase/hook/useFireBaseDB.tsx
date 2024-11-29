import { useCallback, useEffect, useMemo, useState } from 'react'
import { onValue, ref } from 'firebase/database'
import { firebaseDataBase } from '@/dataSources/firebase/FirebaseClient'
import { FirebaseDBRepository } from '@/dataSources/firebase/repository/FirebaseDBRepository'

/**
 * const
 */
const dbRepository = new FirebaseDBRepository(firebaseDataBase)

/**
 * props
 */
interface FireBaseDBProps {
  path: string
}

interface FireBaseDBResult {
  isSubscribeReady: boolean
  data: any
}

/**
 * firebase RealTimeDatabase: 値のサブスクライブをする
 */
export const useFireBaseDBSubscribe = ({ path }: FireBaseDBProps): FireBaseDBResult => {
  // state
  const [isSubscribeReady, setIsSubscribeReady] = useState(false)
  const [data, setData] = useState<any | null>(null)

  /**
   * 更新を検知
   */
  useEffect(() => {
    const dataRef = ref(firebaseDataBase, path) // Firebase Realtime Database内のパス

    /**
     * 更新を検知した時に動作
     */
    onValue(dataRef, (_snapshot) => {
      console.log('useFireBaseDBSubscribe onValue() _snapshot', _snapshot)
      const _fetchedData = _snapshot.val()
      setData(_fetchedData)

      if (!isSubscribeReady) setIsSubscribeReady(true)
    })
  }, [path, isSubscribeReady])

  return useMemo<FireBaseDBResult>(
    () => ({
      data,
      isSubscribeReady,
    }),
    [data, isSubscribeReady],
  )
}

/**
 * firebase RealTimeDatabase: 情報を書き込む
 */
export const useFirebaseDBWrite = () => {
  return useCallback(
    async (path: string, data: object | number | string | boolean) => {
      return dbRepository.write(path, data)
    },
    [dbRepository],
  )
}

/**
 * firebase RealTimeDatabase: 情報を部分更新する
 */
export const useFirebaseDBUpdate = () => {
  return useCallback(
    async (path: string, data: object) => {
      return dbRepository.update(path, data)
    },
    [dbRepository],
  )
}

/**
 * firebase RealTimeDatabase: 情報を追加する
 */
export const useFirebaseDBPush = () => {
  return useCallback(
    async (path: string, data: object | number | string | boolean) => {
      return dbRepository.push(path, data)
    },
    [dbRepository],
  )
}

/**
 * firebase RealTimeDatabase: 情報を削除する
 */
export const useFirebaseDBDelete = () => {
  return useCallback(
    async (path: string) => {
      return dbRepository.remove(path)
    },
    [dbRepository],
  )
}
