import React, { useState, useMemo, useEffect } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import Axios from "./axios";
import swal from "sweetalert";
import { Button, Row, Col, Input, Label } from "reactstrap";

const ExpandableComponent = ({ data }) => (
  <>
    <Row>
      <Col md="12" style={{ margin: "24px" }}>
        Question:{" "}
        <div
          style={{
            color: "white",
            padding: "14px",
            marginTop: "8px",
            marginBottom: "8px",
            backgroundColor: "#0000002b",
            borderRadius: "4px",
          }}
        >
          {data.question}
        </div>
        Answer:{" "}
        <div
          style={{
            color: data.answer == null ? "#ff6464" : "white",
            padding: "14px",
            marginTop: "8px",
            backgroundColor: "#0000002b",
            borderRadius: "4px",
          }}
        >
          {data.answer == null ? "Not Answered Yet!" : data.answer}
        </div>
      </Col>
    </Row>
  </>
);

const QueryTable = (props) => {
  const [overlayLoader, setOverlayLoader] = useState(false);
  const [progress, setProgress] = useState(true);
  const [data, setData] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [answer, setAnswer] = useState("");
  const [openedQueryId, setOpenQueryId] = useState("");
  const [openedQueryAttendeeId, setOpenQueryAttendeeId] = useState("");

  useEffect(() => {
    if (!props.inAll) {
      Axios.get("query/get-latest").then((u) => {
        const modifiedData = u.data.map((row) => {
          return {
            ...row,
            attendeeName: row.Attendee.name,
            attendeePhone: row.Attendee.phone,
            attendeeEmail: row.Attendee.email,
            attendeeId: row.Attendee.id,
            //TODO: implement event name in queries table
            // EventName: row.Event.name,
          };
        });
        setData(modifiedData);
        setProgress(false);
      });
    } else {
      if (props.eventId) {
        Axios.get(`query/get-all/${props.eventId}`).then((u) => {
          const modifiedData = u.data.map((row) => {
            return {
              ...row,
              attendeeName: row.Attendee.name,
              attendeePhone: row.Attendee.phone,
              attendeeEmail: row.Attendee.email,
              attendeeId: row.Attendee.id,
              //TODO: implement event name in queries table
              // EventName: row.Event.name,
            };
          });
          setData(modifiedData);
          setProgress(false);
          props.searched();
        });
      } else {
        setData([]);
        setProgress(false);
      }
    }
  }, [props.eventId]);

  createTheme("solarized", {
    text: {
      primary: "#ffffff",
      secondary: "#9A9A9A",
    },
    background: {
      default: "#27293d",
    },
    action: {
      button: "rgba(255,255,255, 1)",
      hover: "rgba(255,255,255, 1)",
      disabled: "rgba(255,255,255, 1)",
    },
  });

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
  const handleResolveAction = (value) => {
    setShowModal(true);
    setOpenQueryId(value.id);
    setOpenQueryAttendeeId(value.attendeeId);
  };
  const saveAnswer = () => {
    setIsSaving(true);
    Axios.post("query/resolve", {
      answer: answer,
      id: openedQueryId,
      attendeeId: openedQueryAttendeeId,
    }).then((u) => {
      if (props.eventId == null) {
        Axios.get("query/get-latest").then((u) => {
          const modifiedData = u.data.map((row) => {
            return {
              ...row,
              attendeeName: row.Attendee.name,
              attendeePhone: row.Attendee.phone,
              attendeeEmail: row.Attendee.email,
              attendeeId: row.Attendee.id,
              //TODO: implement event name in queries table
              // EventName: row.Event.name,
            };
          });
          setData(modifiedData);
          setProgress(false);
          setIsSaving(false);
          setShowModal(false);
        });
      }
    });
  };
  const columns = useMemo(() => [
    {
      name: "#",
      selector: "id",
      maxWidth: "18px",
    },
    {
      name: "Event Id",
      selector: "EventId",
      maxWidth: "18px",
    },
    {
      name: "Event Name",
      selector: "EventName",
    },
    {
      selector: "question",
      name: "Question",
    },
    {
      name: "Answer",
      selector: "answer",
    },
    {
      name: "Attendee",
      selector: "attendeeName",
    },
    {
      name: "Attendee Phone",
      selector: "attendeePhone",
    },
    {
      name: "Attendee Email",
      selector: "attendeeEmail",
    },
    {
      cell: (row) => (
        <Button
          style={{ padding: "15px" }}
          className="btn btn-primary"
          onClick={() => handleResolveAction(row)}
        >
          Resolve
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
                  Resolve Query
                </h3>
              </Col>
              <Col md="12" style={{ paddingBottom: "16px" }}>
                <Label>Answer</Label>
                <Input
                  type="textarea"
                  onChange={(e) => setAnswer(e.target.value)}
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
                    setOpenQueryId("");
                    setOpenQueryAttendeeId("");
                    setAnswer("");
                  }}
                >
                  Cancel
                </Button>
                <Button
                  color="success"
                  disabled={isSaving}
                  onClick={saveAnswer}
                >
                  {isSaving ? "Saving..." : "Save"}
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
        data={data || []}
        columns={columns}
        theme="solarized"
        pagination={true}
        progressPending={progress}
        expandableRowsComponent={<ExpandableComponent />}
        expandableRows
        progressComponent={<h2>Loading Queries...</h2>}
      />
    </>
  );
};

export default QueryTable;
