import React, { Component } from "react";
import {
  Card,
  CardBody,
  Collapse,
  Col,
  Row,
  Badge,
  Button,
  Input,
} from "reactstrap";

export default class QuerCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isOpenQuestion: false,
      updateAnswer: false,
      sampleAnswerOne:
        "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident",
      sampleAnswerTwo:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      sampleAnswerThree: "",
    };
  }
  render() {
    return (
      <React.Fragment>
        <div className="Collapse-Query-Header">
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
                Sample Event Name
              </h4>
            </Col>
            <Col md="4" className="d-flex align-items-center">
              <h6>
                New Queries Raised <Badge color="warning">0</Badge>
              </h6>
            </Col>
            <Col md="4" className="d-flex align-items-center">
              <h6>
                Queries Resolved <Badge color="success">1</Badge>
              </h6>
            </Col>
          </Row>
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
                <div className="Collapse-Query-Header">
                  <Row>
                    <Col md="12">
                      <label
                        style={{
                          cursor: "pointer",
                          fontSize: "14px",
                        }}
                      >
                        Sample Question raised from sample attendee from sample
                        event Lorem Ipsum
                      </label>
                    </Col>
                    <Col md="12">
                      <Button
                        color="success"
                        onClick={(e) => {
                          e.preventDefault();
                          this.setState({
                            isOpenQuestion: !this.state.isOpenQuestion,
                          });
                        }}
                      >
                        {this.state.isOpenQuestion ? "Hide" : "Show"} Answer
                      </Button>
                      <Button
                        color="success"
                        onClick={(e) => {
                          e.preventDefault();
                          this.setState({
                            updateAnswer: !this.state.updateAnswer,
                          });
                        }}
                      >
                        Update Answer
                      </Button>
                    </Col>
                  </Row>
                  <Collapse isOpen={this.state.isOpenQuestion}>
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
                        {this.state.updateAnswer ? (
                          <Input
                            type="textarea"
                            value={this.state.sampleAnswerOne}
                            onChange={(e) => {
                              this.setState({
                                sampleAnswerOne: e.target.value,
                              });
                            }}
                          />
                        ) : (
                          this.state.sampleAnswerOne
                        )}
                      </CardBody>
                    </Card>
                  </Collapse>
                </div>
              </CardBody>
            </Card>
          </Collapse>
        </div>
      </React.Fragment>
    );
  }
}
