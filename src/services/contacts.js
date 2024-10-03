import ContactsCollection from "../db/models/contact.js";

export const getAllContacts = () => ContactsCollection.find();

export const getContactById = id => ContactsCollection.findById(id);

export const createContact = payload => ContactsCollection.create(payload);

export const updateContact = async (filter, data, options = {}) => {
    const rawData = await ContactsCollection.findOneAndUpdate(filter, data, {
        includeResultMetadata: true,
    });

    if (!rawData || !rawData.value) return null;

    return {
        contact: rawData.value,
        isNew: Boolean(rawData?.lastErrorObject?.upserted),
    };
};

export const deleteContact = id => ContactsCollection.findOneAndDelete(id);