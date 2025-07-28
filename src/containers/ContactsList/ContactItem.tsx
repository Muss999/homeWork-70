import type { MouseEventHandler } from "react";
import type { TypeContact } from "../../types";
import "./ContactItem.css";

interface Props {
    contact: TypeContact;
    contactItemClick: MouseEventHandler;
}

const ContactItem = ({ contact, contactItemClick }: Props) => {
    return (
        <div
            className="contactItem d-flex align-items-center border p-3 rounded"
            onClick={contactItemClick}
        >
            <div className="me-3">
                <img
                    src={contact.image}
                    alt={contact.name}
                    className="img-thumbnail"
                    style={{
                        width: "72px",
                        height: "72px",
                        objectFit: "cover",
                    }}
                />
            </div>
            <strong>{contact.name}</strong>
        </div>
    );
};

export default ContactItem;
