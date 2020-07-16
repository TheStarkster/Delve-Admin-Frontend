import React,{ Component } from "react";
import {
    Row,
    Col,
    FormGroup,
    Input,
} from "reactstrap";

export default class Transfers extends Component {
    constructor(props){
        super(props);
        this.state = {
          name: "",
          origin: "",
          destination: "",
          mode: "",
          vehicleNumber: "",
          driverName: "",
          distance: "",
          driverPhone: "",
          journeyTime: "",
          transferDate: "",
        };
    }

    returnState = () => {
        return this.state
    }
    render() {
        return (
          <Col md="12">
            <Col md="12" className="category-col">
              <label>Transfer Name</label>
              <FormGroup>
                <Row>
                  <Col md="12">
                    <Input
                      type="text"
                      placeholder="Transfer Name"
                      value={this.state.name}
                      onChange={(e) => {
                        this.setState({
                          name: e.target.value,
                        });
                      }}
                    ></Input>
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col md="12">
                    <label>Transfer Date</label>
                    <Input
                      type="datetime-local"
                      value={this.state.transferDate}
                      onChange={(e) => {
                        this.setState({
                          transferDate: e.target.value,
                        });
                      }}
                    ></Input>
                  </Col>
                </Row>
              </FormGroup>
              <Row>
                <Col md="6">
                  <label>Mode of Transfer</label>
                  <FormGroup>
                    <Row>
                      <Col md="12">
                        <Input
                          type="text"
                          placeholder="Vehicle Type"
                          value={this.state.mode}
                          onChange={(e) => {
                            this.setState({
                              mode: e.target.value,
                            });
                          }}
                        ></Input>
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
                <Col md="6">
                  <label>Vehicle Number</label>
                  <FormGroup>
                    <Row>
                      <Col md="12">
                        <Input
                          type="text"
                          placeholder="Vehicle Number"
                          value={this.state.vehicleNumber}
                          onChange={(e) => {
                            this.setState({
                              vehicleNumber: e.target.value,
                            });
                          }}
                        ></Input>
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="6">
                  <label>Driver Name</label>
                  <FormGroup>
                    <Row>
                      <Col md="12">
                        <Input
                          type="text"
                          placeholder="Name"
                          value={this.state.driverName}
                          onChange={(e) => {
                            this.setState({
                              driverName: e.target.value,
                            });
                          }}
                        ></Input>
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
                <Col md="6">
                  <label>Driver Phone</label>
                  <FormGroup>
                    <Row>
                      <Col md="12">
                        <Input
                          type="number"
                          placeholder="Phone Number"
                          value={this.state.driverPhone}
                          onChange={(e) => {
                            this.setState({
                              driverPhone: e.target.value,
                            });
                          }}
                        ></Input>
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="6">
                  <label>Origin</label>
                  <FormGroup>
                    <Row>
                      <Col md="12">
                        <Input
                          type="text"
                          placeholder="Location"
                          value={this.state.origin}
                          onChange={(e) => {
                            this.setState({
                              origin: e.target.value,
                            });
                          }}
                        ></Input>
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
                <Col md="6">
                  <label>Destination</label>
                  <FormGroup>
                    <Row>
                      <Col md="12">
                        <Input
                          type="text"
                          placeholder="Location"
                          value={this.state.destination}
                          onChange={(e) => {
                            this.setState({
                              destination: e.target.value,
                            });
                          }}
                        ></Input>
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="6">
                  <label>Total Distance</label>
                  <FormGroup>
                    <Row>
                      <Col md="12">
                        <Input
                          type="text"
                          placeholder="Distance (Kms)"
                          value={this.state.distance}
                          onChange={(e) => {
                            this.setState({
                              distance: e.target.value,
                            });
                          }}
                        ></Input>
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
                <Col md="6">
                  <label>Journey Time</label>
                  <FormGroup>
                    <Row>
                      <Col md="12">
                        <Input
                          type="text"
                          placeholder="Time"
                          value={this.state.journeyTime}
                          onChange={(e) => {
                            this.setState({
                              journeyTime: e.target.value,
                            });
                          }}
                        ></Input>
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
              </Row>
            </Col>
          </Col>
        );

    }
}