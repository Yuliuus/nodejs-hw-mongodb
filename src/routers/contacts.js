import { Router } from "express";

import {
    addContactController,
    deleteContactController,
    getAllContactsController,
    getContactByIdController,
    updateContactController
} from "../controllers/contacts.js";

import authenticate from "../middlewares/authenticate.js";
import isValidId from "../middlewares/isValidId.js";

import ctrlWrapper from "../utils/ctrlWrapper.js";
import validateBody from "../utils/validateBody.js";

import { contactAddSchema, contactUpdateSchema } from "../validation/contacts.js";

const contactsRouter = Router();

contactsRouter.use(authenticate);

contactsRouter.get("/", ctrlWrapper(getAllContactsController));

contactsRouter.get("/:contactId", isValidId, ctrlWrapper(getContactByIdController));

contactsRouter.post("/", validateBody(contactAddSchema), ctrlWrapper(addContactController));

contactsRouter.patch("/:contactId", isValidId, validateBody(contactUpdateSchema), ctrlWrapper(updateContactController));

contactsRouter.delete("/:contactId", isValidId, ctrlWrapper(deleteContactController));

export default contactsRouter;