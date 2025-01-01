import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import { middleware } from 'express-openapi-validator'
import path from 'path'
import { heartbeat } from './WebApi/apis/heartbeat'
import { getSpeechTextSignedUrl } from './WebApi/apis/getSpeechTextSignedUrl'
import SwaggerParser from '@apidevtools/swagger-parser'
import { OpenAPIV3, OpenApiValidatorOpts } from 'express-openapi-validator/dist/framework/types'
import { dotEnvServer } from './dataSources/env/DotEnv'

const app = express()

// OpenAPIスキーマの読み込み
const apiSpecPath = path.resolve(__dirname, '../../webApi/openapi.yaml')

async function loadApiSpec(filePath: string): Promise<OpenApiValidatorOpts['apiSpec']> {
  try {
    console.log(`Loading OpenAPI spec from: ${filePath}`)
    const api = await SwaggerParser.dereference(filePath)
    console.log('OpenAPI spec loaded successfully')
    return api as OpenAPIV3.DocumentV3
  } catch (err) {
    console.error('Error loading OpenAPI spec:', err)
    throw err
  }
}

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
    app.get('/heartbeat', heartbeat)
    app.get('/speechTextSignedUrl', getSpeechTextSignedUrl)

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
