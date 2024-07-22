import React, { useState, useEffect } from "react";
import {
  Alert,
  Button,
  Col,
  Form,
  FormCheck,
  ListGroup,
  Row,
  Table,
} from "react-bootstrap";
import axios from "axios";
import { useTranslation } from "react-i18next";

import "../Forms.scss";
import { useParams } from "react-router-dom";

export default function AddEditGroup() {
  const { t } = useTranslation("groups");
  const { id } = useParams();

  const [variant, setVariant] = useState([]);
  const [message, setMessage] = useState([]);
  const [userList, setUserList] = useState([]);
  const [graphicList, setGraphicList] = useState([]);
  const [validated, setValidated] = useState(false);
  const [show, setShow] = useState(false);
  const [switchState, setSwitchState] = useState(false);

  const [groupSelected, setGroupSelected] = useState({
    id: "",
    name: "",
    users: [],
    graphics: [],
  });

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() === true) {
      if (groupSelected.users.length === 0) {
        setVariant("danger");
        setShow(true);
        setMessage(t("selectOneUser"));
      } else {
        if (groupSelected.graphics.length === 0) {
          setVariant("danger");
          setShow(true);
          setMessage(t("selectOneGraphic"));
        } else {
          if (id) {
            editGroup();
          } else {
            createGroup();
          }
        }
      }
    }

    setValidated(true);
  };

  const getGroup = async (id) => {
    let baseUrl = process.env.REACT_APP_WEB_SERVICES + "groupById.php?id=" + id;
    await axios
      .get(baseUrl)
      .then((response) => {
        setGroupSelected(response.data);
      })
      .catch((error) => {
        setVariant("danger");
        setShow(true);
        setMessage(error.response.data.message);
      });
  };

  const getUsers = async () => {
    let baseUrl = process.env.REACT_APP_WEB_SERVICES + "getUsers.php";
    await axios
      .get(baseUrl)
      .then((response) => {
        setUserList(response.data);
      })
      .catch((error) => {
        setVariant("danger");
        setShow(true);
        setMessage(error.response.data.message);
      });
  };

  const getGraphics = async () => {
    let baseUrl = process.env.REACT_APP_WEB_SERVICES + "getGraphics.php";
    await axios
      .get(baseUrl)
      .then((response) => {
        setGraphicList(response.data);
      })
      .catch((error) => {
        setVariant("danger");
        setShow(true);
        setMessage(error.response.data.message);
      });
  };

  const createGroup = async () => {
    let baseUrl = process.env.REACT_APP_WEB_SERVICES + "newGroup.php";
    var f = new FormData();
    f.append("name", groupSelected.name);
    for (var i = 0; i < groupSelected.users.length; i++) {
      f.append("users[]", groupSelected.users[i]);
    }
    for (var i = 0; i < groupSelected.graphics.length; i++) {
      f.append("graphics[]", groupSelected.graphics[i]);
    }
    await axios
      .post(baseUrl, f)
      .then((response) => {
        if (response.data.error) {
          setVariant("danger");
          setShow(true);
          setMessage(response.data.message);
        } else {
          window.location.href = "#/groups";
        }
      })
      .catch((error) => {
        setVariant("danger");
        setShow(true);
        setMessage(error.response.data.message);
      });
  };

  const editGroup = async () => {
    var f = new FormData();
    let baseUrl = process.env.REACT_APP_WEB_SERVICES + "editGroup.php";
    f.append("name", groupSelected.name);
    for (var i = 0; i < groupSelected.users.length; i++) {
      f.append("users[]", groupSelected.users[i]);
    }
    for (var i = 0; i < groupSelected.graphics.length; i++) {
      f.append("graphics[]", groupSelected.graphics[i]);
    }
    await axios
      .post(baseUrl, f, { params: { id: groupSelected.id } })
      .then((response) => {
        if (response.data.error) {
          setVariant("danger");
          setShow(true);
          setMessage(response.data.message);
        } else {
          window.location.href = "#/groups";
        }
      })
      .catch((error) => {
        setVariant("danger");
        setShow(true);
        setMessage(error.response.data.message);
      });
  };

  const editarUserList = (id) => {
    let index = groupSelected.users.indexOf(id);
    if (index === -1) {
      groupSelected.users.push(id);
    } else {
      groupSelected.users.splice(index, 1);
    }
  };

  const editarGraphicList = (id) => {
    let index = groupSelected.graphics.indexOf(id);
    if (index === -1) {
      groupSelected.graphics.push(id);
    } else {
      groupSelected.graphics.splice(index, 1);
    }
  };

  useEffect(() => {
    if (id) {
      getGroup(id);
    }
  }, [id]);

  useEffect(() => {
    getUsers();
    getGraphics();
  }, []);

  return (
    <>
      {show && (
        <Alert variant={variant} onClose={() => setShow(false)} dismissible>
          <Alert.Heading>{t(message)}</Alert.Heading>
        </Alert>
      )}
      {id ? <h4>{t("groupEditTitle")}</h4> : <h4>{t("groupAddTitle")}</h4>}

      <div style={{ textAlign: "left" }} className="container-lg">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-4">
            <Form.Group as={Col} md="6" controlId="validationCustom01">
              <Form.Label>{t("name")}</Form.Label>
              <Form.Control
                required
                type="text"
                name="name"
                value={groupSelected.name}
                placeholder={t("namePlaceholder")}
                onChange={(e) => {
                  setGroupSelected({
                    ...groupSelected,
                    name: e.target.value,
                  });
                }}
              ></Form.Control>
              <Form.Control.Feedback>{t("looksGood")}</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                {t("nameRequired")}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-4">
            <Form.Group as={Col} md="6">
              <Form.Label>{t("usersGroup")}</Form.Label>
              <ListGroup>
                {userList.map((user) => (
                  <ListGroup.Item
                    key={`user_${user.id}`}
                    className="d-flex flex-row "
                  >
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">
                        {user.name} {user.lastname}
                      </div>
                      {user.username}
                    </div>
                    <FormCheck
                      id={`custom-switch-user_${user.id}`}
                      label={t("belongs")}
                      type="switch"
                      defaultChecked={groupSelected.users.includes(user.id)}
                      onChange={(e) => {
                        editarUserList(user.id);
                        //setSwitchState(!switchState);
                      }}
                    />
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Form.Group>
            <Form.Group as={Col} md="6">
              <Form.Label>{t("graphicsGroup")}</Form.Label>
              <ListGroup>
                {graphicList.map((g) => (
                  <ListGroup.Item
                    key={`graphic_${g.id}`}
                    className="d-flex flex-row "
                  >
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">{g.title}</div>
                    </div>
                    <FormCheck
                      id={`custom-switch-graphic_${g.id}`}
                      label={t("accessible")}
                      type="switch"
                      defaultChecked={groupSelected.graphics.includes(g.id)}
                      onChange={(e) => {
                        editarGraphicList(g.id);
                        //setSwitchState(!switchState);
                      }}
                    />
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Form.Group>
          </Row>
          <Button
            className="float-end m-3"
            variant="outline-danger"
            onClick={() => {
              window.location.href = "#/groups";
            }}
          >
            {t("cancel")}
          </Button>
          <Button
            type="submit"
            variant="outline-success"
            className="float-end m-3"
          >
            {t("save")}
          </Button>
        </Form>
      </div>
    </>
  );
}
