import React, { useState } from "react";
import Editor from "../components/sub/Editor";
import Autocomplete from "../components/sub/autosuggest";
import CategoryChips from "../components/sub/categorychips";
import NotificationAlert from "react-notification-alert";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Modal,
  Table,
} from "reactstrap";
const s26 = {
  width: "100%",
};

const s50 = {
  marginLeft: "15px",
  marginTop: "14px",
};

class ManageEvents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      createNewRepresentative: false,
      Representatives: [
        { Name: "Gurkaran Singh", id: 1 },
        { Name: "Ankit Yadav", id: 1 },
      ],
      RepresentativesCategory: [],
      TicketsSame: false,
    };
  }
  render() {
    return (
      <React.Fragment>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h2">Manage Events</CardTitle>
                  <h5 className="card-category">Create Event</h5>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col md="6">
                        <FormGroup>
                          <label>Event Name</label>
                          <Input placeholder="Event Name" type="text" />
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup>
                          <label>Event By</label>
                          <Input placeholder="Event By" type="text" />
                        </FormGroup>
                      </Col>
                      <Col md="3">
                        <FormGroup>
                          <label>Event From</label>
                          <Input type="date" />
                        </FormGroup>
                      </Col>
                      <Col md="3">
                        <FormGroup>
                          <label>Event To</label>
                          <Input type="date" />
                        </FormGroup>
                      </Col>
                      <Col md="3">
                        <FormGroup>
                          <label>Venue Name</label>
                          <Input placeholder="Full Name" type="text" />
                        </FormGroup>
                      </Col>
                      <Col md="3">
                        <FormGroup>
                          <label>Venue Location Url</label>
                          <Input placeholder="Url" type="text" />
                        </FormGroup>
                      </Col>
                      <Col md="3">
                        <label>Pick File</label>
                        <div className="custom-file mb-2">
                          <Input type="file" className="custom-file-input" />
                          <label
                            className="custom-file-label"
                            htmlFor="customFileThumbanail"
                          >
                            Choose Plack Card
                          </label>
                        </div>
                      </Col>
                      <Col md="3">
                        <label>Pick File</label>
                        <div className="custom-file mb-2">
                          <Input type="file" className="custom-file-input" />
                          <label
                            className="custom-file-label"
                            htmlFor="customFileThumbanail"
                          >
                            Choose Event Image
                          </label>
                        </div>
                      </Col>
                      <Col md="3">
                        <FormGroup>
                          <label>Country</label>
                          <Input
                            placeholder="Full Name"
                            type="Country"
                            value="India"
                          />
                        </FormGroup>
                      </Col>
                      <Col md="3">
                        <FormGroup>
                          <label>State</label>
                          <Input placeholder="Choose State" type="text" />
                        </FormGroup>
                      </Col>

                      <Col md="12">
                        <label>Welcome Note</label>
                        <Editor />
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h2">Event Representatives</CardTitle>
                  <h5 className="card-category">Add Representatives</h5>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col md="6">
                      {this.state.createNewRepresentative ? (
                        <Col md="12">
                          <FormGroup>
                            <label>New Representative</label>
                            <Input type="text" placeholder="Name"></Input>
                          </FormGroup>
                          <FormGroup>
                            <label>Phone Number</label>
                            <div
                              style={{
                                display: "flex",
                              }}
                            >
                              <Input
                                name="search"
                                className="form-control"
                                style={{
                                  flex: "2",
                                  marginTop: "4px",
                                }}
                                placeholder="Phone Number"
                              />
                              <button
                                style={{
                                  marginLeft: "15px",
                                }}
                                class="btn btn-success"
                                onClick={(e) => {
                                  e.preventDefault();
                                  this.setState({
                                    createNewRepresentative: !this.state
                                      .createNewRepresentative,
                                  });
                                }}
                              >
                                Save
                              </button>
                            </div>
                          </FormGroup>
                        </Col>
                      ) : (
                        <Col md="12" className="category-col">
                          <label>Representative Name</label>
                          <form
                            class="form-inline d-flex flex-row flex-fill justify-content-start"
                            style={s26}
                          >
                            <div
                              className="form-group d-inline mb-2"
                              style={{ flex: "1" }}
                            >
                              <Autocomplete
                                suggestions={this.state.Representatives}
                                id={"category-suggest"}
                                categoryChipHit={this.categoryChipHit}
                                ref={this.categoryAutocompleteRef}
                              />
                            </div>
                            <div class="form-group">
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  this.setState({
                                    createNewRepresentative: !this.state
                                      .createNewRepresentative,
                                  });
                                }}
                                className="btn btn-success"
                                style={s50}
                              >
                                + New
                              </button>
                            </div>
                          </form>
                          <CategoryChips
                            ref={this.categoryRef}
                            removeId={this.categoryIdfromHiddenField}
                          />
                        </Col>
                      )}
                      <Col md="12" className="category-col">
                        <label>Category Name</label>
                        <form
                          class="form-inline d-flex flex-row flex-fill justify-content-start"
                          style={s26}
                        >
                          <div
                            className="form-group d-inline mb-2"
                            style={{ flex: "1" }}
                          >
                            <Autocomplete
                              suggestions={this.state.Representatives}
                              id={"category-suggest"}
                              categoryChipHit={this.categoryChipHit}
                              ref={this.categoryAutocompleteRef}
                            />
                          </div>
                          <div class="form-group">
                            <button
                              class="btn btn-success"
                              type="button"
                              style={s50}
                              data-toggle="modal"
                              data-target="#CategoryModal"
                            >
                              + New
                            </button>
                          </div>
                        </form>
                        <CategoryChips
                          ref={this.categoryRef}
                          removeId={this.categoryIdfromHiddenField}
                        />
                      </Col>
                    </Col>
                    <Col md="6">
                      <Table className="tablesorter" responsive>
                        <thead className="text-primary">
                          <tr>
                            <th>Representative Name</th>
                            <th>Category</th>
                            <th className="text-center">Actions</th>
                          </tr>
                        </thead>
                      </Table>
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
                  <CardTitle tag="h2">Event Attendies</CardTitle>
                  <h5 className="card-category">Add Attendies</h5>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col md="6">
                        <Row>
                          <Col md="12">
                            <FormGroup>
                              <label>Attendee Full Name</label>
                              <Input type="text" placeholder="Name" />
                            </FormGroup>
                          </Col>
                          <Col md="12">
                            <FormGroup>
                              <label>Attendee Phone</label>
                              <Input type="number" placeholder="Phone" />
                            </FormGroup>
                          </Col>
                          <Col md="12">
                            <FormGroup>
                              <label>Attendee Email</label>
                              <Input type="email" placeholder="Email" />
                            </FormGroup>
                          </Col>
                          <Col md="12">
                            <FormGroup>
                              <label>Attendee Location</label>
                              <Input type="text" placeholder="Location" />
                            </FormGroup>
                          </Col>
                          <Col md="12">
                            <Col md="12" className="category-col">
                              <label>Arriving Ticket</label>
                              <FormGroup>
                                <Row>
                                  <Col md="6">
                                    <Input
                                      type="text"
                                      placeholder="Ticket From"
                                    ></Input>
                                  </Col>
                                  <Col md="6">
                                    <Input
                                      type="text"
                                      placeholder="Ticket To"
                                    ></Input>
                                  </Col>
                                </Row>
                              </FormGroup>
                              <FormGroup>
                                <Row>
                                  <Col md="12">
                                    <div className="custom-file mb-2">
                                      <Input
                                        type="file"
                                        className="custom-file-input"
                                        id="ticket-file"
                                      />
                                      <label
                                        className="custom-file-label"
                                        htmlFor="customFileThumbanail"
                                      >
                                        Choose Ticket File
                                      </label>
                                    </div>
                                  </Col>
                                </Row>
                              </FormGroup>
                            </Col>
                          </Col>
                          <Col md="12">
                            <FormGroup>
                              <label class="checkbox">
                                <input
                                  type="checkbox"
                                  value="SameTicketChk"
                                  id="SameTicketChkId"
                                  onChange={() => {
                                    this.setState({
                                      TicketsSame: !this.state.TicketsSame,
                                    });
                                  }}
                                  style={{
                                    marginRight: "8px",
                                  }}
                                />
                                Same Ticket as Arriving Ticket
                              </label>
                            </FormGroup>
                          </Col>
                          <Col md="12">
                            <fieldset disabled={this.state.TicketsSame}>
                              <Col md="12" className="category-col">
                                <label>
                                  Departing Ticket
                                  {this.state.TicketsSame ? " - Disabled" : ""}
                                </label>
                                <FormGroup>
                                  <Row>
                                    <Col md="6">
                                      <Input
                                        type="text"
                                        placeholder="Ticket From"
                                      ></Input>
                                    </Col>
                                    <Col md="6">
                                      <Input
                                        type="text"
                                        placeholder="Ticket To"
                                      ></Input>
                                    </Col>
                                  </Row>
                                </FormGroup>
                                <FormGroup>
                                  <Row>
                                    <Col md="12">
                                      <div className="custom-file mb-2">
                                        <Input
                                          type="file"
                                          className="custom-file-input"
                                          id="ticket-file"
                                        />
                                        <label
                                          className="custom-file-label"
                                          htmlFor="customFileThumbanail"
                                        >
                                          Choose Ticket File
                                        </label>
                                      </div>
                                    </Col>
                                  </Row>
                                </FormGroup>
                              </Col>
                            </fieldset>
                          </Col>
                          <Col md="12" className="d-flex justify-content-end">
                            <Button
                              color="success"
                              className="md-auto"
                              disabled
                            >
                              Cancel Update
                            </Button>
                            <Button color="success" className="md-auto">
                              Add
                            </Button>
                          </Col>
                        </Row>
                      </Col>
                      <Col md="6">
                        <Table className="tablesorter" responsive>
                          <thead className="text-primary">
                            <tr>
                              <th>Attendee Name</th>
                              <th>Attendee Phone</th>
                              <th className="text-center">Actions</th>
                            </tr>
                          </thead>
                        </Table>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h2">Event Transfers</CardTitle>
                  <h5 className="card-category">Create Transfers</h5>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col md="6">
                        <Row>
                          <Col md="12">
                            <Col md="12" className="category-col">
                              <label>First Day Transfer</label>
                              <FormGroup>
                                <Row>
                                  <Col md="12">
                                    <Input type="datetime-local"></Input>
                                  </Col>
                                </Row>
                              </FormGroup>
                              <hr
                                style={{
                                  backgroundColor: "#ffffff14",
                                }}
                              />
                              <Row>
                                <Col md="6">
                                  <label>Mode of Transfer</label>
                                  <FormGroup>
                                    <Row>
                                      <Col md="12">
                                        <Input
                                          type="text"
                                          placeholder="Vehicle Type"
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
                                          type="number"
                                          placeholder="Location"
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
                                        ></Input>
                                      </Col>
                                    </Row>
                                  </FormGroup>
                                </Col>
                              </Row>
                            </Col>
                          </Col>
                        </Row>
                      </Col>
                      <Col md="6">
                        <Row>
                          <Col md="12">
                            <Col md="12" className="category-col">
                              <label>Last Day Transfer</label>
                              <FormGroup>
                                <Row>
                                  <Col md="12">
                                    <Input type="datetime-local"></Input>
                                  </Col>
                                </Row>
                              </FormGroup>
                              <hr
                                style={{
                                  backgroundColor: "#ffffff14",
                                }}
                              />
                              <Row>
                                <Col md="6">
                                  <label>Mode of Transfer</label>
                                  <FormGroup>
                                    <Row>
                                      <Col md="12">
                                        <Input
                                          type="text"
                                          placeholder="Vehicle Type"
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
                                          type="number"
                                          placeholder="Location"
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
                                        ></Input>
                                      </Col>
                                    </Row>
                                  </FormGroup>
                                </Col>
                              </Row>
                            </Col>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <label>Transfer Allowance</label>
                        <div className="scrollable-table">
                          <Table className="tablesorter" responsive>
                            <tbody>
                              <tr>
                                <td>Attendee Full Name</td>
                                <td>
                                  <div class="custom-control custom-checkbox">
                                    <input
                                      type="checkbox"
                                      class="custom-control-input"
                                      id="customCheck1"
                                    />
                                    <label
                                      class="custom-control-label"
                                      for="customCheck1"
                                    >
                                      First Day
                                    </label>
                                  </div>
                                </td>
                                <td>
                                  <div class="custom-control custom-checkbox">
                                    <input
                                      type="checkbox"
                                      class="custom-control-input"
                                      id="customCheck2"
                                    />
                                    <label
                                      class="custom-control-label"
                                      for="customCheck2"
                                    >
                                      Last Day
                                    </label>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>Attendee Full Name</td>
                                <td>
                                  <div class="custom-control custom-checkbox">
                                    <input
                                      type="checkbox"
                                      class="custom-control-input"
                                      id="customCheck1"
                                    />
                                    <label
                                      class="custom-control-label"
                                      for="customCheck1"
                                    >
                                      First Day
                                    </label>
                                  </div>
                                </td>
                                <td>
                                  <div class="custom-control custom-checkbox">
                                    <input
                                      type="checkbox"
                                      class="custom-control-input"
                                      id="customCheck2"
                                    />
                                    <label
                                      class="custom-control-label"
                                      for="customCheck2"
                                    >
                                      Last Day
                                    </label>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>Attendee Full Name</td>
                                <td>
                                  <div class="custom-control custom-checkbox">
                                    <input
                                      type="checkbox"
                                      class="custom-control-input"
                                      id="customCheck1"
                                    />
                                    <label
                                      class="custom-control-label"
                                      for="customCheck1"
                                    >
                                      First Day
                                    </label>
                                  </div>
                                </td>
                                <td>
                                  <div class="custom-control custom-checkbox">
                                    <input
                                      type="checkbox"
                                      class="custom-control-input"
                                      id="customCheck2"
                                    />
                                    <label
                                      class="custom-control-label"
                                      for="customCheck2"
                                    >
                                      Last Day
                                    </label>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>Attendee Full Name</td>
                                <td>
                                  <div class="custom-control custom-checkbox">
                                    <input
                                      type="checkbox"
                                      class="custom-control-input"
                                      id="customCheck1"
                                    />
                                    <label
                                      class="custom-control-label"
                                      for="customCheck1"
                                    >
                                      First Day
                                    </label>
                                  </div>
                                </td>
                                <td>
                                  <div class="custom-control custom-checkbox">
                                    <input
                                      type="checkbox"
                                      class="custom-control-input"
                                      id="customCheck2"
                                    />
                                    <label
                                      class="custom-control-label"
                                      for="customCheck2"
                                    >
                                      Last Day
                                    </label>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>Attendee Full Name</td>
                                <td>
                                  <div class="custom-control custom-checkbox">
                                    <input
                                      type="checkbox"
                                      class="custom-control-input"
                                      id="customCheck1"
                                    />
                                    <label
                                      class="custom-control-label"
                                      for="customCheck1"
                                    >
                                      First Day
                                    </label>
                                  </div>
                                </td>
                                <td>
                                  <div class="custom-control custom-checkbox">
                                    <input
                                      type="checkbox"
                                      class="custom-control-input"
                                      id="customCheck2"
                                    />
                                    <label
                                      class="custom-control-label"
                                      for="customCheck2"
                                    >
                                      Last Day
                                    </label>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>Attendee Full Name</td>
                                <td>
                                  <div class="custom-control custom-checkbox">
                                    <input
                                      type="checkbox"
                                      class="custom-control-input"
                                      id="customCheck1"
                                    />
                                    <label
                                      class="custom-control-label"
                                      for="customCheck1"
                                    >
                                      First Day
                                    </label>
                                  </div>
                                </td>
                                <td>
                                  <div class="custom-control custom-checkbox">
                                    <input
                                      type="checkbox"
                                      class="custom-control-input"
                                      id="customCheck2"
                                    />
                                    <label
                                      class="custom-control-label"
                                      for="customCheck2"
                                    >
                                      Last Day
                                    </label>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </Table>
                        </div>
                      </Col>
                    </Row>
                    <Row className="justify-content-between">
                      <Col md="4" xs="4" className="d-flex align-items-center">
                        <h6>Other Transfers</h6>
                      </Col>
                      <Col md="4" xs="8" className="d-flex justify-content-end">
                        <Button color="success">Create New</Button>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <Table className="tablesorter" responsive>
                          <thead className="text-primary">
                            <tr>
                              <th>Transfer Name</th>
                              <th>Date</th>
                              <th>Origin</th>
                              <th>Destination</th>
                              <th className="text-center">Actions</th>
                            </tr>
                          </thead>
                        </Table>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h2">Event Agendas</CardTitle>
                  <h5 className="card-category">Create Agendas</h5>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col md="6">
                        <Row>
                          <Col md="12">
                            <FormGroup>
                              <label>Agendas Name (Particulars)</label>
                              <Input type="text" placeholder="Particulars" />
                            </FormGroup>
                          </Col>
                          <Col md="6">
                            <FormGroup>
                              <label>Agenda Start Date & Time</label>
                              <Input type="datetime-local" />
                            </FormGroup>
                          </Col>
                          <Col md="6">
                            <FormGroup>
                              <label>Agenda End Date & Time</label>
                              <Input type="datetime-local" />
                            </FormGroup>
                          </Col>
                          <Col md="12">
                            <FormGroup>
                              <label>Agenda Venue</label>
                              <Input type="text" placeholder="Venue" />
                            </FormGroup>
                          </Col>
                          <Col md="12">
                            <FormGroup>
                              <label>Remarks</label>
                              <Input
                                type="text"
                                placeholder="Remarks/Dress Code"
                              />
                            </FormGroup>
                          </Col>
                          <Col md="12" className="d-flex justify-content-end">
                            <Button
                              color="success"
                              className="md-auto"
                              disabled
                            >
                              Cancel Update
                            </Button>
                            <Button color="success" className="md-auto">
                              Add
                            </Button>
                          </Col>
                        </Row>
                      </Col>
                      <Col md="6">
                        <Table className="tablesorter" responsive>
                          <thead className="text-primary">
                            <tr>
                              <th>Agenda Name</th>
                              <th>Start</th>
                              <th>End</th>
                              <th>Venue</th>
                              <th className="text-center">Actions</th>
                            </tr>
                          </thead>
                        </Table>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

export default ManageEvents;
