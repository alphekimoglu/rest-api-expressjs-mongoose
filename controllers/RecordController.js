var Record = require("../models/Record")
var apiResponse = require("../helpers/apiResponse");
//var { body, validationResult } = require('express-validator');

exports.recordList = [
    function (req,res) {
        try {
            var startDate = new Date(Date.parse(req.body.startDate));
            var endDate = new Date(Date.parse(req.body.endDate))
            var minCount = req.body.minCount;
            var maxCount = req.body.maxCount;

            Record.aggregate(
                [
                    {$match: {"createdAt":{$gte:startDate,$lte:endDate}}},
                    {
                        $project: {
                            "_id":0,
                            "key":"$key",
                            "createdAt:":"$createdAt",
                            "totalCount":{
                                $reduce: {
                                    input: "$counts",
                                    initialValue: 0,
                                    in: {$sum: ["$$value","$$this"]}
                                }
                            }
                        }
                    },
                    {$match: {"totalCount":{$gte:minCount,$lte:maxCount}}}
                ],
                function(err, result) {
                    if (err) {
                        return apiResponse.errorResponse(res,err.message,500);
                    } else {
                        return apiResponse.successResponseWithData(res,"Success",result)
                    }
                }
            )
        }catch (e) {
            return apiResponse.errorResponse(res,e.message,500)
        }
    }
]