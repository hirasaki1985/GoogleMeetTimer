import { Storage, UploadResponse } from '@google-cloud/storage'

/**
 * Firebaseのstorageを管理する
 */
export class FirebaseStorageRepository {
  private storage: Storage

  constructor(storage: Storage) {
    this.storage = storage
  }

  /**
   * ファイルのアップロードを行う
   */
  public upload = async (
    bucketName: string,
    localFilePath: string,
    remoteFilePath: string,
    localFileName?: string,
    remoteFileName?: string,
  ): Promise<UploadResponse> => {
    return await this.storage
      .bucket(bucketName)
      .upload(
        `${localFilePath}${localFileName != null && localFileName !== '' ? `/${localFileName}` : ''}`,
        {
          destination: `${remoteFilePath}${remoteFileName != null && remoteFileName !== '' ? `/${remoteFileName}` : ''}`,
        },
      )
  }

  /**
   * ArrayBufferをアップロードする
   */
  public uploadArrayBuffer = async (bucketName: string, fileName: string, data: ArrayBuffer) => {
    // バケット参照を取得
    const bucket = this.storage.bucket(bucketName)

    // ArrayBufferをBufferに変換
    const buffer = Buffer.from(data)

    // ファイルオブジェクトを取得
    const file = bucket.file(fileName)

    try {
      // ファイルをアップロード
      return await file.save(buffer, {
        contentType: 'application/octet-stream', // 適宜変更
      })

      console.log(`File ${fileName} uploaded to bucket ${bucketName}.`)
    } catch (error) {
      console.error('Failed to upload file:', error)
      throw error
    }
  }

  /**
   * ファイルがすでにアップロードされているかチェックする
   */
  public isAlreadyUploaded = async (
    bucketName: string,
    remoteFilePath: string,
    remoteFileName?: string,
  ): Promise<boolean> => {
    try {
      const [exists] = await this.storage
        .bucket(bucketName)
        .file(
          `${remoteFilePath}${remoteFileName != null && remoteFileName !== '' ? `/${remoteFileName}` : ''}`,
        )
        .exists()
      return exists
    } catch (error) {
      console.error('Error checking file existence:', error)
      return false // エラー時は false を返す
    }
  }
}
