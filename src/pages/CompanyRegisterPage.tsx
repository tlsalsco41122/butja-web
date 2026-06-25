import backgroundImage from '../assets/배경.png'
import CompanyForm from '../components/company/CompanyForm'
import { useNavigate } from 'react-router-dom'

function CompanyRegisterPage() {
  const navigate = useNavigate()

  return (
    <main
      className="flex h-screen w-screen items-center justify-center bg-cover bg-[position:center_100%]"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <CompanyForm
        onCancel={() => navigate(-1)}
        onRegistered={() => navigate('/main')}
      />
    </main>
  )
}

export default CompanyRegisterPage
