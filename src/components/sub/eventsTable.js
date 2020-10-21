import React, { useState, useMemo, useEffect, forwardRef } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import Axios from "./axios";
import swal from "sweetalert";
import { Button, Row, Col, Label, Input } from "reactstrap";
import { withRouter } from "react-router-dom";
import axios from "./axios";
const EventTable = forwardRef((props, ref) => {
  const [overlayLoader, setOverlayLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState();
  const [notificationText, setNotificationText] = useState("");
  const [progress, setProgress] = useState(true);
  const [data, setData] = useState([]);
  createTheme("solarized", {
    text: {
      primary: "#ffffff",
      secondary: "#9A9A9A",
    },
    background: {
      default: "#27293d",
    },
    action: {
      button: "rgba(0,0,0,.54)",
      hover: "rgba(0,0,0,.08)",
      disabled: "rgba(0,0,0,.12)",
    },
  });

  useEffect(() => {
    if (props.data != null) {
      setProgress(false);
    }
  }, [props.data]);
  const handleDeleteAction = (value) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover it!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        var arr = data.filter((item) => item.id !== value.id);
        setData(arr);
        await Axios.delete("/customer/delete/" + value.id);
        swal("Poof! Your content has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your Data is Safe!");
      }
    });
  };
  const handleGalleryAction = (value) => {
    return props.history.push({
      pathname: "/admin/event-gallery",
      state: { eventId: value.id },
    });
  };
  const handleEditAction = (value) => {
    setOverlayLoader(true);
    Axios.get("/events/read-for-admin/" + value.id).then((u) => {
      setOverlayLoader(false);
      localStorage.setItem("eventDataToUpdate", JSON.stringify(u));
      return props.history.push("/admin/manage-events");
    });
  };
  const handleDownloadAction = (value) => {
    window.open(
      "http://162.241.71.139:5000/v1/events/download-id-proofs/" + value.id,
      "_blank"
    );
  };
  const notifyAttendees = () => {
    setIsSaving(true);
    axios
      .post("/events/notify", {
        eventId: selectedEventId,
        message: notificationText,
      })
      .then((u) => {
        setSelectedEventId();
        setShowModal(false);
        setIsSaving(false);
        setNotificationText("");
        swal("All attendies notified!", {
          icon: "success",
        });
      });
  };
  const handleNotify = (value) => {
    setSelectedEventId(value.id);
    setShowModal(!showModal);
  };
  const columns = useMemo(() => [
    {
      name: "Event Id",
      selector: "id",
    },
    {
      name: "Name",
      selector: "name",
    },
    {
      name: "Customer Name",
      selector: "customerName",
    },
    {
      name: "Organisation",
      selector: "customerOrganisation",
    },
    {
      name: "Starts On",
      selector: "liveFrom",
    },
    {
      name: "Ends On",
      selector: "liveTo",
    },
    {
      cell: (row) => (
        <Button
          style={{ padding: "15px" }}
          className="btn btn-primary"
          onClick={() => handleNotify(row)}
        >
          <i className="tim-icons icon-bell-55" />
        </Button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      name: "Notify",
      selector: "Notify",
    },
    {
      cell: (row) => (
        <Button
          style={{ padding: "15px" }}
          className="btn btn-primary"
          onClick={() => handleDownloadAction(row)}
        >
          <i className="tim-icons icon-cloud-download-93" />
        </Button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      name: "Download",
      selector: "Download",
    },
    {
      cell: (row) => (
        <Button
          style={{ padding: "15px" }}
          className="btn btn-success"
          onClick={() => handleGalleryAction(row)}
        >
          <i className="tim-icons icon-camera-18" />
        </Button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      name: "Gallery",
      selector: "gallery",
    },
    {
      cell: (row) => (
        <Button
          style={{ padding: "15px" }}
          className="btn btn-primary"
          onClick={() => handleEditAction(row)}
        >
          <i className="tim-icons icon-pencil" />
        </Button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      name: "Edit",
      selector: "edit",
    },
    {
      cell: (row) => (
        <Button
          style={{ padding: "15px" }}
          className="btn btn-danger"
          onClick={() => handleDeleteAction(row)}
        >
          <i className="tim-icons icon-trash-simple" />
        </Button>
      ),
      ignoreRowClick: true,
      button: true,
      name: "Delete",
      selector: "delete",
    },
  ]);

  return (
    <>
      {showModal ? (
        <div className="Modal-Root">
          <div className="resolve-card">
            <Row>
              <Col md="12">
                <h3
                  style={{
                    paddingTop: "18px",
                  }}
                >
                  Notify Attendees
                </h3>
              </Col>
              <Col md="12" style={{ paddingBottom: "16px" }}>
                <Label>Message in Notification</Label>
                <Input
                  type="textarea"
                  onChange={(e) => setNotificationText(e.target.value)}
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
                    setIsSaving(false);
                    setShowModal(false);
                    setSelectedEventId();
                    notifyAttendees();
                    setNotificationText("");
                  }}
                >
                  Cancel
                </Button>
                <Button
                  color="success"
                  disabled={isSaving}
                  onClick={notifyAttendees}
                >
                  {isSaving ? "Notifying..." : "Notify"}
                </Button>
              </Col>
            </Row>
          </div>
        </div>
      ) : null}
      <div
        className="loading-overlay"
        style={{ display: overlayLoader ? "flex" : "none" }}
      >
        <div class="lds-ripple">
          <div></div>
          <div></div>
        </div>
        Loading...
      </div>
      <DataTable
        data={props.data || []}
        columns={columns}
        theme="solarized"
        pagination={true}
        progressPending={progress}
        progressComponent={<h2>Loading Events... 📅</h2>}
      />
    </>
  );
});

export default withRouter(EventTable);
