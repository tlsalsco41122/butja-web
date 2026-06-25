type SpeechBubbleProps = {
  message: string
}

function SpeechBubble({ message }: SpeechBubbleProps) {
  return (
    <div className="pointer-events-none absolute bottom-[74px] left-1/2 z-20 w-max max-w-[190px] -translate-x-1/2 animate-[bubble-pop_360ms_ease-out] rounded-lg border border-[#DDEBB2] bg-white/95 px-3 py-2 text-center font-[Pretendard] text-[13px] font-semibold leading-5 text-[#444] shadow-[0_10px_24px_rgba(68,68,68,0.16)]">
      {message}
      <span className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-b border-r border-[#DDEBB2] bg-white/95" />
    </div>
  )
}

export default SpeechBubble
