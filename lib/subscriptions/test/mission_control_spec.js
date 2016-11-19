var MissionControl = require("../models/mission_control");
var Mission = require("../models/mission");
var assert = require("assert");
var DB = require("../db");

describe("Mission Planning", function () {
    var missionControl;
    before(function () {
        missionControl = new MissionControl({db: new DB()});
    });

    describe("The Current Mission", function () {
        var currentMission;
        before(function (done) {
            missionControl.currentMission(function (err, res) {
                currentMission = res;
                done();
            });
        });
        it("is created if none exist", function () {
            assert(currentMission);
        });
    });
});