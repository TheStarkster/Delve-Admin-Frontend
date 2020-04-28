import React from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Table,
  FormGroup,
  Form,
  Input,
  Row,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Dropdown,
  Col,
} from "reactstrap";

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
    };
  }
  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="8">
              <Card>
                <CardHeader>
                  <h5 className="title">Edit Profile</h5>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <label>Full Name</label>
                          <Input placeholder="Name" type="text" />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <label htmlFor="exampleInputEmail1">
                            Email address
                          </label>
                          <Input placeholder="mike@email.com" type="email" />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="6">
                        <FormGroup>
                          <label>Phone Number</label>
                          <Input placeholder="Phone Number" type="number" />
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup>
                          <label>Password</label>
                          <Input placeholder="password" type="password" />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
                <CardFooter>
                  <Button className="btn-fill" color="primary" type="submit">
                    Save
                  </Button>
                </CardFooter>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md="8">
              <Card>
                <CardHeader>
                  <h5 className="title">Create Profile</h5>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <label>Full Name</label>
                          <Input placeholder="Name" type="text" />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <label htmlFor="exampleInputEmail1">
                            Email address
                          </label>
                          <Input placeholder="mike@email.com" type="email" />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="6">
                        <FormGroup>
                          <label>Password</label>
                          <Input placeholder="password" type="password" />
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup>
                          <label>Phone Number</label>
                          <Input placeholder="Phone Number" type="number" />
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup>
                          <label>Role</label>
                          <Dropdown
                            isOpen={this.state.dropdownOpen}
                            toggle={() => {
                              this.setState({
                                dropdownOpen: !this.state.dropdownOpen,
                              });
                            }}
                          >
                            <DropdownToggle>Select Role</DropdownToggle>
                            <DropdownMenu>
                              <DropdownItem header>
                                Roles Available
                              </DropdownItem>
                              <DropdownItem>Super Admin</DropdownItem>
                              <DropdownItem>Admin</DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
                <CardFooter>
                  <Button className="btn-fill" color="primary" type="submit">
                    Create
                  </Button>
                </CardFooter>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md="8">
              <Card>
                <CardHeader>
                  <CardHeader>
                    <h5 className="title">Users List</h5>
                  </CardHeader>
                  <CardBody>
                    <Table className="tablesorter" responsive>
                      <thead className="text-primary">
                        <tr>
                          <th>User Name</th>
                          <th>User Email</th>
                          <th>User Phone</th>
                          <th className="text-center">Actions</th>
                        </tr>
                      </thead>
                    </Table>
                  </CardBody>
                </CardHeader>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default UserProfile;
