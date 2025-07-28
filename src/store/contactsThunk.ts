import { createAsyncThunk } from "@reduxjs/toolkit";
import type { TypeContact, TypeContactsList } from "../types";
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
