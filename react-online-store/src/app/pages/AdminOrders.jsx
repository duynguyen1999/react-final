import { AgGridReact } from "ag-grid-react"
import { useEffect, useMemo, useRef, useState } from "react"
import AdminSubHeader from "../components/AdminSubHeader"
import { useSelector } from "react-redux"
import { getShopOrders, updateOrderStatus } from "../../api/order.api"
import { formatCurrency } from "../helpers/number-helper"
import dayjs from "dayjs"
import AdminProfileSection from "../components/AdminProfileSection"
import { Divider } from "semantic-ui-react"
import ActionCellRenderer from "../components/cellRenders/ActionCellRenderer"
import StatusCellRenderer from "../components/cellRenders/StatusCellRenderer"
import AdminOrderModal from "../components/AdminOrderModal"

const priceRender = params => {
  return formatCurrency(params.value)
}

const AdminOrders = () => {

  // changes, needs to be state
  const [rowData, setRow] = useState([])
  const viewHeight = window.innerHeight
  const authInfo = useSelector(store => store.auth)

  const modalRef = useRef(null)

  useEffect(() => {
    getShopOrders(authInfo.id).then(res => {
      setRow(res.orders)
    })
  }, [])

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
  
  const viewOrder = data => {
    if (!data) return
      ; (data.itemsInCart || []).forEach(i => {
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
      <AdminProfileSection />
      <Divider />

      <AdminSubHeader title="View Orders"></AdminSubHeader>
      <div className="ag-theme-alpine" style={{ height: viewHeight - 340 }}>
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
      <AdminOrderModal
        updateOrderStatus={handleUpdateOrderStatus}
        ref={modalRef}
      ></AdminOrderModal>
    </>
  )
}

export default AdminOrders
