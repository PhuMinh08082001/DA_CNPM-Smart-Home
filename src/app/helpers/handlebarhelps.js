const Handlebars = require("handlebars");
//create function handlebars to help compare between 2 string together
var helper_equal = Handlebars.registerHelper("if_eq", function (a, b, opts) {
	console.log("success");
	if (a == b) {
		return opts.fn(this);
	} else {
		return opts.inverse(this);
	}
});
module.exports = {
	helper_equal: helper_equal,
};
