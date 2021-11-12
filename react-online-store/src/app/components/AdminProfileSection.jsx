import { useEffect, useRef, useState } from "react"
import { Button, Grid, Image, Segment } from "semantic-ui-react"
import { useSelector } from "react-redux"
import { useShortenUrl } from "react-shorten-url"
import StoreInformationLabel from "./StoreInformationLabel"
import useToast from "./../hooks/useToast"
import { getShopsDetail } from "../../api/shop.api"
import { updateShopInfo } from "./../../api/shop.api"
import ShareModal from "./ShareModal"
import StoreProfileModal from "./StoreProfileModal"

const AdminProfileSection = () => {
  const authInfo = useSelector(store => store.auth)
  const [shopData, setShop] = useState({})
  const { toastSuccess } = useToast()

  useEffect(() => {
    getShopsDetail(authInfo.id).then(res => {
      setShop(res)
    })
  }, [])

  const { id } = authInfo
  const { image, name, phoneNumber } = shopData
  const linkShop = `http://localhost:3000/store/${id}`

  const { loading, error, data } = useShortenUrl(
    "https://www.npmjs.com/package/react-shorten-url"
  )
  // const linkResult =  shortLink(loading, error, data);

  const modalRef = useRef(null)
  const shareRef = useRef(null)

  const viewShopProfile = id => {
    modalRef.current.open(id)
  }

  const share = () => {
    shareRef.current.open(`http://localhost:3000/store/${id}`)
  }

  const updateProfile = async data => {
    data.append("PhoneNumber", authInfo.phone)

    if (data.get("NewPhoneNumber") === authInfo.phone) {
      data.delete("NewPhoneNumber")
    }

    try {
      await updateShopInfo(data)
      toastSuccess("Update Shop Infomation Successfuly")
    } catch { }

    getShopsDetail(authInfo.id).then(res => {
      setShop(res)
    })
  }

  return (
    <>
      <Grid columns={3}>
        <Grid.Column>
          <Button
            content="Share"
            labelPosition="left"
            icon="share alternate"
            onClick={share}
            color="green"
            style={{ marginTop: 15, width: "100%" }}
          />
        </Grid.Column>
        <Grid.Column>
          <Button
            content="Copy Link"
            labelPosition="left"
            icon="linkify"
            color="brown"
            style={{ marginTop: 15, width: "100%" }}
          />
        </Grid.Column>
        <Grid.Column>
          <Button
            content="Profile Setting"
            labelPosition="left"
            icon="briefcase"
            onClick={viewShopProfile}
            color="blue"
            style={{ marginTop: 15, width: "100%" }}
          />
        </Grid.Column>
        <Grid.Column>
          <StoreInformationLabel
            icon="hashtag"
            title="ID"
            label={id}
          ></StoreInformationLabel>
        </Grid.Column>
        <Grid.Column>
          <StoreInformationLabel
            icon="home"
            title="Name"
            label={name}
          ></StoreInformationLabel>
        </Grid.Column>
        <Grid.Column>
          <StoreInformationLabel
            icon="phone"
            title="Phone Number"
            label={phoneNumber}
          ></StoreInformationLabel>
        </Grid.Column>
      </Grid>

      <StoreProfileModal
        updateProfile={updateProfile}
        shopData={shopData}
        ref={modalRef}
      ></StoreProfileModal>
      <ShareModal ref={shareRef} />
    </>
  )
}

export default AdminProfileSection
