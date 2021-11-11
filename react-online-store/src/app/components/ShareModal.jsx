import { Modal, Header, Icon, Button, Divider } from "semantic-ui-react"
import { forwardRef, useImperativeHandle, useState } from "react"
import QRCode from "react-qr-code"

const ShareModal = forwardRef((props, ref) => {
  const [isOpen, setIsOpen] = useState(false)
  const [url, setUrl] = useState("")

  useImperativeHandle(ref, () => ({
    open(url) {
      setIsOpen(true)
      setUrl(url)
    },
  }))

  const copy = () => {
    navigator.clipboard.writeText(url)
    setIsOpen(false)
  }

  return (
    <Modal
      basic
      onClose={() => setIsOpen(false)}
      onOpen={() => setIsOpen(true)}
      open={isOpen}
      size="small"
      className="store-modify-modal"
    >
      <Header size="small" icon>
        <Icon name="share" />
        Share To Customer
        <Divider />
        <QRCode value={url} />
      </Header>
      <Modal.Actions>
        <Button size={"tiny"} basic color="blue" inverted onClick={copy}>
          <Icon name="copy" /> Copy
        </Button>
      </Modal.Actions>
    </Modal>
  )
})

export default ShareModal
