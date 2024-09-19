import { createFakeContact } from "../utils/createFakeContact.js";
import { getAllContacts } from "../scripts/getAllContacts.js";
import { writeContacts } from "../utils/writeContacts.js";

export const addOneContact = async () => {
    const contactList = await getAllContacts();
    const newContact = createFakeContact();
    contactList.push(newContact);
    await writeContacts(contactList);
};

addOneContact();
