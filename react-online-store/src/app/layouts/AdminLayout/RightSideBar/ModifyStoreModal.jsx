import { Modal, Button, Image, Form, Icon, Label } from "semantic-ui-react"
import { forwardRef, useImperativeHandle, useRef, useState } from "react"
import { dataURIToBlob } from "../../../helpers/common-helper";

const ModifyStoreModal = forwardRef((props, ref) => {
  const [isOpen, setIsOpen] = useState(false)
  const [img, setImg] = useState(null);
  const inputFileRef = useRef(null)

  useImperativeHandle(ref, () => ({
    open() {
      setIsOpen(true)
    },
  }))

  const chooseFile = e => {
    /*Selected files data can be collected here.*/
    console.log(e.target.files)
    const fr = new FileReader();
    fr.onload = function () {
      setImg(fr.result);
    }

    fr.readAsDataURL(e.target.files[0]);
  }
  const requestChooseFile = () => {
    /*Collecting node-element and performing click*/
    inputFileRef.current.click()
  }

  const saveProfile = () => {
    const formData = new FormData(document.getElementById("update_shop_form"));

    if (!img && props.shopData.image) {
      formData.delete("Logo");
      const file = dataURIToBlob(props.shopData.image)

      formData.append("Logo", file);
    }

    props.updateProfile(formData);

    setIsOpen(false);
    setImg(null);
  }

  const { name, phoneNumber, image } = props.shopData
  const imageSrc = img ? img : `data:image/png;base64, ${image}`;

  return (
    <Modal
      onClose={() => { setImg(null); setIsOpen(false); }}
      onOpen={() => setIsOpen(true)}
      open={isOpen}
      className="store-modify-modal"
    >
      <Modal.Header>Modify Store Information</Modal.Header>
      <Modal.Content image>
        <Image rounded fluid src={imageSrc} wrapped />
        <Modal.Description>
          <Form size={"small"} id="update_shop_form">
            <Form.Field>
              <label>Name</label>
              <input placeholder="Name" name="Name" defaultValue={name} />
            </Form.Field>
            <Form.Field>
              <label>Phone Number</label>
              <input placeholder="Phone" name="NewPhoneNumber" defaultValue={phoneNumber} />
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
                name="Logo"
              />
            </Form.Field>
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={() => { setImg(null); setIsOpen(false); }}>
          Close
        </Button>
        <Button
          content="Submit"
          labelPosition="right"
          icon="checkmark"
          onClick={() => saveProfile()}
          positive
        />
      </Modal.Actions>
    </Modal>
  )
})

export default ModifyStoreModal
