import { CheckCircle2, X } from 'lucide-react'

type ToastProps = {
  message: string
  onClose: () => void
}

function Toast({ message, onClose }: ToastProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed left-1/2 top-6 z-50 flex w-[calc(100%-2rem)] max-w-[420px] -translate-x-1/2 items-start gap-3 rounded-2xl border border-[#BFECCF] bg-white px-4 py-3 shadow-[0_20px_60px_rgba(23,43,77,0.16)]"
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EAF8EE] text-[#24A148]">
        <CheckCircle2 className="h-5 w-5" aria-hidden="true" strokeWidth={2.2} />
      </div>

      <div className="min-w-0 flex-1 pt-0.5">
        <p className="font-[Pretendard] text-sm font-medium leading-5 text-[#2D3748]">
          {message}
        </p>
      </div>

      <button
        type="button"
        onClick={onClose}
        aria-label="알림 닫기"
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#8A94A6] transition hover:bg-[#F4F6F8] hover:text-[#2D3748] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24A148]"
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  )
}

export default Toast
