import { Schema, model } from "mongoose";
import { contactTypeList } from "../../constants/contacts.js";

import { handleSaveError, setUpdateOptions } from "./hooks.js";

const contactSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    isFavourite: {
        type: Boolean,
        default: false,
    },
    contactType: {
        type: String,
        enum: contactTypeList,
        required: true,
        default: 'personal',
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    }
}, { versionKey: false, timestamps: true });

contactSchema.post("save", handleSaveError);

contactSchema.pre("findOneAndUpdate", setUpdateOptions);

contactSchema.post("findOneAndUpdate", handleSaveError);


const ContactsCollection = model("contact", contactSchema);

export const sortFields = ["name", "phoneNumber", "email", "isFavourite", "contactType", "createdAt", "updatedAt", "_id"];

export default ContactsCollection;