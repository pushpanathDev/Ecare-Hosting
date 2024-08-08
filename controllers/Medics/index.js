const express = require("express");
const { Medics } = require("../../config.js");
const router = express.Router();
const authenticateToken = require("../../Authorization.js");

router.get("/medics", authenticateToken, async (req, res) => {
  try {
    const snapshot = await Medics.get();
    const list = snapshot.docs.map((doc) => ({
      id: doc.id,
      data: { ...doc.data() },
    }));
    res.json(list);
  } catch (error) {
    console.error("Error retrieving Medics:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/medics", authenticateToken, async (req, res) => {
  try {
    const data = req.body;
    console.log("Data of Medics", data);
    await Medics.add(data);
    res.status(201).json({ msg: "Medics Added" });
  } catch (error) {
    console.error("Error adding Medics:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/medics/:id", authenticateToken, async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    await Medics.doc(id).update(data);
    res.json({ msg: "Medics Updated" });
  } catch (error) {
    console.error("Error updating Medics:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/medics/:id", authenticateToken, async (req, res) => {
  try {
    const id = req.params.id;
    await Medics.doc(id).delete();
    res.json({ msg: "Medics Deleted" });
  } catch (error) {
    console.error("Error deleting Medics:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
