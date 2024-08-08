const express = require("express");
const { Doctors } = require("../../config.js");
const router = express.Router();
const authenticateToken = require("../../Authorization.js");

router.get("/doctors", authenticateToken, async (req, res) => {
  try {
    const snapshot = await Doctors.get();
    const list = snapshot.docs.map((doc) => ({
      id: doc.id,
      data: { ...doc.data() },
    }));
    res.json(list);
  } catch (error) {
    console.error("Error retrieving Doctors:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/doctors", authenticateToken, async (req, res) => {
  try {
    const data = req.body;
    console.log("Data of Doctors", data);
    await Doctors.add(data);
    res.status(201).json({ msg: "Doctors Added" });
  } catch (error) {
    console.error("Error adding Doctors:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/doctors/:id", authenticateToken, async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    await Doctors.doc(id).update(data);
    res.json({ msg: "Doctors Updated" });
  } catch (error) {
    console.error("Error updating Doctors:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/doctors/:id", authenticateToken, async (req, res) => {
  try {
    const id = req.params.id;
    await Doctors.doc(id).delete();
    res.json({ msg: "Doctors Deleted" });
  } catch (error) {
    console.error("Error deleting Doctors:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
