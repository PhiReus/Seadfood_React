import axios from "axios";

class ProductModel {
    constructor() {
        this.api_url = "http://127.0.0.1:8000/api/products/";
    }

    async all() {
        const res = await axios.get(this.api_url);
        return res.data
    }

    async find(slug) {
        const data = await axios.get(this.api_url + slug);
        return data.data;
    }
    
    async productAlsoLike() {
        const data = await axios.get(this.api_url + "product_also_like");
        return data.data;
    }
}

export default new ProductModel();