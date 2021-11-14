import { useHistory } from "react-router"
import {
  Button,
  Container,
  Grid,
  Header,
  Icon,
  Segment,
} from "semantic-ui-react"

const NotFound = () => {
  const history = useHistory()

  return (
    <Container className="auth-form">
      <Grid columns="equal">
        <Grid.Column></Grid.Column>
        <Grid.Column width={12}>
          <Segment placeholder>
            <Header icon>
              <Icon name="search" />
              We don't have any pages matching your request
            </Header>
            <Segment.Inline>
              <Button
                content="Home"
                icon="home"
                labelPosition="left"
                positive
                onClick={() => history.push("/")}
              />
            </Segment.Inline>
          </Segment>
        </Grid.Column>
        <Grid.Column></Grid.Column>
      </Grid>
    </Container>
  )
}

export default NotFound
