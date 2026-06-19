import axios from "axios";

const API = "http://localhost:5000/api/reviews";

export const getReviews = async () => {
    const { data } = await axios.get(API);
    return data;
};