import { useNavigate } from 'react-router-dom'
import CompanyForm from '../components/company/CompanyForm'
import backgroundImage from '../assets/배경.png'


function CompanyRegisterPage() {
  const navigate = useNavigate()

  return (
    <main
      className="flex h-screen w-screen items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <CompanyForm onCancel={() => navigate(-1)} />
    </main>
  )
}

export default CompanyRegisterPage
