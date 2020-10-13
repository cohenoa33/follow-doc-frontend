const API_ROOT = `http://localhost:3000/api/v1`;

const token = localStorage.getItem("token");

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: `Bearers ${token}`,
};

const login = (user) => {
  return fetch(`${API_ROOT}/login`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ user }),
  }).then((res) => res.json());
};

const signup = (user) => {
  return fetch(`${API_ROOT}/users`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ user }),
  }).then((res) => res.json());
};
const reauth = () => {
  return fetch(`${API_ROOT}/reauth`, {
    method: "GET",
    headers: headers,
  }).then((res) => res.json());
};

const oneProblem = (id) => {
  return fetch(`${API_ROOT}/problems/${id}`, {
    method: "GET",
    headers: headers,
  }).then((res) => res.json());
};

const addDependent = (newDependent) => {
  return fetch(`${API_ROOT}/dependents`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ dependent: newDependent }),
  }).then((res) => res.json());
};

const addProblem = (problem) => {
  return fetch(`${API_ROOT}/problems`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ problem: problem }),
  }).then((res) => res.json());
};

const addComment = (comment) => {
  return fetch(`${API_ROOT}/comments`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ comment: comment }),
  }).then((res) => res.json());
};
const addAppointment = (appointment) => {
  return fetch(`${API_ROOT}/appointments`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ appointment: appointment }),
  }).then((res) => res.json());
};
const addDoctor = (doctor) => {
  return fetch(`${API_ROOT}/doctors`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ doctor: doctor }),
  }).then((res) => res.json());
};

const editComment = (comment, id) => {
  return fetch(`${API_ROOT}/comments/${id}`, {
    method: "PATCH",
    headers: headers,
    body: JSON.stringify(comment),
  }).then((res) => res.json());
};

const deleteComment = (id) => {
  return fetch(`${API_ROOT}/comments/${id}`, {
    method: "DELETE",
    headers: headers,
  }).then((res) => res.json());
};
const deleteAppointment = (id) => {
  return fetch(`${API_ROOT}/appointments/${id}`, {
    method: "DELETE",
    headers: headers,
  }).then((res) => res.json());
};

export default {
  auth: {
    login: login,
    signup: signup,
    reauth: reauth,
  },
  dependents: {
    addDependent: addDependent,
  },

  problems: {
    addProblem: addProblem,
    oneProblem: oneProblem,
  },
  appointments: {
    addAppointment: addAppointment,
    deleteAppointment: deleteAppointment,
  },
  doctors: {
    addDoctor: addDoctor,
  },

  comments: {
    addComment: addComment,
    deleteComment: deleteComment,
    editComment: editComment,
  },
};
