import ContactsCollection from "../db/models/contact.js";

import calculatePaginationData from "../utils/calculatePaginationData.js";

import { SORT_ORDER } from "../constants/index.js";

export const getContacts = async ({
    perPage,
    page,
    sortBy = "_id",
    sortOrder = SORT_ORDER[0],
}) => {
    const skip = (page - 1) * perPage;
    const data = await ContactsCollection.find().skip(skip).limit(perPage).sort({ [sortBy]: sortOrder });
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

export const getContact = filter => ContactsCollection.findById(filter);

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