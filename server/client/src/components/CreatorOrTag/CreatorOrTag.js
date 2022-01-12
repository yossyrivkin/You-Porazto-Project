import React, { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Typography, CircularProgress, Grid, Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import Stand from '../Stands/Stand/Stand';
import { getStandsByCreator, getStandsBySearch } from '../../actions/stands';

const CreatorOrTag = () => {
  const { name } = useParams();
  const dispatch = useDispatch();
  const { stands, isLoading } = useSelector((state) => state.stands);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith('/tags')) {
      dispatch(getStandsBySearch({ tags: name }));
    } else {
      dispatch(getStandsByCreator(name));
    }
  }, []);

  if (!stands.length && !isLoading) return 'No stands';

  return (
    <div>
      <Typography variant="h2">{name}</Typography>
      <Divider style={{ margin: '20px 0 50px 0' }} />
      {isLoading ? <CircularProgress /> : (
        <Grid container alignItems="stretch" spacing={3}>
          {stands?.map((stand) => (
            <Grid key={stand._id} item xs={12} sm={12} md={6} lg={3}>
              <Stand stand={stand} />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default CreatorOrTag;
