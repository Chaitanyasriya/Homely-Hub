import {ReducerType, createSlice} from "@reduxjs/toolkit";

const accomodationSlice = createSlice({
    name: "accomodation",
    initialState: {
        accomodation: [],
        loading: false,
        errors: null,
    },
    reducers: {
        getAccomodationRequest(state) {
            state.loadibg = true;
        },
        getaAccomodation(state, action) {
            state.accomodation = action.payload;
        },
        getErrors(state, action){
            state.errors = action.payload;
        },
    }
});

export const accomodationActions = accomodationSlice.actions;

export default accomodationSlice;