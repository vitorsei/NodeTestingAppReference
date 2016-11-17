var moment = require("moment");
var assert = require("assert");
var Mission = require("../models/mission");

var MissionControl = function (args) {
    assert(args.db, "Need a DB instance");
    this.db = args.db;
};

MissionControl.prototype.currentMission = function (next) {
    //the current mission is the one that starts the first
    //of next month
    var nextMission = moment().add(1, "month").startOf("month");
    var formattedMissionDate = nextMission.format("MM-DD-YYYY");
    var self = this;
    //pull from the DB
    this.db.getMissionByLaunchDate({launchDate: formattedMissionDate}, function (err, foundMission) {

        assert.ok(err === null, err);

        if (foundMission) {
            next(null, new Mission(foundMission));
        } else {
            foundMission = new Mission();
            self.db.createNextMission(foundMission, function (err, result) {
                next(err, foundMission);
            });
        }
    });
};

MissionControl.prototype.hasSpaceForRole = function (role, next) {
    this.currentMission(function (err, mission) {
        var hasRoom = mission.needsRole(role);
        next(null, hasRoom);
    });
};

MissionControl.prototype.assignRole = function (application, next) {
    var missionArgs = {
        role: application.role,
        user: {
            first: application.first,
            last: application.last,
            email: application.email
        }
    };
    this.currentMission(function (err, mission) {
        mission.assignRole(missionArgs);
        this.db.update({launchDate: mission.launchDate}, mission, {}, function (err, res) {
            next(null, mission);
        });
    }.bind(this));
};


module.exports = MissionControl;