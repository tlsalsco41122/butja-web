import type { StageStatus } from '../api/types'
import type { ApiDateTime } from '../utils/date'

export type DashboardStage = {
  id: string
  applicationId: number
  stageId: number | null
  name: string
  memo: string | null
  scheduleDate: ApiDateTime
  status: StageStatus | null
}

export type CompanyProgress = {
  id: string
  applicationId: number
  name: string
  jobRole: string
  memo: string | null
  currentStageId: string
  stages: DashboardStage[]
}
