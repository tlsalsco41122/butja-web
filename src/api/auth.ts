import axios from 'axios'

const authApi = axios.create({
  baseURL: 'http://15.164.203.58:8080',
  headers: {
    'Content-Type': 'application/json',
  },
})

type ApiResponse<T> = {
  success: boolean
  data: T
  message: string
}

export type SignupRequest = {
  username: string
  password: string
  nickname: string
}

export type SigninRequest = {
  username: string
  password: string
}

export type SigninResponse = {
  accessToken: string
  refreshToken: string
}

export async function signup(payload: SignupRequest) {
  const { data } = await authApi.post<ApiResponse<Record<string, never>>>(
    '/api/auth/signup',
    payload,
  )

  if (!data.success) {
    throw new Error(data.message || '회원가입에 실패했어요.')
  }

  return data
}

export async function signin(payload: SigninRequest) {
  const { data } = await authApi.post<ApiResponse<SigninResponse>>(
    '/api/auth/signin',
    payload,
  )

  if (!data.success) {
    throw new Error(data.message || '로그인에 실패했어요.')
  }

  return data
}

export function getAuthErrorMessage(error: unknown, fallbackMessage: string) {
  if (axios.isAxiosError<ApiResponse<unknown>>(error)) {
    return error.response?.data?.message || fallbackMessage
  }

  if (error instanceof Error) {
    return error.message
  }

  return fallbackMessage
}
