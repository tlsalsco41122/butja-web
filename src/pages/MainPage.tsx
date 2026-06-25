import { Menu } from 'lucide-react'
import { useState } from 'react'
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

function MainPage() {
  const [companies, setCompanies] = useState(mockCompanies)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [companyMessages, setCompanyMessages] = useState(() =>
    createInitialCheerMessages(mockCompanies),
  )
  const nickname = localStorage.getItem('nickname') ?? '신민채'

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
          <div className="mx-auto flex max-w-[1280px] items-start gap-4">
            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              aria-label="사이드 메뉴 열기"
              className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/80 text-[#444] shadow-[0_10px_24px_rgba(84,114,58,0.12)] transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#99D901]"
            >
              <Menu className="h-7 w-7" strokeWidth={2.2} aria-hidden="true" />
            </button>
            <div className="flex flex-col gap-2">
              <p className="font-[Pretendard] text-sm font-bold text-[#6F8F16]">
                Butja Dashboard
              </p>
              <h1 className="font-[Pretendard] text-[32px] font-extrabold leading-tight text-[#444] md:text-[44px]">
                합격까지 가는 나의 전형 맵
              </h1>
            </div>
          </div>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-8 pt-2 md:px-10">
          <div className="mx-auto flex max-w-[1280px] flex-col gap-6">
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
