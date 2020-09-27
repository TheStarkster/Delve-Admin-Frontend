import React, { Component } from "react";
import {
  Col,
  Row,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Input,
  Button,
} from "reactstrap";
import QueryTable from "../components/sub/queryTable";

export default class Queries extends Component {
  state = {
    isSearching: false,
    data: null,
    eventId: null,
  };

  searched = () => {
    this.setState({
      isSearching: !this.state.isSearching,
    });
  };
  render() {
    return (
      <>
        <div className="content">
          <Card>
            <CardHeader>
              <CardTitle tag="h2">Queries</CardTitle>
              <h5>Search Queries Specific to any Event</h5>
            </CardHeader>
            <CardBody>
              <Row>
                <Col xs="10">
                  <Input
                    type="text"
                    placeholder="Enter Event Id"
                    id="EventId"
                  />
                </Col>
                <Col xs="2">
                  <Button
                    style={{ width: "100%" }}
                    color="success"
                    disabled={this.state.isSearching}
                    onClick={() => {
                      if (document.getElementById("EventId").value !== "") {
                        this.setState({
                          eventId: document.getElementById("EventId").value,
                          isSearching: true,
                        });
                      }
                    }}
                  >
                    {this.state.isSearching ? "Searching..." : "Search"}
                  </Button>
                </Col>
              </Row>
              <Row>
                <QueryTable
                  eventId={this.state.eventId}
                  inAll={true}
                  searched={this.searched}
                />
              </Row>
            </CardBody>
          </Card>
        </div>
      </>
    );
  }
}
