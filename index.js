import express from "express";
import { MongoClient, ServerApiVersion } from 'mongodb'
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import kpiRoutes from "./routes/kpi.js";
import productRoutes from "./routes/product.js";
import transactionRoutes from "./routes/transaction.js";
import KPI from "./models/KPI.js";
import Product from "./models/Product.js";
import Transaction from "./models/Transaction.js";
import { kpis, products, transactions } from "./data/data.js";

/* CONFIGURATIONS */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());


app.use("/kpi", kpiRoutes);
app.use("/product", productRoutes);
app.use("/transaction", transactionRoutes);
const client = new MongoClient(process.env.MONGO_URL, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Mongoose Connected');

    client.connect()
      .then(async () => {
        app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
        // Adjust with your actual database name
        const dbName = "financedb";
        const db = client.db(dbName);

        try {
          // Uncomment if you want to drop the database
          // await db.dropDatabase();
          // await KPI.insertMany(kpis);
          // Product.insertMany(products);
          // console.log('KPIs inserted');
          // console.log('Products inserted');
          Transaction.insertMany(transactions);
          console.log("Transactions inserted");
        } catch (error) {
          console.error('Error inserting KPIs', error);
        }
      })
      .catch((error) => console.log(`${error} did not connect`));
  })
  .catch(err => console.log(err));
