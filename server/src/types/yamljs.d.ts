declare module 'yamljs' {
  const parse: (yaml: string) => any
  const stringify: (object: any, spaces?: number) => string
  const load: (filePath: string) => any
  const write: (filePath: string, data: any) => void

  export { parse, stringify, load, write }
}
