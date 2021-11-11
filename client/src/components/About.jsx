import { Paper, Tooltip } from "@material-ui/core";
import React from "react";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import GitHubIcon from "@mui/icons-material/GitHub";
export default function About() {
  const history = useHistory();
  return (
    <>
      <center>
        <Paper className="img-fluid" elevation={3}>
          <div>
            Burak KA
            <Tooltip title="Github Repo">
              <Button
                onClick={() =>
                  window.open(
                    "https://github.com/brkkartaloglu?tab=repositories"
                  )
                }
                className="twt"
              >
                <GitHubIcon
                  style={{ height: "35px", width: "35px" }}
                  color="primary"
                />
              </Button>
            </Tooltip>
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
