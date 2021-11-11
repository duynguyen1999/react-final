import { Container, Header, Item, Label, Segment } from "semantic-ui-react"
import CartItem from "./CartItem"

const CartUser = ({ group, addItem, removeItem }) => {
  const { name, items } = group
  return (
    <Segment>
      <Label
        content={name}
        icon="shopping cart"
        color="black"
        style={{ width: "100%", marginBottom: "10px" }}
      />
      <Header size={"small"} color="grey"></Header>
      <Container>
        <Item.Group>
          {items &&
            items.map(item => (
              <CartItem
                key={item.itemId}
                item={item}
                addItem={addItem}
                removeItem={removeItem}
              ></CartItem>
            ))}
        </Item.Group>
      </Container>
    </Segment>
  )
}

export default CartUser
