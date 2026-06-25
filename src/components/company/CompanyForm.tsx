import { useState } from 'react'
import { createApplication } from '../../api/applications'
import { getApiErrorMessage } from '../../api/client'
import { createStage } from '../../api/stages'
import StageFormItem, { type CompanyStageFormValue } from './StageFormItem'

type CompanyFormProps = {
  onCancel: () => void
  onRegistered: () => void
}

const initialStage: CompanyStageFormValue = {
  stageName: '',
  memo: '',
  scheduleDate: '',
}

const inputClassName =
  'h-10 rounded-lg border border-[#EDEDED] bg-[#F6F6F6] px-5 font-[Pretendard] text-base font-medium text-[#444] outline-none transition placeholder:text-[#828282] focus:border-[#67CDFF] focus:bg-white'

function getTodayDate() {
  return new Date().toISOString().slice(0, 10)
}

function toScheduledAt(scheduleDate: string) {
  return scheduleDate ? `${scheduleDate}T00:00:00` : null
}

function CompanyForm({ onCancel, onRegistered }: CompanyFormProps) {
  const [companyName, setCompanyName] = useState('')
  const [jobRole, setJobRole] = useState('')
  const [memo, setMemo] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [stages, setStages] = useState<CompanyStageFormValue[]>([
    { ...initialStage },
  ])

  const handleStageChange = (
    stageIndex: number,
    nextStage: CompanyStageFormValue,
  ) => {
    setStages((currentStages) =>
      currentStages.map((stage, index) =>
        index === stageIndex ? nextStage : stage,
      ),
    )
  }

  const handleAddStage = () => {
    setStages((currentStages) => [...currentStages, { ...initialStage }])
  }

  const handleDeleteStage = (stageIndex: number) => {
    setStages((currentStages) =>
      currentStages.filter((_, index) => index !== stageIndex),
    )
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setIsSubmitting(true)
    setErrorMessage('')

    try {
      const application = await createApplication({
        companyName,
        jobRole,
        appliedDate: getTodayDate(),
        memo: memo || null,
      })

      const validStages = stages.filter((stage) => stage.stageName.trim())

      await Promise.all(
        validStages.map((stage, index) =>
          createStage(application.id, {
            name: stage.stageName,
            orderNumber: index,
            scheduledAt: toScheduledAt(stage.scheduleDate),
            memo: stage.memo || null,
          }),
        ),
      )

      onRegistered()
    } catch (error) {
      setErrorMessage(
        getApiErrorMessage(error, '기업 등록 중 문제가 발생했어요.'),
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex h-[700px] w-[600px] flex-col rounded-[20px] border border-black bg-white p-10"
    >
      <div className="min-h-0 flex-1 overflow-y-auto pr-1">
        <div className="flex gap-5">
          <label className="flex flex-col gap-2 font-[Pretendard] text-sm font-medium text-[#828282]">
            회사명
            <input
              type="text"
              value={companyName}
              onChange={(event) => setCompanyName(event.target.value)}
              placeholder="회사명을 입력하세요"
              required
              className={`${inputClassName} w-[250px]`}
            />
          </label>
          <label className="flex flex-col gap-2 font-[Pretendard] text-sm font-medium text-[#828282]">
            직무
            <input
              type="text"
              value={jobRole}
              onChange={(event) => setJobRole(event.target.value)}
              placeholder="직무를 입력하세요"
              required
              className={`${inputClassName} w-[250px]`}
            />
          </label>
        </div>

        <label className="mt-9 flex flex-col gap-2 font-[Pretendard] text-sm font-medium text-[#828282]">
          메모
          <input
            type="text"
            value={memo}
            onChange={(event) => setMemo(event.target.value)}
            placeholder="메모를 입력하세요"
            className={`${inputClassName} w-full`}
          />
        </label>

        <section className="mt-9">
          <h2 className="font-[Pretendard] text-sm font-medium text-[#828282]">
            전형 단계 구성
          </h2>

          <div className="mt-3 flex flex-col gap-2">
            {stages.map((stage, index) => (
              <StageFormItem
                key={`${index}-${stages.length}`}
                stage={stage}
                onChange={(nextStage) => handleStageChange(index, nextStage)}
                onDelete={() => handleDeleteStage(index)}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={handleAddStage}
            className="mt-3 font-[Pretendard] text-sm font-medium text-[#67CDFF] transition hover:opacity-70 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#67CDFF]"
          >
            + 단계 추가
          </button>
        </section>
      </div>

      <div className="mt-6 flex shrink-0 flex-col items-end gap-3">
        {errorMessage ? (
          <p className="font-[Pretendard] text-sm font-medium text-[#EB5757]">
            {errorMessage}
          </p>
        ) : null}
        <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="rounded-lg bg-[#C7C7CC] px-6 py-2 font-[Pretendard] text-base font-medium text-white transition hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A8A8AD]"
        >
          취소하기
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-[#67CDFF] px-6 py-2 font-[Pretendard] text-base font-medium text-white transition hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2CAEE8] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? '등록 중...' : '기업 등록하기'}
        </button>
        </div>
      </div>
    </form>
  )
}

export default CompanyForm
