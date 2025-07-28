import { createAsyncThunk } from "@reduxjs/toolkit";
import type {
    TypeContact,
    TypeContactMutation,
    TypeContactsList,
} from "../types";
import axiosApi from "../axiosApi";

export const getContacts = createAsyncThunk<TypeContact[]>(
    "contacts/get",
    async () => {
        const { data } = await axiosApi<TypeContactsList | null>(
            "/contacts.json"
        );

        let newContacts: TypeContact[] = [];
        if (data) {
            newContacts = Object.keys(data).map((key) => ({
                ...data[key],
                id: key,
            }));
        }
        return newContacts;
    }
);
export const addContact = createAsyncThunk<void, TypeContactMutation>(
    "contacts/add",
    async (apiContact) => {
        await axiosApi.post("/contacts.json", apiContact);
    }
);
