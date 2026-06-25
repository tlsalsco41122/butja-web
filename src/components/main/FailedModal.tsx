import { useEffect } from 'react'
import { createPortal } from 'react-dom'

type FailedModalProps = {
  companyName: string
  onClose: () => void
}

function FailedModal({ companyName, onClose }: FailedModalProps) {
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
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/30"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="w-[420px] rounded-3xl bg-white p-8 text-center shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-7xl">😔</div>

        <h2 className="mt-4 font-[Pretendard] text-3xl font-bold text-[#444]">
          불합격
        </h2>

        <p className="mt-4 font-[Pretendard] text-lg text-[#666]">
          아쉽게도{' '}
          <span className="font-bold text-[#EB5757]">{companyName}</span>{' '}
          전형에서 불합격 처리되었습니다.
        </p>

        <p className="mt-3 font-[Pretendard] text-sm text-[#888]">
          하지만 더 좋은 기회가 기다리고 있어요 🐣
        </p>

        <button
          type="button"
          onClick={onClose}
          className="mt-8 rounded-xl bg-[#C7C7CC] px-8 py-3 font-[Pretendard] font-semibold text-white transition hover:brightness-95"
        >
          확인
        </button>
      </div>
    </div>,
    document.body,
  )
}

export default FailedModal