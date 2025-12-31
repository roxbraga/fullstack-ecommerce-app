//[SECTION] Dependencies and Modules
const express = require("express");
const courseController = require("../controllers/course");
const auth = require("../auth");
const Course = require("../models/Course");

// Deconstruct the "auth" module so that we can simply store "verify" and "verifyAdmin" in their variables and reuse it in our routes.
const { verify, verifyAdmin } = auth;

//[SECTION] Routing Component
const router = express.Router();

//[SECTION] Route for creating a course
router.post("/", verify, verifyAdmin, courseController.addCourse);

//[SECTION] Route for retrieving all courses
router.get("/all", verify, verifyAdmin, courseController.getAllCourses); 

//[SECTION] Route for retrieving all active courses
router.get("/", courseController.getAllActive);

//[SECTION] Route for retrieving a specific course
// If you want to retrieve data, like getting a course by its ID, you should use the GET method.
// The route "/specific/:id" is for GET requests and has two parts:
// /specific/: A fixed part of the route.
// :id: A placeholder for the unique ID of the resource you want.
// The :id lets you handle requests for different resources by replacing it with their unique IDs
router.get("/specific/:id", courseController.getCourse);

//[SECTION] Route for updating a course (Admin)
router.patch("/:courseId", verify, verifyAdmin, courseController.updateCourse);

//[SECTION] Route to archiving a course (Admin)
router.patch("/:courseId/archive", verify, verifyAdmin, courseController.archiveCourse);

//[SECTION] Route to activating a course (Admin)
router.patch("/:courseId/activate", verify, verifyAdmin, courseController.activateCourse);

//[SECTION] Export Route System
// Allows us to export the "router" object that will be accessed in our "index.js" file


router.post("/search/price-range", async (req, res) => {
    try {
        const { minPrice, maxPrice } = req.body;

        const query = {};

        if (minPrice !== undefined) query.price = { $gte: minPrice };
        if (maxPrice !== undefined) {
            query.price = { ...query.price, $lte: maxPrice };
        }

        const courses = await Course.find(query);

        return res.send({
            message: "Courses retrieved successfully",
            count: courses.length,
            courses
        });

    } catch (error) {
        res.status(500).send({ message: "Server error", error });
    }
});

router.post("/search/price-range", courseController.searchByPriceRange);


module.exports = router;