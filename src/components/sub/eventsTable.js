import React, {
  useState,
  useMemo,
  useEffect,
  forwardRef,
} from "react";
import DataTable, { createTheme } from "react-data-table-component";
import Axios from "./axios";
import swal from "sweetalert";
import { Button } from "reactstrap";
import { withRouter } from "react-router-dom";
const EventTable = forwardRef((props, ref) => {
  const [overlayLoader, setOverlayLoader] = useState(false);
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
    if(props.data != null){
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
  const handleEditAction = (value) => {
    setOverlayLoader(true);
    Axios.get("/events/read-for-admin/"+value.id)
    .then(u=> {
      setOverlayLoader(false);
      localStorage.setItem("eventDataToUpdate", JSON.stringify(u));
      return props.history.push('/admin/manage-events');
    })
    
  };
  const columns = useMemo(() => [
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
