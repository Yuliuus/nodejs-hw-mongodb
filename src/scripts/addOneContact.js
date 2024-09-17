import { createFakeContact } from "../utils/createFakeContact.js";
import { getAllContacts } from "../scripts/getAllContacts.js";
import updateContacts from "./updateContacts.js";

export const addOneContact = async () => {
    const contactList = await getAllContacts();
    const newContact = createFakeContact();
    contactList.push(newContact);
    await updateContacts(contactList);
};

addOneContact();
