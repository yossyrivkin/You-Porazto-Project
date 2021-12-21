import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid, AppBar, TextField, Button, Paper } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
// import ChipInput from 'material-ui-chip-input';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import { getStandsBySearch } from '../../actions/stands';
import Stands from '../../components/Stands/Stands';
// import Form from '../Form/Form';
import Pagination from '../../components/Pagination/Pagination';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  appBarSearch: {
    borderRadius: 4,
    marginBottom: '1rem',
    display: 'flex',
    padding: '16px',
  },
  pagination: {
    borderRadius: 4,
    marginTop: '1rem',
    padding: '16px',
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
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');

  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);
  const history = useHistory();


  const searchStand = () => {
    if (search.trim() || tags) {
      dispatch(getStandsBySearch({ search, tags: tags.join(',') }));
      history.push(`/app/stands/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
    } else {
      history.push('/');
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchStand();
    }
  };

  const handleAddChip = (tag) => setTags([...tags, tag]);

  const handleDeleteChip = (chipToDelete) => setTags(tags.filter((tag) => tag !== chipToDelete));

  return (<>
    <Grow in>
      <Container maxWidth="xl">
        <Grid container justify="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
          <Grid item xs={12} sm={6} md={9}>
            <Stands setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar className={classes.appBarSearch} position="static" color="inherit">
              <TextField onKeyDown={handleKeyPress} name="search" variant="outlined" label="Search Stands" fullWidth value={search} onChange={(e) => setSearch(e.target.value)} />
              {/* <ChipInput
                style={{ margin: '10px 0' }}
                value={tags}
                onAdd={(chip) => handleAddChip(chip)}
                onDelete={(chip) => handleDeleteChip(chip)}
                label="Search Tags"
                vari  ant="outlined"
              /> */}
              <Button onClick={searchStand} className={classes.searchButton} variant="contained" color="primary">Search</Button>
            </AppBar>
            {/* <Form currentId={currentId} setCurrentId={setCurrentId} /> */}
            {(!searchQuery && !tags.length) && (
              <Paper className={classes.pagination} elevation={6}>
                <Pagination page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
    </>
  );
};

export default AllStands;
