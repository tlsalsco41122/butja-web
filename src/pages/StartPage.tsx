import { useNavigate } from 'react-router-dom'
import backgroundImage from '../assets/background.png'
import chickImage from '../assets/default-chick.png'

function StartPage() {
  const navigate = useNavigate()

  return (
    <main
      className="grid min-h-dvh bg-cover bg-[position:center_100%] px-8"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <section className="col-start-1 row-start-1 flex w-full flex-col items-center justify-center text-center">
        <h1 className='max-w-[980px] text-center font-["KCC-Murukmuruk"] text-[clamp(30px,5vw,48px)] font-normal leading-[1.5] tracking-[0.02em] text-[#444] [text-wrap:balance]'>
          붙자는 여러분이 합격하는<br></br>순간까지 함께할게요.
        </h1>
        <button
          type="button"
          onClick={() => navigate('/signup')}
          className="mt-5 flex h-[50px] w-[200px] items-center justify-center gap-[10px] rounded-lg bg-[#99D901] px-6 py-2 font-[Pretendard] text-base font-medium leading-normal text-white transition hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6fa000]"
        >
          시작하기
        </button>
      </section>

      <img
        src={chickImage}
        alt="붙자 병아리"
        className="col-start-1 row-start-1 mb-5 w-[clamp(150px,24vw,260px)] self-end justify-self-center object-contain"
      />
    </main>
  )
}

export default StartPage
