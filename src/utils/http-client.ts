import axios from "axios";

const BUOU_API_KEY = process.env.BUOU_API_KEY || "test";

if (!BUOU_API_KEY) {
  throw new Error("BUOU_API_KEY environment variable is not set");
}

export const twentyFirstClient = axios.create({
  baseURL: "https://buouui.com",
  headers: {
    "Buou-API-Key": BUOU_API_KEY,
    "Content-Type": "application/json",
  },
});
