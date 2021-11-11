import { useHistory } from "react-router"
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
import { registerShop } from "../../api/shop.api"
import { useDispatch } from "react-redux"
import { logIn } from "../store/actions/auth-action"
import { registerCustomer } from "../../api/customer.api"

const Login = () => {
  const history = useHistory()
  const [isShop, setIsShop] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [invalid, setInvalid] = useState({})
  const { toastSuccess, toastError } = useToast()
  const [activeItem, setItem] = useState("customer")
  const dispatch = useDispatch()

  const signIn = () => {
    history.push("/auth/sign-in")
  }

  const toggleView = activeItem => {
    setIsShop(!isShop)
    setItem(activeItem)
  }

  const validateForm = formData => {
    const obj = {}
    if (formData.get("Name") === "") {
      obj.name = true
    }

    if (formData.get("PhoneNumber") === "") {
      obj.phone = true
    }

    setInvalid(obj)

    if (Object.keys(obj).length > 0) {
      return false
    }

    return true
  }

  const submit = async () => {
    const formData = new FormData(document.getElementById("register_form"))

    if (!validateForm(formData)) {
      return
    }

    setIsLoading(true)

    try {
      if (isShop) {
        const res = await registerShop(formData)
        toastSuccess("Create account successfully")

        //login user
        dispatch(logIn({ id: res.shopId, phone: res.phoneNumber, isShop }))

        setTimeout(() => {
          history.push("/admin")
        }, 500)
      } else {
        const res = await registerCustomer(formData)
        toastSuccess("Create account successfully")

        //login user
        dispatch(logIn({ id: res.customerId, phone: "", isShop }))

        setTimeout(() => {
          history.push("/")
        }, 500)
      }
    } catch (err) {
      toastError(err.message)
    }
    setIsLoading(false)
  }

  const labelName = isShop ? "Shop Name" : "Customer Name"
  const fieldName = isShop ? "Logo" : "Avatar"

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
            <Form id="register_form" loading={isLoading}>
              <Form.Field>
                <Form.Input
                  label={labelName}
                  placeholder={labelName}
                  name="Name"
                  error={invalid.name ? "Please enter Name" : undefined}
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  label="Phone Number"
                  placeholder="Phone Number"
                  name="PhoneNumber"
                  error={
                    invalid.phone ? "Please enter Phone Number" : undefined
                  }
                />
              </Form.Field>
              <Form.Field>
                <label>Logo</label>
                <input type="file" name={fieldName} />
              </Form.Field>
              <Button type="submit" color="green" fluid onClick={submit}>
                Register
              </Button>
            </Form>

            <Divider />
            <Label
              as="a"
              basic
              style={{ width: "100%" }}
              color="grey"
              onClick={signIn}
            >
              <Icon name="user" /> Already a member? Sign In
            </Label>
          </Segment>
        </Grid.Column>
        <Grid.Column></Grid.Column>
      </Grid>
    </Container>
  )
}

export default Login
