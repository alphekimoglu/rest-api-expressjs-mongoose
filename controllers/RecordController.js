var Record = require("../models/Record")
var apiResponse = require("../helpers/apiResponse");
//var { body, validationResult } = require('express-validator');

//records router controller
exports.recordList = [
    function (req,res) {
        try {
            //request payload parsing and validation
            var startDate = new Date(Date.parse(req.body.startDate));
            var endDate = new Date(Date.parse(req.body.endDate));
            var minCount = parseInt(req.body.minCount);
            var maxCount = parseInt(req.body.maxCount);

            //Record filtering and aggregation for count array sum
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
                //error handling for data fetch errors
                function(err, result) {
                    if (err) {
                        return apiResponse.errorResponse(res,err.message,500);
                    } else {
                        return apiResponse.successResponseWithData(res,"Success",result)
                    }
                }
            )
        }catch (e) {
            //error handling for controller function
            return apiResponse.errorResponse(res,e.message,500)
        }
    }
]