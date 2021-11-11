import { Card, Icon, Image, Label } from "semantic-ui-react"
import { Link } from "react-router-dom"

const StoreCard = ({ store }) => {
  const { image, name, shopId, brief, phoneNumber } = store
  const link = `/store/${shopId}`

  return (
    <Card raised color="grey" link href={link}>
      <Image src={`data:image/png;base64, ${image}`} wrapped ui={false} />
      <Card.Content>
        <Card.Header>
          <Link to={link}>{name}</Link>
        </Card.Header>
        <Card.Description>{brief}</Card.Description>
        <Card.Description>
          <Label as="a" href={`tel:${phoneNumber}`} style={{ width: "100%" }}>
            <Icon name="phone"></Icon> {phoneNumber}
          </Label>
        </Card.Description>
      </Card.Content>
    </Card>
  )
}

export default StoreCard
