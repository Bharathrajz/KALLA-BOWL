import axios from "axios";

const API = "https://kalla-bowl.onrender.com/api/reviews";

export const getReviews = async () => {
    const { data } = await axios.get(API);
    return data;
};