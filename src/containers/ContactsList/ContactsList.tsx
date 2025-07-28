import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Spinner from "../../components/Spinner/Spinner";
import {
    selectContacts,
    selectDeleteContactFetching,
    selectGetContactsFetching,
} from "../../store/contactsSlice";
import ContactItem from "./ContactItem";
import { deleteContact, getContacts } from "../../store/contactsThunk";
import ContactDetails from "../ContactDetails/ContactDetails";
import type { TypeContact } from "../../types";

const ContactsList = () => {
    const dispatch = useAppDispatch();
    const contacts = useAppSelector(selectContacts);
    const fetchLoading = useAppSelector(selectGetContactsFetching);
    const deleteLoading = useAppSelector(selectDeleteContactFetching);

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

    const removeContact = async (id: string) => {
        if (window.confirm("Do you really want to delete this contact?")) {
            await dispatch(deleteContact(id));
            await dispatch(getContacts());
        }
    };

    return (
        <>
            {fetchLoading ? (
                <Spinner />
            ) : contacts.length > 0 ? (
                <div className="d-flex gap-3 w-100 flex-wrap">
                    {contacts.map((contact) => (
                        <ContactItem
                            contact={contact}
                            contactItemClick={() => contactItemClick(contact)}
                            key={contact.id}
                        />
                    ))}
                </div>
            ) : (
                <div className="alert alert-warning">Contacts are empty!</div>
            )}
            {selectedContact && (
                <ContactDetails
                    onClose={closeModal}
                    contact={selectedContact}
                    onDelete={() => removeContact(selectedContact.id)}
                    deleteLoading={deleteLoading}
                />
            )}
        </>
    );
};

export default ContactsList;
