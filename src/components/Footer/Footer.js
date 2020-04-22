import React from "react";
import { Container, Row, Nav, NavItem, NavLink } from "reactstrap";

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <Container fluid>
          <Nav>
            <NavItem>
              <NavLink href="http://www.delve-serwiz.com/">
                DELVE SERVIZ
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="http://www.delve-serwiz.com/index.php#d_about">
                About Us
              </NavLink>
            </NavItem>
          </Nav>
          <div className="copyright">
            © {new Date().getFullYear()} made with{" "}
            <i className="tim-icons icon-heart-2" /> by{" "}
            <a
              href="https://grevity.in"
              target="_blank"
            >
              Grevity
            </a>{" "}
            for a better web.
          </div>
        </Container>
      </footer>
    );
  }
}

export default Footer;
