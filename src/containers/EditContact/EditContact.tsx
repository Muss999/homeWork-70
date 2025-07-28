import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
    selectEditContactFetching,
    selectOneContact,
    selectOneContactLoading,
} from "../../store/contactsSlice";
import { useEffect } from "react";
import { editContactThunk, fetchOneContact } from "../../store/contactsThunk";
import type { TypeContactMutation } from "../../types";
import Spinner from "../../components/Spinner/Spinner";
import ContactForm from "../../components/ContactForm/ContactForm";

const EditContact = () => {
    const { id } = useParams() as { id: string };
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const contact = useAppSelector(selectOneContact);
    const fetchOneContactLoading = useAppSelector(selectOneContactLoading);
    const editLoading = useAppSelector(selectEditContactFetching);

    useEffect(() => {
        dispatch(fetchOneContact(id));
    }, [dispatch, id]);

    const onSubmit = async (editContact: TypeContactMutation) => {
        await dispatch(editContactThunk({ id, contact: editContact }));
        navigate("/");
    };

    return (
        <div className="row mt-2">
            <div className="col-6 m-auto">
                {fetchOneContactLoading && <Spinner />}
                {contact && (
                    <ContactForm
                        onSubmit={onSubmit}
                        isLoading={editLoading}
                        isContact={contact}
                        isEdit
                    />
                )}
            </div>
        </div>
    );
};

export default EditContact;
