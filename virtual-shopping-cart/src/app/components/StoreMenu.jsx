import { Card, Segment } from "semantic-ui-react"
import StoreMenuItemCard from "./StoreMenuItemCard"

const StoreMenu = ({ items, viewOrder, addToCart, deleteItem, itemCount }) => {
  return (
    <Segment>
      <Card.Group itemsPerRow={itemCount || 3}>
        {items.map(item => (
          <StoreMenuItemCard
            key={item.itemId}
            item={item}
            viewOrder={viewOrder}
            addToCart={addToCart}
            deleteItem={deleteItem}
          ></StoreMenuItemCard>
        ))}
      </Card.Group>
    </Segment>
  )
}

export default StoreMenu
