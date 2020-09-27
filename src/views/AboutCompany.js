import React, { Component } from "react";
import {
  Button,
  Input,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
} from "reactstrap";
import axios from "../components/sub/axios";
import JoditEditor from "jodit-react";
import Gallery from "react-grid-gallery";
import swal from "sweetalert";

export default class AboutCompany extends Component {
  state = {
    description: "Loading Description...",
    isEditorOpen: false,
    updatingDesc: false,
    savingImage: false,
    editorText: "",
    images: null,
    pickedImageName: "Choose Image",
    pickedImage: null,
    isDeleting: false,
    selectedImages: [],
    selectedImageNames: [],
  };
  componentWillMount = () => {
    this.getCompanyDescription();
    this.getAllImages();
  };
  getCompanyDescription = () => {
    axios.get("about-company/get-description").then((u) => {
      this.setState({
        description: u.data.description == null ? "" : u.data.description,
      });
    });
  };
  updateCompanyDescription = (text) => {
    this.setState({
      updatingDesc: !this.state.updatingDesc,
    });
    axios
      .post("about-company/update-description", {
        description: text,
      })
      .then((u) => {
        this.setState({
          updatingDesc: !this.state.updatingDesc,
          isEditorOpen: !this.state.isEditorOpen,
          description: text,
        });
      });
  };
  saveImage = () => {
    this.setState({
      savingImage: !this.state.savingImage,
    });
    var formData = new FormData();
    var tempImage = this.state.images;
    formData.append("image", this.state.pickedImage);
    axios.post("about-company/upload-picture", formData).then((u) => {
      tempImage.push({
        src: u.data.url,
        thumbnail: u.data.url,
        thumbnailWidth: 320,
        thumbnailHeight: 320,
        isSelected: false,
      });
      this.setState({
        savingImage: !this.state.savingImage,
        pickedImageName: "Choose Image",
        pickedImage: null,
        images: tempImage,
      });
    });
  };
  deleteImages = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover it!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        this.setState({
          isDeleting: !this.state.isDeleting,
        });
        var tempImages = this.state.images;
        var tempSelectedImages = this.state.selectedImages;
        axios
          .post("about-company/delete-pictures-bulk", {
            deleteIds: tempSelectedImages,
            images: this.state.selectedImageNames,
          })
          .then((u) => {
            this.state.selectedImages.forEach((imageId) => {
              var imageObject = tempImages.filter(
                (image) => image.id == imageId
              )[0];
              tempSelectedImages.splice(tempSelectedImages.indexOf(imageId), 1);
              tempImages.splice(tempImages.indexOf(imageObject), 1);
            });
            this.setState({
              images: tempImages,
              selectedImages: tempSelectedImages,
              isDeleting: !this.state.isDeleting,
            });

            swal("Poof! Your content has been deleted!", {
              icon: "success",
            });
          });
      } else {
        swal("Your Images are Safe!");
      }
    });
  };
  onSelectImage = (index, image) => {
    var tempImages = this.state.images;
    tempImages[index].isSelected = !tempImages[index].isSelected;

    var selectedImagesTemp = this.state.selectedImages;
    var selectedImagesNameTemp = this.state.selectedImageNames;
    if (selectedImagesTemp.some((id) => id == tempImages[index].id)) {
      selectedImagesTemp.splice(
        selectedImagesTemp.indexOf(tempImages[index].id),
        1
      );
      selectedImagesNameTemp.splice(
        selectedImagesNameTemp.indexOf(tempImages[index].url),
        1
      );
    } else {
      selectedImagesTemp.push(tempImages[index].id);
      selectedImagesNameTemp.push(tempImages[index].url);
      console.log(selectedImagesNameTemp);
      console.log(selectedImagesTemp);
    }
    this.setState({
      images: tempImages,
      selectedImages: selectedImagesTemp,
      selectedImageNames: selectedImagesNameTemp,
    });
  };
  getAllImages = () => {
    axios.get("about-company/get-all-images").then((u) => {
      var Images = u.data.map((image) => {
        return {
          ...image,
          src: image.url,
          thumbnail: image.url,
          thumbnailWidth: 320,
          thumbnailHeight: 320,
          isSelected: false,
        };
      });
      this.setState({
        images: Images,
      });
    });
  };
  render() {
    var galleryImages = this.state.images == null ? [] :  [...this.state.images];
    const config = {
      readonly: false,
    };
    var editedText = "";
    return (
      <>
        <div className="content">
          <Row>
            <Col xs="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h2">Company Description</CardTitle>
                  <h5 className="card-category">
                    Details & Other Description about the Company
                  </h5>
                </CardHeader>
                <CardBody>
                  {this.state.isEditorOpen ? null : this.state.description ===
                    "" ? (
                    <div
                      style={{
                        backgroundColor: "#ffffffc4",
                        borderRadius: "8px",
                        color: "#ffffffad",
                        padding: "24px",
                      }}
                    >
                      No Description Available Yet! Open Editor and Create a
                      Description Now
                    </div>
                  ) : (
                    <div
                      style={{
                        backgroundColor: "#ffffffc4",
                        borderRadius: "8px",
                        color: "black",
                        padding: "24px",
                      }}
                      dangerouslySetInnerHTML={{
                        __html: this.state.description,
                      }}
                    ></div>
                  )}
                  {this.state.isEditorOpen ? (
                    <div
                      style={{
                        marginTop: "18px",
                      }}
                    >
                      <JoditEditor
                        value={this.state.editorText}
                        config={config}
                        tabIndex={1}
                        onChange={(newContent) => {
                          editedText = newContent;
                        }}
                      />
                      <Button
                        color="danger"
                        disabled={this.state.updatingDesc}
                        onClick={() => {
                          if (this.state.description === editedText) {
                            this.setState({
                              isEditorOpen: !this.state.isEditorOpen,
                            });
                          } else {
                            this.updateCompanyDescription(editedText);
                          }
                        }}
                      >
                        {this.state.updatingDesc
                          ? "Saving Please Wait"
                          : "Save & Close Editor"}
                      </Button>
                    </div>
                  ) : (
                    <div
                      style={{
                        marginTop: "18px",
                      }}
                    >
                      <Button
                        style={{
                          marginTop: "8px",
                        }}
                        onClick={() => {
                          this.setState({
                            isEditorOpen: !this.state.isEditorOpen,
                          });
                        }}
                      >
                        Open Editor
                      </Button>
                    </div>
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xs="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h2">Images</CardTitle>
                  <h5 className="card-category">
                    Sample Event Images and Others
                  </h5>
                </CardHeader>
                <CardBody>
                  <label>Pick Plack Card Image</label>
                  <Row style={{ marginTop: "12px", marginBottom: "18px" }}>
                    <Col xs="10">
                      <div className="custom-file mb-2">
                        <Input
                          type="file"
                          className="custom-file-input"
                          onChange={(e) => {
                            this.setState({
                              pickedImage: e.target.files[0],
                              pickedImageName: e.target.files[0].name,
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
                    </Col>
                    <Col xs="2">
                      <Button
                        color="success"
                        style={{ width: "100%" }}
                        disabled={this.state.savingImage}
                        onClick={() => this.saveImage()}
                      >
                        {this.state.savingImage
                          ? "Saving Please Wait"
                          : "Save Image"}
                      </Button>
                    </Col>
                  </Row>
                  <Col xs="12">
                    {this.state.selectedImages.length > 0 ? (
                      <Row>
                        <Col xs="12">
                          <Button
                            color="danger"
                            onClick={this.deleteImages}
                            disabled={this.state.isDeleting}
                          >
                            {this.state.isDeleting ? "Deleting..." : "Delete"}
                          </Button>
                        </Col>
                        <Col
                          xs="12"
                          style={{
                            color: "white",
                            padding: "12px",
                          }}
                        >
                          {this.state.selectedImages.length +
                            " Image(s) have been selected"}
                        </Col>
                      </Row>
                    ) : null}
                  </Col>
                  {this.state.images === null ? (
                    <div
                      style={{
                        backgroundColor: "#0000002e",
                        borderRadius: "8px",
                        color: "#ffffffad",
                        padding: "24px",
                      }}
                    >
                      Loading Images...
                    </div>
                  ) : this.state.images.length === 0 ? (
                    <div
                      style={{
                        backgroundColor: "#0000002e",
                        borderRadius: "8px",
                        color: "#ffffffad",
                        padding: "24px",
                      }}
                    >
                      No Images've been Added Yet
                    </div>
                  ) : (
                    <Gallery
                      images={galleryImages}
                      onSelectImage={this.onSelectImage}
                    />
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}
