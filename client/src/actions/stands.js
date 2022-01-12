import { START_LOADING, END_LOADING, FETCH_ALL, FETCH_STAND, FETCH_BY_SEARCH, CREATE, UPDATE, DELETE, LIKE, COMMENT, FETCH_BY_CREATOR } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getStand = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.fetchStand(id);
    console.log(data);
    dispatch({ type: FETCH_STAND, payload: { stand: data } });
  } catch (error) {
    console.log(error);
  }
};

export const getStands = (page, userLocation) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { data, currentPage, numberOfPages } } = await api.fetchStands(page, userLocation);
    console.log(data);
    dispatch({ type: FETCH_ALL, payload: { data, currentPage, numberOfPages } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getStandsByCreator = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { data } } = await api.fetchStandsByCreator();

    dispatch({ type: FETCH_BY_CREATOR, payload: { data } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getStandsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { data } } = await api.fetchStandsBySearch(searchQuery);

    dispatch({ type: FETCH_BY_SEARCH, payload: { data } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const createStand = (stand, history) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createStand(stand);

    dispatch({ type: CREATE, payload: data });

    history.push(`/stands/${data._id}`);
  } catch (error) {
    console.log(error);
  }
};

export const updateStand = (id, stand) => async (dispatch) => {
  try {
    const { data } = await api.updateStand(id, stand);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const likeStand = (id) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem('profile'));

  try {
    const { data } = await api.likeStand(id, user?.token);

    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const commentStand = (value, id) => async (dispatch) => {
  try {
    const { data } = await api.comment(value, id);
    console.log(data);

    dispatch({ type: COMMENT, payload: data });
    
    return data.comments;
  } catch (error) {
    console.log(error);
  }
};

export const deleteStand = (id) => async (dispatch) => {
  try {
    await await api.deleteStand(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};
