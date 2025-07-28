import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Spinner from "../../components/Spinner/Spinner";
import {
    selectContacts,
    selectContactsFetching,
} from "../../store/contactsSlice";
import ContactItem from "./ContactItem";
import { getContacts } from "../../store/contactsThunk";
import ContactDetails from "../ContactDetails/ContactDetails";
import type { TypeContact } from "../../types";

const ContactsList = () => {
    const dispatch = useAppDispatch();
    const contacts = useAppSelector(selectContacts);
    const fetchLoading = useAppSelector(selectContactsFetching);

    const [selectedContact, setSelectedContact] = useState<TypeContact | null>(
        null
    );

    useEffect(() => {
        dispatch(getContacts());
    }, [dispatch]);

    const contactItemClick = (contact: TypeContact) => {
        setSelectedContact(contact);
    };

    const closeModal = () => setSelectedContact(null);

    return (
        <>
            {fetchLoading ? (
                <Spinner />
            ) : contacts.length > 0 ? (
                <div className="d-flex flex-column gap-3 w-50">
                    {contacts.map((contact) => (
                        <ContactItem
                            contact={contact}
                            key={contact.id}
                            contactItemClick={() => contactItemClick(contact)}
                        />
                    ))}
                </div>
            ) : (
                <div className="alert alert-warning">Contacts are empty!</div>
            )}
            <ContactDetails onClose={closeModal} contact={selectedContact} />
        </>
    );
};

export default ContactsList;
