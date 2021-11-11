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

const Cart = ({
  cart,
  submitCart,
  addItem,
  removeItem,
  loading,
  deliveryInfo,
  handleChangeDelivery,
}) => {
  console.log(cart)
  const { groups, total } = cart

  return (
    <Sticky>
      <Segment>
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
          content="Place an Order"
          labelPosition="left"
          icon="thumbs up outline"
          color="grey"
          style={{ marginTop: 15, width: "100%" }}
          onClick={submitCart}
          loading={loading}
          disabled={loading}
        />
      </Segment>
    </Sticky>
  )
}

export default Cart
