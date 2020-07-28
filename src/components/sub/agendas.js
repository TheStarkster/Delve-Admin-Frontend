import React,{ Component } from "react";
import {
  Button,
  Row,
  Col,
  FormGroup,
  Input,
} from "reactstrap";
export default class Agendas extends Component {
    constructor(props){
        super(props);
        this.state = {
          id:"",
          name: "",
          venue: "",
          startTime: "",
          endTime: "",
          remarks: "",
          startDate: "",
        };
    }
    returnState = () => {
        return this.state
    }
    resetState = () => {
      this.setState({
        name: "",
        venue: "",
        startTime: "",
        endTime: "",
        remarks: "",
        startDate: "",
        id:"",
      });
    }
    setData = (data) => {
      this.setState({
        id:data.id,
        name: data.name,
        venue: data.venue,
        startTime: new Date(data.startTime).toISOString().split("Z")[0],
        endTime: new Date(data.endTime).toISOString().split("Z")[0],
        remarks: data.remarks,
        startDate: data.startDate,
      });
    }
    render() {
        return (
            <Row>
              <Col md="12">
                <FormGroup>
                  <label>Agendas Name (Particulars)</label>
                  <Input
                    type="text"
                    placeholder="Particulars"
                    value={this.state.name}
                    onChange={(e) => {
                      this.setState({
                        name: e.target.value,
                      });
                    }}
                  />
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <label>Agenda Start Date & Time</label>
                  <Input
                    type="datetime-local"
                    value={this.state.startTime}
                    onChange={(e) => {
                      console.log(e.target.value)
                      this.setState({
                        startTime: e.target.value,
                        startDate: e.target.value,
                      });
                    }}
                  />
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <label>Agenda End Date & Time</label>
                  <Input
                    type="datetime-local"
                    value={this.state.endTime}
                    onChange={(e) => {
                      this.setState({
                        endTime: e.target.value,
                      });
                    }}
                  />
                </FormGroup>
              </Col>
              <Col md="12">
                <FormGroup>
                  <label>Agenda Venue</label>
                  <Input
                    type="text"
                    placeholder="Venue"
                    value={this.state.venue}
                    onChange={(e) => {
                      this.setState({
                        venue: e.target.value,
                      });
                    }}
                  />
                </FormGroup>
              </Col>
              <Col md="12">
                <FormGroup>
                  <label>Remarks</label>
                  <Input
                    type="text"
                    placeholder="Remarks/Dress Code"
                    value={this.state.remarks}
                    onChange={(e) => {
                      this.setState({
                        remarks: e.target.value,
                      });
                    }}
                  />
                </FormGroup>
              </Col>
            </Row>
        );
                     
    }
}