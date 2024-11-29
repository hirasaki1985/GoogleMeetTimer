import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import { healthcheck } from './api/healthcheck'
import { getSpeechTextSignedUrl } from './api/getSpeechTextSignedUrl'

const app = express()

app.get('/healthcheck', healthcheck)
app.get('/speechTextSignedUrl', getSpeechTextSignedUrl)

export const api = app
