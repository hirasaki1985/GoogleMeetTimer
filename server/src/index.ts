import { Request, Response } from 'express'

// HTTP 関数
export const helloWorld = (req: Request, res: Response): void => {
  const name = req.query.name || req.body.name || 'World'
  res.send(`Hello, ${name}!`)
}
