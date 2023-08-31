import axios from "axios";
import { TRON_API_KEY } from "./config";
import { ITransaction } from "./interfases";

export const getPriceUSD = async (): Promise<number> => {
  return await axios
    .get("https://apilist.tronscanapi.com/api/tokens/overview", {
      headers: {
        "TRON-PRO-API-KEY": TRON_API_KEY,
      },
      params: {
        start: 0,
        limit: 1,
        verifier: "all",
        order: "desc",
        filter: "top",
        showAll: 1,
      },
    })
    .then((response) => response.data.tokens[0].priceInUsd);
};

export const getTransactions = async (
  lastTimestamp: number,
  endTimestamp: number
): Promise<ITransaction[]> => {
  return await axios
    .get(
      "https://api.shasta.trongrid.io/v1/accounts/TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t/transactions",
      {
        params: {
          min_timestamp: lastTimestamp,
          max_timestamp: endTimestamp,
        },
      }
    )
    .then((response) => response.data.data);
};
