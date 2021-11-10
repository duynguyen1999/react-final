import { List } from "semantic-ui-react"
import MenuItem from "./MenuItem"

const MenuItemList = ({ items, viewOrder, addToCart  , deleteItem}) => {
  return (
    <List size={"large"}>
      {items.map(item => (
        <MenuItem
          key={item.itemId}
          item={item}
          viewOrder={viewOrder}
          addToCart={addToCart}
          deleteItem={deleteItem}
        ></MenuItem>
      ))}
    </List>
  )
}

export default MenuItemList
