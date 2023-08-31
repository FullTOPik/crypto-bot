import { config } from "dotenv";

config();

export const TRON_API_KEY = process.env.TRON_API_KEY;
export const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN