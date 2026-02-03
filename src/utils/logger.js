import morgan from "morgan";

const isProd = process.env.NODE_ENV === "production";

export const logger = morgan(isProd ? "combined" : "dev", {
  skip: (req, res) => isProd && res.statusCode < 400,
});
