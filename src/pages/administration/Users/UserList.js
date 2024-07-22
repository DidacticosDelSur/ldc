import React, { useState, useEffect } from "react";
import { Alert, Button, Modal, ModalBody, ModalFooter } from "react-bootstrap";
import axios from "axios";
import { useTranslation } from "react-i18next";

export default function UserList() {
  const { t } = useTranslation("users");
  const [show, setShow] = useState(false);
  const [variant, setVariant] = useState([]);
  const [message, setMessage] = useState([]);
  const [data, setData] = useState([]);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [userSelected, setUserSelected] = useState({
    id: "",
  });

  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  };

  const getUsers = async () => {
    let baseUrl = process.env.REACT_APP_WEB_SERVICES + "getUsers.php";
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

  const removeUser = async () => {
    var f = new FormData();
    let baseUrl = process.env.REACT_APP_WEB_SERVICES + "removeUser.php";
    await axios
      .post(baseUrl, f, { params: { id: userSelected.id } })
      .then((response) => {
        if (response.data.error) {
          setVariant("danger");
          setShow(true);
          setMessage(response.data.message);
        } else {
          setVariant("success");
          setShow(true);
          setMessage(response.data.message);
          setData(data.filter((user) => user.id !== userSelected.id));
        }
        abrirCerrarModalEliminar();
      })
      .catch((error) => {
        setVariant("danger");
        setShow(true);
        setMessage(error.response.data.message);
      });
  };

  const editUser = (id) => {
    window.location.href = "#/users/edit/" + id;
  };

  const seleccionarUser = (user, caso) => {
    setUserSelected(user);
    abrirCerrarModalEliminar();
  };

  useEffect(() => {
    getUsers();
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
          href="#/users/new"
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
              <th>{t("lastname")}</th>
              <th>{t("username")}</th>
              <th>{t("isAdmin")}</th>
              <th>{t("actions")}</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.lastname}</td>
                <td>{user.username}</td>
                <td>{user.isAdmin === 1 ? t("yes") : t("no")}</td>
                <td>
                  <Button
                    className="me-2"
                    variant="outline-success"
                    onClick={() => editUser(user.id)}
                  >
                    {t("edit")}
                  </Button>
                  <Button
                    className="ms-2"
                    variant="outline-danger"
                    onClick={() => seleccionarUser(user, "Eliminar")}
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
            <strong>{userSelected && userSelected.username}</strong>?
          </ModalBody>
          <ModalFooter>
            <Button variant="outline-danger" onClick={() => removeUser()}>
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
