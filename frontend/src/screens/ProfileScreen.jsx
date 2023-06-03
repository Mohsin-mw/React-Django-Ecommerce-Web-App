import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, Alert } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import whiteLogo from "../assets/logo.svg";
import { UserDetialsUpdate } from "../store/Slices/UserUpdate/UserUpdateFunctions";
const ProfileScreen = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const userDetails = useSelector((state) => state.userUpdate);
  const { user, error } = userDetails;
  const { userInfo } = useSelector((state) => state.user);
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user || !user.name) {
        UserDetialsUpdate(dispatch, "profile", userInfo.token);
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch]);
  const submitHandler = async (e) => {
    e.preventDefault();
    if (password != confirmPassword) {
      setMessage("Password does not match!");
    } else {
    }
  };

  return (
    <div className="page-screen row d-flex justify-content-center align-items-center h-100">
      <Row className="shadow-lg p-3">
        <Col md className="d-flex justify-content-center bg-primary rounded">
          <img
            src={whiteLogo}
            className="img-fluid"
            width="60%"
            alt="Sample image"
          />
        </Col>
        <Col md>
          <div className="d-flex justify-content-center align-items-center flex-column">
            {message && <Alert>{message}</Alert>}
            {error && <Alert>{error}</Alert>}
            <Form
              className="login-form d-flex justify-content-center align-items-start flex-column"
              onSubmit={submitHandler}
            >
              <Form.Group controlId="username">
                <Form.Label>
                  <i className="fa-solid fa-user"></i> Username
                </Form.Label>
                <Form.Control
                  required
                  className="rounded"
                  type="name"
                  placeholder="Enter Username"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>
                  <i className="mx-1 fa-solid fa-envelope"></i>Email Address
                </Form.Label>
                <Form.Control
                  required
                  className="rounded"
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="update-password">
                <Form.Label>
                  <i className="mx-1 fa-solid fa-lock"></i> Password
                </Form.Label>
                <Form.Control
                  className="rounded"
                  type="password"
                  placeholder="Enter Password"
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="update-password-confirm">
                <Form.Label>
                  <i className="mx-1 fa-solid fa-lock"></i> Confirm Password
                </Form.Label>
                <Form.Control
                  className="rounded"
                  type="password"
                  placeholder="Confirm Password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Button className="rounded" type="submit" variant="primary">
                Update
                <i className="mx-2 fa-solid fa-check-double"></i>
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ProfileScreen;
