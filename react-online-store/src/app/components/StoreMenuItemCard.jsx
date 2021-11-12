import { Button, Card, Icon, Image } from "semantic-ui-react"
import { formatCurrency } from "../helpers/number-helper"

const StoreMenuItemCard = ({ item, viewOrder, addToCart, deleteItem }) => {
  const { image, name, price, itemId, isActive } = item
  if (!isActive) {
    return null
  } else {
    return (
      <Card raised color="grey">
        <Image src={`data:image/png;base64, ${image}`} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{formatCurrency(price)}</Card.Header>
          <Card.Description>{name}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          {viewOrder && (
            <Button.Group size="tiny" style={{ width: "100%" }}>
              <Button
                icon
                color="blue"
                onClick={() => viewOrder(itemId)}
                title="Modify Item"
              >
                <Icon name="pencil" />
              </Button>
              <Button.Or />
              <Button
                icon
                color="red"
                title="Delete Item"
                onClick={() => deleteItem(itemId)}
              >
                <Icon name="delete" />
              </Button>
            </Button.Group>
          )}

          {addToCart && (
            <Button
              content="Add to Cart"
              icon="cart plus"
              labelPosition="right"
              color="green"
              title="Add to Cart"
              onClick={() => addToCart(itemId)}
              style={{ width: "100%" }}
            />
          )}
        </Card.Content>
      </Card>
    )
  }
}

export default StoreMenuItemCard
