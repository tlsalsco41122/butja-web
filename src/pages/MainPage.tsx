import SuccessModal from '../components/main/SuccessModal'
import { Menu } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  deleteApplication,
  getApplication,
  getApplications,
} from '../api/applications'
import { getApiErrorMessage } from '../api/client'
import { completeStage } from '../api/stages'
import type { JobApplicationDetail } from '../api/types'
import { getMe } from '../api/user'
import backgroundImage from '../assets/background.png'
import defaultChickImage from '../assets/default-chick.png'
import DeleteConfirmModal from '../components/main/DeleteConfirmModal'
import CompanyProgressRow from '../components/main/CompanyProgressRow'
import StageDetailModal from '../components/main/StageDetailModal'
import SideMenu from '../components/sidebar/SideMenu'
import { cheerMessages } from '../data/cheerMessages'
import type {
  CompanyProgress,
  DashboardStage,
} from '../types/companyProgress'
import { toDateInputValue } from '../utils/date'

function getRandomCheerMessage() {
  return cheerMessages[Math.floor(Math.random() * cheerMessages.length)]
}

function createInitialCheerMessages(companies: CompanyProgress[]) {
  return companies.reduce<Record<string, string>>((messages, company) => {
    messages[company.id] = getRandomCheerMessage()
    return messages
  }, {})
}

function toCompanyProgress(application: JobApplicationDetail): CompanyProgress {
  const stages =
    application.stages.length > 0
      ? application.stages
          .toSorted((first, second) => first.orderNumber - second.orderNumber)
          .map((stage) => ({
            id: String(stage.id),
            applicationId: application.id,
            stageId: stage.id,
            name: stage.name,
            memo: stage.memo,
            scheduleDate: toDateInputValue(stage.scheduledAt) || null,
            status: stage.status,
          }))
      : [
          {
            id: `application-${application.id}-empty`,
            applicationId: application.id,
            stageId: null,
            name: '지원 완료',
            memo: null,
            scheduleDate: null,
            status: null,
          },
        ]
  const currentStage =
    application.currentStage ??
    application.stages.find((stage) => stage.status === 'IN_PROGRESS') ??
    application.stages.at(-1)

  return {
    id: String(application.id),
    applicationId: application.id,
    name: application.companyName,
    jobRole: application.jobRole,
    memo: application.memo,
    currentStageId: currentStage
      ? String(currentStage.id)
      : stages.at(-1)?.id ?? stages[0].id,
    stages,
  }
}

