import { useState } from "react"
import { Route, useHistory } from "react-router"
import { Container, Icon, Menu } from "semantic-ui-react"

const Header = () => {
  const history = useHistory()
  const [activeItem] = useState(null)

  return (
    <Menu fixed="top" widths={5} inverted>
      <Menu.Item></Menu.Item>
      <Menu.Item
        name="profile"
        active={activeItem === "profile"}
        onClick={() => history.push("/history")}
      >
        <Icon size={"small"} name="list" /> History
      </Menu.Item>
      <Menu.Item
        name="stores"
        active={activeItem === "stores"}
        onClick={() => history.push("/store")}
      >
        <Icon size={"small"} name="home" /> Stores
      </Menu.Item>
      <Menu.Item
        name="logoff"
        active={activeItem === "logoff"}
        onClick={() => history.push("/sign-in")}
      >
        <Icon size={"small"} name="log out" /> Sign Out
      </Menu.Item>
      <Menu.Item></Menu.Item>
    </Menu>
  )
}

const CustomerLayout = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => (
        <Container>
          <Header></Header>
          <Container style={{ marginTop: "5em" }}>
            <Component {...props} />
          </Container>
        </Container>
      )}
    />
  )
}

export default CustomerLayout
