import { Modal, Button, Image, Form, Icon, Label } from "semantic-ui-react"
import { forwardRef, useImperativeHandle, useRef, useState } from "react"
import { dataURIToBlob } from "../helpers/common-helper"

const AdminMenuItemModal = forwardRef((props, ref) => {
  const [isOpen, setIsOpen] = useState(false)
  const [menu, setItem] = useState({})
  const inputFileRef = useRef(null)
  const [img, setImg] = useState(null)

  
  const { image, name, price, itemId } = menu
  const imgSrc = image ? `data:image/png;base64, ${image}` : null

  
  useImperativeHandle(ref, () => ({
    open(item) {
      setIsOpen(true)

      if (item) {
        setItem(item)
      } else {
        setItem({})
      }
    },
  }))

  const chooseFile = e => {
    /*Selected files data can be collected here.*/
    const fr = new FileReader()
    fr.onload = function () {
      setImg(fr.result)
    }

    fr.readAsDataURL(e.target.files[0])
  }

  const requestChooseFile = () => {
    /*Collecting node-element and performing click*/
    inputFileRef.current.click()
  }

  const saveItem = () => {
    const formData = new FormData(document.getElementById("item_form_modal"))

    if (!img && menu.image) {
      formData.delete("Image")
      const file = dataURIToBlob(menu.image)

      formData.append("Image", file)
    }

    props.onSaveItem(formData)

    setIsOpen(false)
    setImg(null)
  }


  return (
    <Modal
      onClose={() => setIsOpen(false)}
      onOpen={() => setIsOpen(true)}
      open={isOpen}
      className="menu-modify-modal"
    >
      <Modal.Header>Modify Menu Item</Modal.Header>
      <Modal.Content image>
        {menu && (
          <>
            <Image
              rounded
              src={img || imgSrc || "https://dummyimage.com/900x900/ecf0f1/aaa"}
              wrapped
            />
            <Modal.Description>
              <Form size={"small"} id="item_form_modal">
                <input
                  style={{ display: "none" }}
                  name="ItemId"
                  readOnly
                  value={itemId}
                />
                <Form.Field>
                  <label>Name</label>
                  <input placeholder="Name" name="Name" defaultValue={name} />
                </Form.Field>
                <Form.Field>
                  <label>Price</label>
                  <input
                    placeholder="Price"
                    name="Price"
                    defaultValue={price}
                  />
                </Form.Field>
                <Form.Field>
                  <Button
                    as="div"
                    labelPosition="right"
                    onClick={requestChooseFile}
                  >
                    <Button>
                      <Icon name="upload" />
                      Upload File
                    </Button>
                    <Label basic pointing="left">
                      {"Please select image"}
                    </Label>
                  </Button>
                  <input
                    style={{ display: "none" }}
                    type="file"
                    ref={inputFileRef}
                    onChange={chooseFile}
                    accept="image/*"
                    name="Image"
                  />
                </Form.Field>
              </Form>
            </Modal.Description>
          </>
        )}
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={() => setIsOpen(false)}>
          Close
        </Button>
        <Button
          content="Submit"
          labelPosition="right"
          icon="checkmark"
          onClick={() => saveItem()}
          positive
        />
      </Modal.Actions>
    </Modal>
  )
})

export default AdminMenuItemModal
