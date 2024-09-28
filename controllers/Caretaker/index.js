const express = require("express");
const { Caretaker } = require("../../config.js");
const router = express.Router();
const authenticateToken = require("../../Authorization.js");

router.get("/caretaker", authenticateToken, async (req, res) => {
  try {
    const snapshot = await Caretaker.get();
    const list = snapshot.docs.map((doc) => ({
      id: doc.id,
      data: { ...doc.data() },
    }));
    res.json(list);
  } catch (error) {
    console.error("Error retrieving caretakers:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/caretaker", authenticateToken, async (req, res) => {
  try {
    const data = req.body;

    console.log("Data of caretakers", data);
    await Caretaker.add(data);
    res.status(201).json({ msg: "caretaker Added" });
  } catch (error) {
    console.error("Error adding caretaker:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/caretaker/:id", authenticateToken, async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    await Caretaker.doc(id).update(data);
    res.json({ msg: "caretaker Updated" });
  } catch (error) {
    console.error("Error updating caretaker:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/caretaker/:id", authenticateToken, async (req, res) => {
  try {
    const id = req.params.id;
    await Caretaker.doc(id).delete();
    res.json({ msg: "Caretaker Deleted" });
  } catch (error) {
    console.error("Error deleting caretaker:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
