import axios from 'axios';

const API_URL = 'https://localhost:5001/api/users/login';

const login = ({ username, password,}, history) => {
  const test = {
    username: username,
    password: password,
  };
  return axios({
    method: 'POST',
    url: API_URL,
    data: JSON.stringify(test),
    headers: { 'Content-Type': 'application/json', accept: 'application/json' },
  })
    .then((response) => {
      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      history.push('/profile');
      setInterval(() => {
      window.location.reload();
      }, 2000);
      
      
      return response.data;
    })
    .catch((e) => {
      alert('Username and password are wrong');
    });
};

const logout = () => {
  localStorage.removeItem('user');
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

export default {
  login,
  logout,
  getCurrentUser,
};
