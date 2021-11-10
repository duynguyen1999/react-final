import { BrowserRouter, Switch, Route } from "react-router-dom"
import { Redirect } from "react-router"
import AdminLayoutRoute from "./../layouts/AdminLayout"
import CustomerLayoutRoute from "./../layouts/CustomerLayout"
import NotFound from "./../pages/404"
import ViewOrders from "../pages/ViewOrders"
import ViewMenu from "./../pages/ViewMenu"
import Stores from "../pages/Stores"
import Store from "../pages/Store"
import DefaultLayoutRoute from "./../layouts/DefaultLayout"
import SignIn from "../pages/SignIn"
import SignUp from "../pages/SignUp"
import ViewOrderCustomer from "../pages/ViewOrderCustomer"
import StoreDetail from "../pages/StoreDetail"
const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/store" />
        </Route>
        <Route path="/admin" exact>
          <Redirect to="/admin/view-orders" />
        </Route>
        <AdminLayoutRoute exact path="/admin/view-orders" component={ViewOrders} />
        <AdminLayoutRoute exact path="/admin/view-menu" component={ViewMenu} />
        <CustomerLayoutRoute exact path="/store" component={Stores} />
        <CustomerLayoutRoute exact path="/store/view-oders" component={ViewOrderCustomer} />
        <CustomerLayoutRoute exact path="/store/:id" component={Store} />

        <CustomerLayoutRoute exact path="/store/:shopId" component={StoreDetail} />


        <DefaultLayoutRoute exact path="/sign-in" component={SignIn} />
        <DefaultLayoutRoute exact path="/sign-up" component={SignUp} />
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default Router
