import { useState } from "react"
import { useHistory, useRouteMatch } from "react-router"
import { Icon, Menu } from "semantic-ui-react"

const HeaderGuest = () => {
  const history = useHistory()
  const route = useRouteMatch()
  const [activeItem] = useState(null)

  console.log(route)

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

export default HeaderGuest
