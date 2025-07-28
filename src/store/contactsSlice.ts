import { createSlice } from "@reduxjs/toolkit";
import type { TypeContact } from "../types";

interface State {
    contacts: TypeContact[];
    isFetching: boolean;
}
const initialState: State = {
    contacts: [],
    isFetching: false,
};

const contactsSlice = createSlice({
    name: "contacts",
    initialState,
    reducers: {},
});

export const contactsReducer = contactsSlice.reducer;
