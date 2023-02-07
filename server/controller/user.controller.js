const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.register = (req, res) => {
    console.log("In register");

    const newUser = new User(req.body);
    newUser.save()
        .then(() => {
            console.log("Successful user registration");
            res.json({
                message: "Successfully registered user",
                user: newUser
            })
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        })
}

module.exports.login = (req, res) => {
    console.log("In login");
    
    let expires = new Date(Date.now() + 86400000); // 1 day
        if (rememberMe) {
        expires = new Date(Date.now() + 2592000 * 1000); // 30 days
        }

    User.findOne({ email: req.body.email })
        .then((user) => {
            if (user === null) {
                console.log("User not found");
                res.status(400).json({ message: "Email address and/or password is incorrect" });
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then((isPasswordValid) => {
                        if (isPasswordValid) {
                            console.log("Password is valid");
                            res.cookie("usertoken",
                                jwt.sign({
                                    _id: user._id,
                                    email: user.email
                                }, process.env.JWT_SECRET),
                                {
                                    httpOnly: true,
                                    expires: expires
                                })
                                .cookie("user", JSON.stringify({
                                    _id: user._id,
                                    email: user.email,
                                    firstName: user.firstName,
                                    lastName: user.lastName
                                }),
                                {
                                    expires: new Date(Date.now() + 86400000)
                                })
                                .json({
                                    message: "Successfully logged in",
                                    userLoggedIn: {
                                        firstName: user.firstName,
                                        lastName: user.lastName,
                                        position: user.position
                                    }
                                })
                                
                        } else {
                            console.log("Invalid password");
                            res.status(400).json({ message: "Email address and/or password is incorrect" });
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        res.status(400).json({ message: "Login failed - please try again" });
                    })
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({ message: "Login failed - please try again" });
        })
}

module.exports.logout = (req, res) => {
    console.log("In logout");

    res.clearCookie("usertoken");
    res.json({ message: "You have successfully logged out" });
}

module.exports.getLoggedInUser = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
        console.log(res.json(user))
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "Not authorized" });
    }
    };