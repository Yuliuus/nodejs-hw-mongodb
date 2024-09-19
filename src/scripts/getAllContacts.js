import { readContacts } from "../utils/readContacts.js";


export const getAllContacts = async () => {
    const data = await readContacts();
    return JSON.parse(data);

};

console.log(await getAllContacts());
