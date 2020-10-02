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

  myApplications(userId) {
    return axios.post(BASE_URL + "profile/myapplications", userId);
  }

  applyNow(data) {
    return axios.post(BASE_URL + "internship/apply", data);
  }

  postInternship(data) {
    return axios.post(BASE_URL + "internship/addInternship", data);
  }

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

  postedInternships(userId) {
    return axios.post(BASE_URL + "profile/postedInternships", userId);
  }

  getApplicants(internshipId) {
    return axios.post(BASE_URL + "profile/applieduser", internshipId);
  }

  changeStatus(data) {
    return axios.post(BASE_URL + "profile/changeStatus", data);
  }
}

export default new ServerService();
