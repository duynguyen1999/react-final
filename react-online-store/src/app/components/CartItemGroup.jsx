import { Container, Grid, Header, Segment } from "semantic-ui-react"
import CartItem from "./CartItem"

const CartItemGroup = ({ group, addToCart, removeFromCart, deliveryInfo, handleChangeDelivery }) => {
  const { name, items } = group
  return (
    <Segment raised>
      <Header size={"large"}>{name}</Header>
      <Header size={"small"}>delivery: <input value={deliveryInfo} onChange={handleChangeDelivery} /></Header>
      <Header size={"small"}></Header>
      <Container>
        <Grid>
          {items &&
            items.map(item => (
              <CartItem key={item.itemId} item={item} addToCart={addToCart} removeFromCart={removeFromCart}></CartItem>
            ))}
        </Grid>
      </Container>
    </Segment>
  )
}

export default CartItemGroup
