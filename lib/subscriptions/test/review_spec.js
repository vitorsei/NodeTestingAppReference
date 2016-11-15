var assert = require("assert");
var ReviewProcess = require("../processes/review");
var MembershipApplication = require("../models/membership_application");
var sinon = require("sinon");

describe("The Review Process", function () {
    describe("Receive a valid application", function () {
        var decision;
        before(function (done) {
            var validApp = new MembershipApplication({
                first: "Test",
                last: "User",
                email: "test@test.com",
                age: 30,
                height: 66,
                weight: 180
            });
            var review = new ReviewProcess();
            var spy = sinon.spy(validApp, "emailIsValid");
            review.processApplication(validApp, function (err, result) {
                 decision = result;
                 done();
             });
        });

        it("returns success", function () {
            assert(decision.success, decision.message);
        });

        it("validates email", function () {
            assert(validApp.emailValid.called);
        });
    });
});