import { createSlice } from "@reduxjs/toolkit";
import type { TypeContact } from "../types";
import { getContacts } from "./contactsThunk";

interface State {
    items: TypeContact[];
    getContactsFetching: boolean;
}
const initialState: State = {
    items: [],
    getContactsFetching: false,
};

const contactsSlice = createSlice({
    name: "contacts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getContacts.pending, (state) => {
            state.getContactsFetching = true;
        });
        builder.addCase(
            getContacts.fulfilled,
            (state, { payload: contacts }) => {
                state.getContactsFetching = false;
                state.items = contacts;
            }
        );
        builder.addCase(getContacts.rejected, (state) => {
            state.getContactsFetching = false;
        });
    },
    selectors: {
        selectContacts: (state) => state.items,
        selectContactsFetching: (state) => state.getContactsFetching,
    },
});

export const contactsReducer = contactsSlice.reducer;
export const { selectContacts, selectContactsFetching } =
    contactsSlice.selectors;
