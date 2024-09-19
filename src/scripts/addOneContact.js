import { createFakeContact } from "../utils/createFakeContact.js";
import { readContacts } from "../utils/readContacts.js";
import { writeContacts } from "../utils/writeContacts.js";

export const addOneContact = async () => {
    const contactList = await readContacts();
    const newContact = createFakeContact();
    contactList.push(newContact);
    await writeContacts(contactList);
};

addOneContact();
