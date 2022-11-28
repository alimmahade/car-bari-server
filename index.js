const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;
require("dotenv").config();
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// mongodb uri
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.0vavtsh.mongodb.net/?retryWrites=true&w=majority`;
// mongodb Client
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
// mongodb Function
async function run() {
  try {
    const mDatabase = client.db("db-name-12").collection("collection-db-12");
    const brandDetails = client
      .db("db-name-12")
      .collection("all-car-collection");
    // get all data
    app.get("/mydata", async (req, res) => {
      const query = {};
      const options = await mDatabase.find(query).toArray();
      res.send(options);
    });

    // order Data
    const orderDatabase = client
      .db("db-name-12")
      .collection("order-collection");
    app.post("/orderpost", async (req, res) => {
      const order = req.body;
      const result = await orderDatabase.insertOne(order);
      res.send(result);
    });

    // catagory Database data get
    const categoryDatabase = client.db("db-name-12").collection("category-car");
    app.get("/category", async (req, res) => {
      const query = {};
      const options = await categoryDatabase.find(query).toArray();
      res.send(options);
    });
    // CategoryDetails Data loaded
    app.get("/categorydetails", async (req, res) => {
      const query = {};
      const cursor = mDatabase.find(query);
      const categorydetails = await cursor.toArray();
      res.send(categorydetails);
    });

    app.get("/categorydetails/:id", async (req, res) => {
      const id = req.params.id;
      const brand = { brand: id };
      const result = await brandDetails.find(brand).toArray();
      res.send(result);
    });
  } finally {
  }
}
run().catch(console.log);
app.get("/", async (req, res) => {
  res.send("Server Up and Running");
});

app.listen(port, () => console.log(`Server is running on Port ${port}`));
