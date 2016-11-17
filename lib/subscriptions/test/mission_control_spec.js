var moment = require("moment");
var MissionControl = require("../models/mission_control");
var Mission = require("../models/mission");
var assert = require("assert");
var Helpers = require("./helpers");
var DB = require("../db");
var sinon = require("sinon");

describe("Mission Planning", function () {
    var missionControl;
    var db;
    before(function () {
        db = Helpers.stubDb();
        missionControl = new MissionControl({db: db});
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