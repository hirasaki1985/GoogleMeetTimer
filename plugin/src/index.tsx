import React from 'react'
import { App } from './App'
import { createRoot } from 'react-dom/client'

const baseId = 'google-meet-timer'

const appContainer = document.createElement('div')
appContainer.id = baseId
document.body.appendChild(appContainer)

const root = createRoot(document.getElementById(baseId)!).render(<App />)