function MainPage() {
  const navigate = useNavigate()
  const [companies, setCompanies] = useState<CompanyProgress[]>([])
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [nickname, setNickname] = useState(
    () => localStorage.getItem('nickname') ?? '신민채',
  )
  const [dashboardError, setDashboardError] = useState('')
  const [companyToDelete, setCompanyToDelete] = useState<CompanyProgress | null>(
    null,
  )
  const [isDeleting, setIsDeleting] = useState(false)
  const [selectedStage, setSelectedStage] = useState<DashboardStage | null>(null)
  const [isCompletingStage, setIsCompletingStage] = useState(false)
  const [stageActionError, setStageActionError] = useState('')
  const [companyMessages, setCompanyMessages] = useState(() =>
    createInitialCheerMessages([]),
  )
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [successCompanyName, setSuccessCompanyName] = useState('')

  const loadDashboard = async () => {
    try {
      const [user, applications] = await Promise.all([
        getMe(),
        getApplications(),
      ])
      const applicationDetails = await Promise.all(
        applications.map((application) => getApplication(application.id)),
      )
      const nextCompanies = applicationDetails.map(toCompanyProgress)

      setNickname(user.nickname)
      localStorage.setItem('nickname', user.nickname)
      setCompanies(nextCompanies)
      setCompanyMessages(createInitialCheerMessages(nextCompanies))
      setDashboardError('')
    } catch (error) {
      setDashboardError(
        getApiErrorMessage(error, '지원 내역을 불러오지 못했어요.'),
      )
    }
  }

  useEffect(() => {
    void loadDashboard()
  }, [])

  const handleStageSelect = (stage: DashboardStage) => {
    setSelectedStage(stage)
    setStageActionError('')
    const companyId = companies.find((company) =>
      company.stages.some((item) => item.id === stage.id),
    )?.id

    if (companyId) {
      setCompanyMessages((currentMessages) => ({
        ...currentMessages,
        [companyId]: getRandomCheerMessage(),
      }))
    }
  }

  const handleCompleteStage = async () => {
    if (!selectedStage?.stageId) {
      return
    }

    setIsCompletingStage(true)
    setStageActionError('')

    try {
      const selectedCompany = companies.find(
        (company) =>
          company.applicationId === selectedStage.applicationId,
      )

      const isFinalStage =
        selectedCompany?.stages.at(-1)?.id === selectedStage.id

      await completeStage(
        selectedStage.applicationId,
        selectedStage.stageId,
        true,
      )

      if (isFinalStage && selectedCompany) {
        setSuccessCompanyName(selectedCompany.name)
        setShowSuccessModal(true)
      }

      await loadDashboard()
      setSelectedStage(null)
    } catch (error) {
      setStageActionError(
        getApiErrorMessage(error, '전형 완료 처리에 실패했어요.'),
      )
    } finally {
      setIsCompletingStage(false)
    }
  }

  const handleDeleteCompany = async () => {
    if (!companyToDelete) {
      return
    }

    setIsDeleting(true)

    try {
      await deleteApplication(companyToDelete.applicationId)
      setCompanies((currentCompanies) =>
        currentCompanies.filter(
          (company) => company.applicationId !== companyToDelete.applicationId,
        ),
      )
      setCompanyToDelete(null)
    } catch (error) {
      setDashboardError(
        getApiErrorMessage(error, '지원 내역을 삭제하지 못했어요.'),
      )
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <main
      className="grid min-h-dvh bg-cover bg-[position:center_100%] px-8"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <SideMenu
        isOpen={isMenuOpen}
        nickname={nickname}
        onClose={() => setIsMenuOpen(false)}
      />
      {showSuccessModal && (
        <SuccessModal
          companyName={successCompanyName}
          onClose={() => setShowSuccessModal(false)}
        />
      )}
      {selectedStage ? (
        <StageDetailModal
          stage={selectedStage}
          isAcceptedStage={
            companies
              .flatMap((company) => company.stages)
              .find((stage) => stage.id === selectedStage.id)?.id ===
            companies
              .find((company) =>
                company.stages.some((stage) => stage.id === selectedStage.id),
              )
              ?.stages.at(-1)?.id
          }
          isCompleting={isCompletingStage}
          errorMessage={stageActionError}
          onComplete={handleCompleteStage}
          onClose={() => setSelectedStage(null)}
        />
      ) : null}
      {companyToDelete ? (
        <DeleteConfirmModal
          companyName={companyToDelete.name}
          isDeleting={isDeleting}
          onCancel={() => setCompanyToDelete(null)}
          onConfirm={handleDeleteCompany}
        />
      ) : null}
      <div className="flex h-full flex-col bg-white/10">
        <header className="shrink-0 px-6 pb-3 pt-6 md:px-10">
          <div className="mx-auto flex max-w-[1280px] items-start justify-between gap-4">
            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              aria-label="사이드 메뉴 열기"
              className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/80 text-[#444] shadow-[0_10px_24px_rgba(84,114,58,0.12)] transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#99D901]"
            >
              <Menu className="h-7 w-7" strokeWidth={2.2} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => navigate('/company/register')}
              className="rounded-lg bg-[#FFFFFF] px-6 py-2 font-[Pretendard] text-base font-medium text-black shadow-[0_10px_24px_rgba(103,205,255,0.28)] transition hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2CAEE8]"
            >
              기업 등록하기
            </button>
          </div>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-8 pt-2 md:px-10">
          <div className="mx-auto flex max-w-[1280px] flex-col gap-6">
            {dashboardError ? (
              <p className="rounded-lg bg-white/80 px-4 py-3 font-[Pretendard] text-sm font-medium text-[#EB5757]">
                {dashboardError}
              </p>
            ) : null}
            {companies.length === 0 ? (
              <section className="flex min-h-[520px] flex-col items-center justify-center rounded-2xl border border-white/60 bg-white/45 px-6 text-center shadow-[0_18px_48px_rgba(84,114,58,0.16)] backdrop-blur-md">
                <img
                  src={defaultChickImage}
                  alt=""
                  aria-hidden="true"
                  className="h-[120px] w-[120px] object-contain"
                />
                <h2 className="mt-6 font-[Pretendard] text-2xl font-bold text-[#444]">
                  아직 등록된 기업이 없습니다.
                </h2>
                <p className="mt-2 font-[Pretendard] text-base font-medium text-[#69744A]">
                  기업을 등록해보세요.
                </p>
                <button
                  type="button"
                  onClick={() => navigate('/company/register')}
                  className="mt-7 rounded-lg bg-white px-6 py-2 font-[Pretendard] text-base font-medium text-black shadow-[0_10px_24px_rgba(103,205,255,0.18)] transition hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2CAEE8]"
                >
                  기업 등록하기
                </button>
              </section>
            ) : null}
            {companies.map((company) => (
              <CompanyProgressRow
                key={company.id}
                company={company}
                cheerMessage={companyMessages[company.id]}
                onEdit={(applicationId) =>
                  navigate(`/company/${applicationId}/edit`)
                }
                onDelete={setCompanyToDelete}
                onStageSelect={handleStageSelect}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

export default MainPage