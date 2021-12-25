import { MongoClient } from "mongodb";
async function handler(req, res) {
  const eventId = req.query.eventId;
  const client = await MongoClient.connect(
    "mongodb+srv://DbUser:dbpassword@cluster-nextjs.yaea0.mongodb.net/events?retryWrites=true&w=majority"
  );
  if (req.method === "POST") {
    const { email, name, text } = req.body;

    //Add server side validation
    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid Input" });
      return;
    }
    const newComment = {
      // id: new Date().toISOString(),
      email,
      name,
      text,
      eventId,
    };

    const db = client.db();
    const result = await db.collection("comments").insertOne(newComment);
    console.log(result);
    newComment.id = result.insertedId;
    console.log(newComment);
    res.status(201).json({ message: "Added comment", comment: newComment });
  }

  if (req.method === "GET") {
    const db = client.db();
    const documents = await db
      .collection("comments")
      .find()
      .sort({ _id: -1 }) //-1 to sort the id in descending order and +1 to sort the id in ascending order;
      .toArray();
    res.status(200).json({ comments: documents });
  }
  client.close();
}

export default handler;
