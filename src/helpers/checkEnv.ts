import { z } from "zod";
import { getErrorMessage } from "./createError";

const Enviroments = z.object({
  MONGO_URL: z.string().url(),
  JWT: z.string(),
  JWT_KEY: z.string(),
  PORT: z.number().nullish(),
});

export type Enviroments = z.TypeOf<typeof Enviroments>;

export function checkEnviromentVariables(): Enviroments {
  return Enviroments.parse(process.env);
}
