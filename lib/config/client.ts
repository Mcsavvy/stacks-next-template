import z from "zod";

export const envSchema = z.object({
  NEXT_PUBLIC_APP_NAME: z.string().default("Stacks Next Template"),
});

export type AppConfig = {
  appName: string;
};

export const unparsedEnv = {
  appName: process.env.NEXT_PUBLIC_APP_NAME,
};

const parsed = envSchema.safeParse(unparsedEnv);

if (!parsed.success) {
  let message = "Invalid environment variables:";
  for (const issue of parsed.error.issues) {
    message += `\n${issue.path.join(".")}: ${issue.message}`;
  }
  throw new Error(message);
}

const config: AppConfig = {
  appName: parsed.data.NEXT_PUBLIC_APP_NAME,
};

export default config;
