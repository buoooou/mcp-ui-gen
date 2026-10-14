import axios from "axios";

const BUOU_API_KEY = process.env.BUOU_API_KEY;

export const twentyFirstClient = axios.create({
  baseURL: process.env.BUOU_API_URL || "https://buouui.com",
  timeout: 30_000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Checked per request instead of at startup, so clients can still list the
// tools of a server that has no key configured yet.
twentyFirstClient.interceptors.request.use((config) => {
  if (!BUOU_API_KEY) {
    throw new Error(
      "BUOU_API_KEY is not set. Create a key at https://buouui.com/dashboard/key and add it to the MCP server configuration."
    );
  }
  config.headers.set("Buou-API-Key", BUOU_API_KEY);
  return config;
});
