import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import { middleware } from 'express-openapi-validator'
import YAML from 'yamljs'
import path from 'path'
import { heartbeat } from './api/heartbeat'
import { getSpeechTextSignedUrl } from './api/getSpeechTextSignedUrl'
// import SwaggerParser from 'swagger-parser'
import SwaggerParser from '@apidevtools/swagger-parser'
import { OpenAPIV3, OpenApiValidatorOpts } from 'express-openapi-validator/dist/framework/types'
import { dotEnvServer } from './dataSources/env/DotEnv'

const app = express()

// OpenAPIスキーマの読み込み
const apiSpecPath = path.resolve(__dirname, '../../webApi/openapi.yaml')
// const apiSpec = YAML.load(path.resolve(__dirname, '../../webApi/openapi.yaml'))

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
    const apiSpec = await loadApiSpec(apiSpecPath)
    console.log('apiSpec', apiSpec)

    // JSONリクエストを解析するミドルウェア
    app.use(express.json())

    app.use(
      middleware({
        apiSpec,
        validateRequests: true,
        validateResponses: true,
      }),
    )

    app.get('/heartbeat', heartbeat)
    app.get('/speechTextSignedUrl', getSpeechTextSignedUrl)

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

// OpenAPIバリデーションミドルウェアを設定
// app.use(
//   middleware({
//     apiSpec,
//     validateRequests: true, // リクエストのバリデーションを有効化
//     validateResponses: true, // レスポンスのバリデーションを有効化
//   }),
// )

// app.use(
//   cors({
//     origin: process.env.CORS_ALLOW_ORIGINS?.split(','),
//     // credentials: true,
//     methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type'],
//   }),
// )
//
// app.get('/heartbeat', heartbeat)
// app.get('/speechTextSignedUrl', getSpeechTextSignedUrl)
//
// export const api = app

//
// ;(async () => {
//   try {
//     const apiSpec = await loadApiSpec(apiSpecPath)
//
//     // OpenAPIバリデーションミドルウェアを設定
//     app.use(
//       middleware({
//         apiSpec, // 解決済みのOpenAPI仕様
//         validateRequests: true, // リクエストのバリデーションを有効化
//         validateResponses: true, // レスポンスのバリデーションを有効化
//       }),
//     )
//
//     app.get('/heartbeat', heartbeat)
//     app.get('/speechTextSignedUrl', getSpeechTextSignedUrl)
//
//     const PORT = 3000
//     app.listen(PORT, () => {
//       console.log(`Server is running on http://localhost:${PORT}`)
//     })
//   } catch (err) {
//     console.error(err)
//     if (err instanceof Error) {
//       console.error('Failed to start the server:', err.message)
//     }
//   }
// })()
