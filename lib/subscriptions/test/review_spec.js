var assert = require("assert");
var ReviewProcess = require("../processes/review");
var MembershipApplication = require("../models/membership_application");
var Helpers = require('./helpers');
var sinon = require("sinon");
var DB = require("../db");

describe("The Review Process", function () {
    describe("Receive a valid application", function () {
        var decision;
        var validApp = Helpers.validApplication;
        var review;
        before(function (done) {
            var db = new DB();
            sinon.stub(db, "getMissionByLaunchDate").yields(null, null);
            sinon.stub(db, "createNextMission").yields(null, null);
            review = new ReviewProcess({application: validApp, db: db});
            sinon.spy(review, "ensureAppValid");
            sinon.spy(review, "findNextMission");
            sinon.spy(review, "roleIsAvailable");
            sinon.spy(review, "ensureRoleCompatible");
            review.processApplication(function (err, result) {
                decision = result;
                done();
            });
        });

        it("returns success", function () {
            assert(decision.success, decision.message);
        });

        it("ensures the application is valid", function () {
            assert(review.ensureAppValid.called);
        });

        it("selects a mission", function () {
            assert(review.findNextMission.called);
        });

        it("ensures a role exists", function () {
            assert(review.roleIsAvailable.called);
        });

        it("ensures role compatibility", function () {
            assert(review.ensureRoleCompatible.called);
        });
    });
});