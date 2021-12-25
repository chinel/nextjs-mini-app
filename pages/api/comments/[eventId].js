import {
  connectToDatabase,
  insertDocument,
  getAllDocuments,
} from "../../../helpers/db-utils";

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

    let result;
    try {
      result = await insertDocument(client, "comments", newComment);
      console.log(result);
      newComment._id = result.insertedId;
      console.log(newComment);
      res.status(201).json({ message: "Added comment", comment: newComment });
    } catch (error) {
      res.status(500).json({ message: "Inserting comment failed" });
    }
  }

  if (req.method === "GET") {
    let documents;
    try {
      documents = await getAllDocuments(
        client,
        "comments",
        { _id: -1 },
        { eventId: eventId }
      );
      res.status(200).json({ comments: documents });
    } catch (error) {
      res.status(500).json({ message: "Getting comments failed" });
    }
  }
  client.close();
}

export default handler;
