import axios from "axios";
import { accomodationActions } from "./Accomodation-slice";

export const createAccomodation = (accomodationData) => async (dispatch) => {
    try {
        dispatch(accomodationActions.getAccomodationRequest());
        const response = await axios.post(
            "/api/v1/rent/user/newAccomodation",
            accomodationData
        );
        if (!response) {
            throw new Error("Could not get any accommodations");
        }
    } catch (error) {
        dispatch(accomodationActions.getErrors(error.response.data.message));
    }
};

export const getAllAccomodation = () => async (dispatch) => {
    try {
        dispatch(accomodationActions.getAccomodationRequest());
        const { data } = await axios.get("/api/v1/rent/user/myAccomodation");
        const accom = data.data;
        dispatch(accomodationActions.getAccomodation(accom));
    } catch (error) {
        dispatch(accomodationActions.getErrors(error.response.data.message));
    }
};
