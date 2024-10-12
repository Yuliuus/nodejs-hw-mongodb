import nodemailer from 'nodemailer';
import createHttpError from 'http-errors';

import { SMTP } from '../constants/index.js';
import { env } from "../utils/env.js";

const transporter = nodemailer.createTransport({
    host: env(SMTP.SMTP_HOST),
    port: Number(env(SMTP.SMTP_PORT)),
    auth: {
        user: env(SMTP.SMTP_USER),
        pass: env(SMTP.SMTP_PASSWORD),
    },
});

export const sendEmail = async (options) => {

    const mailIsSent = await transporter.sendMail(options);
    if (!mailIsSent) {
        throw createHttpError(
            500,
            'Failed to send the email, please try again later.',
        );
    }
};
