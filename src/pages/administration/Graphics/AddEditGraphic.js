import React, { useState, useEffect } from "react";
import { Alert, Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import axios from "axios";
import { useTranslation } from "react-i18next";

import "./../../Modal.scss";
import { useParams } from "react-router-dom";

export default function AddEditGraphic() {
  const { t } = useTranslation("graphics");
  const { id } = useParams();

  const [variant, setVariant] = useState([]);
  const [message, setMessage] = useState([]);
  const [validated, setValidated] = useState(false);
  const [show, setShow] = useState(false);

  const [graphicSelected, setGraphicSelected] = useState({
    id: "",
    tile: "",
    menu_title: "",
    token: "",
  });

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() === true) {
      if (id) {
        editGraphic();
      } else {
        createGraphic();
      }
    }

    setValidated(true);
  };

  const getGraphic = async (id) => {
    let baseUrl =
      process.env.REACT_APP_WEB_SERVICES + "getGraphic.php?id=" + id;
    await axios
      .get(baseUrl)
      .then((response) => {
        setGraphicSelected(response.data);
      })
      .catch((error) => {
        setVariant("danger");
        setShow(true);
        setMessage(error.response.data.message);
      });
  };

  const createGraphic = async () => {
    let baseUrl = process.env.REACT_APP_WEB_SERVICES + "newGraphic.php";
    var f = new FormData();
    f.append("title", graphicSelected.title);
    f.append("menu_title", graphicSelected.menu_title);
    f.append("token", graphicSelected.token);
    await axios
      .post(baseUrl, f)
      .then((response) => {
        if (response.data.error) {
          setVariant("danger");
          setShow(true);
          setMessage(response.data.message);
        } else {
          window.location.href = "#/graphics";
        }
      })
      .catch((error) => {
        setVariant("danger");
        setShow(true);
        setMessage(error.response.data.message);
      });
  };

  const editGraphic = async () => {
    var f = new FormData();
    let baseUrl = process.env.REACT_APP_WEB_SERVICES + "editGraphic.php";
    f.append("title", graphicSelected.title);
    f.append("menu_title", graphicSelected.menu_title);
    f.append("token", graphicSelected.token);
    await axios
      .post(baseUrl, f, { params: { id: graphicSelected.id } })
      .then((response) => {
        if (response.data.error) {
          setVariant("danger");
          setShow(true);
          setMessage(response.data.message);
        } else {
          window.location.href = "#/graphics";
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
      getGraphic(id);
    }
  }, [id]);

  return (
    <>
      {show && (
        <Alert variant={variant} onClose={() => setShow(false)} dismissible>
          <Alert.Heading>{t(message)}</Alert.Heading>
        </Alert>
      )}
      {id ? <h4>{t("graphicEditTitle")}</h4> : <h4>{t("graphicAddTitle")}</h4>}
      <div style={{ textAlign: "left" }} className="container-lg">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-2">
            <Form.Group as={Col} md="6" controlId="validationCustom01">
              <Form.Label>{t("title")}</Form.Label>
              <Form.Control
                required
                type="text"
                name="title"
                value={graphicSelected.title}
                placeholder={t("titlePlaceholder")}
                onChange={(e) => {
                  setGraphicSelected({
                    ...graphicSelected,
                    title: e.target.value,
                  });
                }}
              ></Form.Control>
              <Form.Control.Feedback>{t("looksGood")}</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                {t("titleRequired")}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationCustom02">
              <Form.Label>{t("menuTitle")}</Form.Label>
              <Form.Control
                required
                type="text"
                name="menu_title"
                value={graphicSelected.menu_title}
                placeholder={t("menuTitlePlaceholder")}
                onChange={(e) => {
                  setGraphicSelected({
                    ...graphicSelected,
                    menu_title: e.target.value,
                  });
                }}
              />
              <Form.Control.Feedback>{t("looksGood")}</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                {t("menuTitleRequired")}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-2">
            <Form.Group as={Col} md="6" controlId="validationCustomGraphicname">
              <Form.Label>{t("token")}</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="text"
                  name="token"
                  value={graphicSelected.token}
                  placeholder={t("tokenPlaceholder")}
                  aria-describedby="inputGroupPrepend"
                  required
                  onChange={(e) => {
                    setGraphicSelected({
                      ...graphicSelected,
                      token: e.target.value,
                    });
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  {t("tokenRequired")}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Row>

          <Button
            className="float-end m-3"
            variant="outline-danger"
            onClick={() => {
              window.location.href = "#/graphics";
            }}
          >
            {t("cancel")}
          </Button>
          <Button
            variant="outline-success"
            type="submit"
            className="float-end m-3"
          >
            {t("save")}
          </Button>
        </Form>
      </div>
    </>
  );
}
