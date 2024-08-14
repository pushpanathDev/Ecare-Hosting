const express = require("express");
const { Orders } = require("../../config.js");
const router = express.Router();
const authenticateToken = require("../../Authorization.js");

router.get("/orders", authenticateToken, async (req, res) => {
  try {
    const snapshot = await Orders.get();
    const list = snapshot.docs.map((doc) => ({
      id: doc.id,
      data: { ...doc.data() },
    }));
    res.json(list);
  } catch (error) {
    console.error("Error retrieving Orders:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/orders", authenticateToken, async (req, res) => {
  try {
    const data = req.body;
    console.log("Data of Orders", data);
    await Orders.add(data);
    res.status(201).json({ msg: "Orders Added" });
  } catch (error) {
    console.error("Error adding Orders:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/orders/:id", authenticateToken, async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    await Orders.doc(id).update(data);
    res.json({ msg: "Orders Updated" });
  } catch (error) {
    console.error("Error updating Orders:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/orders/:id", authenticateToken, async (req, res) => {
  try {
    const id = req.params.id;
    await Orders.doc(id).delete();
    res.json({ msg: "Orders Deleted" });
  } catch (error) {
    console.error("Error deleting Orders:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
