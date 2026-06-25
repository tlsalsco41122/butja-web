import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'
import type { ApiResponse } from './types'

export const BASE_URL = 'http://15.164.203.58:8080'

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export async function apiRequest<T>(config: AxiosRequestConfig) {
  const { data } = await apiClient.request<ApiResponse<T>>(config)

  if (!data.success) {
    throw new Error(data.message || '요청을 처리하지 못했어요.')
  }

  return data.data as T
}

export function getApiErrorMessage(error: unknown, fallbackMessage: string) {
  if (axios.isAxiosError<ApiResponse<unknown>>(error)) {
    return error.response?.data?.message || fallbackMessage
  }

  if (error instanceof Error) {
    return error.message
  }

  return fallbackMessage
}
