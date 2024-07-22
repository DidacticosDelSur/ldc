import React, { useState, useEffect } from "react";
import {
  Alert,
  Button,
  Col,
  Form,
  FormCheck,
  InputGroup,
  Row,
} from "react-bootstrap";
import axios from "axios";
import { useTranslation } from "react-i18next";

import "./../../Modal.scss";
import { useParams } from "react-router-dom";

export default function AddEditUser() {
  const { t } = useTranslation("users");
  const { id } = useParams();

  const [variant, setVariant] = useState([]);
  const [message, setMessage] = useState([]);
  const [validated, setValidated] = useState(false);
  const [show, setShow] = useState(false);
  const [switchState, setSwitchState] = useState(false);

  const [userSelected, setUserSelected] = useState({
    id: "",
    name: "",
    lastname: "",
    username: "",
    isAdmin: "",
  });

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() === true) {
      if (id) {
        editUser();
      } else {
        createUser();
      }
    }

    setValidated(true);
  };

  const getUser = async (id) => {
    let baseUrl = process.env.REACT_APP_WEB_SERVICES + "getUser.php?id=" + id;
    await axios
      .get(baseUrl)
      .then((response) => {
        setUserSelected(response.data);
        setSwitchState(response.data.isAdmin === 1);
      })
      .catch((error) => {
        setVariant("danger");
        setShow(true);
        setMessage(error.response.data.message);
      });
  };

  const createUser = async () => {
    let baseUrl = process.env.REACT_APP_WEB_SERVICES + "newUser.php";
    var f = new FormData();
    f.append("name", userSelected.name);
    f.append("lastname", userSelected.lastname);
    f.append("username", userSelected.username);
    f.append("isAdmin", userSelected.isAdmin ? 1 : 0);
    await axios
      .post(baseUrl, f)
      .then((response) => {
        if (response.data.error) {
          setVariant("danger");
          setShow(true);
          setMessage(response.data.message);
        } else {
          window.location.href = "#/users";
        }
      })
      .catch((error) => {
        setVariant("danger");
        setShow(true);
        setMessage(error.response.data.message);
      });
  };

  const editUser = async () => {
    var f = new FormData();
    let baseUrl = process.env.REACT_APP_WEB_SERVICES + "editUser.php";
    f.append("name", userSelected.name);
    f.append("lastname", userSelected.lastname);
    f.append("username", userSelected.username);
    f.append("isAdmin", userSelected.isAdmin ? 1 : 0);
    await axios
      .post(baseUrl, f, { params: { id: userSelected.id } })
      .then((response) => {
        if (response.data.error) {
          setVariant("danger");
          setShow(true);
          setMessage(response.data.message);
        } else {
          window.location.href = "#/users";
        }
      })
      .catch((error) => {
        setVariant("danger");
        setShow(true);
        setMessage(error.response.data.message);
      });
  };

  useEffect(() => {
    if (id) {
      getUser(id);
    }
  }, [id]);

  return (
    <>
      {show && (
        <Alert variant={variant} onClose={() => setShow(false)} dismissible>
          <Alert.Heading>{t(message)}</Alert.Heading>
        </Alert>
      )}
      {id ? <h4>{t("userEditTitle")}</h4> : <h4>{t("userAddTitle")}</h4>}
      <div style={{ textAlign: "left" }} className="container-lg">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-2">
            <Form.Group as={Col} md="6" controlId="validationCustom01">
              <Form.Label>{t("name")}</Form.Label>
              <Form.Control
                required
                type="text"
                name="name"
                value={userSelected.name}
                placeholder={t("namePlaceholder")}
                onChange={(e) => {
                  setUserSelected({
                    ...userSelected,
                    name: e.target.value,
                  });
                }}
              ></Form.Control>
              <Form.Control.Feedback>{t("looksGood")}</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                {t("nameRequired")}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationCustom02">
              <Form.Label>{t("lastname")}</Form.Label>
              <Form.Control
                required
                type="text"
                name="lastname"
                value={userSelected.lastname}
                placeholder={t("lastnamePlaceholder")}
                onChange={(e) => {
                  setUserSelected({
                    ...userSelected,
                    lastname: e.target.value,
                  });
                }}
              />
              <Form.Control.Feedback>{t("looksGood")}</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                {t("lastnameRequired")}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-2">
            <Form.Group as={Col} md="6" controlId="validationCustomUsername">
              <Form.Label>{t("username")}</Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                <Form.Control
                  type="text"
                  name="username"
                  value={userSelected.username}
                  placeholder={t("usernamePlaceholder")}
                  aria-describedby="inputGroupPrepend"
                  required
                  onChange={(e) => {
                    setUserSelected({
                      ...userSelected,
                      username: e.target.value,
                    });
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  {t("usernameRequired")}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationCustom03">
              <Form.Label></Form.Label>
              <FormCheck
                id="custom-switch"
                name="isAdmin"
                type="switch"
                checked={switchState}
                label={t("isAdmin")}
                onChange={(e) => {
                  setUserSelected({
                    ...userSelected,
                    isAdmin: e.target.checked,
                  });
                  setSwitchState(!switchState);
                }}
              />
            </Form.Group>
          </Row>

          <Button
            className="float-end m-3"
            variant="outline-danger"
            onClick={() => {
              window.location.href = "#/users";
            }}
          >
            {t("cancel")}
          </Button>
          <Button
            type="submit"
            className="float-end m-3"
            variant="outline-success"
          >
            {t("save")}
          </Button>
        </Form>
      </div>
    </>
  );
}
