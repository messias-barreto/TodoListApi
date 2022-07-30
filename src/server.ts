import express from "express";
import { AppDataSource } from "./database/data-source";
import { routes } from "./routes/routes";

AppDataSource.initialize()
    .then(() => {
        const app = express();
        app.use(express.json());
        app.use(routes);

        app.listen(process.env.PORT, () => { console.log('server is running'); })
    })

    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })

