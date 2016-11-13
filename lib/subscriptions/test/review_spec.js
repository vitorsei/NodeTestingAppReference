var assert = require("assert");
var ReviewProcess = require("../processes/review");
var MembershipApplication = require("../models/membership_application");

describe("The Review Process", function () {

    describe("Receive a valid application", function () {
        var decision;
        var validApp;
        before(function (done) {
            validApp = new MembershipApplication({
                first: "Test",
                last: "User",
                email: "test@test.com",
                age: 30,
                height: 66,
                weight: 180
            });
            var review = new ReviewProcess();
            review.processApplication(validApp, function (err, result) {
                 decision = result;
                 //done();
             });
            done();
        });

        it("returns success", function () {
            assert(decision.success, decision.message);
        });
    });
});