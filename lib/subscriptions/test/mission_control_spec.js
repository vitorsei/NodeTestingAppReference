var moment = require("moment");
var MissionControl = require("../models/mission_control");
var Mission = require("../models/mission");
var assert = require("assert");
var DB = require("../db");
var sinon = require("sinon");

describe("Mission Planning", function () {
    var missionControl;
    var db;
    before(function () {
        db = new DB();
        //sinon.stub(db, "find").yields(null, {id: 1});
        sinon.stub(db, "getMissionByLaunchDate").yields(null, null);
        sinon.stub(db, "createNextMission").yields(null, new Mission());
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