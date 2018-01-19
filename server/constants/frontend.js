const FRONTEND_DEV_URLS = ["http://localhost:3002"];

const FRONTEND_PROD_URLS = [
  "https://www.pandamoniumnutrition.com",
  "https://pandamoniumnutrition.com"
];

module.exports =
  process.env.NODE_ENV === "production"
    ? FRONTEND_PROD_URLS
    : FRONTEND_DEV_URLS;
