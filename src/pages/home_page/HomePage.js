import { Alert, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchData } from "../../redux/nasa/nasaAction";
import ImageCard from "./ImageCard";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { DateRangePicker } from "@mui/lab";
import "./HomePage.css";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#f6f6f7",
  },
  progress: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "45vh",
  },
  datepick: {
    margin: "auto",
    display: "flex !important",
    justifyContent: "center !important",
  },
  title: {
    fontFamily: ["Dancing Script", "cursive"],
    fontSize: "4rem",
    // fontFamily: "'Roboto', sans-serif",
  },
  subheading: {
    fontWeight: "lighter",
    // fontFamily: ["Dancing Script", "cursive"],
    // fontSize: "1rem",
    // fontFamily: "'Roboto', sans-serif",
  },
}));

function HomePage({ nasa, getData }) {
  const classes = useStyles();
  const [date, setdate] = React.useState([null, null]);
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleDateChange = (date) => {
    console.log(date);
    setdate(date);
  };

  useEffect(() => {
    if (date[0] && date[1]) {
      const startDate = new Date(date[0]).toISOString().split("T")[0];
      const endDate = new Date(date[1]).toISOString().split("T")[0];
      console.log(startDate, endDate);
      getData(startDate, endDate);
    }
    if (!date[0] && !date[1]) {
      getData("", "");
    }
  }, [getData, date]);

  return (
    <>
      <center>
        <div className={classes.root}>
          <h1 className={classes.title}>Spacetagram</h1>
          <h4 className={classes.subheading}>
            Brought to yoy by NASA's Photo of the Day(APOD) API
          </h4>
          <br />
          <center className={classes.datepick}>
            <DateRangePicker
              calendars={1}
              value={date}
              onChange={handleDateChange}
              renderInput={(startProps, endProps) => (
                <React.Fragment>
                  <TextField {...startProps} />
                  <Box sx={{ mx: 2 }}> to </Box>
                  <TextField {...endProps} />
                </React.Fragment>
              )}
            />
          </center>
          <br />
          <br />
          {nasa.data.error && (
            <Alert
              onClose={handleClose}
              severity="error"
              sx={{ width: "100%" }}
            >
              {nasa.data.error?.message ?? ""}
            </Alert>
          )}
          {nasa.data.msg && (
            <Alert
              onClose={handleClose}
              severity="error"
              sx={{ width: "100%" }}
            >
              {nasa.data?.msg ?? ""}
            </Alert>
          )}
          {nasa.loading && (
            <Box className={classes.progress}>
              <CircularProgress size={100} />
            </Box>
          )}

          {nasa.data.length > 0 && (
            <Grid container spacing={3} justifyContent="center">
              {nasa.data.map((item) => (
                <ImageCard key={item.id} data={item} />
              ))}
            </Grid>
          )}
        </div>
      </center>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    nasa: state.nasa,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getData: (startDate, endDate) => dispatch(fetchData(startDate, endDate)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
