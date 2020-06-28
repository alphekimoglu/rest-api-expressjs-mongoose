var Record = require("../models/Record")
var apiResponse = require("../helpers/apiResponse");

//records router controller
exports.recordList = [
    function (req,res) {
        try {
            /*
            request payload parsing and validation
            Express-validator can be implemented to project for further improvement
            */
            if (!Date.parse(req.body.startDate)){
                return apiResponse.errorResponse(res,"startDate is not a valid Date",500);
            }else{
                var startDate = new Date(Date.parse(req.body.startDate));
            }
            if (!Date.parse(req.body.endDate)){
                return apiResponse.errorResponse(res,"endDate is not a valid Date",500);
            }else{
                var endDate = new Date(Date.parse(req.body.endDate));
            }
            if (!Date.parse(req.body.minCount)){
                return apiResponse.errorResponse(res,"minCount is not a valid Integer",500);
            }else{
                var minCount = parseInt(req.body.minCount);
            }
            if (!Date.parse(req.body.maxCount)){
                return apiResponse.errorResponse(res,"maxCount is not a valid Integer",500);
            }else{
                var maxCount = parseInt(req.body.maxCount);
            }

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