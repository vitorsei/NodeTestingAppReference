var assert = require("assert");
var ReviewProcess = require("../processes/review");
var Helpers = require('./helpers');
var sinon = require("sinon");
var Billing = require("../processes/billing");
var _ = require('underscore')._;

describe("The Review Process", function () {
    var db = Helpers.stubDb();
    var billing = new Billing({stripeKey: "xxx"});
    var mock = sinon.mock(billing);

    before(function () {
        //var billingStub = sinon.stub(billing, "createSubscription");
        // billingStub.withArgs(Helpers.goodStripeArgs)
        //     .yields(null, Helpers.goodStripeResponse);
        //
        // billingStub.withArgs(Helpers.badStripeArgs)
        //     .yields("Card was declined", null);

        mock.expects("createSubscription").once().withArgs(Helpers.goodStripeArgs)
            .yields(null, Helpers.goodStripeResponse);

        mock.expects("createSubscription").once().withArgs(Helpers.badStripeArgs)
            .yields("Card was declined", null);
    });
    after(function () {
        mock.verify();
    });

    describe("Receive a valid application", function () {
        var decision;
        var validApp = Helpers.validApplication;
        var review;
        before(function (done) {
            sinon.stub(db, "saveAssignment").yields(null, {saved: true});

            review = new ReviewProcess({
                application: validApp,
                db: db,
                billing: billing
            });

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

        it('returns an assignment', function () {
            assert(decision.assignment);
        });

        it('returns a subscription', function () {
            assert(decision.subscription);
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

    describe("Valid application, failed billing", function () {
        var decision;
        var review;
        var badBillingApp = _.clone(Helpers.validApplication);
        badBillingApp.card = 2;

        before(function (done) {
            review = new ReviewProcess({
                application: badBillingApp,
                db: db,
                billing: billing
            });
            review.processApplication(function (err, result) {
                decision = result;
                done();
            });
        });

        it('returns false for success', function () {
            assert(!decision.success);
        });
    });
});