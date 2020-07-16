import React, { Component, createRef } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Input,
} from "reactstrap";
import CustomerTable from '../components/sub/customersTable';
import Axios from '../components/sub/axios';
export default class customers extends Component {
    constructor(props){
        super(props)
        this.CustomerTableRef = createRef()
        this.state = {
            customerName:"",
            customerPhone:"",
            customerOrg:"",
            customerEmail:"",
            createdCutomer:true,
        }
    }
  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h2">Manage Customers</CardTitle>
                  <h5 className="card-category">Add new Customers</h5>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col md="6">
                      <label>Customer Name</label>
                      <Input
                        placeholder="Full Name"
                        value={this.state.customerName}
                        onChange={(e) => {
                          this.setState({
                            customerName: e.target.value,
                          });
                        }}
                      />
                    </Col>
                    <Col md="6">
                      <label>Organisation Name</label>
                      <Input
                        placeholder="Name"
                        value={this.state.customerOrg}
                        onChange={(e) => {
                          this.setState({
                            customerOrg: e.target.value,
                          });
                        }}
                      />
                    </Col>
                    <Col md="6">
                      <label>Customer Phone</label>
                      <Input
                        placeholder="Phone"
                        type="number"
                        value={this.state.customerPhone}
                        onChange={(e) => {
                          this.setState({
                            customerPhone: e.target.value,
                          });
                        }}
                      />
                    </Col>
                    <Col md="6">
                      <label>Customer Email</label>
                      <Input
                        placeholder="Email"
                        type="email"
                        value={this.state.customerEmail}
                        onChange={(e) => {
                          this.setState({
                            customerEmail: e.target.value,
                          });
                        }}
                      />
                    </Col>
                  </Row>
                  <Row className="justify-content-between">
                    <Col
                      md="12"
                      xs="12"
                      className="d-flex justify-content-end"
                      style={{ padding: "18px" }}
                    >
                      <Button
                        disabled={!this.state.createdCutomer}
                        color="success"
                        onClick={() => {
                            this.setState({
                                createdCutomer:!this.state.createdCutomer
                            })
                          Axios.post("customer/create", {
                            name: this.state.customerName,
                            organisation: this.state.customerOrg,
                            email: this.state.customerEmail,
                            phone: this.state.customerPhone,
                          }).then((u) => {
                           this.setState({
                             createdCutomer: !this.state.createdCutomer,
                             customerName: "",
                             customerPhone: "",
                             customerOrg: "",
                             customerEmail: "",
                           });
                           this.CustomerTableRef.current.resetTable()
                          });
                        }}
                      >
                        {this.state.createdCutomer ? "Save" : "Saving..."}
                      </Button>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h2">Added Customers</CardTitle>
                </CardHeader>
                <CardBody>
                  <CustomerTable ref={this.CustomerTableRef} />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}
