import { useParams } from "react-router"
import { useEffect, useState } from "react"
import StoreMenu from "./../components/StoreMenu"
import { Grid, Header } from "semantic-ui-react"
import Cart from "../components/Cart"
import { useSelector } from "react-redux"
import useHttp from "../hooks/useHttp"
import { getShopsDetail } from "../../api/shop.api"
import useToast from "../hooks/useToast"
import { Link } from "react-router-dom"
import {
  createNewCart,
  getCurrentShopCart,
  placeOrder,
  submitCart,
} from "../../api/cart.api"
import { deepClone } from "../helpers/common-helper"

const Store = () => {
  const { id: shopId } = useParams()
  const [cart, setCart] = useState({
    groups: {},
    subtotal: 0,
    discount: 0,
    total: 0,
  })
  const [deliveryInfo, setDelivery] = useState("")
  const authInfo = useSelector(state => state.auth)
  const { data: menuInfo, sendRequest } = useHttp(getShopsDetail, true)
  const {
    data: cartInfo,
    sendRequest: loadCurrentShopCart,
    status: loadCartStatus,
  } = useHttp(getCurrentShopCart, true)
  const { toastSuccess } = useToast()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    sendRequest(shopId)
    loadCurrentShopCart(authInfo.id, shopId)
    const storedCart = localStorage.getItem(`cart_${authInfo.id}_${shopId}`)
    if (storedCart) {
      setCart(JSON.parse(storedCart))
    }
  }, [])

  useEffect(() => {
    if (loadCartStatus === "completed" && !cartInfo) {
      createNewCart(authInfo.id, shopId).then(() => {
        //reload cart
        loadCurrentShopCart(authInfo.id, shopId)
      })
    }
  }, [loadCartStatus, authInfo.id, shopId, cartInfo, loadCurrentShopCart])

  const addToCart = async id => {
    const findMenu = menuInfo.items.find(i => i.itemId === id)
    const menu = deepClone(findMenu)

    const newCart = deepClone(cart)
    if (!newCart.groups[authInfo.id]) {
      newCart.groups[authInfo.id] = {
        name: authInfo.name,
        items: [{ ...menu, itemName: menu.name, amount: 1 }],
      }
    } else {
      const { items } = newCart.groups[authInfo.id]
      const found = items.find(i => i.itemId === menu.itemId)
      if (found) {
        found.amount++
      } else {
        items.push({ ...menu, itemName: menu.name, amount: 1 })
      }
    }

    newCart.subtotal += menu.price
    newCart.total =
      newCart.subtotal - (newCart.subtotal * newCart.discount) / 100
    setCart(newCart)
    localStorage.setItem(
      `cart_${authInfo.id}_${shopId}`,
      JSON.stringify(newCart)
    )
  }

  const removeFromCart = async id => {
    const newCart = deepClone(cart)
    const { items } = newCart.groups[authInfo.id]
    const found = items.find(i => i.itemId === id)
    found.amount--
    if (found.amount === 0) {
      newCart.groups[authInfo.id].items = items.filter(i => i.itemId !== id)
    }

    setCart(newCart)
    localStorage.setItem(
      `cart_${authInfo.id}_${shopId}`,
      JSON.stringify(newCart)
    )
  }

  const handleChangeDelivery = e => {
    setDelivery(e.target.value)
  }

  const handleSubmitCart = async () => {
    //build data submit
    const { items } = cart.groups[authInfo.id] || {}
    if (!items || items.length === 0) {
      return
    }

    setLoading(true)
    const payload = {
      customerId: authInfo.id,
      cartId: cartInfo.cartId,
      items: [],
    }

    items.forEach(i => {
      payload.items.push({
        amount: i.amount,
        itemId: i.itemId,
        isDeleted: false,
      })
    })

    await submitCart(payload)
    if (
      deliveryInfo === "" ||
      deliveryInfo === null ||
      deliveryInfo === undefined
    ) {
      await placeOrder({
        cartId: cartInfo.cartId,
        deliveryInformation: "confirm",
      })
    } else {
      await placeOrder({
        cartId: cartInfo.cartId,
        deliveryInformation: deliveryInfo,
      })
    }
    localStorage.removeItem(`cart_${authInfo.id}_${shopId}`)
    setCart({ groups: {}, subtotal: 0, discount: 0, total: 0 })
    toastSuccess("Placed order successfully")

    //create new cartId
    loadCurrentShopCart(authInfo.id, shopId)
    setLoading(false)
  }

  return (
    <>
      <Header size="medium">
        <Link to="/">Shop</Link> &gt; {(menuInfo || {}).name}
      </Header>
      <Grid>
        <Grid.Column width={10}>
          {(menuInfo || {}).items && (
            <StoreMenu items={menuInfo.items} addToCart={addToCart}></StoreMenu>
          )}
        </Grid.Column>
        <Grid.Column width={6}>
          <Cart
            cart={cart}
            loading={loading}
            deliveryInfo={deliveryInfo}
            submitCart={handleSubmitCart}
            addItem={addToCart}
            removeItem={removeFromCart}
            handleChangeDelivery={handleChangeDelivery}
          ></Cart>
        </Grid.Column>
      </Grid>
    </>
  )
}

export default Store
