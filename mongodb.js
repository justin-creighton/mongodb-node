import { MongoClient } from "mongodb";
import fs from "fs";
const fsp = fs.promises;
import path from "path";

const execute = async () => {
  const client = await MongoClient.connect("mongodb://127.0.01:27017");

  const db = client.db("node-course-db");

  const newProductsString = await fsp.readFile(
    path.join(__dirname, "new-products.txt"),
    "utf-8"
  );

  console.log("products", newProductsString);

  const productNames = newProductsString.split(",");

  console.log("products names", productNames);

  let i = 0;
  for (let productName of productNames) {
    await db.collection("products").insertOne({
      id: i++,
      name: productName,
    });
  }

  console.log("Done importing products");

  client.close();
};

execute();
