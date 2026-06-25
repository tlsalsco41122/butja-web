export type Stage = {
  id: string
  name: string
}

export type CompanyProgress = {
  id: string
  name: string
  currentStageId: string
  stages: Stage[]
}

export const cheerMessages = [
  '오늘도 한 걸음 앞으로!',
  '이번 전형 꼭 붙자!',
  '너라면 할 수 있어!',
  '지금까지도 충분히 잘해왔어!',
  '합격까지 같이 가자!',
]

export const mockCompanies: CompanyProgress[] = [
  {
    id: 'company-a',
    name: '네이버',
    currentStageId: 'coding-test',
    stages: [
      { id: 'applied', name: '지원 완료' },
      { id: 'document', name: '서류' },
      { id: 'coding-test', name: '코딩테스트' },
      { id: 'first-interview', name: '1차 면접' },
      { id: 'final-interview', name: '최종 면접' },
      { id: 'accepted', name: '합격' },
    ],
  },
  {
    id: 'company-b',
    name: '카카오',
    currentStageId: 'document',
    stages: [
      { id: 'applied', name: '지원 완료' },
      { id: 'document', name: '서류' },
      { id: 'task', name: '과제' },
      { id: 'interview', name: '면접' },
      { id: 'accepted', name: '합격' },
    ],
  },
  {
    id: 'company-c',
    name: '토스',
    currentStageId: 'accepted',
    stages: [
      { id: 'applied', name: '지원 완료' },
      { id: 'phone', name: '전화 면접' },
      { id: 'culture', name: '컬처핏' },
      { id: 'final-interview', name: '최종 면접' },
      { id: 'accepted', name: '합격' },
    ],
  },
  {
    id: 'company-d',
    name: '라인',
    currentStageId: 'second-interview',
    stages: [
      { id: 'applied', name: '지원 완료' },
      { id: 'document', name: '서류' },
      { id: 'coding-test', name: '코딩테스트' },
      { id: 'first-interview', name: '1차 면접' },
      { id: 'second-interview', name: '2차 면접' },
      { id: 'final-interview', name: '최종 면접' },
      { id: 'accepted', name: '합격' },
    ],
  },
]
