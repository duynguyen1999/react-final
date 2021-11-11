import { Breadcrumb, Button, Icon } from "semantic-ui-react"

const AdminSubHeader = ({ title, addItem }) => {
  return (
    <div className="admin-sub-header">
      <Breadcrumb>
        <Breadcrumb.Section active>{title}</Breadcrumb.Section>
      </Breadcrumb>
      {addItem && (
        <Button
          icon
          labelPosition="left"
          className="fl-right"
          onClick={addItem}
          color="green"
        >
          <Icon name="plus" />
          Add Item
        </Button>
      )}
    </div>
  )
}

export default AdminSubHeader
