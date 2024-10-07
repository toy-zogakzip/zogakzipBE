import mongoose from "mongoose";
import badges from "./badgeData.js";
import Badge from "../models/Badge.js";
import { DATABASE_URL } from "../env.js";

mongoose.connect(DATABASE_URL);

await Badge.deleteMany({});
await Badge.insertMany(badges);

mongoose.connection.close();
