import { Lock, User } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAuthErrorMessage, signin } from '../api/auth'
import AuthForm from '../components/AuthForm'

function LoginPage() {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSignin = async (values: Record<string, string>) => {
    setIsSubmitting(true)
    setErrorMessage('')

    try {
      const response = await signin({
        username: values.username,
        password: values.password,
      })

      localStorage.setItem('accessToken', response.data.accessToken)
      localStorage.setItem('refreshToken', response.data.refreshToken)
      navigate('/')
    } catch (error) {
      setErrorMessage(getAuthErrorMessage(error, '로그인 중 문제가 발생했어요.'))
    } finally {
      setIsSubmitting(false)
    }
  }

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
      submittingText="로그인 중..."
      isSubmitting={isSubmitting}
      errorMessage={errorMessage}
      footerText="계정이 없으신가요?"
      footerActionText="회원가입"
      onSubmit={handleSignin}
      onFooterAction={() => navigate('/signup')}
    />
  )
}

export default LoginPage
