import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import profileImage from '../../assets/profile.png'

type SideMenuProps = {
  isOpen: boolean
  nickname: string
  onClose: () => void
}

function Divider() {
  return <div className="h-px w-[216px] bg-[#EDEDED]" />
}

function SideMenu({ isOpen, nickname, onClose }: SideMenuProps) {
  const navigate = useNavigate()

  const handleEditProfile = () => {
    // TODO: 내 정보 수정 페이지가 생기면 연결합니다.
  }

  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    navigate('/login')
  }

  const handleDeleteAccount = () => {
    // TODO: 회원탈퇴 API가 준비되면 연결합니다.
  }

  return (
    <aside
      className={[
        'fixed left-0 top-0 z-50 flex h-screen w-[300px] flex-col items-center border-r border-[#EDEDED] bg-white transition-transform duration-300 ease-out',
        isOpen ? 'translate-x-0' : '-translate-x-full',
      ].join(' ')}
      aria-hidden={!isOpen}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="사이드 메뉴 닫기"
        className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full text-black transition hover:bg-[#F7F7F7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#99D901]"
      >
        <ArrowLeft className="h-6 w-6" strokeWidth={2} aria-hidden="true" />
      </button>

      <div className="mt-[82px] w-[216px]">
        <p className="whitespace-pre-line text-left font-[Pretendard] text-xl font-semibold leading-[26px] text-black">
          {`${nickname}님,\n항상 응원합니다.`}
        </p>
      </div>

      <div className="mt-10">
        <Divider />
      </div>

      <div className="mt-[42px] flex flex-col items-center">
        <img
          src={profileImage}
          alt={`${nickname} 프로필`}
          className="h-[104px] w-[104px] rounded-full object-cover"
        />
        <p className="mt-4 text-center font-[Pretendard] text-xl font-semibold text-black">
          {nickname}
        </p>
      </div>

      <div className="mt-[42px]">
        <Divider />
      </div>

      <nav className="mt-[30px] flex flex-col items-center gap-[10px]">
        <button
          type="button"
          onClick={handleEditProfile}
          className="font-[Pretendard] text-sm font-medium text-black transition hover:opacity-70 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#99D901]"
        >
          내 정보 수정
        </button>
        <button
          type="button"
          onClick={handleLogout}
          className="font-[Pretendard] text-sm font-medium text-[#EB5757] transition hover:opacity-70 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EB5757]"
        >
          로그아웃
        </button>
        <button
          type="button"
          onClick={handleDeleteAccount}
          className="font-[Pretendard] text-sm font-medium text-[#828282] transition hover:opacity-70 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#828282]"
        >
          회원탈퇴
        </button>
      </nav>
    </aside>
  )
}

export default SideMenu
