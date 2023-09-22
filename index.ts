import express, { Request, Response } from "express";
import cors from "cors";
import cookieSession from "cookie-session";
import { db } from "./src/models";
import { Role } from "./src/models/role.model";
import { Routes } from "./src/Routes";
import { SESSIONKEY, URL } from "./src/config";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use(
  cookieSession({
    name: "yarrs-session",
    keys: [SESSIONKEY],
    httpOnly: true,
  })
);

// Database connection and initialization
db.customMongoose
  .connect(URL)
  .then(async () => {
    console.log("Connected to database");
    await initializeRoles();
  })
  .catch((e) => {
    console.error("Error connecting to DB:", e);
  });

async function initializeRoles() {
  try {
    const totalDocuments = await Role.estimatedDocumentCount();

    if (totalDocuments === 0) {
      await Role.create({ name: "admin" });
      await Role.create({ name: "user" });
      console.log("Default roles created");
    }
  } catch (error) {
    console.error("Error initializing roles: ", error);
  }
}

// simple route
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to YARRS Application." });
});

Routes(app);

// Global error handler
app.use((err: Error, req: Request, res: Response) => {
  console.error(err.stack);
  res.status(500).json({ message: `Something went wrong! Error: ${err}` });
});

// Star the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
