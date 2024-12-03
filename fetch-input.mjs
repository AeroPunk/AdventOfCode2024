import { Client } from "aocjs";
import sessionToken from "./config.mjs";

const fetchInput = async (year, day) => {
  const client = new Client({ session: sessionToken });
  const input = await client.getInput(year, day);
  return input;
}

export default fetchInput;