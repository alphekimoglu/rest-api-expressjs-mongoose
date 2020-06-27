var express = require("express");
var RecordController = require("../controllers/RecordController");

var router = express.Router();

router.post('/', RecordController.recordList);

module.exports = router;
