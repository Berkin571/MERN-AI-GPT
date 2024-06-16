import { Configuration } from "openai";
import dotenv from "dotenv";

dotenv.config();

export const configureOpenAI = () => {
  const config = new Configuration({
    apiKey: process.env.OPENAI_SECRET,
    organization: process.env.OPENAI_ORGANIZATION_ID,
  });

  if (!process.env.OPENAI_SECRET) {
    throw new Error("OpenAI API key is not set in the environment variables.");
  }

  if (!process.env.OPENAI_ORGANIZATION_ID) {
    throw new Error(
      "OpenAI organization ID is not set in the environment variables."
    );
  }

  return config;
};
