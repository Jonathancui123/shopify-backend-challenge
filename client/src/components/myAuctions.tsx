import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ImageZoom from "react-medium-image-zoom";

import axios from "axios";
import constants from "../constants";
const { backendAddress } = constants;

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    // display: "flex",
    // justifyContent: "center",
    // height: "350px",
    position: "relative",
    height: "350px",
    overflow: "hidden",
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export default function MyAuctions() {
  const [auctions, setAuctions] = useState<Array<any>>([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState<any>();

  const classes = useStyles();

  useEffect(() => {
    axios
      .get(`${backendAddress}/users/currentUser/auctions`, {
        withCredentials: true,
      })
      .then((auctionsValue) => {
        const auctions = auctionsValue.data as unknown;
        console.log(auctions);
        setAuctions(auctions as Array<any>);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${backendAddress}/users/currentUser`, {
        withCredentials: true,
      })
      .then((res) => res.data)
      .then((user) => {
        setUser(user);
        setLoggedIn(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          {/* <Typography variant="h6" color="inherit" noWrap></Typography> */}
          <Button color="inherit" href="/">
            <ArrowBackIcon />
          </Button>
          <div className={classes.title}></div>

          {loggedIn ? (
            <>
              <AccountCircle style={{ marginRight: "5px" }} />
              {user.profile.firstName} {user.profile.lastName}
            </>
          ) : (
            <>
              <Button color="inherit" href="/signup">
                Sign up
              </Button>
              <Button color="inherit" href="/login">
                Login
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              My Auctions
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              View and manage auctions - without any watermarks!
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary" href="/create">
                    Create Another Auction
                  </Button>
                </Grid>
                <Grid item></Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {auctions.map((auction) => {
              const currentBid = auction.highestBid
                ? auction.highestBid.bidAmount
                : auction.startingBid;
              return (
                <Grid item key={auction._id} xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.cardMedia}
                      title={auction.name}
                    >
                      <ImageZoom
                        image={{
                          src: auction.privateImageSrc,
                          alt: auction.name,
                          style: {
                            display: "inline-block",
                            maxWidth:
                              "100%" /* You can use different numbers for max-width and max-height! */,
                            maxHeight: "100%",
                            width: "auto",
                            height: "auto",

                            position: "absolute",
                            left: "50%" /* This sets left top corner of the image to the center of the block... */,
                            top: "50%" /* This can be set also to bottom: 0; for aligning image to bottom line. Only translateX is used then. */,
                            // -webkit-transform: "translate(-50%,-50%)", /* ...and this moves the image 50 % of its width and height back. */
                            // -ms-transform: "translate(-50%,-50%)",
                            // -o-transform: "translate(-50%,-50%)",
                            transform: "translate(-50%,-50%)",
                          },
                        }}
                        zoomImage={{
                          src: auction.privateImageSrc,
                          alt: auction.name,
                        }}
                      />
                    </CardMedia>
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {auction.name}
                      </Typography>
                      <Typography gutterBottom component="h5">
                        In support of <b>{auction.charity}</b>!
                      </Typography>
                      <Typography>{auction.description}</Typography>
                    </CardContent>
                    <CardActions
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography component="h5" className="price">
                        ${currentBid}
                      </Typography>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
}
