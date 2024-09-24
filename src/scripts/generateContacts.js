import { writeContacts } from "../utils/writeContacts.js";
import { createFakeContact } from "../utils/createFakeContact.js";
import { readContacts } from "../utils/readContacts.js";


const generateContacts = async (number) => {
    const contactsList = await readContacts();
    const newContactsList = Array(number).fill(0).map(createFakeContact);
    contactsList.push(...newContactsList);
    await writeContacts(contactsList);
};
generateContacts(3);


