import React, { Component, createRef } from "react";
import Autocomplete from "../components/sub/autosuggest-norm";
import swal from "sweetalert";
import {
  Button,
  Input,
  FormGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Label,
} from "reactstrap";
import Axios from "../components/sub/axios";
import MyComponentHook from "components/sub/cities&countriesTable";

const s26 = {
  width: "100%",
};

const s50 = {
  marginLeft: "15px",
  marginTop: "14px",
};

export default class CitiesCountries extends Component {
                 constructor(props) {
                   super(props);
                   this.cityModalRef = createRef();
                   this.tableRef = createRef();
                   this._countryRef = createRef();
                   this._cityRef = createRef();
                   this.state = {
                     createdLocation: true,
                     locationName: "",
                     locationImageFile: null,
                     locationImageName: "Choose Image File",
                     locationDesc: "",
                    isAnUpdate:false,

                     createdCity: true,
                     createdCountry: true,
                     modalCountryCreated: true,
                     countryName: "",

                     cityFile: null,
                     cityFileName: "Choose New File",
                     cityName: "",
                     suggestionCountries: [],
                     suggestionCity: [],
                     locationId:null
                   };
                 }
                 componentWillMount = () => {
                   Promise.all([
                     Axios.get("/location/country/get-all"),
                     Axios.get("/location/city/get-all"),
                   ]).then(([u, a]) => {
                     this.setState({
                       suggestionCountries: u.data.map((a) => {
                         var b = {};
                         b["Name"] = a.name;
                         b["id"] = a.id;
                         return b;
                       }),
                       suggestionCity: a.data.map((a) => {
                         var b = {};
                         b["Name"] = a.name;
                         b["id"] = a.id;
                         return b;
                       }),
                     });
                   });
                 };
                 setDataToFields = (data) => {
                   this.setState({
                     locationName: data.Name,
                     locationDesc: data.desc,
                     isAnUpdate:!this.state.isAnUpdate,
                     locationId:data.id,
                   });
                   this._cityRef.current.setData(data.City);
                   this._countryRef.current.setData(data.Country);
                 };
                 render() {
                   return (
                     <React.Fragment>
                       {this.state.createdCountry ? null : (
                         <div className="Modal-Root">
                           <div
                             className="Country-Modal"
                             style={{
                               backgroundColor: "#27293d",
                             }}
                           >
                             <Col md="12">
                               <Row>
                                 <Col md="12">
                                   <h3
                                     style={{
                                       paddingTop: "18px",
                                     }}
                                   >
                                     Create New Country
                                   </h3>
                                 </Col>
                                 <Col md="12" style={{ paddingBottom: "16px" }}>
                                   <Label>Country Name</Label>
                                   <Input
                                     type="text"
                                     value={this.state.countryName}
                                     onChange={(e) => {
                                       this.setState({
                                         countryName: e.target.value,
                                       });
                                     }}
                                   />
                                 </Col>
                               </Row>
                               <Row className="justify-content-between">
                                 <Col
                                   md="12"
                                   xs="12"
                                   className="d-flex justify-content-end"
                                   style={{ padding: "18px" }}
                                 >
                                   <Button
                                     color="warning"
                                     onClick={() => {
                                       this.setState({
                                         createdCountry: !this.state
                                           .createdCountry,
                                         countryName: "",
                                       });
                                     }}
                                   >
                                     Cancel
                                   </Button>
                                   <Button
                                     color="success"
                                     disabled={!this.state.modalCountryCreated}
                                     onClick={(e) => {
                                       this.setState({
                                         modalCountryCreated: !this.state
                                           .modalCountryCreated,
                                       });
                                       var formdata = new FormData();
                                       formdata.append(
                                         "name",
                                         this.state.countryName
                                       );
                                       Axios.post(
                                         "/location/country/create",
                                         formdata
                                       ).then((u) => {
                                         if (u.data.status == "success") {
                                           var temp = this.state
                                             .suggestionCountries;
                                           temp.push({
                                             id: u.data.id,
                                             Name: this.state.countryName,
                                           });
                                           this.setState({
                                             suggestionCountries: temp,
                                             createdCountry: !this.state
                                               .createdCountry,
                                             countryName: "",
                                             modalCountryCreated: !this.state
                                               .modalCountryCreated,
                                           });
                                         }
                                       });
                                     }}
                                   >
                                     {this.state.modalCountryCreated
                                       ? "Save"
                                       : "Saving..."}
                                   </Button>
                                 </Col>
                               </Row>
                             </Col>
                           </div>
                         </div>
                       )}
                       {this.state.createdCity ? null : (
                         <div className="Modal-Root">
                           <div
                             className="Country-Modal"
                             style={{
                               backgroundColor: "#27293d",
                               padding: "19px",
                             }}
                           >
                             <Row>
                               <Col md="12">
                                 <h3
                                   style={{
                                     paddingTop: "18px",
                                   }}
                                 >
                                   Create New City
                                 </h3>
                               </Col>
                               <Col md="12" style={{ paddingBottom: "16px" }}>
                                 <div className="form-group d-inline mb-2">
                                   <Autocomplete
                                     suggestions={
                                       this.state.suggestionCountries
                                     }
                                     id={"category-suggest"}
                                     hint={"Country Name"}
                                     className="suggestions-in-container"
                                     ref={this.cityModalRef}
                                   />
                                 </div>
                               </Col>
                               <Col md="12" style={{ paddingBottom: "16px" }}>
                                 <Label>City Name</Label>
                                 <Input
                                   type="text"
                                   value={this.state.cityName}
                                   placeholder="City Name"
                                   onChange={(e) => {
                                     this.setState({
                                       cityName: e.target.value,
                                     });
                                   }}
                                 />
                               </Col>
                               <Col md="12">
                                 <Label>City Image</Label>
                                 <div className="custom-file mb-2">
                                   <Input
                                     type="file"
                                     className="custom-file-input"
                                     id="ticket-file"
                                     onChange={(e) => {
                                       this.setState({
                                         cityFile: e.target.files[0],
                                         cityFileName: e.target.files[0].name,
                                       });
                                     }}
                                   />
                                   <label
                                     className="custom-file-label"
                                     htmlFor="customFileThumbanail"
                                   >
                                     {this.state.cityFileName}
                                   </label>
                                 </div>
                               </Col>
                             </Row>
                             <Row className="justify-content-between">
                               <Col
                                 md="12"
                                 xs="12"
                                 className="d-flex justify-content-end"
                                 style={{ padding: "18px" }}
                               >
                                 <Button
                                   color="warning"
                                   onClick={() => {
                                     this.setState({
                                       createdCity: !this.state.createdCity,
                                       cityFile: null,
                                       cityFileName: "Choose New File",
                                       cityName: "",
                                     });
                                   }}
                                 >
                                   Cancel
                                 </Button>
                                 <Button
                                   color="success"
                                   disabled={!this.state.modalCountryCreated}
                                   onClick={(e) => {
                                     this.setState({
                                       modalCountryCreated: !this.state
                                         .modalCountryCreated,
                                     });
                                     var formdata = new FormData();
                                     formdata.append(
                                       "countryId",
                                       this.cityModalRef.current.returnId()
                                     );
                                     formdata.append(
                                       "name",
                                       this.state.cityName
                                     );
                                     formdata.append(
                                       "image",
                                       this.state.cityFile
                                     );
                                     Axios.post(
                                       "/location/city/create",
                                       formdata
                                     ).then((u) => {
                                       if (u.data.status == "success") {
                                         this.setState({
                                           createdCity: !this.state.createdCity,
                                           cityFile: null,
                                           cityFileName: "Choose New File",
                                           cityName: "",
                                           modalCountryCreated: !this.state
                                             .modalCountryCreated,
                                         });
                                       }
                                     });
                                   }}
                                 >
                                   {this.state.modalCountryCreated
                                     ? "Save"
                                     : "Saving..."}
                                 </Button>
                               </Col>
                             </Row>
                           </div>
                         </div>
                       )}
                       <div className="content">
                         <Row>
                           <Card>
                             <CardHeader>
                               <Row>
                                 <Col className="text-left" sm="6">
                                   <CardTitle tag="h2">
                                     Manage City Attractions
                                   </CardTitle>
                                   <h5 className="card-category">
                                     create city attractions
                                   </h5>
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
                                         suggestions={
                                           this.state.suggestionCountries
                                         }
                                         id={"category-suggest"}
                                         categoryChipHit={this.categoryChipHit}
                                         ref={this._countryRef}
                                         hint={"Country Name"}
                                       />
                                     </div>
                                     <div class="form-group">
                                       <button
                                         onClick={(e) => {
                                           e.preventDefault();
                                           this.setState({
                                             createdCountry: !this.state
                                               .createdCountry,
                                           });
                                         }}
                                         className="btn btn-success"
                                         style={s50}
                                       >
                                         New
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
                                         suggestions={this.state.suggestionCity}
                                         id={"category-suggest"}
                                         ref={this._cityRef}
                                         hint={"City Name"}
                                       />
                                     </div>
                                     <div class="form-group">
                                       <button
                                         onClick={(e) => {
                                           e.preventDefault();
                                           this.setState({
                                             createdCity: !this.state
                                               .createdCity,
                                           });
                                         }}
                                         className="btn btn-success"
                                         style={s50}
                                       >
                                         New
                                       </button>
                                     </div>
                                   </div>
                                 </Col>
                               </Row>
                               <Row>
                                 <Col md="6">
                                   <FormGroup>
                                     <label>Place of Interest</label>
                                     <Input
                                       placeholder="Place Name"
                                       type="text"
                                       value={this.state.locationName}
                                       onChange={(e) => {
                                         this.setState({
                                           locationName: e.target.value,
                                         });
                                       }}
                                     />
                                   </FormGroup>
                                 </Col>
                                 <Col md="6">
                                   <FormGroup>
                                     <label>Place Image</label>
                                     <div className="custom-file mb-2">
                                       <Input
                                         type="file"
                                         className="custom-file-input"
                                         onChange={(e) => {
                                           this.setState({
                                             locationImageFile:
                                               e.target.files[0],
                                             locationImageName:
                                               e.target.files[0].name,
                                           });
                                         }}
                                       />
                                       <label
                                         className="custom-file-label"
                                         htmlFor="customFileThumbanail"
                                       >
                                         {this.state.locationImageName}
                                       </label>
                                     </div>
                                   </FormGroup>
                                 </Col>
                                 <Col md="12">
                                   <FormGroup>
                                     <label>Place Discription</label>
                                     <Input
                                       placeholder="Description"
                                       type="text"
                                       value={this.state.locationDesc}
                                       onChange={(e) => {
                                         this.setState({
                                           locationDesc: e.target.value,
                                         });
                                       }}
                                     />
                                   </FormGroup>
                                 </Col>
                               </Row>
                               <Row className="justify-content-between">
                                 <Col
                                   md="12"
                                   xs="12"
                                   className="d-flex justify-content-end"
                                   style={{ padding: "18px" }}
                                 >
                                   <Button
                                     color="success"
                                     disabled={!this.state.createdLocation}
                                     onClick={() => {
                                                      this.setState({
                                                        createdLocation: !this
                                                          .state
                                                          .createdLocation,
                                                      });
                                                      var formdata = new FormData();
                                                      formdata.append(
                                                        "name",
                                                        this.state.locationName
                                                      );
                                                      formdata.append(
                                                        "desc",
                                                        this.state.locationDesc
                                                      );
                                                      formdata.append(
                                                        "CityId",
                                                        this._cityRef.current.returnId()
                                                      );
                                                      formdata.append(
                                                        "CountryId",
                                                        this._countryRef.current.returnId()
                                                      );
                                                      formdata.append(
                                                        "image",
                                                        this.state
                                                          .locationImageFile
                                                      );
                                                      for (var value of formdata.values()) {
                                                        if(!value){
                                                          swal(
                                                            "Can't Update",
                                                            "All Fields Are Mandatory!",
                                                            "error"
                                                          );
                                                          this.setState({
                                                            createdLocation: true
                                                          });
                                                          return
                                                        }
                                                      }
                                                       if(!this.state.isAnUpdate){
                                                         Axios.post(
                                                           "/location/create",
                                                           formdata
                                                         ).then((u) => {
                                                           this.setState({
                                                             createdLocation: !this
                                                               .state
                                                               .createdLocation,
                                                             locationName: "",
                                                             locationImageFile: null,
                                                             locationImageName:
                                                               "Choose Image File",
                                                             locationDesc: "",
                                                           });
                                                           this.tableRef.current.resetTable();
                                                         });
                                                       } else {
                                                         Axios.put(
                                                           "/location/update/"+this.state.locationId,
                                                           formdata
                                                         ).then((u) => {
                                                           this.setState({
                                                             createdLocation: !this
                                                               .state
                                                               .createdLocation,
                                                             locationName: "",
                                                             locationImageFile: null,
                                                             locationImageName:
                                                               "Choose Image File",
                                                             locationDesc: "",
                                                           });
                                                           this.tableRef.current.resetTable();
                                                         });
                                                       }
                                                    }}
                                   >
                                     {this.state.createdLocation
                                       ? "Save"
                                       : "Saving..."}
                                   </Button>
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
                                   <CardTitle tag="h2">
                                     Added City Attractions
                                   </CardTitle>
                                 </Col>
                               </Row>
                             </CardHeader>
                             <CardBody>
                               <MyComponentHook
                                 ref={this.tableRef}
                                 setDataInParent={this.setDataToFields}
                               />
                             </CardBody>
                           </Card>
                         </Row>
                       </div>
                     </React.Fragment>
                   );
                 }
               }
