import axios from "axios";

const BASE_URL = "http://localhost:8080/";
//const BASE_URL = "https://internbazaar.herokuapp.com/";

class ServerService {
  studentLogin(data) {
    return axios.post(BASE_URL + "auth/login/student", data);
  }

  employerLogin(data) {
    return axios.post(BASE_URL + "auth/login/employer", data);
  }

  editProfile(data) {
    return axios.post(BASE_URL + "profile/edit", data, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        //"Content-Type": "multipart/form-data",
        // "Access-Control-Allow-Origin": "*",
      },
    });
  }

  viewProfile(data) {
    return axios.post(BASE_URL + "profile/view", data, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  }

  myApplications(userId) {
    return axios.post(BASE_URL + "profile/myapplications", userId, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  }

  applyNow(data) {
    return axios.post(BASE_URL + "internship/apply", data, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  }

  postInternship(data) {
    return axios.post(BASE_URL + "internship/addInternship", data, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
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
    return axios.get(BASE_URL + "internship/view/" + id, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  }

  postedInternships(userId) {
    return axios.post(BASE_URL + "profile/postedInternships", userId, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  }

  getApplicants(internshipId) {
    return axios.post(BASE_URL + "profile/applieduser", internshipId, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  }

  changeStatus(data) {
    return axios.post(BASE_URL + "profile/changeStatus", data, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  }

  updateInternship(data) {
    return axios.post(BASE_URL + "internship/updateInternship", data);
  }

  deleteInternship(id) {
    return axios.post(BASE_URL + "internship/deleteInternship", id);
  }

  changePassword(data) {
    return axios.post(BASE_URL + "auth/resetPassword", data);
  }

  viewResume(userId) {
    return axios.get(BASE_URL + "internship/resume/" + userId);
  }

  sendRatings(data) {
    return axios.post(BASE_URL + "internship/rateInternship", data);
  }

  forgotPassword(data) {
    return axios.post(BASE_URL + "auth/forgotPassword", data);
  }

  resetPassword(data, token) {
    return axios.post(BASE_URL + "auth/forgotReset", data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  }

  resendOtp(data) {
    return axios.post(BASE_URL + "auth/resendOtp", data);
  }

  saveInternship(data) {
    return axios.post(BASE_URL + "internship/bookmark", data);
  }

  getSavedInternships(userId) {
    return axios.post(BASE_URL + "internship/getbookmarks", userId);
  }

  deleteBookmark(data) {
    return axios.post(BASE_URL + "internship/deletebookmark", data);
  }
}

export default new ServerService();
