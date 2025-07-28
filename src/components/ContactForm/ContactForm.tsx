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
        const contactName = contact.name.trim();
        const contactEmail = contact.email.trim();
        const contactNumber = contact.contactNumber.trim();
        const contactImage = contact.image.trim();

        const isPhoneNumeric = contactNumber
            .split("")
            .every((char) => "0123456789".includes(char));

        if (!contactName) {
            alert("Name input is not valid");
            return;
        } else if (!contactEmail) {
            alert("Email input is not valid");
            return;
        } else if (!contactNumber || !isPhoneNumeric) {
            alert("Phone number is not valid");
            return;
        } else if (!contactImage) {
            alert("Image input is not valid");
            return;
        }

        const newContact: TypeContactMutation = {
            name: contactName,
            email: contactEmail,
            contactNumber: contact.contactNumber.trim(),
            image: contactImage,
        };
        onSubmit(newContact);
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
            <div className="mb-3">
                <img
                    src={
                        contact.image ||
                        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    }
                    alt={contact.name || "Preview"}
                    className="img-thumbnail"
                    style={{
                        width: "100px",
                        height: "100px",
                        minWidth: "100px",
                        minHeight: "100px",
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
