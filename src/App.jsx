import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./store";
import { useState } from "react";
import AddTask from "./pages/AddTask";
import EditTask from "./pages/EditTask";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { IoIosCreate, IoIosHome } from "react-icons/io";
import { IoBarChart, IoLogOutOutline } from "react-icons/io5";
import { Navbar, Container, Nav } from "react-bootstrap";
import { logout } from "./features/user/userSlice";

const Layout = ({ children, handleShow }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
     <div>
          <Navbar className="navbar sticky-top" expand="lg">
            <Container className="d-flex justify-content-center align-items-center">
              <Nav className="w-100 justify-content-center">
                <Nav.Link as={Link} to="/">
                  <IoIosHome className="navbar-icon" />
                </Nav.Link>
                <Nav.Link onClick={handleShow}>
                  <IoIosCreate className="navbar-icon" />
                </Nav.Link>
                <Nav.Link>
                  <IoBarChart className="navbar-icon" />
                </Nav.Link>
                <Nav.Link onClick={handleLogout}>
                  <IoLogOutOutline className="navbar-icon" />
                </Nav.Link>
              </Nav>
            </Container>
          </Navbar>
          {children}
        </div>
      );
    };

const AuthGuard = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  if (isAuthenticated === undefined) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);

  const handleClose = () => setShowModal(false);
  const handleEditClose = () => setShowEditModal(false);

  const handleShow = () => setShowModal(true);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/*"
            element={
              <AuthGuard>
                <Layout handleShow={handleShow}>
                  <Routes>
                    <Route
                      index
                      element={
                        <Home
                          setShowEditModal={setShowEditModal}
                          setEditTaskId={setEditTaskId}
                        />
                      }
                    />
                    <Route
                      path="add"
                      element={<AddTask show={showModal} handleClose={handleClose} />}
                    />
                    <Route
                      path="edit/:id"
                      element={
                        <EditTask
                          show={showEditModal}
                          handleClose={handleEditClose}
                          taskId={editTaskId}
                        />
                      }
                    />
                  </Routes>
                  {showModal && <AddTask show={showModal} handleClose={handleClose} />}
                </Layout>
              </AuthGuard>
            }
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
