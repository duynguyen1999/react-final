import { BrowserRouter, Switch, Route } from "react-router-dom"
import { Redirect } from "react-router"
import Template from "./Template"
import NotFound from "./pages/404"
import AdminOrders from "./pages/AdminOrders"
import AdminMenu from "./pages/AdminMenu"
import Stores from "./pages/Stores"
import Store from "./pages/Store"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import History from "./pages/History"

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/store" />
        </Route>
        <Route path="/admin" exact>
          <Redirect to="/admin/order" />
        </Route>

        <Template exact path="/admin/order" component={AdminOrders} />
        <Template exact path="/admin/menu" component={AdminMenu} />

        <Template exact path="/store" component={Stores} />
        <Template exact path="/history" component={History} />
        <Template exact path="/store/:id" component={Store} />

        <Template exact path="/auth/sign-in" component={SignIn} />
        <Template exact path="/auth/sign-up" component={SignUp} />

        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default Router
