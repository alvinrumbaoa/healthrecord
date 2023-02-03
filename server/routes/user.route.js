const UserController = require("../controller/user.controller");

module.exports = function(app) {
    app.post("/api/users/register", UserController.register);
    app.post("/api/users/login", UserController.login);
    app.post("/api/users/logout", UserController.logout);
    app.get("/api/users/:id", MovieController.getuser);
}