import { GetSignedUrlConfig, Storage, UploadResponse } from '@google-cloud/storage'

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
      .upload(this.getLocalFileName(localFilePath, localFileName), {
        destination: this.getRemoteFileName(remoteFilePath, remoteFileName),
      })
  }

  /**
   * ArrayBufferをアップロードする
   */
  public uploadArrayBuffer = async (
    bucketName: string,
    remoteFileName: string,
    data: ArrayBuffer,
  ) => {
    // バケット参照を取得
    const bucket = this.storage.bucket(bucketName)

    // ArrayBufferをBufferに変換
    const buffer = Buffer.from(data)

    // ファイルオブジェクトを取得
    const file = bucket.file(remoteFileName)

    try {
      // ファイルをアップロード
      return await file.save(buffer, {
        contentType: 'application/octet-stream', // 適宜変更
      })
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
        .file(this.getRemoteFileName(remoteFilePath, remoteFileName))
        .exists()
      return exists
    } catch (error) {
      console.error('Error checking file existence:', error)
      return false // エラー時は false を返す
    }
  }

  /**
   * 認証付きURLを取得する
   */
  public generateSignedUrl = async (
    bucketName: string,
    remoteFileName: string,
    expires: number = Date.now() + 60 * 60 * 1000, // 1時間後に期限切れ
  ): Promise<string> => {
    try {
      // 認証付きURLのオプション
      const options: GetSignedUrlConfig = {
        version: 'v4', // v4署名URL
        action: 'read', // 読み取り用
        expires: expires,
      }

      // 認証付きURLを生成
      const [url] = await this.storage.bucket(bucketName).file(remoteFileName).getSignedUrl(options)
      return url
    } catch (error) {
      console.error('Error generating signed URL:', error)
      throw error
    }
  }

  private getLocalFileName(localFilePath: string, localFileName?: string): string {
    return `${localFilePath}${localFileName != null && localFileName !== '' ? `/${localFileName}` : ''}`
  }

  private getRemoteFileName(remoteFilePath: string, remoteFileName?: string): string {
    return `${remoteFilePath}${remoteFileName != null && remoteFileName !== '' ? `/${remoteFileName}` : ''}`
  }
}
