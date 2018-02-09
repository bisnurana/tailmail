import axios from 'axios';
import { FETCH_USER, LOGOUT_USER } from './types';

export const fetchUser = () => async (dispatch) => {
  const res = await axios.get('/api/current_user');
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const logoutUser = callback => async (dispatch) => {
  await axios.get('/api/log_out');
  dispatch({ type: LOGOUT_USER });
  callback();
};
export const handleToken = token => async (dispatch) => {
  const res = await axios.post('/api/stripe', token);
  dispatch({ type: FETCH_USER, payload: res.data });
};
export const sendEmail = (values, callback) => async (dispatch) => {
  const res = await axios.post('/api/response', values);
  dispatch({ type: FETCH_USER, payload: res.data });
  callback();
};


