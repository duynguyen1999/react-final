import { Icon, Menu, Segment } from "semantic-ui-react"
import { useState } from "react"
import { useHistory, useRouteMatch } from "react-router"

const AdminSubMenu = () => {
  const history = useHistory()
  const route = useRouteMatch()
  const [activeMenu, setItem] = useState(
    route.path === "/admin/view-orders" ? "orders" : "menu"
  )

  const handleChangeMenu = (name, router) => {
    if (activeMenu === name) return
    setItem(name)
    history.push(router)
  }

  return (
    <Segment inverted>
      <Menu pointing secondary widths={2} inverted size={"mini"}>
        <Menu.Item
          name="orders"
          active={activeMenu === "orders"}
          onClick={(e, { name }) =>
            handleChangeMenu(name, "/admin/view-orders")
          }
        >
          <Icon name="list" /> Orders
        </Menu.Item>

        <Menu.Item
          name="menu"
          active={activeMenu === "menu"}
          onClick={(e, { name }) => handleChangeMenu(name, "/admin/view-menu")}
        >
          <Icon name="list alternate outline" /> Menu
        </Menu.Item>
      </Menu>
    </Segment>
  )
}

export default AdminSubMenu
