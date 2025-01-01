export class GoogleCloudStorageHelper {
  /**
   * 署名付きURLの期限がきれているか確認する
   * 署名付きURL自体には有効期限がエンコードされているため、取得したURLを解析して有効期限を確認できる
   */
  static isSignedUrlExpired(url: string): boolean {
    const urlObj = new URL(url)

    const expirationSeconds = parseInt(urlObj.searchParams.get('X-Goog-Expires') || '0', 10)
    const dateString = urlObj.searchParams.get('X-Goog-Date')
    if (!dateString || !expirationSeconds) {
      throw new Error('Invalid Signed URL')
    }

    // X-Goog-Date の形式: YYYYMMDD'T'HHMMSS'Z'
    const signedDate = new Date(
      Date.UTC(
        parseInt(dateString.slice(0, 4), 10), // 年
        parseInt(dateString.slice(4, 6), 10) - 1, // 月 (0-based)
        parseInt(dateString.slice(6, 8), 10), // 日
        parseInt(dateString.slice(9, 11), 10), // 時
        parseInt(dateString.slice(11, 13), 10), // 分
        parseInt(dateString.slice(13, 15), 10), // 秒
      ),
    )

    // 有効期限日時を計算
    const expirationDate = new Date(signedDate.getTime() + expirationSeconds * 1000)

    // 現在時刻と比較
    return expirationDate < new Date()
  }
}
