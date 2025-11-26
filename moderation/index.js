const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  console.log("Received Event:", type);

  if (type === "CommentCreated") {
    const status = data.content.includes("orange") ? "rejected" : "approved";
    const moderatedData = { ...data, status };

    await axios
      .post("http://localhost:4005/events", {
        type: "CommentModerated",
        data: moderatedData,
      })
      .catch((err) => {
        console.error("Error sending event to event-bus:", err.message);
      });
  }

  res.send({});
});

app.listen(4003, () => {
  console.log("Moderation service is running on port 4003");
});
