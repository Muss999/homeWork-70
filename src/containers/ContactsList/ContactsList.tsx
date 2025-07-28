import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Spinner from "../../components/Spinner/Spinner";
import {
    selectContacts,
    selectContactsFetching,
} from "../../store/contactsSlice";
import ContactItem from "./ContactItem";
import { getContacts } from "../../store/contactsThunk";

const ContactsList = () => {
    const dispatch = useAppDispatch();
    const contacts = useAppSelector(selectContacts);
    const fetchLoading = useAppSelector(selectContactsFetching);
    console.log(contacts);
    useEffect(() => {
        dispatch(getContacts());
    }, [dispatch]);

    return (
        <div className="d-flex flex-column gap-3 w-50">
            {fetchLoading ? (
                <Spinner />
            ) : (
                contacts.map((contact) => {
                    return <ContactItem contact={contact} key={contact.id} />;
                })
            )}
        </div>
    );
};

export default ContactsList;
