import type {
  CompanyProgress,
  DashboardStage,
} from '../../types/companyProgress'
import { getCompanyBuildingImage } from '../../utils/companyBuilding'
import StageNode from './StageNode'

type CompanyProgressRowProps = {
  company: CompanyProgress
  cheerMessage: string
  onEdit: (applicationId: number) => void
  onDelete: (company: CompanyProgress) => void
  onStageSelect: (stage: DashboardStage) => void
}

function CompanyProgressRow({
  company,
  cheerMessage,
  onEdit,
  onDelete,
  onStageSelect,
}: CompanyProgressRowProps) {
  const acceptedStage = company.stages.at(-1)
  const isCompanyAccepted = company.currentStageId === acceptedStage?.id
  const failedStage = company.stages.find((stage) => stage.status === 'FAILED')
  const isFailed = !!failedStage
  const buildingImage = getCompanyBuildingImage(company.id)

  return (
    <section
      className={[
        'rounded-2xl border border-white/60 bg-white/45 px-5 py-5 shadow-[0_18px_48px_rgba(84,114,58,0.16)] backdrop-blur-md',
        isFailed ? 'opacity-70 grayscale' : '',
      ].join(' ')}
    >
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <h2 className="font-[Pretendard] text-2xl font-bold leading-normal text-[#444]">
            {company.name}
          </h2>
          <p
            className={`font-[Pretendard] text-sm font-medium ${
              isFailed ? 'text-[#EB5757]' : 'text-[#69744A]'
            }`}
          >
            {company.jobRole} ·{' '}
            {isFailed
              ? '불합격'
              : isCompanyAccepted
                ? '최종 합격 완료'
                : '전형 진행 중'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-white/80 px-3 py-1 font-[Pretendard] text-xs font-semibold text-[#69744A]">
            {company.stages.length} stages
          </span>
          <button
            type="button"
            onClick={() => onEdit(company.applicationId)}
            className="rounded-lg bg-white/80 px-3 py-1.5 font-[Pretendard] text-xs font-semibold text-[#444] transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#67CDFF]"
          >
            수정하기
          </button>
          <button
            type="button"
            onClick={() => onDelete(company)}
            className="rounded-lg bg-white/80 px-3 py-1.5 font-[Pretendard] text-xs font-semibold text-[#EB5757] transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EB5757]"
          >
            삭제하기
          </button>
        </div>
      </div>

      <div className="overflow-x-auto scroll-smooth pb-4 pt-[164px] [scrollbar-color:#B9E556_transparent]">
        <div className="flex min-w-max items-end gap-5">
          {company.stages.map((stage) => (
            <StageNode
              key={stage.id}
              stage={stage}
              isCurrent={stage.id === company.currentStageId}
              isAcceptedStage={stage.id === acceptedStage?.id}
              isCompanyAccepted={isCompanyAccepted}
              buildingImage={buildingImage}
              cheerMessage={cheerMessage}
              onSelect={onStageSelect}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default CompanyProgressRow