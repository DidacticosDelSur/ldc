import React, { useState, useEffect } from "react";
import { Alert, Button, Modal, ModalBody, ModalFooter } from "react-bootstrap";
import axios from "axios";
import { useTranslation } from "react-i18next";

export default function GroupList() {
  const { t } = useTranslation("groups");
  const [show, setShow] = useState(false);
  const [variant, setVariant] = useState([]);
  const [message, setMessage] = useState([]);
  const [data, setData] = useState([]);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [groupSelected, setGroupSelected] = useState({
    id: "",
  });

  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  };

  const getGroups = async () => {
    let baseUrl = process.env.REACT_APP_WEB_SERVICES + "getGroups.php";
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

  const removeGroup = async () => {
    var f = new FormData();
    let baseUrl = process.env.REACT_APP_WEB_SERVICES + "removeGroup.php";
    await axios
      .post(baseUrl, f, { params: { id: groupSelected.id } })
      .then((response) => {
        if (response.data.error) {
          setVariant("danger");
          setShow(true);
          setMessage(response.data.message);
        } else {
          setVariant("success");
          setShow(true);
          setMessage(response.data.message);
          setData(data.filter((group) => group.id !== groupSelected.id));
        }
        abrirCerrarModalEliminar();
      })
      .catch((error) => {
        setVariant("danger");
        setShow(true);
        setMessage(error.response.data.message);
      });
  };

  const editGroup = (id) => {
    window.location.href = "#/groups/edit/" + id;
  };

  const seleccionarGroup = (group, caso) => {
    setGroupSelected(group);
    abrirCerrarModalEliminar();
  };

  useEffect(() => {
    getGroups();
  }, []);

  return (
    <>
      {show && (
        <Alert variant={variant} onClose={() => setShow(false)} dismissible>
          <Alert.Heading>{t(message)}</Alert.Heading>
        </Alert>
      )}
      <div
        style={{ textAlign: "center", maxWidth: "900px" }}
        className="container-lg"
      >
        <br />
        <Button
          variant="outline-success"
          className="float-end"
          href="#/groups/new"
        >
          {t("new")}
        </Button>

        <br />
        <br />
        <table className="table table-striped">
          <thead>
            <tr>
              <th>{t("id")}</th>
              <th>{t("name")}</th>
              <th>{t("actions")}</th>
            </tr>
          </thead>
          <tbody>
            {data.map((group) => (
              <tr key={group.id}>
                <td>{group.id}</td>
                <td>{group.name}</td>
                <td>
                  <Button
                    variant="outline-success"
                    className="me-2"
                    onClick={() => editGroup(group.id)}
                  >
                    {t("edit")}
                  </Button>
                  <Button
                    variant="outline-danger"
                    className="ms-2"
                    onClick={() => seleccionarGroup(group, "Eliminar")}
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
            ¿{t("areYouSureRemove")}{" "}
            <strong>{groupSelected && groupSelected.name}</strong>?
          </ModalBody>
          <ModalFooter>
            <Button variant="outline-danger" onClick={() => removeGroup()}>
              {t("yes")}
            </Button>
            <Button
              variant="outline-success"
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
