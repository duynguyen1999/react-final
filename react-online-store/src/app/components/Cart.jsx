import { useRef } from "react";
import {
  Button,
  Divider,
  Header,
  Label,
  Segment,
  Sticky,
} from "semantic-ui-react"
import CartUser from "./CartUser"
import { formatCurrency } from "./../helpers/number-helper"
import ShareModal from "./ShareModal"

const Cart = ({
  cart,
  submitCart,
  addItem,
  removeItem,
  loading,
  deliveryInfo,
  handleChangeDelivery,
  cartIdHandler,
  cartId
}) => {

  const shareRef = useRef(null)
  const shareCart = async () =>{
    await cartIdHandler();
    if(cartId !== undefined){
      shareRef.current.open(`http://localhost:3000/cart/${cartId}`)
    }else{
      await cartIdHandler();
    } 
  }
  const { groups, total } = cart

  return (
    <Sticky>
      <Segment basic>
        <Header>Your Order</Header>
        {groups &&
          Object.keys(groups).map(k => (
            <CartUser
              key={k}
              group={groups[k]}
              addItem={addItem}
              removeItem={removeItem}
              deliveryInfo={deliveryInfo}
              handleChangeDelivery={handleChangeDelivery}
            ></CartUser>
          ))}
        <Divider />
        <Header as="h5">
          Total
          <Label horizontal style={{ float: "right" }}>
            {formatCurrency(total || 0)}
          </Label>
        </Header>
        <Button
            content="Share"
            labelPosition="left"
            icon="share alternate"
            color="green"
            onClick={()=>shareCart()}
            style={{ marginTop: 15, width: "100%" }}
          />
        <Button
          content="Place an Order"
          labelPosition="left"
          icon="thumbs up outline"
          color="green"
          style={{ marginTop: 15, width: "100%" }}
          onClick={submitCart}
          loading={loading}
          disabled={loading}
        />
      </Segment>
      <ShareModal ref={shareRef} />
    </Sticky>  
  )
}

export default Cart
