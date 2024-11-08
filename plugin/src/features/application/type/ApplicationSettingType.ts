/**
 * Applicationの設定値(全体)
 */
export interface ApplicationSetting {
  whiteList: string[]
}
export const initApplicationSetting = (): ApplicationSetting => ({
  whiteList: [],
})
