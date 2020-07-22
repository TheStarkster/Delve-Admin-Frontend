import React, {
  useState,
  useMemo,
  useCallback,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import DataTable, { createTheme } from "react-data-table-component";
import Axios from "./axios";
import swal from "sweetalert";
import { Button } from "reactstrap";
const MyComponentHook = forwardRef((props, ref) => {
  const [overlayLoader, setOverlayLoader] = useState(false);
  const [progress, setProgress] = useState(true);
  const [data, setData] = useState([]);
  useImperativeHandle(ref, () => ({
    resetTable: () => {
      getData();
    },
  }));

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
    Axios.get("/customer/get-all").then((u) => {
      console.log(u.data);
      setData(u.data);
      setProgress(false);
    });
  };
  useEffect(() => {
    getData();
  }, []);
  const handleDeleteAction = (value) => {
    console.log(value);
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover it!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        var arr = data.filter((item) => item.id !== value.id);
        console.log(arr);
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
    props.setDataInParent(value);
  };
  const updateState = useCallback((state) => console.log(state));
  const columns = useMemo(() => [
    {
      name: "Name",
      selector: "name",
    },
    {
      name: "Organisation",
      selector: "organisation",
    },
    {
      name: "Phone",
      selector: "phone",
    },
    {
      name: "Email",
      selector: "email",
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
