import ContactsCollection from "../db/models/contact.js";

import calculatePaginationData from "../utils/calculatePaginationData.js";

export const getContacts = async ({ perPage, page }) => {
    const skip = (page - 1) * perPage;
    const data = await ContactsCollection.find().skip(skip).limit(perPage);
    const count = await ContactsCollection.find().countDocuments();

    const paginationData = calculatePaginationData({ count, perPage, page });
    return {
        data,
        page,
        perPage,
        totalItems: count,
        ...paginationData,
    };
};

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