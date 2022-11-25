const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;
require("dotenv").config();
const app = express();

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.0vavtsh.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    const mDatabase = client.db("db-name-12").collection("collection-db-12");
    app.get("/mydata", async (req, res) => {
      const query = {};
      const options = await mDatabase.find(query).toArray();
      res.send(options);
    });

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
  } finally {
  }
}
run().catch(console.log);
app.get("/", async (req, res) => {
  res.send("Server is Running");
});

app.listen(port, () => console.log(`My server is running on ${port}`));
