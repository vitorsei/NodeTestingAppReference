var async = require("async");
var assert = require("assert");

var ReviewProcess = function (args) {
    assert(args.application, "Need an application to review");
    var app = args.application;

    //make sure the app is valid
    this.ensureAppValid = function (next) {
        if (app.isValid()) {
            next(null, true);
        } else {
            next(app.validationMessage, null);
        }
    };

    //find the next mission
    this.findNextMission = function (next) {
        // stub this out for now
        var mission = {
            commander: null,
            pilot: null,
            MAVpilot: null,
            passengers: []
        };
        next(null, mission);
    };

    //make sure role selected is available
    this.roleIsAvailable = function (next) {
        next(null, true);
    };

    //make sure height/weight/age is right for role
    this.ensureRoleCompatible = function (next) {
        next(null, true);
    };

    this.approveApplicaiton = function (next) {
        next(null, true);
    };

    this.processApplication = function (next) {
        async.series({
                validated: this.ensureAppValid,
                mission: this.findNextMission,
                roleAvailable: this.roleIsAvailable,
                roleCompatible: this.ensureRoleCompatible,
                success: this.approveApplicaiton
            },
            function (err, result) {
                if (err) {
                    next(null, {
                        success: false,
                        message: err
                    });
                } else {
                    result.message = "Welcome to Mars!";
                    console.log(result);
                    next(null, result);
                }
            }
        )
    };
};

module.exports = ReviewProcess;