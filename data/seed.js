import mongoose from "mongoose";
import badges from "./badgeData.js";
import Badge from "../models/Badge.js";
import { DATABASE_URL } from "../env.js";
import * as dotenv from "dotenv";

dotenv.config();

const mongoURI = process.env.DATABASE_URL;
mongoose
    .connect(mongoURI, {})
    .then(() => {
        console.log("Connected to DB - seed");
    })
    .catch((error) => {
        console.error("Error connecting to DB:", error);
        process.exit(1);
    });

await Badge.deleteMany({});
await Badge.insertMany(badges);

mongoose.connection.close();
