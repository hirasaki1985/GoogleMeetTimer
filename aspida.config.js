module.exports = {
  input: 'plugin/src/dataSources/webApi/openapi/WebApi', // "input" of aspida is "output" for openapi2aspida
  outputEachDir: true, // Generate $WebApi.ts in each endpoint directory
  openapi: { inputFile: 'webApi/openapi.yaml' },
}

/*
const config = {
  input: 'src/dataSources/webApi/openapi/WebApi', // "input" of aspida is "output" for openapi2aspida
  outputEachDir: true, // Generate $WebApi.ts in each endpoint directory
  openapi: { inputFile: 'src/dataSources/webApi/openapi/openapi.yaml' },
}

export default config
*/
