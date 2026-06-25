import type { CompanyProgress } from '../../data/mockCompanies'
import { getCompanyBuildingImage } from '../../utils/companyBuilding'
import StageNode from './StageNode'

type CompanyProgressRowProps = {
  company: CompanyProgress
  cheerMessage: string
  onStageChange: (companyId: string, stageId: string) => void
}

function CompanyProgressRow({
  company,
  cheerMessage,
  onStageChange,
}: CompanyProgressRowProps) {
  const acceptedStage = company.stages.at(-1)
  const isCompanyAccepted = company.currentStageId === acceptedStage?.id
  const buildingImage = getCompanyBuildingImage(company.id)

  return (
    <section className="rounded-2xl border border-white/60 bg-white/45 px-5 py-5 shadow-[0_18px_48px_rgba(84,114,58,0.16)] backdrop-blur-md">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <h2 className="font-[Pretendard] text-2xl font-bold leading-normal text-[#444]">
            {company.name}
          </h2>
          <p className="font-[Pretendard] text-sm font-medium text-[#69744A]">
            {isCompanyAccepted ? '최종 합격 완료' : '전형 진행 중'}
          </p>
        </div>
        <span className="rounded-full bg-white/80 px-3 py-1 font-[Pretendard] text-xs font-semibold text-[#69744A]">
          {company.stages.length} stages
        </span>
      </div>

      <div className="overflow-x-auto scroll-smooth pb-4 pt-[164px] [scrollbar-color:#B9E556_transparent]">
        <div className="flex min-w-max items-end gap-5">
          {company.stages.map((stage) => (
            <StageNode
              key={stage.id}
              name={stage.name}
              isCurrent={stage.id === company.currentStageId}
              isAcceptedStage={stage.id === acceptedStage?.id}
              isCompanyAccepted={isCompanyAccepted}
              buildingImage={buildingImage}
              cheerMessage={cheerMessage}
              onSelect={() => onStageChange(company.id, stage.id)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default CompanyProgressRow
