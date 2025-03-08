import axios from "axios";

const TWENTY_FIRST_API_KEY = process.env.TWENTY_FIRST_API_KEY || "test";

if (!TWENTY_FIRST_API_KEY) {
  throw new Error("TWENTY_FIRST_API_KEY environment variable is not set");
}

export const twentyFirstClient = axios.create({
  baseURL: "https://buouui.com",
  headers: {
    // "x-api-key": TWENTY_FIRST_API_KEY,
    "Content-Type": "application/json",
  },
});
