var stripe = require("stripe")("sk_test_5bKypFIHUiy0ALKb2t96nYka");

stripe.customers.create({
    description: "Test User",
    email: "test@test.com",
    card : {
        name: "Test User",
        number: "4111111111111111",
        exp_month: "10",
        exp_year: "2019"
    },
    plan: "commander"
}, function (err, customer) {
    console.log(err);
    console.log(customer);
});