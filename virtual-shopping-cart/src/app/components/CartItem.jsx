import { Button, Icon, Item } from "semantic-ui-react"
import { formatCurrency } from "./../helpers/number.helper"

const CartItem = ({ item, addItem, removeItem }) => {
  const { itemName, price, amount, itemId, image } = item
  return (
    <Item>
      <Item.Image size="tiny" src={`data:image/png;base64, ${image}`} />
      <Item.Content>
        <Item.Header as="h6">{itemName}</Item.Header>
        <Item.Meta>
          <span className="price">
            {formatCurrency(price)} x {amount}
          </span>
        </Item.Meta>
        <Item.Extra>
          <Button.Group size="tiny" style={{ width: "100%" }}>
            <Button basic negative onClick={() => removeItem(itemId)}>
              <Icon name="minus" />
            </Button>
            <Button.Or />
            <Button basic positive onClick={() => addItem(itemId)}>
              <Icon name="plus" />
            </Button>
          </Button.Group>
        </Item.Extra>
      </Item.Content>
    </Item>
  )
}

export default CartItem
