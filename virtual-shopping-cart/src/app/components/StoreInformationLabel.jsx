import { Header, Icon, Label, Segment } from "semantic-ui-react"
const StoreInformationLabel = ({ title, label, link, icon }) => {
  return (
    <Segment textAlign="center" color="black">
      <Header as="h5">{title}</Header>
      {link && (
        <Label size={"large"} as="a" href={link} style={{ width: "100%" }}>
          <Icon name={icon} />
          {label}
        </Label>
      )}
      {!link && (
        <Label size={"large"} style={{ width: "100%" }}>
          <Icon name={icon} />
          {label}
        </Label>
      )}
    </Segment>
  )
}

export default StoreInformationLabel
