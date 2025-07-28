import { useNavigate } from "react-router-dom";
import SpinnerButton from "../Spinner/SpinnerButton";
import type { TypeContactMutation } from "../../types";
import { useState, type ChangeEvent, type FormEvent } from "react";

interface Props {
    onSubmit: (contact: TypeContactMutation) => void;
    isLoading?: boolean;
}
const initialState: TypeContactMutation = {
    name: "",
    email: "",
    image: "",
    contactNumber: "",
};

const ContactForm = ({ onSubmit, isLoading = false }: Props) => {
    const navigate = useNavigate();
    const [contact, setContact] = useState<TypeContactMutation>(initialState);

    const changeContact = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setContact((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const onSubmitHandler = (event: FormEvent) => {
        event.preventDefault();
        console.log(contact);
        onSubmit(contact);
    };

    return (
        <form onSubmit={onSubmitHandler}>
            <h4>Add new contact</h4>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    className="form-control"
                    value={contact.name}
                    onChange={changeContact}
                    autoFocus
                    required
                />
            </div>
            <div className="form-group mb-3">
                <label htmlFor="contactNumber">Phone</label>
                <input
                    type="text"
                    name="contactNumber"
                    id="contactNumber"
                    className="form-control"
                    value={contact.contactNumber}
                    onChange={changeContact}
                    required
                />
            </div>
            <div className="form-group mb-3">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    className="form-control"
                    value={contact.email}
                    onChange={changeContact}
                    required
                />
            </div>
            <div className="form-group mb-3">
                <label htmlFor="image">Image</label>
                <input
                    type="url"
                    name="image"
                    id="image"
                    className="form-control"
                    value={contact.image}
                    onChange={changeContact}
                    required
                />
            </div>
            <div className="me-3 mb-3">
                <img
                    src={contact.image}
                    alt={contact.name}
                    className="img-thumbnail"
                    style={{
                        width: "72px",
                        height: "72px",
                        minWidth: "72px",
                        minHeight: "72px",
                        objectFit: "cover",
                    }}
                />
            </div>

            <div className="mb-3">
                <button
                    type="submit"
                    className="btn btn-success me-2"
                    disabled={isLoading}
                >
                    {isLoading && <SpinnerButton />}
                    Save
                </button>
                <button
                    className="btn btn-secondary"
                    onClick={() => navigate("/")}
                >
                    Back to contacts
                </button>
            </div>
        </form>
    );
};

export default ContactForm;
