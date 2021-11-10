import { Button, Divider, Header, Label, List } from "semantic-ui-react"
import CartItemGroup from "./CartItemGroup"
import { formatCurrency, formatPercentage } from "./../helpers/number-helper"

const Cart = ({ cart, submitCart, addToCart, removeFromCart, loading, deliveryInfo, handleChangeDelivery }) => {
  const { groups, subtotal, discount, total } = cart

  return (
    <>
      <Header>Cart</Header>

      <List divided selection>
        <List.Item>
          Sub-total
          <Label horizontal style={{ float: "right" }}>
            {formatCurrency(subtotal || 0)}
          </Label>
        </List.Item>
        <List.Item>
          Discount
          <Label horizontal style={{ float: "right" }}>
            {formatPercentage(discount * 100 || 0)}
          </Label>
        </List.Item>
        <List.Item className="total">
          Total
          <Label horizontal style={{ float: "right" }}>
            {formatCurrency(total || 0)}
          </Label>
        </List.Item>
      </List>
      <Button
        basic
        content="Place an Order"
        labelPosition="left"
        icon="thumbs up outline"
        color="green"
        style={{ marginTop: 15, width: "100%" }}
        onClick={submitCart}
        loading={loading}
        disabled={loading}
      />
      <Divider></Divider>
      {groups &&
        Object.keys(groups).map(k => (
          <CartItemGroup
            key={k}
            group={groups[k]}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            deliveryInfo={deliveryInfo}
            handleChangeDelivery={handleChangeDelivery}
          ></CartItemGroup>
        ))}
    </>
  )
}

export default Cart
