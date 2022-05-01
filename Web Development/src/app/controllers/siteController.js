class SiteController {
    requireLogin(req, res, next) {
        console.log(req.isAuthenticated());
        if (!req.isAuthenticated()) {
            return res.redirect("/users/login");
        }
        next();
    }

    getHomePage(req, res, next) {
        res.render("homepage/home");
    }

    requireLoginAPI(req, res, next) {
        console.log(req.isAuthenticated());
        if (!req.isAuthenticated()) {
            return res.send({ loggedIn: false });
        }
        next();
    }
}

module.exports = new SiteController();