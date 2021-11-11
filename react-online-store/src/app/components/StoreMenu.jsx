import { Card } from "semantic-ui-react"
import StoreMenuItemCard from "./StoreMenuItemCard"

const StoreMenu = ({ items, viewOrder, addToCart, deleteItem }) => {
  return (
    <Card.Group itemsPerRow={3} centered>
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
  )
}

export default StoreMenu
