import React, { Component } from "react";
import Autocomplete from "../components/sub/autosuggest";
import {
  Button,
  Input,
  Form,
  Badge,
  FormGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Media,
  Collapse,
} from "reactstrap";

const s26 = {
  width: "100%",
};

const s50 = {
  marginLeft: "15px",
  marginTop: "14px",
};

export class Places extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenState: false,
    };
    console.log(this.props.state);
  }
  render() {
    return (
      <>
        <Row>
          <Col md="4 d-flex  align-items-center">
            <div className="state-name">{Object.keys(this.props.state)}</div>
          </Col>
          <Col md="4">
            <Button
              color="success"
              onClick={(e) => {
                e.preventDefault();
                this.setState({
                  isPlacesOpen: !this.state.isPlacesOpen,
                });
              }}
            >
              See Places
            </Button>
          </Col>
        </Row>
        <Row>
          <Collapse
            style={{
              width: "100%",
            }}
            isOpen={this.state.isPlacesOpen}
          >
            {this.props.state[Object.keys(this.props.state)].map((places) => (
              <Row>
                <Col md="12">
                  <Media className="places-media">
                    <Media>
                      <img
                        src={places.imageUrl}
                        style={{
                          marginRight: "20px",
                        }}
                        width="150px"
                      />
                    </Media>
                    <Media body>
                      <Media heading>{places.name}</Media>
                      {places.discription}
                    </Media>
                  </Media>
                </Col>
              </Row>
            ))}
          </Collapse>
        </Row>
        <hr className="places-hr" />
      </>
    );
  }
}

export default class CitiesCountries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenState: false,
      isOpen: false,
      isPlacesOpen: false,
      countries: [
        // {
        //   country: "india",
        //   states: {
        //     state: [
        //       {
        //         delhi: [
        //           {
        //             name: "Qutub Minar",
        //             discription: "Sample Qutb Minar Discription",
        //             imageUrl: "",
        //           },
        //           {
        //             name: "India Gate",
        //             discription: "Sample India Gate Discription",
        //             imageUrl: "",
        //           },
        //         ],
        //         mumbai: [
        //           {
        //             name: "Ajanta Caves",
        //             discription: "Sample Ajanta Caves Discription",
        //             imageUrl: "",
        //           },
        //         ],
        //       },
        //     ],
        //   },
        // },
        {
          country: "USA",
          states: [
            {
              "washington dc": [
                {
                  name: "United States Capitol",
                  discription: "Sample United States Capitol Discription",
                  imageUrl:
                    "https://cdn.britannica.com/06/77406-050-37596D86/United-States-Capitol-place-Washington-DC-US.jpg",
                },
                {
                  name: "Lincoln Memorial",
                  discription: "Sample Lincoln Memorial Discription",
                  imageUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/7/78/Aerial_view_of_Lincoln_Memorial_-_east_side_EDIT.jpeg",
                },
              ],
            },
            {
              "New York": [
                {
                  name: "Statue of Liberty National Monument",
                  discription:
                    "Sample Statue of Liberty National Monument Discription",
                  imageUrl:
                    "https://cropper.watch.aetnd.com/images.history.com/images/media/video/history_america_story_of_us_statue_of_liberty_sf_1158148/History_America_Story_of_Us_Statue_of_Liberty_SF_still_624x352.jpg?w=1440",
                },
              ],
            },
          ],
        },
      ],
    };
  }
  render() {
    return (
      <React.Fragment>
        <div className="content">
          <Row>
            <Card>
              <CardHeader>
                <Row>
                  <Col className="text-left" sm="6">
                    <CardTitle tag="h2">Manage City Attractions</CardTitle>
                    <h5 className="card-category">create city attractions</h5>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col md="6">
                    <div
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
                          hint={"Country Name"}
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
                          Add
                        </button>
                      </div>
                    </div>
                  </Col>
                  <Col md="6">
                    <div
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
                          hint={"City Name"}
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
                          Add
                        </button>
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <label>Place of Interest</label>
                      <Input placeholder="Place Name" type="text" />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label>Place Image</label>
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
                          Choose Image File
                        </label>
                      </div>
                    </FormGroup>
                  </Col>
                  <Col md="12">
                    <FormGroup>
                      <label>Place Discription</label>
                      <Input placeholder="Discription" type="text" />
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Row>
          <Row>
            <Card>
              <CardHeader>
                <Row>
                  <Col className="text-left" sm="6">
                    <CardTitle tag="h2">Countries & Cities</CardTitle>
                    <h5 className="card-category">added countries</h5>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                {this.state.countries.map((country) => (
                  <div>
                    <Row>
                      <Col md="4">
                        <h4
                          style={{
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            this.setState({
                              isOpen: !this.state.isOpen,
                            });
                          }}
                        >
                          {country.country}
                        </h4>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <Collapse isOpen={this.state.isOpen}>
                          <Card
                            style={{
                              marginBottom: "0px",
                            }}
                          >
                            <CardBody
                              style={{
                                padding: "0px",
                              }}
                            >
                              <Row>
                                <Col md="12">
                                  <div className="Collapse-Query-Header">
                                    <Col
                                      md="12"
                                      onClick={() => {
                                        this.setState({
                                          isOpenState: !this.state.isOpenState,
                                        });
                                      }}
                                    >
                                      <label
                                        style={{
                                          cursor: "pointer",
                                          fontSize: "16px",
                                        }}
                                      >
                                        States
                                      </label>
                                    </Col>
                                    <Collapse isOpen={this.state.isOpenState}>
                                      <Card
                                        style={{
                                          marginBottom: "0px",
                                        }}
                                      >
                                        <CardBody
                                          style={{
                                            color: "white",
                                          }}
                                        >
                                          {country.states.map((state) => (
                                            <Places state={state} />
                                          ))}
                                        </CardBody>
                                      </Card>
                                    </Collapse>
                                  </div>
                                </Col>
                              </Row>
                            </CardBody>
                          </Card>
                        </Collapse>
                      </Col>
                    </Row>
                  </div>
                ))}
              </CardBody>
            </Card>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}
