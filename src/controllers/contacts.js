import * as contactServices from "../services/contacts.js";

import createHttpError from "http-errors";

export const getAllContactsController = async (req, res) => {
    const data = await contactServices.getAllContacts();

    res.json({
        status: 200,
        message: "Successfully found contacts!",
        data,
    });
};

export const getContactByIdController = async (req, res) => {
    const { contactId } = req.params;
    const data = await contactServices.getContactById(contactId);

    if (!data) {
        throw createHttpError(404, 'Contact not found');
    };

    res.json({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data,
    });
};

export const addContactController = async (req, res) => {
    const data = await contactServices.createContact(req.body);
    console.log(data);

    res.status(201).json({
        status: 201,
        message: "Successfully created a contact!",
        data,
    });
};

export const updateContactController = async (req, res) => {
    const { contactId } = req.params;
    const data = await contactServices.updateContact({ _id: contactId }, req.body);

    if (!data) {
        throw createHttpError(404, 'Contact not found');
    };

    res.json({
        status: 200,
        message: "Successfully patched a contact!",
        data,
    });
};

export const deleteContactController = async (req, res) => {
    const { contactId } = req.params;
    const data = await contactServices.deleteContact({ _id: contactId });

    if (!data) {
        throw createHttpError(404, 'Contact not found');
    };

    res.status(204).send();
};