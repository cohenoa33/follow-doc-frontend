const API_ROOT = `http://localhost:3000/api/v1`;

const token = localStorage.getItem("token");

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: `Bearers ${token}`,
};
const headersDorFile = {
  Authorization: `Bearers ${token}`,
};

const login = (user) => {
  return fetch(`${API_ROOT}/login`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ user }),
  }).then((res) => res.json());
};
const doctors = () => {
  return fetch(`${API_ROOT}/doctors`, {
    method: "GET",
    headers: headers,
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
const allDoctors = () => {
  return fetch(`${API_ROOT}/doctors`, {
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
const addFile = (formData) => {
  return fetch(`${API_ROOT}/addfile`, {
    method: "POST",
    headers: headersDorFile,
    body: formData,
  }).then((res) => res.json());
};
const deleteFile = (problem_id, file) => {
  const body = { problem_id: problem_id, file: file };
  return fetch(`${API_ROOT}/deletefile`, {
    method: "PATCH",
    headers: headers,
    body: JSON.stringify(body),
  }).then((res) => res.json());
};

const editComment = ({ text, status_open, id }) => {
  return fetch(`${API_ROOT}/comments/${id}`, {
    method: "PATCH",
    headers: headers,
    body: JSON.stringify({ text, status_open }),
  }).then((res) => res.json());
};
const editAppointment = ({ note, status_open, insurance_auth, id }) => {
  return fetch(`${API_ROOT}/appointments/${id}`, {
    method: "PATCH",
    headers: headers,
    body: JSON.stringify({ note, status_open, insurance_auth }),
  }).then((res) => res.json());
};
const editProblem = (problem, id) => {
  return fetch(`${API_ROOT}/problems/${id}`, {
    method: "PATCH",
    headers: headers,
    body: JSON.stringify({ problem }),
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
    editProblem: editProblem,
    addFile: addFile,
    deleteFile: deleteFile,
  },
  appointments: {
    addAppointment: addAppointment,
    deleteAppointment: deleteAppointment,
    editAppointment: editAppointment,
  },
  doctors: {
    addDoctor: addDoctor,
    allDoctors: allDoctors,
  },

  comments: {
    addComment: addComment,
    deleteComment: deleteComment,
    editComment: editComment,
  },
};
