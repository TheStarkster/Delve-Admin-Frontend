import React, { useState, useMemo, useCallback, useEffect, forwardRef } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import Axios from "./axios";
import {
  Button
} from "reactstrap";
const MyComponentHook = forwardRef((props,ref) => {
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
  const getData = () => {
    Axios.get("/location/get-all").then((u) => {
      setData(
        u.data.map((a) => {
          var obj = {};
          obj["Name"] = a.name;
          obj["City"] = a.Cities.name;
          obj["Country"] = a.Countries.name;
          return obj;
        })
      );
      setProgress(false);
    });
  }
  useEffect(() => {
    getData()
  }, []);
  const handleDeleteAction = (value) => {
    console.log(value);
    
  };
  const handleEditAction = (value) => {
   
  };
  const resetTable = () => {
    getData()
  };
  const updateState = useCallback((state) => console.log(state));
  const columns = useMemo(() => [
    {
      name: "Name",
      selector: "Name",
    },
    {
      name: "City",
      selector: "City",
    },
    {
      name: "Country",
      selector: "Country",
    },
    {
      cell: (row) => (
        <Button
          style={{ padding: "15px" }}
          className="btn btn-primary"
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
        data={data}
        columns={columns}
        theme="solarized"
        onSelectedRowsChange={updateState}
        pagination={true}
        progressPending={progress}
        progressComponent={<h2>Hang on...😊</h2>}
      />
    </>
  );
});

export default MyComponentHook;
