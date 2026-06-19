const express = require("express");
const router = express.Router();

const {
    getContacts,
    createContact,
} = require("../controllers/contactController");

router.get("/", getContacts);
router.post("/", createContact);

module.exports = router;