import { AgGridReact } from "ag-grid-react"
import { useEffect, useMemo, useRef, useState } from "react"
import ActionCellRenderer from "./ViewOrders/ActionCellRenderer"
import StatusCellRenderer from "./ViewOrders/StatusCellRenderer"
import { useSelector } from "react-redux"
import { getOrderByCustomerId } from "../../api/customer.api"
import { formatCurrency } from "../helpers/number-helper"
import { updateOrderStatus } from "../../api/order.api"
import dayjs from "dayjs"
import OrderDetailCustomer from "../components/CustomerOrderModal"
import { Header } from "semantic-ui-react"
import { Link } from "react-router-dom"

const History = () => {
  // never changes, so we can use useMemo
  const columnDefs = useMemo(
    () => [
      {
        field: "orderTime",
        sort: "desc",
        cellRenderer: params => dayjs(params.value).format("MM/DD/YYYY HH:mm"),
      },
      { field: "shopName", headerName: "Shop Name" },
      { field: "phoneNumberOfShop", headerName: "Phone Number" },
      {
        field: "totalPrice",
        cellRenderer: params => formatCurrency(params.value),
      },
      { field: "status", cellRenderer: "statusCellRenderer" },
      {
        field: "action",
        pinned: "right",
        cellRenderer: "actionCellRenderer",
        cellRendererParams: {
          onViewOrder: data => viewOrder(data),
        },
      },
    ],
    []
  )

  const defaultColDef = useMemo(
    () => ({
      resizable: true,
      sortable: true,
    }),
    []
  )

  // changes, needs to be state
  const [rowData, setRow] = useState([])
  const gridHeight = window.innerHeight
  const authInfo = useSelector(store => store.auth)

  useEffect(() => {
    getOrderByCustomerId(authInfo.id).then(res => {
      setRow(res.orders)
    })
  }, [])

  const modalRef = useRef(null)

  const viewOrder = data => {
    if (!data) return
    ;(data.itemsInCart || []).forEach(i => {
      i.total = formatCurrency(i.price * i.amount)
    })
    modalRef.current.open(data)
  }

  const handleUpdateOrderStatus = async data => {
    await updateOrderStatus(data)
    getOrderByCustomerId(authInfo.id).then(res => {
      setRow(res.orders)
    })
  }

  return (
    <>
      <Header size="medium">
        <Link to="/">Shop</Link> &gt; {"History"}
      </Header>
      <div className="ag-theme-alpine" style={{ height: gridHeight - 150 }}>
        <AgGridReact
          reactUi="true"
          className="ag-theme-alpine"
          animateRows="true"
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowData={rowData}
          frameworkComponents={{
            actionCellRenderer: ActionCellRenderer,
            statusCellRenderer: StatusCellRenderer,
          }}
        />
      </div>
      <OrderDetailCustomer
        updateOrderStatus={handleUpdateOrderStatus}
        ref={modalRef}
      ></OrderDetailCustomer>
    </>
  )
}

export default History
