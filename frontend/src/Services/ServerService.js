import axios from "axios";

const BASE_URL = "http://localhost:8080/";

class ServerService {
  studentLogin(data) {
    return axios.post(BASE_URL + "auth/login/student", data);
  }

  employerLogin(data) {
    return axios.post(BASE_URL + "auth/login/employer", data);
  }

  editProfile(data) {
    return axios.post(BASE_URL + "profile/edit", data);
  }

  viewProfile(data) {
    return axios.post(BASE_URL + "profile/view", data);
  }

  //if (response.data.token) {
  //localStorage.setItem("user", JSON.stringify(response.data));

  //
  // logout() {
  //   localStorage.removeItem("user");
  // }
  //
  // register(username, email, password) {
  //   return axios.post(API_URL + "signup", {
  //     username,
  //     email,
  //     password,
  //   });
  // }
  //
  // getCurrentUser() {
  //   return JSON.parse(localStorage.getItem("user"));
  // }
  //

  getInternshipsByCategory(category) {
    return axios.get(
      BASE_URL + "internship/getinternships?internshipType=" + category
    );
  }

  getInternshipsByLocation(location) {
    return axios.get(
      BASE_URL + "internship/getinternships?location=" + location
    );
  }

  getDetails(id) {
    return axios.get(BASE_URL + "internship/view/" + id);
  }
}

export default new ServerService();
