import { useEffect, useRef, useState } from "react"
import { Button, Image } from "semantic-ui-react"
import StoreInforField from "../../components/StoreInforField"
import ModifyStoreModal from "./RightSideBar/ModifyStoreModal"
import { useSelector } from "react-redux"
import { getShopsDetail, updateShopInfo } from "../../../api/shop.api"
import useToast from "../../hooks/useToast"
import { shortLink } from "../../shortLink/shortLink"
import { useShortenUrl } from 'react-shorten-url';
import ShareModal from "./RightSideBar/ShareModel"




const RightSideBar = () => {
  const authInfo = useSelector(store => store.auth);
  const [shopData, setShop] = useState({});
  const { toastSuccess } = useToast();
 


  useEffect(() => {
    getShopsDetail(authInfo.id).then(res => {
      setShop(res);
    })
  }, [])

  const { id } = authInfo;
  const { image, name, phoneNumber } = shopData
  const linkShop = `http://localhost:3000/store/${id}`;

  const { loading, error, data } = useShortenUrl('https://www.npmjs.com/package/react-shorten-url');
  console.log(data)
  // const linkResult =  shortLink(loading, error, data);
  


  const modalRef = useRef(null)
  const shareRef = useRef(null)
  
  const viewShopProfile = id => {
    modalRef.current.open(id)
  }


  const share = () => {
    shareRef.current.open(`http://localhost:3000/store/${id}`)
   }

  const copy = () => { }

  const link = () =>{}
 
 

  const updateProfile = async (data) => {
    data.append("PhoneNumber", authInfo.phone)

    if (data.get("NewPhoneNumber") === authInfo.phone) {
      data.delete("NewPhoneNumber");
    }

    try {
      await updateShopInfo(data);
      toastSuccess("Update Shop Infomation Successfuly")
    } catch {

    }

    getShopsDetail(authInfo.id).then(res => {
      setShop(res);
    })
  }

  return (
    <div className="admin-layout_side-bar">
      <Image
        src={`data:image/png;base64, ${image}`}
        fluid
        rounded
        onClick={viewShopProfile}
        target="_blank"
      />

        <StoreInforField
          icon="linkify"
          title="Link"
          label={linkShop}
          link={linkShop}
        ></StoreInforField>
   
      <StoreInforField icon="hashtag" title="ID" label={id}></StoreInforField>
      <StoreInforField icon="home" title="Name" label={name}></StoreInforField>
      <StoreInforField
        icon="phone"
        title="Phone Number"
        label={phoneNumber}
      ></StoreInforField>

      <Button
        basic
        content="Share"
        labelPosition="left"
        icon="share alternate"
        onClick={share}
        color="green"
        style={{ marginTop: 15, width: "100%" }}
      />

      <Button
        basic
        content="Copy Link"
        labelPosition="left"
        icon="linkify"
        onClick={copy}
        color="brown"
        style={{ marginTop: 15, width: "100%" }}
      />

      <Button
        basic
        content="Edit Profile"
        labelPosition="left"
        icon="briefcase"
        onClick={viewShopProfile}
        color="blue"
        style={{ marginTop: 15, width: "100%" }}
      />

      <ModifyStoreModal updateProfile={updateProfile} shopData={shopData} ref={modalRef}></ModifyStoreModal>
      <ShareModal ref={shareRef} />
    </div>
  )
}

export default RightSideBar
