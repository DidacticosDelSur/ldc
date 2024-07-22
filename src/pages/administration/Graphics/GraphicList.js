import React, { useState, useEffect } from "react";
import { Alert, Button, Modal, ModalBody, ModalFooter } from "react-bootstrap";
import axios from "axios";
import { useTranslation } from "react-i18next";

export default function GraphicList() {
  const { t } = useTranslation("graphics");
  const [show, setShow] = useState(false);
  const [variant, setVariant] = useState([]);
  const [message, setMessage] = useState([]);
  const [data, setData] = useState([]);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [graphicSelected, setGraphicSelected] = useState({
    id: "",
  });

  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  };

  const getGraphics = async () => {
    let baseUrl = process.env.REACT_APP_WEB_SERVICES + "getGraphics.php";
    await axios
      .get(baseUrl)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        setVariant("danger");
        setShow(true);
        setMessage(error.response.data.message);
      });
  };

  const removeGraphic = async () => {
    var f = new FormData();
    let baseUrl = process.env.REACT_APP_WEB_SERVICES + "removeGraphic.php";
    await axios
      .post(baseUrl, f, { params: { id: graphicSelected.id } })
      .then((response) => {
        if (response.data.error) {
          setVariant("danger");
          setShow(true);
          setMessage(response.data.message);
        } else {
          setVariant("success");
          setShow(true);
          setMessage(response.data.message);
          setData(data.filter((graphic) => graphic.id !== graphicSelected.id));
        }
        abrirCerrarModalEliminar();
      })
      .catch((error) => {
        setVariant("danger");
        setShow(true);
        setMessage(error.response.data.message);
      });
  };

  const editGraphic = (id) => {
    window.location.href = "#/graphics/edit/" + id;
  };

  const seleccionarGraphic = (graphic, caso) => {
    setGraphicSelected(graphic);
    abrirCerrarModalEliminar();
  };

  useEffect(() => {
    getGraphics();
  }, []);

  return (
    <>
      {show && (
        <Alert variant={variant} onClose={() => setShow(false)} dismissible>
          <Alert.Heading>{t(message)}</Alert.Heading>
        </Alert>
      )}
      <div style={{ textAlign: "center" }} className="container-lg">
        <br />
        <Button
          className="float-end"
          variant="outline-success"
          href="#/graphics/new"
        >
          {t("new")}
        </Button>

        <br />
        <br />
        <table className="table table-striped">
          <thead>
            <tr>
              <th>{t("id")}</th>
              <th>{t("title")}</th>
              <th>{t("menuTitle")}</th>
              <th>{t("actions")}</th>
            </tr>
          </thead>
          <tbody>
            {data.map((graphic) => (
              <tr key={graphic.id}>
                <td>{graphic.id}</td>
                <td>{graphic.title}</td>
                <td>{graphic.menu_title}</td>
                <td>
                  <Button
                    variant="outline-success"
                    className="me-2"
                    onClick={() => editGraphic(graphic.id)}
                  >
                    {t("edit")}
                  </Button>

                  <Button
                    variant="outline-danger"
                    className="ms-2"
                    onClick={() => seleccionarGraphic(graphic, "Eliminar")}
                  >
                    {t("remove")}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Modal show={modalEliminar}>
          <ModalBody>
            {t("areYouSureRemove")}{" "}
            <strong>{graphicSelected && graphicSelected.title}</strong>?
          </ModalBody>
          <ModalFooter>
            <Button variant="outline-danger" onClick={() => removeGraphic()}>
              {t("yes")}
            </Button>
            <Button
              variant="outline-secondary"
              onClick={() => abrirCerrarModalEliminar()}
            >
              {t("no")}
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </>
  );
}
