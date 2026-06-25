import { useState } from 'react'
import StageFormItem, { type CompanyStageFormValue } from './StageFormItem'

type CompanyFormProps = {
  onCancel: () => void
}

const initialStage: CompanyStageFormValue = {
  stageName: '',
  memo: '',
  scheduleDate: '',
}

const inputClassName =
  'h-10 rounded-lg border border-[#EDEDED] bg-[#F6F6F6] px-5 font-[Pretendard] text-base font-medium text-[#444] outline-none transition placeholder:text-[#828282] focus:border-[#67CDFF] focus:bg-white'

function CompanyForm({ onCancel }: CompanyFormProps) {
  const [companyName, setCompanyName] = useState('')
  const [jobRole, setJobRole] = useState('')
  const [memo, setMemo] = useState('')
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    console.log({
      companyName,
      jobRole,
      memo,
      stages,
    })
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

      <div className="mt-6 flex shrink-0 justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg bg-[#C7C7CC] px-6 py-2 font-[Pretendard] text-base font-medium text-white transition hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A8A8AD]"
        >
          취소하기
        </button>
        <button
          type="submit"
          className="rounded-lg bg-[#67CDFF] px-6 py-2 font-[Pretendard] text-base font-medium text-white transition hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2CAEE8]"
        >
          기업 등록하기
        </button>
      </div>
    </form>
  )
}

export default CompanyForm
