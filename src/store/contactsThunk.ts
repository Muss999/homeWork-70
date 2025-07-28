import { createAsyncThunk } from "@reduxjs/toolkit";
import type {
    TypeContact,
    TypeContactMutation,
    TypeContactsList,
} from "../types";
import axiosApi from "../axiosApi";

interface editContactParams {
    id: string;
    contact: TypeContactMutation;
}

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

export const editContactThunk = createAsyncThunk<void, editContactParams>(
    "contacts/edit",
    async ({ id, contact }) => {
        await axiosApi.put(`/contacts/${id}.json`, contact);
    }
);

export const fetchOneContact = createAsyncThunk<TypeContactMutation, string>(
    "contacts/fetchOne",
    async (id) => {
        const { data: contact } = await axiosApi<TypeContactMutation | null>(
            `/contacts/${id}.json`
        );

        if (!contact) {
            throw new Error("Not found");
        }

        return contact;
    }
);

export const deleteContact = createAsyncThunk<void, string>(
    "contacts/delete",
    async (id) => {
        await axiosApi.delete(`/contacts/${id}.json`);
    }
);
