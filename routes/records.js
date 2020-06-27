var express = require("express");
var RecordController = require("../controllers/RecordController");

var router = express.Router();

//Router for record related end points
router.post('/', RecordController.recordList);

module.exports = router;
