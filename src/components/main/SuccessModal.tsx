import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use'

type SuccessModalProps = {
  companyName: string
  onClose: () => void
}

function SuccessModal({
  companyName,
  onClose,
}: SuccessModalProps) {
  const { width, height } = useWindowSize()

  return (
    <>
      <Confetti
        width={width}
        height={height}
        recycle={false}
        numberOfPieces={600}
        gravity={0.18}
      />

      <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/30">
        <div className="w-[420px] rounded-3xl bg-white p-8 text-center shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
          <div className="text-7xl">🎉</div>

          <h2 className="mt-4 font-[Pretendard] text-3xl font-bold text-[#444]">
            최종 합격!
          </h2>

          <p className="mt-4 font-[Pretendard] text-lg text-[#666]">
            <span className="font-bold text-[#67A629]">
              {companyName}
            </span>
            에 최종 합격했어요!
          </p>

          <p className="mt-3 font-[Pretendard] text-sm text-[#888]">
            지금까지 정말 고생 많았어요 🐥
          </p>

          <button
            type="button"
            onClick={onClose}
            className="mt-8 rounded-xl bg-[#67CDFF] px-8 py-3 font-[Pretendard] font-semibold text-white transition hover:brightness-95"
          >
            확인
          </button>
        </div>
      </div>
    </>
  )
}

export default SuccessModal