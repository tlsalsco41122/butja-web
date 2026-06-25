import { X } from 'lucide-react'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import type { DashboardStage } from '../../types/companyProgress'
import { formatDateLabel } from '../../utils/date'

type StageDetailModalProps = {
  stage: DashboardStage
  isAcceptedStage: boolean
  isCompleting: boolean
  isFailing: boolean
  errorMessage: string
  onComplete: () => void
  onFail: () => void
  onClose: () => void
}

function getCompleteButtonText(
  stage: DashboardStage,
  isCompleting: boolean,
  isAcceptedStage: boolean,
) {
  if (!stage.stageId) {
    return '완료 처리 불가'
  }

  if (stage.status === 'COMPLETED') {
    return isAcceptedStage ? '합격 완료' : '완료된 전형'
  }

  if (isCompleting) {
    return '처리 중...'
  }

  return isAcceptedStage ? '최종 합격' : '완료하고 다음 단계로'
}

function StageDetailModal({
  stage,
  isAcceptedStage,
  isCompleting,
  isFailing,
  errorMessage,
  onComplete,
  onFail,
  onClose,
}: StageDetailModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return createPortal(
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/15"
      onClick={onClose}
      role="presentation"
    >
      <article
        className="animate-[bubble-pop_220ms_ease-out] rounded-2xl border border-white/70 bg-white px-6 py-5 shadow-[0_24px_70px_rgba(68,68,68,0.2)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex w-[320px] items-start justify-between gap-4">
          <div>
            <h2 className="font-[Pretendard] text-xl font-bold text-[#444]">
              {stage.name}
            </h2>
            <p className="mt-2 font-[Pretendard] text-sm font-semibold text-[#67A629]">
              {formatDateLabel(stage.scheduleDate)}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="전형 상세 닫기"
            className="flex h-8 w-8 items-center justify-center rounded-full text-[#828282] transition hover:bg-[#F6F6F6] hover:text-[#444] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#67CDFF]"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <p className="mt-5 max-w-[320px] rounded-lg bg-[#F6F6F6] px-4 py-3 font-[Pretendard] text-sm font-medium leading-6 text-[#444]">
          {stage.memo || '등록된 메모가 없습니다.'}
        </p>
        {errorMessage ? (
          <p className="mt-3 max-w-[320px] font-[Pretendard] text-sm font-medium text-[#EB5757]">
            {errorMessage}
          </p>
        ) : null}
        <div className="mt-5 flex justify-end gap-2">
          {stage.status === 'IN_PROGRESS' && (
            <button
              type="button"
              onClick={onFail}
              disabled={isFailing || isCompleting}
              className="rounded-lg bg-[#EB5757] px-5 py-2 font-[Pretendard] text-sm font-semibold text-white transition hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EB5757] disabled:cursor-not-allowed disabled:bg-[#C7C7CC] disabled:hover:brightness-100"
            >
              {isFailing ? '처리 중...' : '불합격'}
            </button>
          )}
          <button
            type="button"
            onClick={onComplete}
            disabled={
              isCompleting || isFailing || !stage.stageId || stage.status === 'COMPLETED' || stage.status === 'FAILED'
            }
            className="rounded-lg bg-[#67CDFF] px-5 py-2 font-[Pretendard] text-sm font-semibold text-white transition hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2CAEE8] disabled:cursor-not-allowed disabled:bg-[#C7C7CC] disabled:hover:brightness-100"
          >
            {getCompleteButtonText(
              stage,
              isCompleting,
              isAcceptedStage,
            )}
          </button>
        </div>
      </article>
    </div>,
    document.body,
  )
}

export default StageDetailModal