import React, { Component } from 'react'
import {
    Button,
    Input,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Row,
    Col,
    Table,
  } from "reactstrap";
import Editor from "../components/sub/Editor-Company"
import Gallery from 'react-grid-gallery';
 
export default class AboutCompany extends Component {
    state = {
        description: "",
        isEditorOpen: false,
        images: [],
        pickedImageName: "Choose Image"
    }
    render() {
        return (
            <>
                <div className="content">
                    <Row>
                        <Col xs="12">
                            <Card>
                                <CardHeader>
                                    <CardTitle tag="h2">Company Description</CardTitle>
                                    <h5 className="card-category">Details & Other Description about the Company</h5>
                                </CardHeader>
                                <CardBody>
                                    {
                                        this.state.isEditorOpen ?
                                        null:
                                        this.state.description === "" ? 
                                        <div style={{
                                            backgroundColor: "#0000002e",
                                            borderRadius:"8px",
                                            color:"#ffffffad",
                                            padding:"24px"
                                        }}>
                                            No Description Available Yet! Open Editor and Create a Description Now
                                        </div>
                                        :
                                        this.state.description
                                    }
                                    {
                                        this.state.isEditorOpen ?
                                        <div style={{
                                            marginTop:"18px"
                                        }}>
                                            <Editor />
                                            <Button
                                            color="danger"
                                            onClick={() => {
                                            this.setState({
                                                isEditorOpen: !this.state.isEditorOpen
                                            })
                                        }}>
                                                Save & Close Editor
                                            </Button>
                                        </div>
                                        :
                                        <div style={{
                                            marginTop:"18px"
                                        }}>
                                            <Button 
                                            style={{
                                                marginTop:"8px"
                                            }}
                                            onClick={() => {
                                                this.setState({
                                                    isEditorOpen: !this.state.isEditorOpen
                                                })
                                            }}>
                                                Open Editor
                                            </Button>
                                        </div>
                                    }
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12">
                            <Card>
                                <CardHeader>
                                    <CardTitle tag="h2">Images</CardTitle>
                                    <h5 className="card-category">Sample Event Images and Others</h5>
                                </CardHeader>
                                <CardBody>
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
                                    {this.state.pickedImageName}
                                </label>
                                </div>
                                    {
                                        this.state.images.length === 0 ?
                                        <div
                                            style={{
                                                backgroundColor: "#0000002e",
                                                borderRadius:"8px",
                                                color:"#ffffffad",
                                                padding:"24px"
                                            }}
                                        >
                                            No Images've been Added Yet
                                        </div>
                                        :
                                        <Gallery images={this.state.images}/>
                                    }
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>  
            </>
        )
    }
}
