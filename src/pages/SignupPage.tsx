import { BadgeCheck, Lock, User } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAuthErrorMessage, signup } from '../api/auth'
import AuthForm from '../components/AuthForm'
import Toast from '../components/Toast'

function SignupPage() {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const handleSignup = async (values: Record<string, string>) => {
    setIsSubmitting(true)
    setErrorMessage('')
    setSuccessMessage('')

    try {
      const response = await signup({
        username: values.username,
        password: values.password,
        nickname: values.nickname,
      })

      setSuccessMessage(response.message || '회원가입이 완료되었어요.')
    } catch (error) {
      setErrorMessage(
        getAuthErrorMessage(error, '회원가입 중 문제가 발생했어요.'),
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    if (!successMessage) {
      return undefined
    }

    const timeoutId = window.setTimeout(() => {
      navigate('/login')
    }, 1400)

    return () => window.clearTimeout(timeoutId)
  }, [navigate, successMessage])

  return (
    <>
      {successMessage ? (
        <Toast message={successMessage} onClose={() => setSuccessMessage('')} />
      ) : null}
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
        submittingText="회원가입 중..."
        isSubmitting={isSubmitting}
        errorMessage={errorMessage}
        footerText="이미 계정이 있으신가요?"
        footerActionText="로그인"
        onSubmit={handleSignup}
        onFooterAction={() => navigate('/login')}
      />
    </>
  )
}

export default SignupPage
