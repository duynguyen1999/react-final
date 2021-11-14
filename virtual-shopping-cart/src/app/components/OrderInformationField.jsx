import { Label } from "semantic-ui-react"
const OrderInformationField = ({ title, label, link }) => {
  return (
    <div className="info-field">
      <h5>{title}</h5>
      <Label size={"large"} style={{ width: "100%" }}>
        {label || "N/A"}
      </Label>
    </div>
  )
}

export default OrderInformationField
