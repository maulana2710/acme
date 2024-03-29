import {
  Button,
  Card,
  NavDropdown,
  Container,
  Nav,
  Navbar,
} from "react-bootstrap";
import { BiUserCircle } from "react-icons/bi";
import { BsCart4 } from "react-icons/bs";
import MiniCart from "./MiniCart";
import "../../../style/fadeEffect.css";
import AcmeO2 from "../../../img/AcmeO2.svg";
import React from "react";
import jwt_decode from "jwt-decode";

function ColorSchemesExample({
  SidebarProfile,
  item = [],
  cart = [],
  activeIndex,
  activeSd,
  activeSh,
  openMCart,
  closeMCart,
  mCart,
}) {
  const sessionData = sessionStorage.getItem("user");
  const [userLogin, setUserLogin] = React.useState();
  React.useEffect(() => {
    if (sessionData === null) {
      // console.log(sessionData);
    }else{
      const parseData = JSON.parse(sessionData);
      var decoded = jwt_decode(parseData?.token);
      // console.log(userLogin);
      setUserLogin(decoded?.results[0]);
      
    }
  }, [sessionData])

  return (
    <>
      <Navbar bg="light" variant="light" expand="lg" className="fs-5">
        <Container>
          <Navbar.Brand className="fw-bolder" style={{ width: "10%" }} href="/">
            <img src={AcmeO2} alt="AcmeO2" />
            {/* AcmeO<sup>2</sup> */}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link className={activeIndex ? "active" : ""} href="/">
                Home
              </Nav.Link>
              <NavDropdown title="Product" id="collasible-nav-dropdown">
                <NavDropdown.Item
                  className={activeSd ? "active" : ""}
                  href="/SeriesDepression"
                >
                  Series Depression
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  className={activeSh ? "active" : ""}
                  href="/SeriesHappiness"
                >
                  Series Happiness
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <NavDropdown
                onClick={(e) =>
                  mCart === false ? openMCart(e) : closeMCart(e)
                }
                title={<BsCart4 />}
                id="collasible-nav-dropdown dropdown-button-drop-start"
                key="start"
                drop="start"
              >
                {sessionStorage.length > 0 ? (
                  <div
                    onClick={(e) =>
                      mCart === false ? openMCart(e) : openMCart(e)
                    }
                  >
                    <div className="fs-4 fw-bolder">Keranjang</div>
                    {cart.length === 0 ? (
                      <Card
                        className="d-flex flex-wrap text-center border-0"
                        style={{ width: "22rem" }}
                      >
                        <BsCart4
                          className="w-100 opacity-50"
                          style={{ height: "10em" }}
                        />
                        <h4>Keranjang Kamu Kosong</h4>
                      </Card>
                    ) : (
                      <MiniCart item={item} cart={cart} user={userLogin} />
                    )}

                    <NavDropdown.Divider />
                    <div className="text-center">
                      <NavDropdown.Item
                        href="/Cart"
                        className="w-50 badge bg-primary"
                      >
                        Keranjang
                      </NavDropdown.Item>
                    </div>
                  </div>
                ) : (
                  <Card style={{ width: "16rem" }}>
                    <Card.Body>
                      <Card.Title>Please Login First</Card.Title>
                      <Card.Text className="d-flex justify-content-center">
                        <BsCart4
                          className="opacity-50"
                          style={{ width: "150px", height: "150px" }}
                        />
                      </Card.Text>
                      <NavDropdown.Divider />
                      <Button variant="primary" href="/Login">
                        Login
                      </Button>
                    </Card.Body>
                  </Card>
                )}
              </NavDropdown>
              <div>
                {sessionStorage.length > 0 ? (
                  <Nav.Link onClick={SidebarProfile}>
                    <BiUserCircle className="me-2" />
                    {userLogin?.user_username}
                  </Nav.Link>
                ) : (
                  <Nav.Link href="/Login">
                    <BiUserCircle className="me-2" />
                    Login
                  </Nav.Link>
                )}
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default ColorSchemesExample;
