import React, { createRef } from "react";
import Editor from "../components/sub/Editor";
import Autocomplete from "../components/sub/autosuggest-norm";
import Axios from "../components/sub/axios";
import AutocompleteSimple from "../components/sub/autosuggest";
import CategoryChips from "../components/sub/categorychips";
import Agendas from "../components/sub/agendas";

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
  Table,
} from "reactstrap";
import Transfers from "components/sub/transfers";
import dist from "react-notification-alert";
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
    this.EventAttendies = createRef();
    this.agendaRef = createRef();
    this.countryRef = createRef();
    this.customerRef = createRef();
    this.cityRef = createRef();

    this.representativeNameRef = createRef();
    this.RepresentativeNameAutocompleteRef = createRef();

    this.representativeCategoryRef = createRef();
    this.RepresentativeCategoryAutocompleteRef = createRef();
    this.state = {
      eventId: null,
      eventName: "",
      eventBy: null,
      eventFrom: "",
      eventTo: "",
      venueName: "",
      venueUrl: "",
      eventImage: "",
      eventPlackCardImage: "",
      addedAttendie: true,
      eventPlackCardImageName: "Choose Image File",
      eventImage: "",
      eventImageName: "Choose Image File",
      welcomeNote: "",
      countryId: null,
      cityId: null,
      customerId: null,
      createNewRepresentative: false,
      createNewRepresentativeCategory: false,
      createdNewRepresentativeCategory: true,
      createdRepresentative: true,
      suggestionCities: [],
      sugggestionCustomers: [],
      suggestionCountries: [],
      transfers: [],
      agendas: [],
      currTransferElement: null,
      rIsFilled: true,
      representativePhone: "",
      representativeName: "",
      representativeCategoryName: "",
      Representatives: [],
      EventAttendies: [],
      representativeArr: [],
      RepresentativesCategory: [],
      TicketsSame: false,
      aTicketFileName: "Choose Ticket File",
      dTicketFileName: "Choose Ticket File",
      updatingAgenda: false,
      updatingAttendee: false,
      updatingAgendaObject: null,
      updatingRepresentatives: false,
      updatingRepresentativesNameId: null,
      updatingRepresentativesCategoryId: null,
      updatingAttendeePhone: null,
    };
  }
  createNewTransfer = (data) => {
    var tempTansfers = [];
    tempTansfers = this.state.transfers;
    var transferRef = createRef();
    tempTansfers.push({
      component: (
        <Transfers ref={transferRef} key={this.state.transfers.length + 1} />
      ),
      ref: transferRef,
      isFilled: data ? true : false,
      data: data || {},
    });
    this.setState({
      transfers: tempTansfers,
      rIsFilled: data ? !!this.state.rIsFilled : !this.state.rIsFilled,
    });
  };
  haveAnythingEmpty = (formData) => {
    for (var key in formData) {
      if (formData[key] === "") {
        return true;
      }
    }
    return false;
  };
  setDataToFields = (u) => {
    var data = JSON.parse(u).data;
    this.setState({
      eventId: data.id,
      eventName: data.name,
      eventBy: data.CustomerId,
      eventFrom: new Date(data.liveFrom).toISOString().split("T")[0],
      eventTo: new Date(data.liveTo).toISOString().split("T")[0],
      venueName: data.Locations.name,
      venueUrl: data.Locations.url,
      customerId: data.CustomerId,
      eventPlackCardImageName: data.plackCardImage.split("/")[
        data.plackCardImage.split("/").length - 1
      ],
      eventImageName: data.eventImage.split("/")[
        data.eventImage.split("/").length - 1
      ],
      welcomeNote: data.welcomeNote,
      countryId: data.Locations.CountryId,
      cityId: data.Locations.CityId,
      agendas: data.Agendas.map((a) => {
        a = { ...a, startTime: new Date(a.startDate + "T" + a.startTime) };
        a = { ...a, endTime: new Date(a.startDate + "T" + a.endTime) };
        return a;
      }),
      EventAttendies: data.Attendees,
      representativeArr: data.Representatives_for_Events.map((a) => {
        var obj = {};
        obj["Name"] = a.Employees.name;
        obj["Category"] = a.Representative_Categories.name;
        obj["RepresentativeCategoryId"] = a.RepresentativeCategoryId;
        obj["EmployeeId"] = a.EmployeeId;
        obj["id"] = a.id;
        return obj;
      }),
    });
    data.Transfers.map((elem) => {
      this.createNewTransfer(elem);
    });
    this.countryRef.current.setDataUsingId(this.state.countryId);
    this.cityRef.current.setDataUsingId(this.state.cityId);
    this.customerRef.current.setDataUsingId(this.state.customerId);
  };
  componentWillMount = () => {
    Promise.all([
      Axios.get("/location/country/get-all"),
      Axios.get("/location/city/get-all"),
      Axios.get("/customer/get-all"),
      Axios.get("/representative/category/get-all"),
      Axios.get("/representative/employee/get-all"),
    ]).then(([u, a, d, e, f]) => {
      this.setState({
        suggestionCountries: u.data.map((a) => {
          var b = {};
          b["Name"] = a.name;
          b["id"] = a.id;
          return b;
        }),
        suggestionCities: a.data.map((a) => {
          var b = {};
          b["Name"] = a.name;
          b["id"] = a.id;
          return b;
        }),
        sugggestionCustomers: d.data.map((a) => {
          var b = {};
          b["Name"] = a.name;
          b["id"] = a.id;
          b["Phone"] = a.phone;
          return b;
        }),
        Representatives: f.data.map((a) => {
          var b = {};
          b["Name"] = a.name;
          b["id"] = a.id;
          b["Phone"] = a.phone;
          return b;
        }),
        RepresentativesCategory: e.data.map((a) => {
          var b = {};
          b["Name"] = a.name;
          b["id"] = a.id;
          return b;
        }),
      });
      if (localStorage.getItem("eventDataToUpdate"))
        this.setDataToFields(localStorage.getItem("eventDataToUpdate"));
    });
  };
  categoryChipHit = (val) => {
    this.representativeNameRef.current.addChip(val);
  };
  categoryChipHitAfterRemoving = (val) => {
    this.representativeCategoryRef.current.addChipByremoving(val);
  };
  representativesNameChipHitAfterRemoving = (val) => {
    this.representativeNameRef.current.addChipByremoving(val);
  };
  categoryNameChipHit = (val) => {
    this.representativeCategoryRef.current.addChip(val);
  };
  categoryIdfromHiddenField = (val) => {
    this.RepresentativeNameAutocompleteRef.current.removeId(val);
  };
  categoryIdfromHiddenField_CategoryName = (val) => {
    this.RepresentativeCategoryAutocompleteRef.current.removeId(val);
  };
  submitEvent = (e) => {
    e.preventDefault();
    var eventFormData = new FormData();
    eventFormData.append("name", this.state.eventName);
    eventFormData.append("liveFrom", this.state.eventFrom);
    eventFormData.append("liveTo", this.state.eventFrom);
    eventFormData.append("CustomerId", this.state.eventBy);
    eventFormData.append("PlackCardImage", this.state.eventPlackCardImage);
    eventFormData.append(
      "PlackCardImageName",
      this.state.eventPlackCardImageName
    );
    eventFormData.append("EventImage", this.state.eventImage);
    eventFormData.append("EventImageName", this.state.eventImageName);
    eventFormData.append("CityId", this.state.cityId);
    eventFormData.append("CountryId", this.state.countryId);
    eventFormData.append("url", this.state.venueUrl);
    eventFormData.append("venueName", this.state.venueName);

    if (this.state.eventId) {
      //this is an update condition...
      Axios.put("/events/update/" + this.state.eventId, eventFormData).then(
        (u) => {
        }
      );
    } else {
      Axios.post("/events/create", eventFormData).then((u) => {
        if (u.data.status == "success") {
          var EventId = u.data.EventId;
          //represntatives...
          var representativeTemp = this.state.representativeArr;
          var newRepresentativeArr = representativeTemp.map((obj) => ({
            ...obj,
            EventId: EventId,
          }));
          //event attendies...
          var EventAttendiesTemp = this.state.EventAttendies;
          var newAttendiesObj = EventAttendiesTemp.map((obj) => ({
            ...obj,
            EventId: EventId,
          }));
          //event transfers...
          var transfersTemp = this.state.transfers.map((a) => a.data);
          var newTransferObj = transfersTemp.map((obj) => ({
            ...obj,
            EventId: EventId,
          }));

          //event agendas...
          var eventAgendasTemp = this.state.agendas;
          var newAgendasObj = eventAgendasTemp.map((obj) => ({
            ...obj,
            EventId: EventId,
          }));
          Axios.post("/events/upload", {
            transfersData: newTransferObj,
            attendeesData: newAttendiesObj,
            agendasData: newAgendasObj,
            representatives: newRepresentativeArr,
          }).then((u) => {});
        }
      });
    }
  };
  setCountryId = (id) => {
    this.setState({
      countryId: id,
    });
  };
  setCityId = (id) => {
    this.setState({
      cityId: id,
    });
  };
  setCustomerId = (id) => {
    this.setState({
      eventBy: id,
    });
  };
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
                          <Input
                            placeholder="Event Name"
                            type="text"
                            value={this.state.eventName}
                            onChange={(e) => {
                              this.setState({
                                eventName: e.target.value,
                              });
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup>
                          <label>Event By</label>
                          <Autocomplete
                            suggestions={this.state.sugggestionCustomers}
                            hint={"Customer Name"}
                            marginTop={"0px"}
                            id={"txtEventBy"}
                            paddingBottom={"0px"}
                            ref={this.customerRef}
                            setId={this.setCustomerId}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="3">
                        <FormGroup>
                          <label>Event From</label>
                          <Input
                            type="date"
                            value={this.state.eventFrom}
                            onChange={(e) => {
                              this.setState({
                                eventFrom: e.target.value,
                              });
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="3">
                        <FormGroup>
                          <label>Event To</label>
                          <Input
                            type="date"
                            value={this.state.eventTo}
                            onChange={(e) => {
                              this.setState({
                                eventTo: e.target.value,
                              });
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="3">
                        <FormGroup>
                          <label>Venue Name</label>
                          <Input
                            placeholder="Full Name"
                            type="text"
                            value={this.state.venueName}
                            onChange={(e) => {
                              this.setState({
                                venueName: e.target.value,
                              });
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="3">
                        <FormGroup>
                          <label>Venue Location Url</label>
                          <Input
                            placeholder="Url"
                            type="text"
                            value={this.state.venueUrl}
                            onChange={(e) => {
                              this.setState({
                                venueUrl: e.target.value,
                              });
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="3">
                        <label>Pick Plack Card Image</label>
                        <div className="custom-file mb-2">
                          <Input
                            type="file"
                            className="custom-file-input"
                            onChange={(e) => {
                              this.setState({
                                eventPlackCardImage: e.target.files[0],
                                eventPlackCardImageName: e.target.files[0].name,
                              });
                            }}
                          />
                          <label
                            className="custom-file-label"
                            htmlFor="customFileThumbanail"
                          >
                            {this.state.eventPlackCardImageName}
                          </label>
                        </div>
                      </Col>
                      <Col md="3">
                        <label>Pick Event Image</label>
                        <div className="custom-file mb-2">
                          <Input
                            type="file"
                            className="custom-file-input"
                            onChange={(e) => {
                              this.setState({
                                eventImage: e.target.files[0],
                                eventImageName: e.target.files[0].name,
                              });
                            }}
                          />
                          <label
                            className="custom-file-label"
                            htmlFor="customFileThumbanail"
                          >
                            {this.state.eventImageName}
                          </label>
                        </div>
                      </Col>
                      <Col md="3">
                        <FormGroup>
                          <label>Country</label>
                          <Autocomplete
                            suggestions={this.state.suggestionCountries}
                            hint={"Country Name"}
                            marginTop={"0px"}
                            id={"txtCountrySuggest"}
                            ref={this.countryRef}
                            setId={this.setCountryId}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="3">
                        <FormGroup>
                          <label>City</label>
                          <Autocomplete
                            suggestions={this.state.suggestionCities}
                            hint={"City Name"}
                            marginTop={"0px"}
                            id={"txtCitySuggest"}
                            ref={this.cityRef}
                            setId={this.setCityId}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="12">
                        <label>Welcome Note</label>
                        {/* <Editor /> */}
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
                            <Input
                              type="text"
                              placeholder="Name"
                              value={this.state.representativeName}
                              onChange={(e) => {
                                this.setState({
                                  representativeName: e.target.value,
                                });
                              }}
                            ></Input>
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
                                value={this.state.representativePhone}
                                onChange={(e) => {
                                  this.setState({
                                    representativePhone: e.target.value,
                                  });
                                }}
                                placeholder="Phone Number"
                              />
                              <button
                                disabled={!this.state.createdRepresentative}
                                style={{
                                  marginLeft: "15px",
                                }}
                                class="btn btn-success"
                                onClick={(e) => {
                                  e.preventDefault();
                                  this.setState({
                                    createdRepresentative: !this.state
                                      .createdRepresentative,
                                  });
                                  Axios.post(
                                    "/representative/employee/create",
                                    {
                                      name: this.state.representativeName,
                                      phone: this.state.representativePhone,
                                    }
                                  ).then((u) => {
                                    if (u.data.message == "success") {
                                      var temp = this.state.Representatives;
                                      temp.push({
                                        Name: this.state.representativeName,
                                        Phone: this.state.representativePhone,
                                        id: u.data.data,
                                      });
                                      this.setState({
                                        createdRepresentative: !this.state
                                          .createdRepresentative,
                                        representativeName: "",
                                        representativePhone: "",
                                        createNewRepresentative: !this.state
                                          .createNewRepresentative,
                                        Representatives: temp,
                                      });
                                    }
                                  });
                                }}
                              >
                                {this.state.createdRepresentative
                                  ? "Save"
                                  : "Saving..."}
                              </button>
                              <button
                                disabled={!this.state.createdRepresentative}
                                style={{
                                  marginLeft: "15px",
                                  padding: "11px",
                                }}
                                class="btn btn-danger"
                                onClick={(e) => {
                                  e.preventDefault();
                                  this.setState({
                                    representativeName: "",
                                    representativePhone: "",
                                    createNewRepresentative: !this.state
                                      .createNewRepresentative,
                                  });
                                }}
                              >
                                <i className="tim-icons icon-simple-remove" />
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
                              <AutocompleteSimple
                                suggestions={this.state.Representatives}
                                id={"txtRepresentatveSuggest"}
                                categoryChipHit={this.categoryChipHit}
                                ChipHitAfterRemoving={
                                  this.representativesNameChipHitAfterRemoving
                                }
                                ref={this.RepresentativeNameAutocompleteRef}
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
                            ref={this.representativeNameRef}
                            removeId={this.categoryIdfromHiddenField}
                          />
                        </Col>
                      )}
                      {this.state.createNewRepresentativeCategory ? (
                        <Col md="12">
                          <FormGroup>
                            <label>New Representative Category</label>
                            <div
                              style={{
                                display: "flex",
                              }}
                            >
                              <Input
                                name="search"
                                className="form-control"
                                value={this.state.representativeCategoryName}
                                onChange={(e) => {
                                  this.setState({
                                    representativeCategoryName: e.target.value,
                                  });
                                }}
                                style={{
                                  flex: "2",
                                  marginTop: "4px",
                                }}
                                placeholder="Category Name"
                              />
                              <button
                                style={{
                                  marginLeft: "15px",
                                }}
                                disabled={
                                  !this.state.createdNewRepresentativeCategory
                                }
                                class="btn btn-success"
                                onClick={(e) => {
                                  e.preventDefault();
                                  this.setState({
                                    createdNewRepresentativeCategory: !this
                                      .state.createdNewRepresentativeCategory,
                                  });
                                  Axios.post(
                                    "/representative/category/create",
                                    {
                                      name: this.state
                                        .representativeCategoryName,
                                    }
                                  ).then((u) => {
                                    if (u.data.message == "success") {
                                      this.setState({
                                        createdNewRepresentativeCategory: !this
                                          .state
                                          .createdNewRepresentativeCategory,
                                        representativeCategoryName: "",
                                        createNewRepresentativeCategory: !this
                                          .state
                                          .createNewRepresentativeCategory,
                                      });
                                    }
                                  });
                                }}
                              >
                                {this.state.createdNewRepresentativeCategory
                                  ? "Save"
                                  : "Saving..."}
                              </button>
                              <button
                                style={{
                                  marginLeft: "15px",
                                  padding: "11px",
                                }}
                                class="btn btn-danger"
                                onClick={(e) => {
                                  e.preventDefault();
                                  this.setState({
                                    representativeName: "",
                                    representativePhone: "",
                                    createNewRepresentativeCategory: !this.state
                                      .createNewRepresentativeCategory,
                                  });
                                }}
                              >
                                <i className="tim-icons icon-simple-remove" />
                              </button>
                            </div>
                          </FormGroup>
                        </Col>
                      ) : (
                        <Col md="12" className="category-col">
                          <label>Representative Category</label>
                          <form
                            class="form-inline d-flex flex-row flex-fill justify-content-start"
                            style={s26}
                          >
                            <div
                              className="form-group d-inline mb-2"
                              style={{ flex: "1" }}
                            >
                              <AutocompleteSimple
                                suggestions={this.state.RepresentativesCategory}
                                id={"txtRepresentatveCategorySuggest"}
                                categoryChipHit={this.categoryNameChipHit}
                                ChipHitAfterRemoving={
                                  this.categoryChipHitAfterRemoving
                                }
                                ref={this.RepresentativeCategoryAutocompleteRef}
                              />
                            </div>
                            <div class="form-group">
                              <button
                                class="btn btn-success"
                                type="button"
                                style={s50}
                                onClick={(e) => {
                                  e.preventDefault();
                                  this.setState({
                                    createNewRepresentativeCategory: !this.state
                                      .createNewRepresentativeCategory,
                                  });
                                }}
                              >
                                + New
                              </button>
                            </div>
                          </form>
                          <CategoryChips
                            ref={this.representativeCategoryRef}
                            removeId={
                              this.categoryIdfromHiddenField_CategoryName
                            }
                          />
                        </Col>
                      )}
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
                        <tbody>
                          {this.state.representativeArr.map((a) => (
                            <tr>
                              <td>{a.Name}</td>
                              <td>{a.Category}</td>
                              <td>
                                <Row>
                                  <Col
                                    md="6"
                                    className="d-flex justify-content-center"
                                    style={{
                                      padding: "0px",
                                    }}
                                    onClick={() => {
                                      var temp = this.state.representativeArr;
                                      const index = temp.indexOf(a);
                                      if (index > -1) {
                                        temp.splice(index, 1);
                                      }
                                      this.setState({
                                        representativeArr: temp,
                                      });
                                    }}
                                  >
                                    <i
                                      className="tim-icons icon-trash-simple hoverable-danger"
                                      style={{ cursor: "pointer" }}
                                    />
                                  </Col>
                                  <Col
                                    style={{
                                      padding: "0px",
                                    }}
                                    md="6"
                                    className="d-flex justify-content-center"
                                    onClick={() => {
                                      this.setState({
                                        updatingRepresentatives: true,
                                        updatingRepresentativesNameId:a.EmployeeId,
                                        updatingRepresentativesCategoryId:a.RepresentativeCategoryId
                                      });
                                      this.RepresentativeNameAutocompleteRef.current.addItemToUpdate(
                                        { id: a.EmployeeId, name: a.Name }
                                      );
                                      this.RepresentativeCategoryAutocompleteRef.current.addItemToUpdate(
                                        {
                                          id: a.RepresentativeCategoryId,
                                          name: a.Category,
                                        }
                                      );
                                    }}
                                  >
                                    <i
                                      className="tim-icons icon-pencil hoverable"
                                      style={{ cursor: "pointer" }}
                                    />
                                  </Col>
                                </Row>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
                  <Row className="justify-content-between">
                    <Col md="6" xs="12" className="d-flex justify-content-end">
                      <Button
                        color="success"
                        className="md-auto"
                        disabled={!this.state.updatingRepresentatives}
                        onClick={() => {
                          this.representativeNameRef.current.removeAllChips();
                          this.representativeCategoryRef.current.removeAllChips();

                          //remove all ids form hidden inputs...
                          this.RepresentativeNameAutocompleteRef.current.removeAllIds();
                          this.RepresentativeCategoryAutocompleteRef.current.removeAllIds();
                          this.setState({
                            updatingRepresentatives: false,
                            updatingRepresentativesNameId: null,
                            updatingRepresentativesCategoryId: null,
                          });
                        }}
                      >
                        Cancel Update
                      </Button>
                      <Button
                        color="success"
                        onClick={() => {
                          if (
                            document.getElementById("txtRepresentatveSuggest")
                              .value != "" &&
                            document.getElementById(
                              "txtRepresentatveCategorySuggest"
                            ).value != ""
                          ) {
                            var representativesIds = document
                              .getElementById("txtRepresentatveSuggest")
                              .value.split(",");
                            var representativesCatIds = document
                              .getElementById("txtRepresentatveCategorySuggest")
                              .value.split(",");
                            var representativesArray = [];
                            representativesIds.forEach((element) => {
                              var representativeName = this.state.Representatives.filter(
                                (a) => a.id == element
                              )[0]["Name"];
                              representativesCatIds.forEach((elementCatId) => {
                                var obj = {};
                                obj["Name"] = representativeName;
                                obj["EmployeeId"] = element;
                                obj["RepresentativeCategoryId"] = elementCatId;
                                obj[
                                  "Category"
                                ] = this.state.RepresentativesCategory.filter(
                                  (a) => a.id == elementCatId
                                )[0]["Name"];
                                representativesArray.push(obj);
                              });
                            });
                            var tempArr = this.state.representativeArr;
                            var newArr = tempArr.concat(representativesArray);
                            var unique = [];
                            var distinct = [];
                            for (let i = 0; i < newArr.length; i++) {
                              if (
                                !unique[
                                  newArr[i].EmployeeId +
                                    "," +
                                    newArr[i].RepresentativeCategoryId
                                ]
                              ) {
                                distinct.push({
                                  Name: newArr[i].Name,
                                  Category: newArr[i].Category,
                                  EmployeeId: newArr[i].EmployeeId,
                                  RepresentativeCategoryId:
                                    newArr[i].RepresentativeCategoryId,
                                  id:newArr[i].id
                                });
                                unique[
                                  newArr[i].EmployeeId +
                                    "," +
                                    newArr[i].RepresentativeCategoryId
                                ] = 1;
                              }
                            }
                            var index = distinct.indexOf(
                              distinct.filter(
                                (a) =>
                                  a.EmployeeId == this.state.updatingRepresentativesNameId &&
                                  a.RepresentativeCategoryId == this.state.updatingRepresentativesCategoryId
                              )[0]
                            );
                            if (index > -1) {
                              distinct.splice(
                                index,
                                1
                              );
                            }
                            this.setState({
                              representativeArr: distinct,
                              updatingRepresentativesNameId:null,
                              updatingRepresentativesCategoryId:null,
                              updatingRepresentatives:!this.state.updatingRepresentatives
                            });
                            this.representativeNameRef.current.removeAllChips();
                            this.representativeCategoryRef.current.removeAllChips();

                            //remove all ids form hidden inputs...
                            this.RepresentativeNameAutocompleteRef.current.removeAllIds();
                            this.RepresentativeCategoryAutocompleteRef.current.removeAllIds();
                          }
                        }}
                      >
                        Add
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
                  <CardTitle tag="h2">Event Attendies</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col md="6">
                        <Row>
                          <Col md="12">
                            <FormGroup>
                              <label>Attendee Full Name</label>
                              <Input
                                type="text"
                                placeholder="Name"
                                id="AttendiesName"
                              />
                            </FormGroup>
                          </Col>
                          <Col md="12">
                            <FormGroup>
                              <label>Attendee Phone</label>
                              <Input
                                type="number"
                                placeholder="Phone"
                                id="AttendiesPhone"
                              />
                            </FormGroup>
                          </Col>
                          <Col md="12">
                            <FormGroup>
                              <label>Attendee Email</label>
                              <Input
                                type="email"
                                placeholder="Email"
                                id="AttendiesEmail"
                              />
                            </FormGroup>
                          </Col>
                          <Col md="12">
                            <FormGroup>
                              <label>Attendee Location</label>
                              <Input
                                type="text"
                                placeholder="Location"
                                id="AttendiesLocation"
                              />
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
                                      id="Arr_ticketFrom"
                                    ></Input>
                                  </Col>
                                  <Col md="6">
                                    <Input
                                      type="text"
                                      placeholder="Ticket To"
                                      id="Arr_ticketTo"
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
                                        id="ticket-file-from"
                                        onChange={(e) => {
                                          this.setState({
                                            aTicketFileName:
                                              e.target.files[0].name,
                                          });
                                        }}
                                      />
                                      <label
                                        className="custom-file-label"
                                        htmlFor="customFileThumbanail"
                                      >
                                        {this.state.aTicketFileName}
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
                                        id="Dep_ticketFrom"
                                      ></Input>
                                    </Col>
                                    <Col md="6">
                                      <Input
                                        type="text"
                                        placeholder="Ticket To"
                                        id="Dep_ticketTo"
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
                                          id="ticket-file-to"
                                          onChange={(e) => {
                                            this.setState({
                                              dTicketFileName:
                                                e.target.files[0].name,
                                            });
                                          }}
                                        />
                                        <label
                                          className="custom-file-label"
                                          htmlFor="customFileThumbanail"
                                        >
                                          {this.state.dTicketFileName}
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
                              disabled={!this.state.updatingAttendee}
                              onClick={() => {
                                document.getElementById("AttendiesName").value =
                                  "";
                                document.getElementById(
                                  "AttendiesPhone"
                                ).value = "";
                                document.getElementById(
                                  "AttendiesEmail"
                                ).value = "";
                                document.getElementById(
                                  "AttendiesLocation"
                                ).value = "";
                                document.getElementById(
                                  "Arr_ticketFrom"
                                ).value = "";
                                document.getElementById("Arr_ticketTo").value =
                                  "";
                                document.getElementById(
                                  "Dep_ticketFrom"
                                ).value = "";
                                document.getElementById("Dep_ticketTo").value =
                                  "";
                                document.getElementById(
                                  "SameTicketChkId"
                                ).checked = false;
                                this.setState({
                                  TicketsSame: false,
                                  aTicketFileName: "Choose Ticket File",
                                  dTicketFileName: "Choose Ticket File",
                                  updatingAttendee: false,
                                  updatingAttendeePhone:null,
                                });
                              }}
                            >
                              Cancel Update
                            </Button>
                            <Button
                              color="success"
                              className="md-auto"
                              onClick={() => {
                                this.setState({
                                  addedAttendie: !this.state.addedAttendie,
                                });
                                var newAttendieObj = {};
                                newAttendieObj[
                                  "name"
                                ] = document.getElementById(
                                  "AttendiesName"
                                ).value;

                                newAttendieObj[
                                  "phone"
                                ] = document.getElementById(
                                  "AttendiesPhone"
                                ).value;

                                newAttendieObj[
                                  "email"
                                ] = document.getElementById(
                                  "AttendiesEmail"
                                ).value;

                                newAttendieObj[
                                  "location"
                                ] = document.getElementById(
                                  "AttendiesLocation"
                                ).value;
                                newAttendieObj[
                                  "aTicketFrom"
                                ] = document.getElementById(
                                  "Arr_ticketFrom"
                                ).value;

                                newAttendieObj[
                                  "aTicketTo"
                                ] = document.getElementById(
                                  "Arr_ticketTo"
                                ).value;
                                newAttendieObj["isSameAsArriving"] = this.state
                                  .TicketsSame
                                  ? true
                                  : false;
                                newAttendieObj["aticket"] = this.state.aTicketFileName;
                                newAttendieObj["dticket"] = this.state.dTicketFileName
                                //converting files to base64...
                                let fileToLoad = document.getElementById(
                                  "ticket-file-from"
                                ).files[0];
                                let fileone = null;
                                let fileReader = new FileReader();
                                fileReader.onload = function (fileLoadedEvent) {
                                  fileone = fileLoadedEvent.target.result;
                                  newAttendieObj["ticketFileFrom"] = fileone;
                                };
                                if (fileToLoad) {
                                  fileReader.readAsDataURL(fileToLoad);
                                }

                                //second file...
                                let filetwo = null;
                                if (!this.state.TicketsSame) {
                                  newAttendieObj[
                                    "dTicketFrom"
                                  ] = document.getElementById(
                                    "Dep_ticketFrom"
                                  ).value;
                                  newAttendieObj[
                                    "dTicketTo"
                                  ] = document.getElementById(
                                    "Dep_ticketTo"
                                  ).value;
                                  let fileToLoadSecond = document.getElementById(
                                    "ticket-file-to"
                                  ).files[0];
                                  let fileReadertwo = new FileReader();
                                  fileReadertwo.onload = function (
                                    fileLoadedEvent1
                                  ) {
                                    filetwo = fileLoadedEvent1.target.result;
                                    newAttendieObj["ticketFileTo"] = filetwo;
                                  };
                                  fileReadertwo.readAsDataURL(fileToLoadSecond);
                                }
                                var Ea = this.state.EventAttendies;
                                if(this.state.updatingAttendeePhone){
                                  var index = Ea.indexOf(Ea.filter(a => a.phone == this.state.updatingAttendeePhone)[0])
                                  if(index > -1) {
                                    Ea.splice(index,1)
                                  }
                                  var obj = {
                                    ...newAttendieObj,
                                    id: this.state.updatingAttendeeId,
                                  };
                                  Ea.push(obj)
                                }else 
                              {
                                Ea.push(newAttendieObj);

                              }
                                this.setState({
                                  EventAttendies: Ea,
                                  addedAttendie: !this.state.addedAttendie,
                                  TicketsSame: false,
                                  aTicketFileName: "Choose Ticket File",
                                  dTicketFileName: "Choose Ticket File",
                                  updatingAttendee: false,
                                  updatingAttendeePhone: null,
                                });
                                  document.getElementById(
                                    "AttendiesName"
                                  ).value = "";
                                  document.getElementById(
                                    "AttendiesPhone"
                                  ).value = "";
                                  document.getElementById(
                                    "AttendiesEmail"
                                  ).value = "";
                                  document.getElementById(
                                    "AttendiesLocation"
                                  ).value = "";
                                  document.getElementById(
                                    "Arr_ticketFrom"
                                  ).value = "";
                                  document.getElementById(
                                    "Arr_ticketTo"
                                  ).value = "";
                                  document.getElementById(
                                    "Dep_ticketFrom"
                                  ).value = "";
                                  document.getElementById(
                                    "Dep_ticketTo"
                                  ).value = "";
                                  document.getElementById(
                                    "SameTicketChkId"
                                  ).checked = false;
                              }}
                            >
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
                          <tbody>
                            {this.state.EventAttendies.map((element) => (
                              <tr
                                style={{
                                  backgroundColor: this.haveAnythingEmpty(
                                    element
                                  )
                                    ? "#0000005e"
                                    : "transparent",
                                }}
                              >
                                <td>{element["name"]}</td>
                                <td>{element["phone"]}</td>
                                <td>
                                  <Row>
                                    <Col
                                      md="6"
                                      style={{
                                        padding: "0px",
                                      }}
                                      className="d-flex justify-content-center"
                                      onClick={() => {
                                        var temp = this.state.EventAttendies;
                                        var index = temp.indexOf(element);
                                        if (index > -1) {
                                          temp.splice(index, 1);
                                        }
                                        this.setState({
                                          EventAttendies: temp,
                                        });
                                      }}
                                    >
                                      <i className="tim-icons icon-trash-simple hoverable-danger" />
                                    </Col>
                                    <Col
                                      md="6"
                                      style={{
                                        padding: "0px",
                                      }}
                                      className="d-flex justify-content-center"
                                      onClick={() => {
                                        this.setState({
                                          updatingAttendeePhone:element.phone
                                        })
                                        document.getElementById(
                                          "AttendiesName"
                                        ).value = element["name"];
                                        document.getElementById(
                                          "AttendiesPhone"
                                        ).value = element["phone"];
                                        document.getElementById(
                                          "AttendiesEmail"
                                        ).value = element["email"];
                                        document.getElementById(
                                          "AttendiesLocation"
                                        ).value = element["location"];
                                        document.getElementById(
                                          "Arr_ticketFrom"
                                        ).value = element["aTicketFrom"];
                                        document.getElementById(
                                          "Arr_ticketTo"
                                        ).value = element["aTicketTo"];
                                        document.getElementById(
                                          "Dep_ticketFrom"
                                        ).value = element["dTicketFrom"] || "";
                                        document.getElementById(
                                          "Dep_ticketTo"
                                        ).value = element["dTicketTo"] || "";
                                        document.getElementById(
                                          "SameTicketChkId"
                                        ).checked =
                                          element["dTicketFrom"] == null;
                                        this.setState({
                                          updatingAttendee: true,
                                          TicketsSame:
                                            element["dTicketFrom"] == null,
                                          aTicketFileName: element[
                                            "aticket"
                                          ].split("/")[
                                            element["aticket"].split("/")
                                              .length - 1
                                          ],
                                          dTicketFileName:
                                            element["dticket"]?.split("/")[
                                              element["dticket"].split("/")
                                                .length - 1
                                            ] || "Choose Ticket File",
                                        });
                                      }}
                                    >
                                      <i className="tim-icons icon-pencil hoverable" />
                                    </Col>
                                  </Row>
                                </td>
                              </tr>
                            ))}
                          </tbody>
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
                  <Row className="justify-content-between">
                    <Col md="4" xs="4" className="d-flex align-items-center">
                      <h5 className="card-category">Create Transfers</h5>
                    </Col>
                    <Col md="4" xs="8" className="d-flex justify-content-end">
                      <Button
                        color="success"
                        onClick={() => this.createNewTransfer()}
                        disabled={!this.state.rIsFilled}
                      >
                        Create New
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      {this.state.transfers.map((element) =>
                        element.isFilled ? null : element.component
                      )}
                    </Row>
                    <Row className="justify-content-between">
                      {this.state.rIsFilled ? null : (
                        <Col
                          md="12"
                          xs="12"
                          className="d-flex justify-content-end"
                        >
                          <Button
                            color="warning"
                            onClick={() => {
                              var temp = this.state.transfers;
                              temp.forEach((element) => {
                                var index;
                                if (!element.isFilled) {
                                  if (!element.data.id) {
                                    index = temp.indexOf(element);
                                  }
                                  element.isFilled = !element.isFilled;
                                }
                                if (index > -1) {
                                  temp.splice(index, 1);
                                }
                                this.setState({
                                  transfers: temp,
                                  rIsFilled: !this.state.rIsFilled,
                                });
                              });
                            }}
                          >
                            Cancel
                          </Button>
                          <Button
                            color="success"
                            onClick={() => {
                              var tempTransfers = this.state.transfers;
                              tempTransfers.forEach((element) => {
                                if (!element.isFilled) {
                                  element.data = element.ref.current.returnState();
                                  element.isFilled = !element.isFilled;
                                }
                              });
                              this.setState({
                                transfers: tempTransfers,
                                rIsFilled: !this.state.rIsFilled,
                              });
                            }}
                          >
                            Save
                          </Button>
                        </Col>
                      )}
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
                          <tbody>
                            {this.state.transfers.map((element) =>
                              element.isFilled ? (
                                <tr>
                                  <td>{element.data.name}</td>
                                  <td>{element.data.transferDate}</td>
                                  <td>{element.data.origin}</td>
                                  <td>{element.data.destination}</td>
                                  <td>
                                    <Row>
                                      <Col
                                        md="6"
                                        className="d-flex justify-content-center"
                                        style={{
                                          padding: "0px",
                                        }}
                                        onClick={() => {
                                          var temp = this.state.transfers;
                                          var index = temp.indexOf(element);
                                          if (index > -1) {
                                            temp.splice(index, 1);
                                          }
                                          this.setState({
                                            transfers: temp,
                                          });
                                        }}
                                      >
                                        <i className="tim-icons icon-trash-simple hoverable-danger" />
                                      </Col>
                                      <Col
                                        md="6"
                                        style={{
                                          padding: "0px",
                                        }}
                                        className="d-flex justify-content-center"
                                        onClick={() => {
                                          var temp = this.state.transfers;
                                          var index = temp.indexOf(element);
                                          temp[index].isFilled = false;
                                          // temp[index].ref.current.setData(element.data)
                                          this.setState(
                                            {
                                              rIsFilled: !this.state.rIsFilled,
                                              transfers: temp,
                                            },
                                            () => {
                                              temp[index].ref.current.setData(
                                                element.data
                                              );
                                            }
                                          );
                                        }}
                                      >
                                        <i className="tim-icons icon-pencil hoverable" />
                                      </Col>
                                    </Row>
                                  </td>
                                </tr>
                              ) : null
                            )}
                          </tbody>
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
                        <Agendas ref={this.agendaRef} />
                        <Col md="12" className="d-flex justify-content-end">
                          <Button
                            color="success"
                            className="md-auto"
                            disabled={!this.state.updatingAgenda}
                            onClick={() => {
                              this.agendaRef.current.resetState();
                              this.setState({
                                updatingAgenda: false,
                                updatingAgendaObject: null,
                              });
                            }}
                          >
                            Cancel Update
                          </Button>
                          <Button
                            color="success"
                            className="md-auto"
                            onClick={() => {
                              var data = this.state.agendas;
                              if (this.state.updatingAgendaObject){
                                var index = data.indexOf(this.state.updatingAgendaObject)
                                console.log(index)
                                if(index > -1){
                                  data.splice(index, 1)
                                }
                              }
                              data.push(this.agendaRef.current.returnState());
                                this.setState(
                                  {
                                    agendas: data,
                                    updatingAgendaObject: null
                                  },
                                  () => {
                                    this.agendaRef.current.resetState();
                                  }
                                );
                            }}
                          >
                            Add
                          </Button>
                        </Col>
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
                          <tbody>
                            {this.state.agendas.map((element) => (
                              <tr>
                                <td>{element.name}</td>
                                <td>
                                  {new Date(element.startTime).toDateString() +
                                    " " +
                                    new Date(element.startTime).toLocaleString(
                                      "en-US",
                                      {
                                        hour: "numeric",
                                        minute: "numeric",
                                        hour12: true,
                                      }
                                    )}
                                </td>
                                <td>
                                  {new Date(element.endTime).toDateString() +
                                    " " +
                                    new Date(element.endTime).toLocaleString(
                                      "en-US",
                                      {
                                        hour: "numeric",
                                        minute: "numeric",
                                        hour12: true,
                                      }
                                    ) || "Onwards"}
                                </td>
                                <td>{element.venue}</td>
                                <td>
                                  <Row>
                                    <Col
                                      md="6"
                                      className="d-flex justify-content-center"
                                      style={{
                                        padding: "0px",
                                      }}
                                      onClick={() => {
                                        var temp = this.state.agendas;
                                        var index = temp.indexOf(element);
                                        if (index > -1) {
                                          temp.splice(index, 1);
                                        }
                                        this.setState({
                                          agendas: temp,
                                        });
                                      }}
                                    >
                                      <i className="tim-icons icon-trash-simple hoverable-danger" />
                                    </Col>
                                    <Col
                                      md="6"
                                      style={{
                                        padding: "0px",
                                      }}
                                      onClick={() => {
                                        this.agendaRef.current.setData(element);
                                        this.setState({
                                          updatingAgenda: true,
                                          updatingAgendaObject:
                                            element,
                                        });
                                      }}
                                      className="d-flex justify-content-center"
                                    >
                                      <i className="tim-icons icon-pencil hoverable" />
                                    </Col>
                                  </Row>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md="12" className="d-flex justify-content-end">
              <Button
                color="success"
                style={{
                  padding: "18px",
                  paddingRight: "38px",
                  paddingLeft: "38px",
                }}
                onClick={(e) => this.submitEvent(e)}
              >
                Save Event
              </Button>
            </Col>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

export default ManageEvents;
