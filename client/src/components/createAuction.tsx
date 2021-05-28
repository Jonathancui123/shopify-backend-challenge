import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { DropzoneArea } from "material-ui-dropzone";
import constants from "../constants";
const { backendAddress, frontendAddress } = constants;

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function CreateAuction() {
  const history = useHistory();
  const [files, setFiles] = useState(new Blob());
  const classes = useStyles();

  const redirectToDashboard = () => {
    history.push("/");
  };

  const onDropFiles = (droppedFiles: any) => {
    console.log(typeof droppedFiles);
    console.log(droppedFiles);

    setFiles(droppedFiles[0]);
  };

  const onSubmit = async (event: any) => {
    event.preventDefault();
    console.log(event);

    const currentDate = new Date().getTime();
    const closingDateString = new Date(
      currentDate + parseInt(event.target[11].value) * 1000 * 60
    ).toISOString();

    var bodyFormData = new FormData();
    bodyFormData.append("auction_image", files);
    bodyFormData.append("name", event.target[2].value);
    bodyFormData.append("description", event.target[4].value);
    bodyFormData.append("startingBid", event.target[7].value);
    bodyFormData.append("charity", event.target[9].value);
    bodyFormData.append("closingDate", closingDateString);

    console.log(bodyFormData);

    try {
      const result = await axios.post(
        `${backendAddress}/auctions`,
        bodyFormData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      console.log(result);
      redirectToDashboard();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create a new auction
        </Typography>
        <form className={classes.form} onSubmit={onSubmit}>
          <div style={{ padding: "10px 0px" }}>
            <DropzoneArea
              onDrop={onDropFiles}
              acceptedFiles={["image/*"]}
              filesLimit={1}
              maxFileSize={10000000}
              dropzoneText={"Drag and drop an image here or click"}
              onChange={(files) => console.log("Files:", files)}
            />
          </div>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="title"
                name="title"
                variant="outlined"
                required
                fullWidth
                id="title"
                label="Title of the Piece"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                multiline={true}
                rowsMax={7}
                fullWidth
                id="description"
                label="Art Description"
                name="description"
                autoComplete="description"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl
                required
                fullWidth
                // className={classes.margin}
                variant="outlined"
              >
                <InputLabel htmlFor="outlined-adornment-amount">
                  Starting Bid
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  // value={values.amount}
                  // onChange={handleChange("amount")}
                  type="number"
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                  labelWidth={60}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="charity"
                label="Which charity are you supporting?"
                type="charity"
                id="charity"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" required fullWidth>
                <InputLabel id="demo-simple-select-outlined-label">
                  Duration
                </InputLabel>
                <Select label="Duration" name="duration">
                  <MenuItem value={5}>5 minutes</MenuItem>
                  <MenuItem value={60 * 24}>24 hours</MenuItem>
                  <MenuItem value={60 * 24 * 7}>1 week</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Create Auction
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                Return to dashboard
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
