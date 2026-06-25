import grassImage from '../../assets/잔디.png'
import ChickCharacter from './ChickCharacter'

type StageNodeProps = {
  name: string
  isCurrent: boolean
  isAcceptedStage: boolean
  isCompanyAccepted: boolean
  buildingImage: string
  cheerMessage: string
  onSelect: () => void
}

function StageNode({
  name,
  isCurrent,
  isAcceptedStage,
  isCompanyAccepted,
  buildingImage,
  cheerMessage,
  onSelect,
}: StageNodeProps) {
  return (
    <div className="relative flex w-[200px] shrink-0 flex-col items-center">
      {isCurrent ? (
        <ChickCharacter isAccepted={isCompanyAccepted} message={cheerMessage} />
      ) : null}

      {isAcceptedStage ? (
        <img
          src={buildingImage}
          alt=""
          aria-hidden="true"
          className="absolute -top-[118px] left-1/2 z-10 h-[118px] max-w-[150px] -translate-x-1/2 object-contain drop-shadow-[0_10px_16px_rgba(68,68,68,0.2)]"
        />
      ) : null}

      <button
        type="button"
        onClick={onSelect}
        className={[
          'relative flex h-10 w-[200px] items-center justify-center rounded-lg border-[5px] border-[#C6F849] bg-cover bg-center px-4 text-center font-[Pretendard] text-[15px] font-bold leading-none text-[#3F4B21] shadow-[0_6px_0_rgba(94,132,21,0.18)] transition duration-300 hover:-translate-y-1 hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#67CDFF]',
          isCurrent
            ? 'ring-4 ring-[#67CDFF]/70 ring-offset-4 ring-offset-white/30'
            : '',
        ].join(' ')}
        style={{ backgroundImage: `url(${grassImage})` }}
      >
        {name}
      </button>
    </div>
  )
}

export default StageNode
