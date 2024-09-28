const express = require("express");
const { Appointments } = require("../../config.js");
const router = express.Router();
const authenticateToken = require("../../Authorization.js");

router.get("/appointments", authenticateToken, async (req, res) => {
  try {
    const snapshot = await Appointments.get();
    const list = snapshot.docs.map((doc) => ({
      id: doc.id,
      data: { ...doc.data() },
    }));
    res.json(list);
  } catch (error) {
    console.error("Error retrieving Appointments:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/appointments", authenticateToken, async (req, res) => {
  try {
    const data = req.body;

    console.log("Data of Appointments", data);
    await Appointments.add(data);
    res.status(201).json({ msg: "Appointment Added" });
  } catch (error) {
    console.error("Error adding Appointment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/appointments/:id", authenticateToken, async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    await Appointments.doc(id).update(data);
    res.json({ msg: "Appointment Updated" });
  } catch (error) {
    console.error("Error updating Appointment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/appointments/:id", authenticateToken, async (req, res) => {
  try {
    const id = req.params.id;
    await Appointments.doc(id).delete();
    res.json({ msg: "Appointment Deleted" });
  } catch (error) {
    console.error("Error deleting Appointment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
