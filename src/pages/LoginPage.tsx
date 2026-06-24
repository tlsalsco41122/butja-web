import { Lock, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import AuthForm from '../components/AuthForm'

function LoginPage() {
  const navigate = useNavigate()

  return (
    <AuthForm
      title="로그인"
      description="붙자에 로그인하고 취업 준비를 이어가세요."
      fields={[
        {
          id: 'username',
          placeholder: '아이디를 입력하세요',
          icon: User,
          autoComplete: 'username',
        },
        {
          id: 'password',
          placeholder: '비밀번호를 입력하세요',
          icon: Lock,
          type: 'password',
          autoComplete: 'current-password',
        },
      ]}
      submitText="로그인"
      footerText="계정이 없으신가요?"
      footerActionText="회원가입"
      onFooterAction={() => navigate('/signup')}
    />
  )
}

export default LoginPage
