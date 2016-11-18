var Billing = require("./processes/billing");
var billing = new Billing({stripeKey : "sk_test_5bKypFIHUiy0ALKb2t96nYka"});

billing.createSubscription({
    email : "test3@test.com",
    name : "Vitor Seiji",
    plan : "commander",
    card : {
        number : "4111111111111111",
        exp_month : 10,
        exp_year : 2019,
        name : "Vitor Seiji"
    }
}, function(err,res){
    console.log(err);
    console.log(res);
});