import axios from "axios";

class CustomerModel {
    constructor() {
        this.api_url = "http://127.0.0.1:8000/api/auth/";
    }

    async login(email, password) {
        const res = await axios.post(this.api_url + "login", {
            email: email,
            password: password
        });
        return res.data;
    }

}
export default new CustomerModel();