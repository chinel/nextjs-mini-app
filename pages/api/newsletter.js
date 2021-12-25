import { MongoClient } from "mongodb";
async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email addresss" });
      return;
    }

    const client = await MongoClient.connect(
      "mongodb+srv://nextDbUser:nextdbpassword@cluster-nextjs.yaea0.mongodb.net/newsletter?retryWrites=true&w=majority"
    );

    const db = client.db(); //here we can pass the database name as a string to this db method, but since we already specified it in the database url above we can leave it
    await db.collection("emails").insertOne({
      email: userEmail,
    });
    client.close();
    res.status(201).json({ message: "Signed up!" });
  }
}

export default handler;
