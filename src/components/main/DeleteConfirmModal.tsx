import { createPortal } from 'react-dom'

type DeleteConfirmModalProps = {
  companyName: string
  isDeleting: boolean
  onCancel: () => void
  onConfirm: () => void
}

function DeleteConfirmModal({
  companyName,
  isDeleting,
  onCancel,
  onConfirm,
}: DeleteConfirmModalProps) {
  return createPortal(
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/20"
      onClick={onCancel}
      role="presentation"
    >
      <section
        className="animate-[bubble-pop_220ms_ease-out] rounded-2xl bg-white px-8 py-7 shadow-[0_24px_70px_rgba(68,68,68,0.22)]"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 className="font-[Pretendard] text-xl font-bold text-[#444]">
          정말 삭제하시겠습니까?
        </h2>
        <p className="mt-2 font-[Pretendard] text-sm font-medium text-[#828282]">
          {companyName} 지원 내역과 전형 단계가 함께 삭제됩니다.
        </p>
        <div className="mt-7 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={isDeleting}
            className="rounded-lg bg-[#C7C7CC] px-6 py-2 font-[Pretendard] text-base font-medium text-white transition hover:brightness-95 disabled:opacity-60"
          >
            취소
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="rounded-lg bg-[#EB5757] px-6 py-2 font-[Pretendard] text-base font-medium text-white transition hover:brightness-95 disabled:opacity-60"
          >
            {isDeleting ? '삭제 중...' : '삭제'}
          </button>
        </div>
      </section>
    </div>,
    document.body,
  )
}

export default DeleteConfirmModal
