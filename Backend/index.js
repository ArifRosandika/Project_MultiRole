import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import SequelizeStore from "connect-session-sequelize";
import routerProduct from "./routes/productRot.js";
import routerUser from "./routes/userRot.js";
import routerAuth from "./routes/authRot.js";
import db from "./database/indexDb.js";

dotenv.config();
const app = express();

// (async() => {
//     await db.sync();
// })();

const SessionStore = SequelizeStore(session.Store);

const store = new SessionStore({ db: db });

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true, 
    store: store,
    cookie: {
        secure: false,
        httpOnly: true
    }
}));

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
 
app.use(express.json());
app.use(routerProduct);
app.use(routerUser);
app.use(routerAuth);

app.listen(5000, () => console.log("Server running on port", 5000));