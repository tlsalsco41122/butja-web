import backgroundImage from '../assets/background.png'
import CompanyForm from '../components/company/CompanyForm'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getApplication } from '../api/applications'
import { getApiErrorMessage } from '../api/client'
import type { JobApplicationDetail } from '../api/types'

function CompanyRegisterPage() {
  const navigate = useNavigate()
  const { applicationId } = useParams()
  const [application, setApplication] = useState<JobApplicationDetail | null>(
    null,
  )
  const [errorMessage, setErrorMessage] = useState('')
  const isEditMode = Boolean(applicationId)

  useEffect(() => {
    if (!applicationId) {
      return undefined
    }

    let isMounted = true

    async function loadApplication() {
      try {
        const applicationDetail = await getApplication(Number(applicationId))

        if (isMounted) {
          setApplication(applicationDetail)
          setErrorMessage('')
        }
      } catch (error) {
        if (isMounted) {
          setErrorMessage(
            getApiErrorMessage(error, '기업 정보를 불러오지 못했어요.'),
          )
        }
      }
    }

    void loadApplication()

    return () => {
      isMounted = false
    }
  }, [applicationId])

  return (
    <main
      className="flex h-screen w-screen items-center justify-center bg-cover bg-[position:center_100%]"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {errorMessage ? (
        <div className="rounded-[20px] border border-black bg-white px-10 py-8 text-center">
          <p className="font-[Pretendard] text-base font-medium text-[#EB5757]">
            {errorMessage}
          </p>
          <button
            type="button"
            onClick={() => navigate('/main')}
            className="mt-5 rounded-lg bg-[#67CDFF] px-6 py-2 font-[Pretendard] text-base font-medium text-white"
          >
            메인으로 돌아가기
          </button>
        </div>
      ) : null}
      {!errorMessage && (!isEditMode || application) ? (
        <CompanyForm
          initialApplication={application ?? undefined}
          onCancel={() => navigate(-1)}
          onRegistered={() => navigate('/main')}
        />
      ) : null}
    </main>
  )
}

export default CompanyRegisterPage
