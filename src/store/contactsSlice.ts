import { createSlice } from "@reduxjs/toolkit";
import type { TypeContact } from "../types";
import { addContact, getContacts } from "./contactsThunk";

interface State {
    items: TypeContact[];
    getContactsFetching: boolean;
    addContactsFetching: boolean;
}
const initialState: State = {
    items: [],
    getContactsFetching: false,
    addContactsFetching: false,
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

        builder
            .addCase(addContact.pending, (state) => {
                state.addContactsFetching = true;
            })
            .addCase(addContact.fulfilled, (state) => {
                state.addContactsFetching = false;
            })
            .addCase(addContact.rejected, (state) => {
                state.addContactsFetching = false;
            });
    },
    selectors: {
        selectContacts: (state) => state.items,
        selectGetContactsFetching: (state) => state.getContactsFetching,
        selectAddContactsFetching: (state) => state.addContactsFetching,
    },
});

export const contactsReducer = contactsSlice.reducer;
export const {
    selectContacts,
    selectGetContactsFetching,
    selectAddContactsFetching,
} = contactsSlice.selectors;
