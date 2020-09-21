import React from "react";
import classNames from "classnames";
import QueryCard from "../components/sub/querycard";
import Axios from '../components/sub/axios'
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
} from "reactstrap";
import EventTable from "components/sub/eventsTable";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bigChartData: "data2",
      tableState: 1,
      currentTableCount: 0,
      pastTableCount: 0,
      futureTableCount: 0,
      tableData: [],
    };
  }
  componentDidMount = () => {
    Promise.all([
      Axios.get(
        "/events/get-current-raw/" + this.state.currentTableCount.toString()
      ),
      Axios.get("/events/get-past-raw/" + this.state.pastTableCount.toString()),
      Axios.get(
        "/events/get-future-raw/" + this.state.futureTableCount.toString()
      ),
    ]).then(([a, b, c]) => {
      var tableTempData = this.state.tableData;
      var futureTableData = c.data.map((element) => {
        var obj = {};
        obj["id"] = element.id;
        obj["customerId"] = element.Customers.id;
        obj["customerName"] = element.Customers.name;
        obj["customerOrganisation"] = element.Customers.organisation;
        obj["liveFrom"] = new Date(element.liveFrom).toDateString();
        obj["liveTo"] = new Date(element.liveTo).toDateString();
        obj["name"] = element.name;
        return obj;
      });
      tableTempData.push(futureTableData);
      var currentTableData = a.data.map((element) => {
        var obj = {};
        obj["id"] = element.id;
        obj["customerId"] = element.Customers.id;
        obj["customerName"] = element.Customers.name;
        obj["customerOrganisation"] = element.Customers.organisation;
        obj["liveFrom"] = new Date(element.liveFrom).toDateString();
        obj["liveTo"] = new Date(element.liveTo).toDateString();
        obj["name"] = element.name;
        return obj;
      });
      tableTempData.push(currentTableData);
      var pastTableData = b.data.map((element) => {
        var obj = {};
        obj["id"] = element.id;
        obj["customerId"] = element.Customers.id;
        obj["customerName"] = element.Customers.name;
        obj["customerOrganisation"] = element.Customers.organisation;
        obj["liveFrom"] = new Date(element.liveFrom).toDateString();
        obj["liveTo"] = new Date(element.liveTo).toDateString();
        obj["name"] = element.name;
        return obj;
      });
      tableTempData.push(pastTableData);

      this.setState({
        tableData: tableTempData,
      });
    });
  }
  setBgChartData = (name) => {
    this.setState({
      bigChartData: name,
    });
  };
  render() {
    console.log(this.state.tableData[this.state.tableState]);
    return (
      <React.Fragment>
        <div className="content">
          <Row>
            <Col xs="12">
              <Card className="card-chart">
                <CardHeader>
                  <Row>
                    <Col className="text-left" sm="6">
                      <h5 className="card-category">Total Events</h5>
                      <CardTitle tag="h2">Events</CardTitle>
                    </Col>
                    <Col sm="6">
                      <ButtonGroup
                        className="btn-group-toggle float-right"
                        data-toggle="buttons"
                      >
                        <Button
                          tag="label"
                          className={classNames("btn-simple", {
                            active: this.state.bigChartData === "data1",
                          })}
                          color="info"
                          id="0"
                          size="sm"
                          onClick={() =>
                            this.setState({
                              tableState: 2,
                              bigChartData: "data1",
                            })
                          }
                        >
                          <input
                            defaultChecked
                            className="d-none"
                            name="options"
                            type="radio"
                          />
                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            Past
                          </span>
                          <span className="d-block d-sm-none">
                            <i className="tim-icons icon-single-02" />
                          </span>
                        </Button>
                        <Button
                          color="info"
                          id="1"
                          size="sm"
                          tag="label"
                          className={classNames("btn-simple", {
                            active: this.state.bigChartData === "data2",
                          })}
                          onClick={() =>
                            this.setState({
                              tableState: 1,
                              bigChartData: "data2",
                            })
                          }
                        >
                          <input
                            className="d-none"
                            name="options"
                            type="radio"
                          />
                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            Current
                          </span>
                          <span className="d-block d-sm-none">
                            <i className="tim-icons icon-gift-2" />
                          </span>
                        </Button>
                        <Button
                          color="info"
                          id="2"
                          size="sm"
                          tag="label"
                          className={classNames("btn-simple", {
                            active: this.state.bigChartData === "data3",
                          })}
                          onClick={() =>
                            this.setState({
                              tableState: 0,
                              bigChartData: "data3",
                            })
                          }
                        >
                          <input
                            className="d-none"
                            name="options"
                            type="radio"
                          />
                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            Upcoming
                          </span>
                          <span className="d-block d-sm-none">
                            <i className="tim-icons icon-tap-02" />
                          </span>
                        </Button>
                      </ButtonGroup>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <EventTable
                    data={this.state.tableData[this.state.tableState] || null}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xs="12">
              <Card className="card-chart">
                <CardBody>
                  <QueryCard />
                  <QueryCard />
                  <QueryCard />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

export default Dashboard;
