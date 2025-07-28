import { createSlice } from "@reduxjs/toolkit";
import type { TypeContact, TypeContactMutation } from "../types";
import {
    addContact,
    editContactThunk,
    fetchOneContact,
    getContacts,
} from "./contactsThunk";

interface State {
    items: TypeContact[];
    oneContact: null | TypeContactMutation;
    getContactsFetching: boolean;
    addContactsFetching: boolean;
    editContactFetching: boolean;
    fetchOneLoading: boolean;
}
const initialState: State = {
    items: [],
    oneContact: null,
    getContactsFetching: false,
    addContactsFetching: false,
    editContactFetching: false,
    fetchOneLoading: false,
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

        builder
            .addCase(editContactThunk.pending, (state) => {
                state.editContactFetching = true;
            })
            .addCase(editContactThunk.fulfilled, (state) => {
                state.editContactFetching = false;
            })
            .addCase(editContactThunk.rejected, (state) => {
                state.editContactFetching = false;
            });

        builder
            .addCase(fetchOneContact.pending, (state) => {
                state.fetchOneLoading = true;
                state.oneContact = null;
            })
            .addCase(
                fetchOneContact.fulfilled,
                (state, { payload: contactMutaion }) => {
                    state.fetchOneLoading = false;
                    state.oneContact = contactMutaion;
                }
            )
            .addCase(fetchOneContact.rejected, (state) => {
                state.fetchOneLoading = false;
            });
    },
    selectors: {
        selectContacts: (state) => state.items,
        selectGetContactsFetching: (state) => state.getContactsFetching,
        selectAddContactsFetching: (state) => state.addContactsFetching,
        selectEditContactFetching: (state) => state.editContactFetching,
        selectOneContactLoading: (state) => state.fetchOneLoading,
        selectOneContact: (state) => state.oneContact,
    },
});

export const contactsReducer = contactsSlice.reducer;
export const {
    selectContacts,
    selectGetContactsFetching,
    selectAddContactsFetching,
    selectEditContactFetching,
    selectOneContact,
    selectOneContactLoading,
} = contactsSlice.selectors;
