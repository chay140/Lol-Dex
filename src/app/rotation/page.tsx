import { fetchChampionRotation } from "../api/rotation/route"

const RotationPage = () => {

  fetchChampionRotation();

  return (
    <div>
      RotationPage
    </div>
  )
}

export default RotationPage
