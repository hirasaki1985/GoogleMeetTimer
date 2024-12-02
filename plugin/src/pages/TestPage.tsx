import React, { useState } from 'react'
import { Button } from '@/components/atoms/Button'
import { useFetchSignedUrl } from '@/dataSources/webApi/fetchSignedUrl/useFetchSignedUrl'

/**
 * テストページ
 */
export const TestPage = () => {
  console.log('TestPage')
  const fetchSignedUrl = useFetchSignedUrl()
  const [text, setText] = useState('')
  const [url, setUrl] = useState('')
  return (
    <div>
      <div>
        <input
          onChange={(_e) => {
            if (_e.target.value) {
              setText(_e.target.value)
            }
          }}
          placeholder={'言わせたいテキスト'}
        />
      </div>
      <div>
        <Button
          onClick={() => {
            fetchSignedUrl({
              text,
            }).then((_result) => {
              if (_result.success()) {
                console.log('TestPage fetchSignedUrl() result', _result)
                setUrl(_result.data.url)
              }
            })
          }}
          label={'生成'}
        />
      </div>

      {url !== '' && (
        <div>
          <audio src={url} autoPlay />
        </div>
      )}
    </div>
  )
}
