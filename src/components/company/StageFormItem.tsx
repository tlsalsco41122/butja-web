import { X } from 'lucide-react'

export type CompanyStageFormValue = {
  id?: number
  stageName: string
  memo: string
  scheduleDate: string
}

type StageFormItemProps = {
  stage: CompanyStageFormValue
  onChange: (stage: CompanyStageFormValue) => void
  onDelete: () => void
}

const inputClassName =
  'h-10 rounded-lg border border-[#EDEDED] bg-[#F6F6F6] px-5 font-[Pretendard] text-base font-medium text-[#444] outline-none transition placeholder:text-[#828282] focus:border-[#67CDFF] focus:bg-white'

function StageFormItem({ stage, onChange, onDelete }: StageFormItemProps) {
  return (
    <div className="flex flex-col gap-2 transition-all duration-200">
      <div className="flex items-center gap-5">
        <input
          type="text"
          value={stage.stageName}
          onChange={(event) =>
            onChange({ ...stage, stageName: event.target.value })
          }
          placeholder="전형 단계를 입력하세요"
          className={`${inputClassName} w-[275px]`}
        />
        <input
          type="date"
          value={stage.scheduleDate}
          onChange={(event) =>
            onChange({ ...stage, scheduleDate: event.target.value })
          }
          aria-label="날짜 선택"
          className={`${inputClassName} w-[177px] text-center`}
        />
        <button
          type="button"
          onClick={onDelete}
          aria-label="전형 단계 삭제"
          className="flex h-10 w-6 items-center justify-center text-[#FF3B30] transition hover:scale-110 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF3B30]"
        >
          <X className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
        </button>
      </div>
      <input
        type="text"
        value={stage.memo}
        onChange={(event) => onChange({ ...stage, memo: event.target.value })}
        placeholder="전형 단계에 대한 메모를 입력하세요"
        className={`${inputClassName} w-[472px]`}
      />
    </div>
  )
}

export default StageFormItem
