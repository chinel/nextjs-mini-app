import { MongoClient } from "mongodb";

async function connectToDatabase() {
  const client = await MongoClient.connect(
    "mongodb+srv://DbUser:dbpassword@cluster-nextjs.yaea0.mongodb.net/events?retryWrites=true&w=majority"
  );
  return client;
}

async function insertDocument(client, document) {
  const db = client.db(); //here we can pass the database name as a string to this db method, but since we already specified it in the database url above we can leave it
  await db.collection("newsletter").insertOne({
    email: userEmail,
  });
}

async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email addresss" });
      return;
    }

    client.close();
    res.status(201).json({ message: "Signed up!" });
  }
}

export default handler;
