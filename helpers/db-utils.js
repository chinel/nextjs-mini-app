import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  const client = await MongoClient.connect(
    "mongodb+srv://DbUser:dbpassword@cluster-nextjs.yaea0.mongodb.net/events?retryWrites=true&w=majority"
  );
  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db(); //here we can pass the database name as a string to this db method, but since we already specified it in the database url above we can leave it
  const result = await db.collection(collection).insertOne(document);
  return result;
}

export async function getAllDocuments(client, collection, sort, filter) {
  const db = client.db();
  const documents = await db
    .collection(collection)
    .find(filter)
    .sort(sort) //-1 to sort the id in descending order and +1 to sort the id in ascending order;
    .toArray();

  return documents;
}
