//[SECTION] Dependencies and Modules
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const Cart = require('../models/cart');
const auth = require("../auth"); 
const { errorHandler } = require('../auth');

//[SECTION] Check if the email already exists
module.exports.checkEmailExists = (req, res) => {
    if (req.body.email.includes("@")) {
        return User.find({ email: req.body.email })
            .then(result => {
                if (result.length > 0) {
                    return res.status(409).send({ message: "Duplicate email found" });
                } else {
                    return res.status(200).send({ message: "No duplicate email found" });
                }
            })
            .catch(error => errorHandler(error, req, res));
    } else {
        res.status(400).send({ message: "Invalid email format" });
    }
};

//[SECTION] User Registration
module.exports.registerUser = (req, res) => {
    // Email format validation
    if (!req.body.email.includes("@")) {
        return res.status(400).send({ message: "Invalid email format" });
    }
    
    // Mobile number validation (11 digits)
    if (req.body.mobileNo.length !== 11) {
        return res.status(400).send({ message: "Invalid mobile number format" });
    }
    
    // Password length validation (at least 8 characters)
    if (req.body.password.length < 8) {
        return res.status(400).send({ message: "Password must be at least 8 characters" });
    }

    let newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        mobileNo: req.body.mobileNo,
        // Hash password with bcrypt (using 10 salt rounds)
        password: bcrypt.hashSync(req.body.password, 10)
    });

    return newUser.save()
        .then(result => res.status(201).send(result))
        .catch(error => errorHandler(error, req, res));
};

//[SECTION] User Authentication (Login)
module.exports.loginUser = (req, res) => {
    if (req.body.email.includes("@")) {
        return User.findOne({ email: req.body.email })
            .then(result => {
                if (result == null) {
                    return res.status(404).send({ message: "User not found" });
                } else {
                    const isPasswordCorrect = bcrypt.compareSync(req.body.password, result.password);
                    if (isPasswordCorrect) {
                        // Generate an access token and send it along with the user's role
                        return res.status(200).send({ 
                            access: auth.createAccessToken(result),
                            role: result.role // Send role to client
                        });
                    } else {
                        return res.status(401).send({ message: "Invalid password" });
                    }
                }
            })
            .catch(error => errorHandler(error, req, res));
    } else {
        return res.status(400).send({ message: "Invalid email format" });
    }
};

//[SECTION] Get User Profile (after authentication)
module.exports.getProfile = (req, res) => {
    return User.findById(req.user.id)
        .then(user => {
            // Ensure password is not included in the response
            user.password = "";
            return res.status(200).send(user);
        })
        .catch(error => errorHandler(error, req, res));
};

//[SECTION] Reset Password
module.exports.resetPassword = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming token payload is { id: "<userId>" }

        const { newPassword } = req.body;
        if (!newPassword) {
            return res.status(400).json({ message: "New password is required" });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user password in the database
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { password: hashedPassword },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ message: "Password reset successfully" });

    } catch (error) {
        console.error("Reset Password Error:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

//[SECTION] Admin Update User
module.exports.adminUpdateUser = (req, res) => {
    const { userId, updates } = req.body;

    if (!userId || !updates) {
        return res.status(400).send({ message: "User ID and updates are required" });
    }

    return User.findByIdAndUpdate(userId, updates, { new: true })
        .then(updatedUser => {
            if (!updatedUser) {
                return res.status(404).send({ message: "User not found" });
            }

            updatedUser.password = ""; // Do not send password in response
            return res.status(200).send({
                message: "User updated successfully",
                updatedUser
            });
        })
        .catch(error => errorHandler(error, req, res));
};
