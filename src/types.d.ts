export interface TypeContact {
    name: string;
    email: string;
    contactNumber: string;
    image: string;
    id: string;
}
export interface TypeContactMutation {
    name: string;
    email: string;
    contactNumber: string;
    image: string;
}
export interface TypeContactsList {
    [id: string]: TypeContact;
}
