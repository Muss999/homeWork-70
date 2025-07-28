import { useNavigate } from "react-router-dom";
import type { TypeContact } from "../../types";

interface Props {
    onClose: () => void;
    contact: TypeContact | null;
}

const ContactDetails = ({ onClose, contact }: Props) => {
    if (!contact) return null;
    const navigate = useNavigate();

    return (
        <>
            <div className="modal-backdrop fade show"></div>
            <div
                className="modal fade show d-block"
                tabIndex={-1}
                role="dialog"
            >
                <div
                    className="modal-dialog modal-dialog-centered"
                    role="document"
                >
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title">{contact.name}</h3>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={onClose}
                            />
                        </div>
                        <div className="modal-body d-flex">
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
                            <div className="d-flex flex-column">
                                <p className="m-0">
                                    <b className="me-2">Phone:</b>{" "}
                                    {contact.contactNumber}
                                </p>
                                <p className="m-0">
                                    <b className="me-2">Email:</b>{" "}
                                    {contact.email}
                                </p>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-warning"
                                onClick={() => {
                                    onClose();
                                    navigate(`/contacts/${contact.id}/edit`);
                                }}
                            >
                                Edit
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={onClose}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContactDetails;
