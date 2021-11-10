import { Grid, Header, Icon } from "semantic-ui-react"
import { formatCurrency } from "./../helpers/number-helper"

const CartItem = ({ item, addToCart, removeFromCart }) => {
  const { itemName, price, amount, note, itemId } = item
  return (
    <Grid.Row columns={4}>
      <Grid.Column width={6}>
        <Header size="tiny" className="cart-item-name">
          {itemName}
        </Header>
        <span className="cart-item-note">{note}</span>
      </Grid.Column>
      <Grid.Column width={1}>
        <span className="cart-minus" onClick={() => removeFromCart(itemId)}>
          <Icon name="minus" color="red" />
        </span>
      </Grid.Column>
      <Grid.Column width={2}>
        <span className="cart-quantity">x{amount}</span>
      </Grid.Column>
      <Grid.Column width={1}>
        <span className="cart-plus" onClick={() => addToCart(itemId)}>
          <Icon name="plus" color="green" />
        </span>
      </Grid.Column>
      <Grid.Column width={4}>
        <Header size="tiny" className="cart-subtotal">
          {formatCurrency(price * amount)}
        </Header>
      </Grid.Column>
    </Grid.Row>
  )
}

export default CartItem
