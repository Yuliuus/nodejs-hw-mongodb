import express from "express";
import cors from "cors";
import pino from "pino-http";
import { env } from "./utils/env.js";
// import ContactsCollection from "./db/models/contact.js";

import contactsRouter from "./routers/contacts.js";

const setupServer = () => {
    const app = express();

    const logger = pino({
        transport: {
            target: "pino-pretty"
        }
    });

    app.use(logger);
    app.use(cors());
    app.use(express.json());

    app.use("/contacts", contactsRouter);

    app.use((req, res) => {
        res.status(404).json({
            message: `${req.url} not found!`
        });
    });
    app.use((error, req, res, next) => {
        res.status(500).json({
            message: error.message,
        });
    });

    const PORT = Number(env("PORT", 3000));

    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
};
export default setupServer;