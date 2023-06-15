import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DeleteProduct } from "../network/endpoints/Products";
import { toggleLoading } from "../store/Slices/App/AppSlice";
import Loader from "../components/loader";
import { Table, Button, Alert, Row, Col, Image } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import listProducts from "../store/Slices/Product/ProductFunctions";
import { CreateProduct } from "../network/endpoints/Products";
import { GetAllAdminOders } from "../network/endpoints/Order";

const AdminOrders = () => {
  const app = useSelector((state) => state.app);
  const [userMessage, setUserMessage] = useState("");
  const [allOders, setAllOrders] = useState([]);
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const Load = async () => {
    GetAllAdminOders(userInfo.token).then((response) => {
      setAllOrders(response.data);
    });
    await listProducts(dispatch, "All");
    setTimeout(() => {
      dispatch(toggleLoading(false));
    }, 500);
  };

  const updateProductHandler = (id) => {
    navigate(`/admin/product/${id}/edit`);
  };

  useEffect(() => {
    if (userInfo.isAdmin == false) {
      navigate("/");
    } else {
      Load();
    }
  }, [dispatch, userMessage]);

  return (
    <div className="page-screen my-5">
      <Row className="align-items-center">
        <Col md>ORDERS</Col>
      </Row>
      {userMessage == "" ? (
        ""
      ) : (
        <Alert className="my-5" variant="success">
          {userMessage}
        </Alert>
      )}
      {app.isLoading ? (
        <Loader />
      ) : (
        <Table striped bordered hover responsive="md" className="table-sm my-5">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {allOders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user.username}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice}$</td>
                <td>
                  {order.isPaid ? (
                    <i
                      className="fa-solid fa-check"
                      style={{ color: "green" }}
                    />
                  ) : (
                    <i className="fa-solid fa-xmark" style={{ color: "red" }} />
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    <i
                      className="fa-solid fa-check"
                      style={{ color: "green" }}
                    />
                  ) : (
                    <i className="fa-solid fa-xmark" style={{ color: "red" }} />
                  )}
                </td>
                {/* <td>
                  <Image
                    rounded
                    fluid
                    src={app.serverUrl + product.image}
                    width="50px"
                  />
                </td> */}
                <td className="d-flex align-content-center justify-content-end">
                  <LinkContainer to={`/summary/id:${order._id}`}>
                    <Button variant="light" className="btn-sm">
                      DETAILS
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default AdminOrders;
