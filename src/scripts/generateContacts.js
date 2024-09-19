import { writeContacts } from "../utils/writeContacts.js";
import { createFakeContact } from "../utils/createFakeContact.js";
import { getAllContacts } from "../scripts/getAllContacts.js";


const generateContacts = async (number) => {
    const contactsList = await getAllContacts();
    const newContactsList = Array(number).fill(0).map(createFakeContact);
    contactsList.push(...newContactsList);
    await writeContacts(contactsList);
};
generateContacts(3);


