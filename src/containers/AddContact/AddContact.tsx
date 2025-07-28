import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import ContactForm from "../../components/ContactForm/ContactForm";
import { selectAddContactsFetching } from "../../store/contactsSlice";
import type { TypeContactMutation } from "../../types";
import { addContact } from "../../store/contactsThunk";

const AddContact = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const addContactLoading = useAppSelector(selectAddContactsFetching);

    const onSubmit = async (contact: TypeContactMutation) => {
        await dispatch(addContact(contact));
        navigate("/");
    };
    return (
        <div className="row mt-2">
            <div className="col-6 m-auto">
                <ContactForm
                    onSubmit={onSubmit}
                    isLoading={addContactLoading}
                />
            </div>
        </div>
    );
};

export default AddContact;
