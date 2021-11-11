import { Card } from "semantic-ui-react"
import StoreCard from "./StoreCard"

const StoreList = ({ stores }) => {
  return (
    <Card.Group itemsPerRow={3}>
      {stores.map(s => (
        <StoreCard key={s.shopId} store={s} />
      ))}
    </Card.Group>
  )
}

export default StoreList
