var assert = require("assert");
var MembershipApplication = require("../models/membership_application");

describe("Membership application requirements", function () {
    var validApp;

    before(function () {
        //arrange the data here
        validApp = new MembershipApplication({
            first: "Test",
            last: "User",
            email: "test@test.com",
            age: 30,
            height: 66,
            weight: 180
        });
    });

    describe("Application valid if...", function () {
        it("all validators successful", function () {
            assert(validApp.isValid(), "Not valid");
        });
        it('email is 4 characters or less', function () {
            assert(validApp.emailIsValid());
        });
        it('height is between 60 and 75 inches', function () {
            assert(validApp.heightIsValid());
        });

        it('age is between 15 and 100', function () {
            assert(validApp.ageIsValid());
        });
        it('weight is between 100 and 300', function () {
            assert(validApp.weightIsValid());
        });
        it('first and last name are provided', function () {
            assert(validApp.nameIsValid());
        });

    });
});