import { getAllContacts } from "./getAllContacts.js";
import { writeContacts } from "../utils/writeContacts.js";

export const removeLastContact = async () => {
    const contactsList = await getAllContacts();
    contactsList.pop();
    await writeContacts(contactsList);

};

removeLastContact();
