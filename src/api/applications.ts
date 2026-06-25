import { apiRequest } from './client'
import type { JobApplication, JobApplicationDetail } from './types'

export type CreateApplicationRequest = {
  companyName: string
  jobRole: string
  appliedDate: string
  memo?: string | null
}

export type UpdateApplicationRequest = Partial<CreateApplicationRequest>

export function createApplication(data: CreateApplicationRequest) {
  return apiRequest<JobApplicationDetail>({
    method: 'POST',
    url: '/api/applications',
    data,
  })
}

export function getApplications() {
  return apiRequest<JobApplication[]>({
    method: 'GET',
    url: '/api/applications',
  })
}

export function getApplication(applicationId: number) {
  return apiRequest<JobApplicationDetail>({
    method: 'GET',
    url: `/api/applications/${applicationId}`,
  })
}

export function updateApplication(
  applicationId: number,
  data: UpdateApplicationRequest,
) {
  return apiRequest<JobApplicationDetail>({
    method: 'PATCH',
    url: `/api/applications/${applicationId}`,
    data,
  })
}

export function deleteApplication(applicationId: number) {
  return apiRequest<null>({
    method: 'DELETE',
    url: `/api/applications/${applicationId}`,
  })
}
