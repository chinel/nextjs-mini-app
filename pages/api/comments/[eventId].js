import { connectToDatabase, insertDocument } from "../../../helpers/db-utils";

async function handler(req, res) {
  const eventId = req.query.eventId;
  let client;
  try {
    client = await connectToDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed" });
    return;
  }
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
      .find({ eventId: eventId })
      .sort({ _id: -1 }) //-1 to sort the id in descending order and +1 to sort the id in ascending order;
      .toArray();
    res.status(200).json({ comments: documents });
  }
  client.close();
}

export default handler;
