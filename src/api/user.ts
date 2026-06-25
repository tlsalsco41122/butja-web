import { apiRequest } from './client'
import type { UserInfo } from './types'

export function getMe() {
  return apiRequest<UserInfo>({
    method: 'GET',
    url: '/api/user/me',
  })
}
