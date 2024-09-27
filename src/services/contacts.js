import ContactsCollection from "../db/models/contact.js";

export const getAllContacts = () => ContactsCollection.find();

export const getContactById = id => ContactsCollection.findById(id);