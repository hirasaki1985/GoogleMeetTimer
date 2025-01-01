import axios from 'axios'
import aspida from '@aspida/axios'
import { getEnvWebApi } from '@/dataSources/dotEnv/DotEnv'
import api from '@/dataSources/webApi/openapi/WebApi/$api'

export const aspidaClient = api(
  aspida(
    axios.create({
      baseURL: getEnvWebApi().baseUrl,
      // headers: {
      //   'Content-Type': 'application/json',
      // },
    }),
  ),
)
