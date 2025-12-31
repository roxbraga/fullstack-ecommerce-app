const express = require('express');
const userController = require('../controllers/user');
//Import the auth module and deconstruct it to get our verify method.
const { verify, isLoggedIn } = require("../auth");
const passport = require('passport');

const router = express.Router();

router.post("/check-email", userController.checkEmailExists);

router.post("/register", userController.registerUser);

router.post("/login", userController.loginUser);
router.put('/reset-password', verify, userController.resetPassword);

router.put("/admin/update-user", verify, userController.adminUpdateUser);


/*
router.post("/details", verify, (req, res)=>{
    // Handler function has access to the request object.
    // Handler function should have access to "req.user" data if the the given token to the route is legitimate. This is possible because of the "next" function in the verify function found inside the "auth.js" file.
    // console.log("result from details route:")
    // console.log(req.user);

    userController.getProfile(req.user.id).then(resultFromController => res.send(resultFromController));
});
*/
// The "getProfile" controller method is passed as middleware, the controller will have access to the "req" and "res" objects.
// This will also make our code look cleaner and easier to read as our routes no longer deal with logic.
// All business logic will now be handled by the controller.
router.get("/details", verify, userController.getProfile);

// [Section] Google Login 
// Route for initiating the Google OAuth consent screen
router.get('/google', 
        passport.authenticate('google', {
            scope: ['email', 'profile'],
            prompt: "select_account"
        })
    );

// Route for callback url for google OAuth authentication
router.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/users/failed', // FIXED
    }),
    function(req, res) {
        res.redirect('/users/success'); // FIXED (must match)
    }
);

// Route for failed google OAuth
router.get('/failed', (req, res) => {
    console.log("User is not authenticated")
    res.send("Failed")
});

// Route for successful google OAuth
router.get('/success', isLoggedIn, (req, res) => { // FIXED spelling
    console.log("You are logged in");
    console.log(req.user);
    res.send(`Welcome ${req.user.displayName}`)
});

// Route for logging out
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if(err) {
             console.log('Error while destroying session', err)
        } else {
             req.logout(() => {
                console.log('You are logout');
                res.redirect('/');
            })
        }
    })
});




module.exports = router;
