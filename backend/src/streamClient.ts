import { StreamClient } from "@stream-io/node-sdk";

const apiKey = process.env.APIKEY!;
const apiSecret = process.env.APISECRET!;

export const client = new StreamClient(apiKey, apiSecret)