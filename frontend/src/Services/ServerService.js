import axios from "axios";

const BASE_URL = "http://localhost:8080/";

class ServerService {
  // login(username, password) {
  //   return axios
  //     .post(API_URL + "login", {
  //       username,
  //       password,
  //     })
  //     .then((response) => {
  //       if (response.data.accessToken) {
  //         localStorage.setItem("user", JSON.stringify(response.data));
  //       }
  //
  //       return response.data;
  //     });
  // }
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
