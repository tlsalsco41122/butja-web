import { apiRequest } from "./client";
import type { Progress, Stage } from "./types";

export type CreateStageRequest = {
  name: string;
  orderNumber?: number;
  scheduledAt?: string | null;
  memo?: string | null;
};

export type UpdateStageRequest = {
  name?: string;
  scheduledAt?: string | null;
  memo?: string | null;
};

export function createStage(applicationId: number, data: CreateStageRequest) {
  return apiRequest<Stage>({
    method: "POST",
    url: `/api/applications/${applicationId}/stages`,
    data,
  });
}

export function getStages(applicationId: number) {
  return apiRequest<Stage[]>({
    method: "GET",
    url: `/api/applications/${applicationId}/stages`,
  });
}

export function getStage(applicationId: number, stageId: number) {
  return apiRequest<Stage>({
    method: "GET",
    url: `/api/applications/${applicationId}/stages/${stageId}`,
  });
}

export function updateStage(
  applicationId: number,
  stageId: number,
  data: UpdateStageRequest,
) {
  return apiRequest<Stage>({
    method: "PATCH",
    url: `/api/applications/${applicationId}/stages/${stageId}`,
    data,
  });
}

export function deleteStage(applicationId: number, stageId: number) {
  return apiRequest<null>({
    method: "DELETE",
    url: `/api/applications/${applicationId}/stages/${stageId}`,
  });
}

export function updateStageOrder(
  applicationId: number,
  stageId: number,
  orderNumber: number,
) {
  return apiRequest<Stage[]>({
    method: "PATCH",
    url: `/api/applications/${applicationId}/stages/${stageId}/order`,
    data: { orderNumber },
  });
}

export function completeStage(
  applicationId: number,
  stageId: number,
  completed: boolean,
) {
  return apiRequest<Stage>({
    method: "PATCH",
    url: `/api/applications/${applicationId}/stages/${stageId}/complete`,
    data: { completed },
  });
}

export function failStage(applicationId: number, stageId: number) {
  return apiRequest<Stage>({
    method: "PATCH",
    url: `/api/applications/${applicationId}/stages/${stageId}/fail`,
  });
}

export function getStageProgress(applicationId: number) {
  return apiRequest<Progress>({
    method: "GET",
    url: `/api/applications/${applicationId}/stages/progress`,
  });
}

export function getCurrentStage(applicationId: number) {
  return apiRequest<{ currentStage: Stage | null }>({
    method: "GET",
    url: `/api/applications/${applicationId}/stages/current`,
  });
}
