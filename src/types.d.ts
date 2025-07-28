export interface TypeContact {
    name: string;
    email: string;
    contactNumber: string;
    image: string;
}
export interface TypeContactMutation extends TypeContact {
    id: string;
}
export interface TypeContactsList {
    [id: string]: TypeContact;
}
