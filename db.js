const { MongoClient, Decimal128 } = require("mongodb");
const uri =
  "mongodb+srv://root:toor@cluster0.1ejfbc5.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

const getPoint1 = async () => {
  const database = client.db("sample_airbnb");
  const collection = await database.collection("listingsAndReviews");
  const element = await collection.find({ bathrooms: { $gte: 2 } }).toArray();
  return element;
};

const getPoint2 = async () => {
  const database = client.db("sample_airbnb");
  const collection = await database.collection("listingsAndReviews");
  const element = await collection
    .find({ price: { $lte: 300 } })
    .sort({ price: -1 })
    .limit(500)
    .toArray();
  return element;
};

const getPoint3 = async () => {
  const database = client.db("sample_airbnb");
  const collection = await database.collection("listingsAndReviews");
  const element = await collection
    .find({ house_rules: /No smoking/ })
    .toArray();
  return element;
};
const getPoint4 = async () => {
  const database = client.db("sample_airbnb");
  const collection = await database.collection("listingsAndReviews");
  const element = await collection
    .find({
      last_review: {
        $gte: new Date("2017-02-01"),
        $lt: new Date("2018-12-23"),
      },
    })
    .toArray();
  return element;
};

const getPoint5 = async () => {
  const database = client.db("sample_airbnb");
  const collection = await database.collection("listingsAndReviews");
  const element = await collection
    .find({
      $or: [
        { cancellation_policy: "moderate" },
        { cancellation_policy: "flexible" },
      ],
    })
    .toArray();
  return element;
};

const getPoint6 = async () => {
  const database = client.db("sample_airbnb");
  const collection = await database.collection("listingsAndReviews");
  const element = await collection
    .find({ $and: [{ bedrooms: 6 }, { beds: 6 }] })
    .toArray();
  return element;
};

const filterPrice = async (valor) => {
  const database = client.db("sample_airbnb");
  const collection = await database.collection("listingsAndReviews");
  const element = await collection
    .find({ price: { $eq: new Decimal128(valor) } })
    .toArray();
  return element;
};

module.exports = {
  getPoint1,
  getPoint2,
  getPoint3,
  getPoint4,
  getPoint5,
  getPoint6,
  filterPrice,
};