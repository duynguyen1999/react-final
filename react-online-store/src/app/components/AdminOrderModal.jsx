import { forwardRef, useImperativeHandle, useMemo, useState } from "react"
import { Button, Container, Grid, Modal, Segment } from "semantic-ui-react"
import dayjs from "dayjs"
import { AgGridReact } from "ag-grid-react/lib/agGridReact"
import OrderInformationField from "./OrderInformationField"
import { formatCurrency } from "../helpers/number-helper"

const priceRender = params => {
  return formatCurrency(params.value)
}

const renderNextStatusButton = status => {
  let color = null
  let label = ""

  switch (status) {
    case "Confirmed":
      color = "yellow"
      label = "Sent To Kitchen"
      break
    case "Sent To Kitchen":
      color = "blue"
      label = "Ready for Pickup"
      break
    case "Ready for Pickup":
      color = "teal"
      label = "Delivered"
      break
    case "Delivered":
      color = "green"
      label = "Complete Order"
      break
    default:
      color = "orange"
      label = "Confirmed"
      break
  }

  return { color, label }
}

const AdminOrderModal = forwardRef((props, ref) => {
  const [isOpen, setIsOpen] = useState(false)
  const [order, setOrder] = useState({})

  useImperativeHandle(ref, () => ({
    open(orderData) {
      setOrder(orderData)
      setIsOpen(true)
    },
  }))

  const columnDefs = useMemo(
    () => [
      { field: "itemName", minWidth: 100, headerName: "Name" },
      { field: "price", cellRenderer: priceRender },
      { field: "amount", headerName: "Quantity" },
      { field: "total" },
    ],
    []
  )

  const defaultColDef = useMemo(
    () => ({
      resizable: false,
      sortable: true,
    }),
    []
  )

  const {
    orderId,
    customerName,
    customerPhoneNumber,
    orderTime,
    itemsInCart,
    totalPrice,
    status,
    customerId,
    shopId,
  } = order
  const nextBtn = renderNextStatusButton(status)

  const changeOrderStatus = () => {
    const payload = {
      orderId,
      customerId,
      shopId,
      orderStatus: nextBtn.label,
    }

    props.updateOrderStatus(payload)
    setIsOpen(false)
  }

  return (
    <Modal
      onClose={() => setIsOpen(false)}
      onOpen={() => setIsOpen(true)}
      open={isOpen}
      size={"large"}
    >
      <Modal.Header>{`Order #${orderId}`}</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Container fluid>
            <Grid fluid>
              <Grid.Column width={8}>
                <OrderInformationField
                  title="Order No"
                  label={orderId}
                ></OrderInformationField>
                <OrderInformationField
                  title="Order Time"
                  label={dayjs(orderTime).format("MM/DD/YYYY HH:mm")}
                ></OrderInformationField>
                <OrderInformationField
                  title="Delivery status"
                  label={status}
                ></OrderInformationField>
              </Grid.Column>
              <Grid.Column width={8}>
                <OrderInformationField
                  title="Customer Name"
                  label={customerName}
                ></OrderInformationField>
                <OrderInformationField
                  title="Customer Phone"
                  label={customerPhoneNumber}
                ></OrderInformationField>
                <OrderInformationField
                  title="Total Price"
                  label={formatCurrency(totalPrice)}
                ></OrderInformationField>
              </Grid.Column>
            </Grid>
          </Container>
          <div
            className="ag-theme-alpine"
            style={{ height: "240px", marginTop: "10px" }}
          >
            <AgGridReact
              reactUi="true"
              className="ag-theme-alpine"
              animateRows="true"
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              enableRangeSelection="true"
              rowData={itemsInCart}
              rowSelection="multiple"
              suppressRowClickSelection="true"
            />
          </div>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={() => setIsOpen(false)}>
          Close
        </Button>
        {status !== "Canceled" && status !== "Delivered" && (
          <Button
            content="Cancel Order"
            labelPosition="left"
            icon="close"
            onClick={() => setIsOpen(false)}
            color="red"
          />
        )}
        {status !== "Canceled" && status !== "Delivered" && status !== "Ready for Pickup" && (
          <Button
            content={nextBtn.label}
            labelPosition="right"
            icon="checkmark"
            onClick={() => changeOrderStatus()}
            color={nextBtn.color}
          />
        )}
      </Modal.Actions>
    </Modal>
  )
})

export default AdminOrderModal
