import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Paper } from "@material-ui/core";
import { removeFav } from "../actions/records";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";

import Print from "./Print";

export default function Favorites() {
  const { favs } = useSelector((state) => state.quotes);
  const history = useHistory();
  const dispatch = useDispatch();
  const localfavs = localStorage.getItem("favorites");
  let favsArray;
  const [selectedRows, setSelectedRows] = useState();

  const removeFromFavs = () => {
    console.log(selectedRows);
    selectedRows.map((item) =>
      setTimeout(() => {
        dispatch(removeFav(item.id)); //I set time out cause related issue ->https://issueexplorer.com/issue/mui-org/material-ui-x/2714
      }, 100)
    );
  };

  useEffect(() => {}, [favs]);

  if (localfavs) {
    favsArray = Object.values(JSON.parse(localfavs));
  } else {
    return (
      <>
        <center>
          <Paper className="img-fluid" elevation={3}>
            <div>
              Nothing added to Favorites yet.
              <hr></hr>
              <Button color="secondary" onClick={() => history.push("/")}>
                Go back to Quotes
              </Button>
            </div>
          </Paper>
        </center>
      </>
    );
  }

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "author",
      headerName: "Author",
      width: 200,
      editable: true,
    },

    {
      field: "content",
      headerName: "Quote",
      sortable: false,
      width: 720,
    },
  ];

  return (
    <>
      <center>
        <Paper elevation={3}>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={favsArray}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[3]}
              checkboxSelection
              disableSelectionOnClick
              onSelectionModelChange={(ids) => {
                const selectedIDs = new Set(ids);
                const selectedRows = favsArray.filter((row) =>
                  selectedIDs.has(row.id)
                );

                setSelectedRows(selectedRows);
              }}
            />
          </div>
          {selectedRows ? (
            <Print selectedRows={selectedRows}></Print>
          ) : (
            <Button>Nothing selected to Print</Button>
          )}
          {selectedRows ? (
            <Button color="error" onClick={removeFromFavs}>
              Remove selected Quotes from Favorites
            </Button>
          ) : (
            <Button color="error">Nothing selected to Delete</Button>
          )}

          <Button color="secondary" onClick={() => history.push("/")}>
            Go back to Quotes
          </Button>
        </Paper>
      </center>
    </>
  );
}
