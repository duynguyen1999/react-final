import { Icon, Menu } from "semantic-ui-react"
import { useState } from "react"
import { useHistory, useRouteMatch } from "react-router"

const LeftSideBar = () => {
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
    <div className="">
      <Menu tabular>
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
    </div>
  )
}

export default LeftSideBar
