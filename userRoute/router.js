const express = require("express");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await db.get();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await db.getById(id);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "error" });
  }
});

router.post("/", async (req, res) => {
  const user = req.body;
  try {
    const incUser = await db.insert(user);
    const newUser = await db.getById(incUser.id);
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await db.getById(id);
    const deleted = await db.remove(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
});

router.put("/:id", async (req, res) => {
  const user = req.body;
  const { id } = req.params;
  try {
    const edited = await db.update(id, user);
    const newUser = await db.getById(id);
    res.status(202).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
});

module.exports = router;
