import { useEffect, useState } from "react"
import { getShops } from "../../api/shop.api";
import StoreList from "../components/StoreList"

const DashboardGuest = () => {
  const [stores, setStores] = useState([])

  //load store
  useEffect(() => {
    const fetchStores = async () => {
      try {
        const res = await getShops();
        setStores(res);
      } catch {

      }
    }

    fetchStores();
  }, [])

  return (
    <>
      <div className="store-search"></div>
      <div className="store-list">
        {stores && <StoreList stores={stores}></StoreList>}
      </div>
    </>
  )
}

export default DashboardGuest
