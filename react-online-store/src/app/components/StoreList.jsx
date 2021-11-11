import { Card, Segment } from "semantic-ui-react"
import StoreCard from "./StoreCard"

const StoreList = ({ stores }) => {
  return (
    <Segment>
      <Card.Group itemsPerRow={4}>
        {stores.map(s => (
          <StoreCard key={s.shopId} store={s} />
        ))}
      </Card.Group>
    </Segment>
  )
}

export default StoreList
