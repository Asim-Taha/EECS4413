import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 5000;
export const SERVER_URL = process.env.SERVER_URL || "http://localhost:5000";

export const DB_URI = process.env.DB_URI || "";
export const JWT_SECRET = process.env.JWT_SECRET || "";
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";

/**
 * Example usage to use .env variables
 *
 * import { DB_URI, PLAID_API_KEY, SENTRY_DSN } from "../config/env.js";
 * console.log("Connected to MongoDB at:", DB_URI);
 * console.log("Plaid API Key:", PLAID_API_KEY);
 * console.log("Sentry DSN:", SENTRY_DSN);
 */
