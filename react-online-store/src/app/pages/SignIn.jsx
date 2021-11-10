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
} from "semantic-ui-react"
import { login } from "../../api/shop.api"
import { useDispatch } from "react-redux"
import { logIn } from "../store/actions/auth-action"

const Login = () => {
  const history = useHistory()
  const [isShop, setIsShop] = useState(true)
  const { toastSuccess, toastError } = useToast()
  const [phone, setPhone] = useState("");
  const dispatch = useDispatch();

  const signUp = () => {
    history.push("/sign-up")
  }

  const toggleView = () => {
    setIsShop(!isShop)
  }

  const submit = async () => {
    try {
      const res = await login(phone, isShop);

      toastSuccess("Log in successfully")

      if (isShop) {
        //login user
        dispatch(logIn({ id: res.shopId, phone: res.phoneNumber, isShop }));

        setTimeout(() => {
          history.push("/admin")
        }, 500);
      } else {
        //login user
        dispatch(logIn({ id: res.customerId, phone: "", isShop, name: res.name }));

        setTimeout(() => {
          history.push("/");
        }, 500);
      }
    } catch {
      toastError("Phone number is not exists")
    }
  }

  const label = isShop ? "Sign in as customer?" : "Sign in as store owner?"

  return (
    <Container className="auth-form">
      <Image src="/logo/logo64.png" centered />
      <Grid columns="equal">
        <Grid.Column></Grid.Column>
        <Grid.Column width={6}>
          <Label as="a" style={{ width: "100%" }} onClick={toggleView}>
            <Icon name="question circle" /> {label}
          </Label>
          <Divider />

          <Segment raised>
            <Form>
              <Form.Field>
                <label>Phone Number</label>
                <input placeholder="Phone Number" value={phone} onChange={e => setPhone(e.target.value)} />
              </Form.Field>
              <Button type="submit" color="green" fluid onClick={submit}>
                Submit
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
              <Icon name="user plus" /> Don't have account? Register now
            </Label>
          </Segment>
        </Grid.Column>
        <Grid.Column></Grid.Column>
      </Grid>
    </Container>
  )
}

export default Login
