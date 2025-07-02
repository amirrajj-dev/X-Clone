import dotenv from "dotenv";

dotenv.config()

export const ENV = {
  PORT: 3000,
  NODE_ENV: "development",
  CLERK_PUBLISHABLE_KEY:
    "pk_test_aG9wZWZ1bC1nb3JpbGxhLTg0LmNsZXJrLmFjY291bnRzLmRldiQ",
  CLERK_SECRET_KEY: "sk_test_IS1TVaC47Ymn4mKlUCWIsfJ3KJLyQ9WbqoQNlFEnJO",
  MONGO_URI:
    "mongodb+srv://amiramraja:0KH6vGjDnr9kgHmr@cluster0.jmttkdl.mongodb.net/x_db?retryWrites=true&w=majority&appName=Cluster0",
  ARCJET_KEY: "ajkey_01jz68ey5gegkakxyrnkdk7k08",
  CLOUDINARY_CLOUD_NAME: "dnrws0axe",
  CLOUDINARY_API_KEY: "444232417199279",
  CLOUDINARY_API_SECRET: "HGCSqIN8ByrMDC7vAwhupw_e5_k",
};