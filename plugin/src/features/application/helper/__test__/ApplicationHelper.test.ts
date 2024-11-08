import { applicationHelperIsMatchWhiteList } from '../ApplicationHelper'

describe('applicationHelperIsMatchWhiteList', () => {
  test('should return true if meetingId matches a pattern in the whitelist', () => {
    const whiteList = ['abc-*', 'def-*', '*-eee']
    expect(applicationHelperIsMatchWhiteList(whiteList, 'abc-xyz')).toBe(true)
    expect(applicationHelperIsMatchWhiteList(whiteList, 'def-123')).toBe(true)
    expect(applicationHelperIsMatchWhiteList(whiteList, 'xyz-eee')).toBe(true)
  })

  test('should return false if meetingId does not match any pattern in the whitelist', () => {
    const whiteList = ['abc-*', 'def-*', '*-eee']
    expect(applicationHelperIsMatchWhiteList(whiteList, 'xyz-123')).toBe(false)
    expect(applicationHelperIsMatchWhiteList(whiteList, 'abc')).toBe(false)
  })

  test('should return true if wildcard "*" matches any string', () => {
    const whiteList = ['*']
    expect(applicationHelperIsMatchWhiteList(whiteList, 'any-value')).toBe(true)
    expect(applicationHelperIsMatchWhiteList(whiteList, 'another-value')).toBe(true)
  })

  test('should return true for exact match patterns', () => {
    const whiteList = ['abc-123', 'def-456']
    expect(applicationHelperIsMatchWhiteList(whiteList, 'abc-123')).toBe(true)
    expect(applicationHelperIsMatchWhiteList(whiteList, 'def-456')).toBe(true)
  })

  test('should return false for non-matching exact patterns', () => {
    const whiteList = ['abc-123', 'def-456']
    expect(applicationHelperIsMatchWhiteList(whiteList, 'abc-124')).toBe(false)
    expect(applicationHelperIsMatchWhiteList(whiteList, 'def-457')).toBe(false)
  })

  test('should return true if meetingId matches a pattern in the whitelist', () => {
    const whiteList = ['*']
    expect(applicationHelperIsMatchWhiteList(whiteList, 'abc-xyz')).toBe(true)
    expect(applicationHelperIsMatchWhiteList(whiteList, 'def-123')).toBe(true)
    expect(applicationHelperIsMatchWhiteList(whiteList, 'xyz-eee')).toBe(true)
  })
})
