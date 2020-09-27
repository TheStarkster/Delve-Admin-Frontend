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
  Table,
} from "reactstrap";
import Gallery from "react-grid-gallery";
import axios from "../components/sub/axios";
import swal from "sweetalert";

export default class EventGallery extends Component {
  state = {
    images: [],
    isSearching: false,
    eventId: "",
    selectedImages: [],
    selectedImageNames: [],
    isDeleting: false,
    isMoving: false,
  };
  componentWillMount = () => {
    if (this.props.location.state !== null) {
      this.setState({
        isSearching: !this.state.isSearching,
        eventId: this.props.location.state.eventId,
      });
      axios
        .get(`/events/get-gallery/${this.props.location.state.eventId}`)
        .then((u) => {
          this.setState({
            isSearching: !this.state.isSearching,
            images: u.data.map((image) => {
              return {
                ...image,
                src: image.url,
                thumbnail: image.url,
                thumbnailWidth: 320,
                thumbnailHeight: 320,
                isSelected: false,
              };
            }),
          });
        });
    }
  };
  searchImages = () => {
    this.setState({
      isSearching: !this.state.isSearching,
    });
    axios.get(`/events/get-gallery/${this.state.eventId}`).then((u) => {
      this.setState({
        isSearching: !this.state.isSearching,
        images: u.data.map((image) => {
          return {
            ...image,
            src: image.url,
            thumbnail: image.url,
            thumbnailWidth: 320,
            thumbnailHeight: 320,
            isSelected: false,
          };
        }),
      });
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
          .post("events/delete-image-bulk", {
            Ids: tempSelectedImages,
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
  useInAbout = () => {
    swal("Are you sure you want to use these images in about section too?", {
      buttons: ["No", "Yes"],
    }).then((ans) => {
      if (ans) {
        this.setState({
          isMoving: !this.state.isMoving,
        });
        axios
          .post("about-company/use-in-about", {
            images: this.state.selectedImageNames.map((name) => {
              return {
                ...name,
                url: name,
              };
            }),
          })
          .then((u) => {
            var imagesTemp = this.state.images;
            imagesTemp.forEach((image) => {
              image.isSelected = false;
            });
            this.setState({
              isMoving: !this.state.isMoving,
              images: imagesTemp,
              selectedImageNames: [],
              selectedImages: [],
            });
          });
      }
    });
  };
  render() {
    var galleryImages = [...this.state.images];
    return (
      <>
        <div className="content">
          <Row>
            <Card>
              <CardHeader>
                <CardTitle tag="h2">Event Gallery</CardTitle>
                <h5 className="card-category">Images Uploaded by attendees</h5>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs="10">
                    <Input
                      type="text"
                      placeholder="Enter Event Full Name"
                      value={this.state.eventId}
                      onChange={(e) =>
                        this.setState({ eventId: e.target.value })
                      }
                    />
                  </Col>
                  <Col xs="2">
                    <Button
                      style={{ width: "100%" }}
                      color="success"
                      disabled={this.state.isSearching}
                      onClick={this.searchImages}
                    >
                      {this.state.isSearching ? "Searching..." : "Search"}
                    </Button>
                  </Col>
                </Row>
                <Row>
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
                          <Button
                            color="primary"
                            onClick={this.useInAbout}
                            disabled={this.state.isMoving}
                          >
                            {this.state.isMoving
                              ? "Copying..."
                              : "Use in About Section"}
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
                  <Col xs="12">
                    <Gallery
                      images={galleryImages}
                      onSelectImage={this.onSelectImage}
                    />
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Row>
        </div>
      </>
    );
  }
}
