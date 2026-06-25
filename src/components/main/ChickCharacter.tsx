import defaultChickImage from '../../assets/default-chick.png'
import suitedChickImage from '../../assets/business-chick.png'
import sadChickImage from '../../assets/sad-chick.png'
import SpeechBubble from './SpeechBubble'

type ChickCharacterProps = {
  isAccepted: boolean
  isFailed: boolean
  message: string
}

function ChickCharacter({ isAccepted, isFailed, message }: ChickCharacterProps) {
  const chickImage = isFailed
    ? sadChickImage
    : isAccepted
      ? suitedChickImage
      : defaultChickImage

  const chickAlt = isFailed ? '불합격한 병아리' : isAccepted ? '합격한 병아리' : '진행 중인 병아리'

  return (
    <div className="absolute -top-[82px] left-1/2 z-20 flex -translate-x-1/2 animate-[chick-hop_420ms_ease-out] flex-col items-center">
      <SpeechBubble message={message} />
      <img
        src={chickImage}
        alt={chickAlt}
        className="h-[82px] w-[82px] object-contain drop-shadow-[0_8px_12px_rgba(68,68,68,0.2)]"
      />
    </div>
  )
}

export default ChickCharacter