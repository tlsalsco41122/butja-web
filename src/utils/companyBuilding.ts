import company1Image from '../assets/회사1.png'
import company2Image from '../assets/회사2.png'
import company3Image from '../assets/회사3.png'
import company4Image from '../assets/회사4.png'
import company5Image from '../assets/회사5.png'

const companyBuildingImages = [
  company1Image,
  company2Image,
  company3Image,
  company4Image,
  company5Image,
]

function hashCompanyId(companyId: string) {
  return [...companyId].reduce((hash, character) => {
    return hash + character.charCodeAt(0)
  }, 0)
}

export function getCompanyBuildingImage(companyId: string) {
  const imageIndex = hashCompanyId(companyId) % companyBuildingImages.length

  return companyBuildingImages[imageIndex]
}
