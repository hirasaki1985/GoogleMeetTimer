import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import { healthcheck } from './api/healthcheck'
import { getSpeechTextSignedUrl } from './api/getSpeechTextSignedUrl'

const app = express()

console.log(process.env.CORS_ALLOW_ORIGINS?.split(','))
app.use(
  cors({
    origin: process.env.CORS_ALLOW_ORIGINS?.split(','),
    // credentials: true,
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
  }),
)

app.get('/healthcheck', healthcheck)
app.get('/speechTextSignedUrl', getSpeechTextSignedUrl)

export const api = app
