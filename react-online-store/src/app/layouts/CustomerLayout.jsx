import { useState } from "react"
import { Route, useHistory, useRouteMatch } from "react-router"
import { Container, Icon, Menu } from "semantic-ui-react"

const Header = () => {
  const history = useHistory()
  const [activeItem] = useState(null)
  const route = useRouteMatch()

  const isAdminRoute = route.path.indexOf("/admin") > -1
  console.log("route", route)

  return (
    <Menu fixed="top" widths={5} inverted>
      {!isAdminRoute && (
        <Menu.Item
          name="profile"
          active={activeItem === "profile"}
          onClick={() => history.push("/history")}
        >
          <Icon size={"small"} name="list" /> History
        </Menu.Item>
      )}
      {!isAdminRoute && (
        <Menu.Item
          name="stores"
          active={activeItem === "stores"}
          onClick={() => history.push("/store")}
        >
          <Icon size={"small"} name="home" /> Stores
        </Menu.Item>
      )}
      {isAdminRoute && (
        <Menu.Item
          name="order"
          active={activeItem === "order"}
          onClick={() => history.push("/admin/order")}
        >
          <Icon size={"small"} name="list" /> Order
        </Menu.Item>
      )}
      {isAdminRoute && (
        <Menu.Item
          name="menu"
          active={activeItem === "menu"}
          onClick={() => history.push("/admin/menu")}
        >
          <Icon size={"small"} name="list" /> Menu
        </Menu.Item>
      )}
      <Menu.Item
        name="logoff"
        active={activeItem === "logoff"}
        onClick={() => history.push("/auth/sign-in")}
      >
        <Icon size={"small"} name="log out" /> Sign Out
      </Menu.Item>
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
