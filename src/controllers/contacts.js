import * as contactServices from "../services/contacts.js";

import createHttpError from "http-errors";

import parsePaginationParams from "../utils/parsePaginationParams.js";
import parseSortParams from "../utils/parseSortParams.js";
import saveFileToUploadDir from "../utils/saveFileToUploadDir.js";
import saveFileToCloudinary from "../utils/saveFileToCloudinary.js";
import { env } from "../utils/env.js";

import { sortFields } from "../db/models/contact.js";

const enableCloudinary = env("ENABLE_CLOUDINARY");

export const getAllContactsController = async (req, res) => {
    const { perPage, page } = parsePaginationParams(req.query);
    const { sortBy, sortOrder } = parseSortParams({
        sortBy: req.query.sortBy,
        sortFields,
        sortOrder: req.query.sortOrder,
    });
    const { _id: userId } = req.user;

    const data = await contactServices.getContacts({ perPage, page, sortBy, sortOrder, userId });

    res.json({
        status: 200,
        message: "Successfully found contacts!",
        data,
    });
};

export const getContactByIdController = async (req, res) => {
    const { contactId } = req.params;
    const { _id: userId } = req.user;
    const data = await contactServices.getContact({ _id: contactId, userId });

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
    const photo = req.file;
    let photoURL;
    if (enableCloudinary === "true") {
        photoURL = await saveFileToCloudinary(photo);
    } else {
        photoURL = await saveFileToUploadDir(photo);
    }

    const { _id: userId } = req.user;
    const data = await contactServices.createContact({ ...req.body, userId, photo: photoURL });
    console.log(data);

    res.status(201).json({
        status: 201,
        message: "Successfully created a contact!",
        data,
    });
};

export const updateContactController = async (req, res, next) => {
    const photo = req.file;
    let photoURL;

    try {
        if (enableCloudinary === "true") {
            photoURL = await saveFileToCloudinary(photo);
        } else {
            photoURL = await saveFileToUploadDir(photo);
        }
    } catch (error) {
        return res.status(500).json({ message: "Error saving photo", error: error.message });
    }


    const { _id: userId } = req.user;
    const { contactId } = req.params;
    const data = await contactServices.updateContact({ _id: contactId, userId, photo: photoURL }, req.body,);

    if (!data) {
        throw createHttpError(404, 'Contact not found');
    };

    console.log(data.contact);



    res.json({
        status: 200,
        message: "Successfully patched a contact!",
        data: data.contact,
    });
};

export const deleteContactController = async (req, res) => {
    const { contactId } = req.params;
    const { _id: userId } = req.user;
    const data = await contactServices.deleteContact({ _id: contactId, userId });

    if (!data) {
        throw createHttpError(404, 'Contact not found');
    };

    res.status(204).send();
};