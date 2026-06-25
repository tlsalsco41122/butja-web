import { Menu } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getApiErrorMessage } from '../api/client'
import { getApplication, getApplications } from '../api/applications'
import { getMe } from '../api/user'
import type { JobApplicationDetail } from '../api/types'
import backgroundImage from '../assets/배경.png'
import CompanyProgressRow from '../components/main/CompanyProgressRow'
import SideMenu from '../components/sidebar/SideMenu'
import {
  cheerMessages,
  mockCompanies,
  type CompanyProgress,
} from '../data/mockCompanies'

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
            name: stage.name,
          }))
      : [{ id: `application-${application.id}-empty`, name: '지원 완료' }]
  const currentStage =
    application.currentStage ??
    application.stages.find((stage) => stage.status === 'IN_PROGRESS') ??
    application.stages.at(-1)

  return {
    id: String(application.id),
    name: application.companyName,
    currentStageId: currentStage
      ? String(currentStage.id)
      : stages.at(-1)?.id ?? stages[0].id,
    stages,
  }
}

function MainPage() {
  const navigate = useNavigate()
  const [companies, setCompanies] = useState(mockCompanies)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [nickname, setNickname] = useState(
    () => localStorage.getItem('nickname') ?? '신민채',
  )
  const [dashboardError, setDashboardError] = useState('')
  const [companyMessages, setCompanyMessages] = useState(() =>
    createInitialCheerMessages(mockCompanies),
  )

  useEffect(() => {
    let isMounted = true

    async function loadDashboard() {
      try {
        const [user, applications] = await Promise.all([
          getMe(),
          getApplications(),
        ])
        const applicationDetails = await Promise.all(
          applications.map((application) => getApplication(application.id)),
        )
        const nextCompanies = applicationDetails.map(toCompanyProgress)

        if (!isMounted) {
          return
        }

        setNickname(user.nickname)
        localStorage.setItem('nickname', user.nickname)
        setCompanies(nextCompanies.length > 0 ? nextCompanies : mockCompanies)
        setCompanyMessages(
          createInitialCheerMessages(
            nextCompanies.length > 0 ? nextCompanies : mockCompanies,
          ),
        )
        setDashboardError('')
      } catch (error) {
        if (!isMounted) {
          return
        }

        setDashboardError(
          getApiErrorMessage(error, '지원 내역을 불러오지 못했어요.'),
        )
      }
    }

    void loadDashboard()

    return () => {
      isMounted = false
    }
  }, [])

  const handleStageChange = (companyId: string, stageId: string) => {
    setCompanies((currentCompanies) =>
      currentCompanies.map((company) =>
        company.id === companyId
          ? { ...company, currentStageId: stageId }
          : company,
      ),
    )

    setCompanyMessages((currentMessages) => ({
      ...currentMessages,
      [companyId]: getRandomCheerMessage(),
    }))
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
            {companies.map((company) => (
              <CompanyProgressRow
                key={company.id}
                company={company}
                cheerMessage={companyMessages[company.id]}
                onStageChange={handleStageChange}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

export default MainPage
