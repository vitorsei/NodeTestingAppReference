var Emitter = require('events').EventEmitter;
var util = require('util');

var ReviewProcess = function (args) {
    var callback;

    //make sure the app is valid
    this.ensureAppValid = function (app) {
        if (app.isValid()) {
            this.emit("validaded", app);
        } else {
            this.emit("invalid", app.validationMessage());
        }
    };

    //find the next mission
    this.findNextMission = function (app) {
        // stub this out for now
        app.mission = {
            commander: null,
            pilot: null,
            MAVpilot: null,
            passengers: []
        };
        this.emit("mission-selected", app);
    };

    //make sure role selected is available
    this.roleIsAvailable = function (app) {
        this.emit("role-available", app);
    };

    //make sure height/weight/age is right for role
    this.ensureRoleCompatible = function (app) {
        this.emit("role-compatible", app);
    };

    this.approveApplication = function (app) {
        callback(null, {
            success: true,
            message: "Welcome to the Mars Program!"
        });
    };

    this.denyApplication = function (message) {
        callback(null, {
            success: false,
            message: message
        });
    };

    this.processApplication = function (app, next) {
        this.emit("application-received", app);
        callback = next;
    };

    //event path
    this.on("application-received", this.ensureAppValid);
    this.on("validated", this.findNextMission);
    this.on("mission-selected", this.roleIsAvailable);
    this.on("role-available", this.ensureRoleCompatible);
    this.on("role-compatible", this.approveApplication);
};

util.inherits(ReviewProcess, Emitter);

module.exports = ReviewProcess;