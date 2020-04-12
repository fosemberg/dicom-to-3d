"use strict";
exports.__esModule = true;
var Status;
(function (Status) {
    Status[Status["success"] = 0] = "success";
    Status[Status["fail"] = 1] = "fail";
    Status[Status["building"] = 2] = "building";
})(Status = exports.Status || (exports.Status = {}));
var TYPE;
(function (TYPE) {
    TYPE["SUBSCRIBE"] = "SUBSCRIBE";
    TYPE["SUBSCRIPTION"] = "SUBSCRIPTION";
    TYPE["UNSUBSCRIPTION"] = "UNSUBSCRIPTION";
    TYPE["REQUEST"] = "REQUEST";
    TYPE["RESPONSE"] = "RESPONSE";
    TYPE["EVENT"] = "EVENT";
})(TYPE = exports.TYPE || (exports.TYPE = {}));
;
var ACTION;
(function (ACTION) {
    ACTION["START_BUILD"] = "START_BUILD";
    ACTION["BUILD_RESULT"] = "BUILD_RESULT";
    ACTION["BUILD_RESULTS"] = "BUILD_RESULTS";
})(ACTION = exports.ACTION || (exports.ACTION = {}));
