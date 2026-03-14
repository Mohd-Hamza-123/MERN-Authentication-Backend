import dotenv from "dotenv";
dotenv.config({ path: ".env" , quiet : true });

function requiredEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Required env variable ${name} is not set`);
  }

  return value;
}

const env = {
  PORT: requiredEnv("PORT"),
  MONGODB_URI: requiredEnv("MONGODB_URI"),
  CORS_ORIGIN: requiredEnv("CORS_ORIGIN"),
  SMTP_HOST: requiredEnv("SMTP_HOST"),
  SMTP_PORT: Number(requiredEnv("SMTP_PORT")), 
  SMTP_USER: requiredEnv("SMTP_USER"),
  SMTP_PASS: requiredEnv("SMTP_PASS"),
  REDIS_PASSWORD: requiredEnv("REDIS_PASSWORD"),
  REDIS_HOST: requiredEnv("REDIS_HOST"),
  REDIS_PORT: Number(requiredEnv("REDIS_PORT")),
  SESSION_SECRET : requiredEnv("SESSION_SECRET"),
  GOOGLE_CLIENT_ID : requiredEnv("GOOGLE_CLIENT_ID"),
  GOOGLE_CLIENT_SECRET : requiredEnv("GOOGLE_CLIENT_SECRET"),
  GITHUB_CLIENT_ID : requiredEnv("GITHUB_CLIENT_ID"),
  GITHUB_CLIENT_SECRET : requiredEnv("GITHUB_CLIENT_SECRET"),
  BACKEND_URL : requiredEnv("BACKEND_URL")
};

export default env;
