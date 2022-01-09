import React, { useState, useEffect } from "react";
import {
  Container,
  Grow,
  Grid,
  AppBar,
  TextField,
  Button,
  Paper,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
// import ChipInput from 'material-ui-chip-input';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { getStandsBySearch } from "../../actions/stands";
import Stands from "../../components/Stands/Stands";
// import Form from '../Form/Form';
import Pagination from "../../components/Pagination/Pagination";

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  appBarSearch: {
    borderRadius: 4,
    marginBottom: "1rem",
    display: "flex",
    padding: "16px",
  },
  pagination: {
    borderRadius: 4,
    marginTop: "1rem",
    padding: "16px",
  },
  // gridContainer: {
  //   [theme.breakpoints.down('xs')]: {
  //     flexDirection: 'column-reverse',
  //   },
  // },
}));

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const AllStands = () => {
  const classes = useStyles();
  const query = useQuery();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");

  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const { stands, isLoading } = useSelector((state) => {
    return state.stands;
  });

  const history = useHistory();

  const [search, setSearch] = useState("");

  const searchStand = () => {
    if (search.trim()) {
      dispatch(getStandsBySearch({ search }));
      history.push(`/app/stands/search?searchQuery=${search || "none"}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      searchStand();
    }
  };

  return (
    <>
      <Grow in>
        <Container maxWidth="xl">
          <Grid
            container
            justify="space-between"
            alignItems="stretch"
            spacing={3}
            className={classes.gridContainer}
          >
            <Grid item xs={12} sm={6} md={9}>
              {searchQuery ? (
                Array.isArray(stands) ? (
                  (
                    <Paper
                      sx={{
                        p: 1,
                        m: 1,
                      }}
                      elevation={6}
                    >
                      <Typography>
                        {stands.length ?  (`Shows ${stands.length} search results of "${searchQuery}": `)
                        : isLoading ? null : (`No results for "${searchQuery}", please try other keywords`)
                      }
                      </Typography>
                    </Paper>
                  ) 
                ) : null
              ) : null}
              {!stands.length ? (
                <CircularProgress
                  sx={{
                    m: 4,
                  }}
                />
              ) : (
                <Stands setCurrentId={setCurrentId} />
              )}
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppBar
                className={classes.appBarSearch}
                position="static"
                color="inherit"
              >
                <TextField
                  id="search"
                  variant="outlined"
                  label="Search Stands"
                  fullWidth
                  onKeyDown={handleKeyPress}
                  name="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button
                  onClick={searchStand}
                  className={classes.searchButton}
                  variant="contained"
                  color="primary"
                >
                  Search
                </Button>
              </AppBar>
              {!searchQuery && (
                <Paper className={classes.pagination} elevation={6}>
                  <Pagination page={page} />
                </Paper>
              )}
              {/* {(searchQuery && stands) && (
              <Paper className={classes.pagination} elevation={6}>
                <Typography>
                  Shows the search results of "{search}":
                </Typography>
              </Paper>
            )} */}
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </>
  );
};

export default AllStands;
