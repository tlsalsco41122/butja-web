import { useNavigate } from 'react-router-dom'
import AuthForm from '../components/AuthForm'

function SignupPage() {
  const navigate = useNavigate()

  return (
    <AuthForm
      title="회원가입"
      description="붙자와 함께 취업 준비를 시작해보세요."
      fields={[
        { id: 'username', label: '아이디', autoComplete: 'username' },
        {
          id: 'password',
          label: '비밀번호',
          type: 'password',
          autoComplete: 'new-password',
        },
        { id: 'nickname', label: '닉네임', autoComplete: 'nickname' },
      ]}
      submitText="회원가입"
      footerText="이미 계정이 있으신가요?"
      footerActionText="로그인"
      onFooterAction={() => navigate('/login')}
    />
  )
}

export default SignupPage
