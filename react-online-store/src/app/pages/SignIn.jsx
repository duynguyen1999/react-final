import { useHistory, useRouteMatch } from "react-router"
import { useState } from "react"
import useToast from "./../hooks/useToast"
import {
  Button,
  Image,
  Form,
  Grid,
  Segment,
  Container,
  Divider,
  Label,
  Icon,
  Menu,
} from "semantic-ui-react"
import { doLogin } from "../../api/shop.api"
import { useDispatch } from "react-redux"
import { logIn } from "../store/actions/auth-action"

const Login = () => {
  const history = useHistory()
  const [isShop, setIsShop] = useState(false)
  const { toastSuccess, toastError } = useToast()
  const [phone, setPhone] = useState("")
  const [activeItem, setItem] = useState("customer")
  const dispatch = useDispatch()

  const signUp = () => {
    history.push("/auth/sign-up")
  }

  const toggleView = activeItem => {
    setIsShop(!isShop)
    setItem(activeItem)
  }

  const submit = async () => {
    try {
      const res = await doLogin(phone, isShop)

      toastSuccess("Log in successfully")

      if (isShop) {
        //login user
        dispatch(logIn({ id: res.shopId, phone: res.phoneNumber, isShop }))

        setTimeout(() => {
          history.push("/admin")
        }, 500)
      } else {
        //login user
        dispatch(
          logIn({ id: res.customerId, phone: "", isShop, name: res.name })
        )

        setTimeout(() => {
          history.push("/")
        }, 500)
      }
    } catch {
      toastError("Phone number is not exists")
    }
  }

  return (
    <Container className="auth-form">
      <Grid columns="equal">
        <Grid.Column></Grid.Column>
        <Grid.Column width={6}>
          <Menu pointing secondary widths={2}>
            <Menu.Item
              name="customer"
              active={activeItem === "customer"}
              onClick={() => toggleView("customer")}
            >
              <Icon name="user circle" /> Customer
            </Menu.Item>

            <Menu.Item
              name="store owner"
              active={activeItem === "store owner"}
              onClick={() => toggleView("store owner")}
            >
              <Icon name="home" /> Store Owner
            </Menu.Item>
          </Menu>

          <Segment>
            <Form>
              <Form.Field>
                <label>Phone Number</label>
                <input
                  placeholder="Phone Number"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                />
              </Form.Field>
              <Button type="submit" color="green" fluid onClick={submit}>
                Sign In
              </Button>
            </Form>

            <Divider />
            <Label
              as="a"
              basic
              color="grey"
              style={{ width: "100%" }}
              onClick={signUp}
            >
              <Icon name="user plus" /> New to us? Sign Up
            </Label>
          </Segment>
        </Grid.Column>
        <Grid.Column></Grid.Column>
      </Grid>
    </Container>
  )
}

export default Login
