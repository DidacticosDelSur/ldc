//  /src/Navbar.js
import React, { Component } from "react";
import {
  Alert,
  Button,
  Col,
  Form,
  FormCheck,
  ListGroup,
  Row,
} from "react-bootstrap";

import { withTranslation } from "react-i18next";
import axios from "axios";

class MyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupSelected: {
        id: "",
        name: "",
        users: [],
        graphics: [],
      },
      variant: "",
      message: "",
      validated: false,
      show: false,
      id: 0,
      userList: [],
      graphicList: [],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    /*this.getGraphic = this.getGraphic.bind(this);
    this.createGraphic = this.createGraphic.bind(this);
    this.editGroup = this.editGroup.bind(this);*/
  }

  componentDidMount() {
    if (this.props.id) {
      this.state.groupSelected.id = this.props.id;
      this.state.groupSelected.name = this.props.name;
      this.state.groupSelected.users = this.props.users;
      this.state.groupSelected.graphics = this.props.graphics;
    }

    this.getUsers();
    this.getGraphics();
  }

  componentDidUpdate() {
    if (this.props.id) {
      this.state.groupSelected.id = this.props.id;
      this.state.groupSelected.name = this.props.name;
      this.state.groupSelected.users = this.props.users;
      this.state.groupSelected.graphics = this.props.graphics;
    }
  }

  handleSubmit(event) {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() === true) {
      if (this.state.groupSelected.users.length === 0) {
        this.setState({
          variant: "danger",
          show: true,
          message: "selectOneUser",
        });
      } else {
        if (this.state.groupSelected.graphics.length === 0) {
          this.setState({
            variant: "danger",
            show: true,
            message: "selectOneGraphic",
          });
        } else {
          if (this.state.groupSelected.id) {
            this.editGroup();
          } else {
            this.createGroup();
          }
        }
      }
    }
    this.setState({ validated: true });
  }
  /* 
  async getGroup(id) {
    let baseUrl = process.env.REACT_APP_WEB_SERVICES + "groupById.php?id=" + id;
    await axios
      .get(baseUrl)
      .then((response) => {
        this.setState({
          groupSelected: response.data,
        });
      })
      .catch((error) => {
        this.setState({
          variant: "danger",
          show: true,
          message: error.response.data.message,
        });
      });
  }
 */
  async getUsers() {
    let baseUrl = process.env.REACT_APP_WEB_SERVICES + "getUsers.php";
    await axios
      .get(baseUrl)
      .then((response) => {
        this.setState({
          userList: response.data,
        });
      })
      .catch((error) => {
        this.setState({
          variant: "danger",
          show: true,
          message: error.response.data.message,
        });
      });
  }

  async getGraphics() {
    let baseUrl = process.env.REACT_APP_WEB_SERVICES + "getGraphics.php";
    await axios
      .get(baseUrl)
      .then((response) => {
        this.setState({
          graphicList: response.data,
        });
      })
      .catch((error) => {
        this.setState({
          variant: "danger",
          show: true,
          message: error.response.data.message,
        });
      });
  }

  async createGroup() {
    let baseUrl = process.env.REACT_APP_WEB_SERVICES + "newGroup.php";
    var f = new FormData();
    f.append("name", this.state.groupSelected.name);
    for (var i = 0; i < this.state.groupSelected.users.length; i++) {
      f.append("users[]", this.state.groupSelected.users[i]);
    }
    for (var i = 0; i < this.state.groupSelected.graphics.length; i++) {
      f.append("graphics[]", this.state.groupSelected.graphics[i]);
    }
    await axios
      .post(baseUrl, f)
      .then((response) => {
        if (response.data.error) {
          this.setState({
            variant: "danger",
            show: true,
            message: response.data.message,
          });
        } else {
          window.location.href = "#/groups";
        }
      })
      .catch((error) => {
        this.setState({
          variant: "danger",
          show: true,
          message: error.response.data.message,
        });
      });
  }

  async editGroup(id) {
    var f = new FormData();
    let baseUrl = process.env.REACT_APP_WEB_SERVICES + "editGroup.php";
    f.append("name", this.state.groupSelected.name);
    for (var i = 0; i < this.state.groupSelected.users.length; i++) {
      f.append("users[]", this.state.groupSelected.users[i]);
    }
    for (var i = 0; i < this.state.groupSelected.graphics.length; i++) {
      f.append("graphics[]", this.state.groupSelected.graphics[i]);
    }
    await axios
      .post(baseUrl, f, {
        params: { id: this.state.groupSelected.id },
      })
      .then((response) => {
        if (response.data.error) {
          this.setState({
            variant: "danger",
            show: true,
            message: response.data.message,
          });
        } else {
          window.location.href = "#/groups";
        }
      })
      .catch((error) => {
        this.setState({
          variant: "danger",
          show: true,
          message: error.response.data.message,
        });
      });
  }

  editarUserList(id) {
    let index = this.state.groupSelected.users.indexOf(id);
    if (index === -1) {
      this.state.groupSelected.users.push(id);
    } else {
      this.state.groupSelected.users.splice(index, 1);
    }
  }

  editarGraphicList(id) {
    let index = this.state.groupSelected.graphics.indexOf(id);
    if (index === -1) {
      this.state.groupSelected.graphics.push(id);
    } else {
      this.state.groupSelected.graphics.splice(index, 1);
    }
  }

  updateName(val) {
    this.state.groupSelected.name = val;
  }

  render() {
    const {
      groupSelected,
      variant,
      message,
      validated,
      show,
      id,
      userList,
      graphicList,
    } = this.state;
    const { t, i18n } = this.props;
    const changeLanguage = (lng) => {
      i18n.changeLanguage(lng);
    };

    return (
      <>
        {this.state.show && (
          <Alert
            variant={variant}
            onClose={() => this.setState({ show: false })}
            dismissible
          >
            <Alert.Heading>{t(message)}</Alert.Heading>
          </Alert>
        )}
        {this.state.groupSelected.id ? (
          <h4>{t("groupEditTitle")}</h4>
        ) : (
          <h4>{t("groupAddTitle")}</h4>
        )}

        <div style={{ textAlign: "left" }} className="container-lg">
          <Form noValidate validated={validated} onSubmit={this.handleSubmit}>
            <Row className="mb-4">
              <Form.Group as={Col} md="6" controlId="validationCustom01">
                <Form.Label>{t("name")}</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="name"
                  defaultValue={groupSelected.name}
                  placeholder={t("namePlaceholder")}
                  onChange={(e) => {
                    console.log("antes", groupSelected.name);
                    this.updateName(e.target.value);
                    console.log("despues", groupSelected.name);

                    /*this.state.groupSelected.name = e.
                    target.value;
                     this.setState({
                      ...this.state,
                      groupSelected.name = e.target.value,
                    }); */
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
                          this.editarUserList(user.id);
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
                          this.editarGraphicList(g.id);
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
}

const AEGroupComponent = withTranslation("groups")(MyComponent);
AEGroupComponent.static = MyComponent.static;

export default AEGroupComponent;
