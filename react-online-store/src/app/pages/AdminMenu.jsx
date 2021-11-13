import StoreMenu from "../components/StoreMenu"
import AdminSubHeader from "../components/AdminSubHeader"
import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import useHttp from "../hooks/useHttp"
import {
  createShopItem,
  getShopsDetail,
  updateShopItem,
  deleteShopItem,
} from "../api/shop.api"
import useToast from "../hooks/useToast"
import AdminProfileSection from "../components/AdminProfileSection"
import { Divider } from "semantic-ui-react"
import AdminMenuItemModal from "../components/AdminMenuItemModal"

const AdminMenu = () => {

  const [menuItems, setMenu] = useState([])
  const modalRef = useRef(null)
  const authInfo = useSelector(state => state.auth)
  const { status, data, sendRequest } = useHttp(getShopsDetail, true)
  const { toastSuccess } = useToast()

  useEffect(() => {
    reloadMenu()
  }, [])

  useEffect(() => {
    if (status === "completed") {
      setMenu(data.items)
    }
  }, [status, data])

  const viewOrder = id => {
    const item = menuItems.find(i => i.itemId === id)

    modalRef.current.open(item)
  }

  const addItem = () => {
    modalRef.current.open()
  }

  const saveItem = async data => {
    data.append("ShopId", authInfo.id)

    try {
      if (!data.get("ItemId")) {
        await createShopItem(data)
        toastSuccess("Create Item successfully")
      } else {
        await updateShopItem(data)
        toastSuccess("Update Item successfully")
      }
    } catch { }

    sendRequest(authInfo.id)
  }

  const deleteItem = async itemId => {
    const data = {
      shopId: authInfo.id,
      itemId: itemId,
    }
    const res = await deleteShopItem(data)
    if (res.status == 200) {
      toastSuccess("Delete Item successfully")
    } else {
      alert("can't remove Item because was order")
    }
  }
  const reloadMenu = () => {
    sendRequest(authInfo.id)
  }

  return (
    <>
      <AdminProfileSection />
      <Divider />

      <AdminSubHeader
        title="View Menu"
        addItem={() => addItem()}
      ></AdminSubHeader>
      {menuItems && (
        <StoreMenu
          itemCount={5}
          items={menuItems}
          viewOrder={viewOrder}
          deleteItem={deleteItem}
        ></StoreMenu>
      )}

      <AdminMenuItemModal
        ref={modalRef}
        onSaveItem={saveItem}
      ></AdminMenuItemModal>
    </>
  )
}

export default AdminMenu
