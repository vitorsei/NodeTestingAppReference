var async = require("async");
var assert = require("assert");

var ReviewProcess = function (args) {
    assert(args.application, "Need an application to review");
    var app = args.application;

    //make sure the app is valid
    this.ensureAppValid = function (next) {
        if (app.isValid()) {
            next(null, app);
        } else {
            next(app.validationMessage, null);
        }
    };

    //find the next mission
    this.findNextMission = function (next) {
        // stub this out for now
        app.mission = {
            commander: null,
            pilot: null,
            MAVpilot: null,
            passengers: []
        };
        next(null, app);
    };

    //make sure role selected is available
    this.roleIsAvailable = function (next) {
        next(null, app);
    };

    //make sure height/weight/age is right for role
    this.ensureRoleCompatible = function (next) {
        next(null, app);
    };

    this.processApplication = function (next) {
        async.series([
                this.ensureAppValid,
                this.findNextMission,
                this.roleIsAvailable,
                this.ensureRoleCompatible,
            ], function (err, result) {
                if (err) {
                    next(null, {
                        success: false,
                        message: err
                    });
                } else {
                    next(null, {
                        success: true,
                        message: "Welcome to Mars!"
                    });
                }
            }
        )
    };
};

module.exports = ReviewProcess;