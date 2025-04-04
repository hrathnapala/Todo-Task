import axios from 'axios';

const BASE_URL = 'http://localhost:8080/tasks';

export const getTasks = () => {
  return axios.get(BASE_URL);
};

export const addTask = (task) => {
  return axios.post(BASE_URL, task);
};

export const deleteTask = (id) => {
  return axios.delete(`${BASE_URL}/${id}`);
};
