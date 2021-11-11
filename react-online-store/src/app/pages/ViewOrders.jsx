import { AgGridReact } from "ag-grid-react"
import { useEffect, useMemo, useRef, useState } from "react"
import ActionCellRenderer from "./ViewOrders/ActionCellRenderer"
import StatusCellRenderer from "./ViewOrders/StatusCellRenderer"
import OrderDetailModal from "./ViewOrders/OrderDetailModal"
import SectionHeader from "../components/SectionHeader"
import { useSelector } from "react-redux"
import { getShopOrders, updateOrderStatus } from "../../api/order.api"
import { formatCurrency } from "../helpers/number-helper"
import dayjs from "dayjs"

const priceRender = params => {
  return formatCurrency(params.value)
}

const ViewOrders = () => {
  // never changes, so we can use useMemo
  const columnDefs = useMemo(
    () => [
      { field: "orderId", pinned: "left", headerName: "Order Number" },
      { field: "customerName" },
      { field: "customerPhoneNumber", headerName: "Customer Phone" },
      { field: "totalPrice", cellRenderer: priceRender },
      { field: "status", cellRenderer: "statusCellRenderer" },
      {
        field: "orderTime",
        sort: "desc",
        cellRenderer: params => dayjs(params.value).format("MM/DD/YYYY HH:mm"),
      },
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
    getShopOrders(authInfo.id).then(res => {
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
    getShopOrders(authInfo.id).then(res => {
      setRow(res.orders)
    })
  }

  return (
    <>
      <SectionHeader title="View Orders"></SectionHeader>
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
      <OrderDetailModal
        updateOrderStatus={handleUpdateOrderStatus}
        ref={modalRef}
      ></OrderDetailModal>
    </>
  )
}

export default ViewOrders
