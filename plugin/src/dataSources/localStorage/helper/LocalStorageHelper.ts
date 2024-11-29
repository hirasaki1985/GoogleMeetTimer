const BaseKey = 'google-meet-timer'
const BaseLocalTimerStateKey = `${BaseKey}-local-state`

/**
 * LocalTimerStateのキーを返す
 */
export const localStorageGetLocalTimerStateKey = (): string => {
  return BaseLocalTimerStateKey
}
