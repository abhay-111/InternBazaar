const token = localStorage.getItem("token");
class AuthService {
  Auth() {
    if (token !== null) return true;
    else return false;
  }

  Logout() {
    localStorage.clear();
    //window.location.replace("/");
  }
}
export default new AuthService();
