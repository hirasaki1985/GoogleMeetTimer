import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import { middleware } from 'express-openapi-validator'
import path from 'path'
import { getHeartbeat } from './WebApi/apis/heartbeat'
import { getSpeechTextSignedUrl } from './WebApi/apis/speechTextSignedUrl'
import SwaggerParser from '@apidevtools/swagger-parser'
import { OpenAPIV3, OpenApiValidatorOpts } from 'express-openapi-validator/dist/framework/types'
import { dotEnvServer } from './dataSources/env/DotEnv'
import { putFetchVoice } from './WebApi/apis/fetchVoice'

const app = express()

/**
 * OpenAPIスキーマを読み込む
 */
async function loadApiSpec(filePath: string): Promise<OpenApiValidatorOpts['apiSpec']> {
  const api = await SwaggerParser.dereference(filePath)
  return api as OpenAPIV3.DocumentV3
}

/**
 * サーバを起動する
 */
;(async () => {
  try {
    // corsの設定
    app.use(
      cors({
        origin: process.env.CORS_ALLOW_ORIGINS?.split(','),
        // credentials: true,
        methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type'],
      }),
    )

    // OpenAPIスキーマの読み込み
    const apiSpecPath = path.resolve(__dirname, '../../webApi/openapi.yaml')
    const apiSpec = await loadApiSpec(apiSpecPath)
    app.use(express.json())

    app.use(
      middleware({
        apiSpec,
        validateRequests: true,
        validateResponses: true,
      }),
    )

    // apiの読み込み
    app.get('/heartbeat', getHeartbeat)
    app.get('/speechTextSignedUrl', getSpeechTextSignedUrl)
    app.put('/fetchVoice', putFetchVoice)

    // サーバ起動
    const PORT = dotEnvServer().port
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`)
    })
  } catch (err) {
    console.error(err)
    if (err instanceof Error) {
      console.error('Failed to start the server:', err.message)
    }
  }
})()

export const api = app
