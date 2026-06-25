import type { ApiDateTime } from '../utils/date'

export type ApiResponse<T> = {
  success: boolean
  data: T | null
  message: string
}

export type StageStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED" | "FAILED";

export type UserInfo = {
  id: number
  username: string
  nickname: string
}

export type Stage = {
  id: number
  jobApplicationId: number
  name: string
  orderNumber: number
  completed: boolean
  status: StageStatus
  scheduledAt: ApiDateTime
  memo: string | null
}

export type Progress = {
  totalCount: number
  completedCount: number
  progressRate: number
}

export type JobApplication = {
  id: number
  companyName: string
  jobRole: string
  appliedDate: string
  memo: string | null
  currentStage: Stage | null
  progress: Progress
  createdAt: string | null
  updatedAt: string | null
}

export type JobApplicationDetail = JobApplication & {
  stages: Stage[]
}
