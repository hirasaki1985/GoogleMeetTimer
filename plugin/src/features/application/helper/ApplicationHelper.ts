/**
 * ミーティングIDがホワイトリストとマッチするか判定する
 */
export const applicationHelperIsMatchWhiteList = (
  whiteList: string[],
  meetingId: string,
): boolean => {
  return whiteList.some((pattern) => {
    // 正規表現オブジェクトに変換し、meetingIdと比較
    const regexPattern = new RegExp(`^${pattern.replace(/\*/g, '.*')}$`)
    return regexPattern.test(meetingId)
  })
}
