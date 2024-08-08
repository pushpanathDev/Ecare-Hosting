const express = require("express");
const { User } = require("../../config.js");
const router = express.Router();
const authenticateToken = require("../../Authorization.js");

router.get("/user", authenticateToken, async (req, res) => {
  try {
    const snapshot = await User.get();
    const list = snapshot.docs.map((doc) => ({
      id: doc.id,
      data: { ...doc.data() },
    }));
    res.json(list);
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/user", authenticateToken, async (req, res) => {
  try {
    const data = req.body;
    console.log("Data of Users", data);
    await User.add(data);
    res.status(201).json({ msg: "User Added" });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/user/:id", authenticateToken, async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    await User.doc(id).update(data);
    res.json({ msg: "User Updated" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/user/:id", authenticateToken, async (req, res) => {
  try {
    const id = req.params.id;
    await User.doc(id).delete();
    res.json({ msg: "User Deleted" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
