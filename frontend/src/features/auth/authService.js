import axios from "axios";
import { API_URL } from "../../constants/constant";

//Register User
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);
  if (response.data) {
    localStorage.setItem("goalsetter-app-user", JSON.stringify(response.data));
  }
  return response.data;
};

//login User
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);
  if (response.data) {
    localStorage.setItem("goalsetter-app-user", JSON.stringify(response.data));
  }
  return response.data;
};

const logout = async () => {
  localStorage.removeItem("goalsetter-app-user");
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
