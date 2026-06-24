import { BadgeCheck, Lock, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import AuthForm from '../components/AuthForm'

function SignupPage() {
  const navigate = useNavigate()

  return (
    <AuthForm
      title="회원가입"
      description="붙자와 함께 취업 준비를 시작해보세요."
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
          autoComplete: 'new-password',
        },
        {
          id: 'nickname',
          placeholder: '닉네임을 입력하세요',
          icon: BadgeCheck,
          autoComplete: 'nickname',
        },
      ]}
      submitText="회원가입"
      footerText="이미 계정이 있으신가요?"
      footerActionText="로그인"
      onFooterAction={() => navigate('/login')}
    />
  )
}

export default SignupPage
