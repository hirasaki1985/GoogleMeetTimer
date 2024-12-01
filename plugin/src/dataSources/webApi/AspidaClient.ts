import api from '@/dataSources/webApi/openapi/api/$api'
import axios from 'axios'
import aspida from '@aspida/axios'
import { getEnvWebApi } from '@/dataSources/dotEnv/DotEnv'

export const aspidaClient = api(
  aspida(
    axios.create({
      baseURL: getEnvWebApi().baseUrl,
      headers: {
        'Content-Type': 'application/json',
      },
    }),
  ),
)
