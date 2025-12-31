const Course = require("../models/Course");
const { errorHandler } = require('../auth');

//[SECTION] Create a course
/*
    Steps: 
    1. Instantiate a new object using the Course model and the request body data
    2. Save the record in the database using the mongoose method "save"
    3. Use the "then" method to send a response back to the client appliction based on the result of the "save" method
*/
module.exports.addCourse = (req, res) => {

    // Creates a variable "newCourse" and instantiates a new "Course" object using the mongoose model
    // Uses the information from the request body to provide all the necessary information
    let newCourse = new Course({
        name : req.body.name,
        description : req.body.description,
        price : req.body.price
    });

    // Check if a course with the same name already exists in the database.
    Course.findOne({ name: req.body.name })
    .then(existingCourse => { 
        if (existingCourse) {

            // If a course with the same name exists, send a 409 (Conflict) status with "true".
            return res.status(409).send({message : 'Course already exists'});

        } else {

            // If no course with the same name exists, save the new course to the database.
            // Saves the created object to our database
            // Return is used here to end the controller function
            /*
                [SECTION] Use Promise.catch()
                - What is a promise? A Promise in JavaScript is like a "guarantee" that something will happen later, this can either be a success or a failure. 
                - Imagine a parcel delivery (Promise) - two things can happen, the parcel is delivered to you or the parcel is lost.
                - Let's discuss .then() and .catch() in handling errors.
            */
            return newCourse.save()
            .then(result => res.status(201).send({
                success: true,
                message: 'Course added successfully',
                result: result
            })).catch(error => errorHandler(error, req, res)) // Use the errorHandler middleware
            // Error handling is done using .catch() to capture any errors that occur during an operation (like saving a course in a database).
            /*
            Use console.error() when:
                - To log errors for debugging or monitoring, especially in production
                - To capture extra details, like stack traces, that help developers fix issues.
                - To keep sensitive error information hidden from users.
            */
            /*
            .catch (err => {
                // will log the full error for debugging purposes
                console.error("Error occured while saving the course:", err)
                // status() - proper HTTP status code
                // send() - error sent to client to avoid exposing raw error details to clients for security and user experience
                res.status(500).send({
                    message: 'An error occurred while saving the course.',
                    errorCode: 'COURSE_SAVE_ERROR' 
                })
            }); // captures the error and takes action by sending it back to the client/Postman with the use of "res.send"
            */
            
        }
    })
    .catch(error => errorHandler(error, req, res));

}

/* ACTIVITY SOLUTION START */
//[SECTION] Retrieve all courses
/*
    Steps: 
    1. Retrieve all courses using the mongoose "find" method
    2. Use the "then" method to send a response back to the client appliction based on the result of the "find" method
*/
module.exports.getAllCourses = (req, res) => {

    return Course.find({})
    .then(result => {

        if(result.length > 0) {

            return res.status(200).send(result);

        } else {

            return res.status(404).send({message : "No courses found"});
        }
    })
    .catch(error => errorHandler(error, req, res));

};

//[SECTION] Retrieve all active courses
/*
    Steps: 
    1. Retrieve all courses using the mongoose "find" method with the "isActive" field values equal to "true"
    2. Use the "then" method to send a response back to the client appliction based on the result of the "find" method
*/
module.exports.getAllActive = (req, res) => {

    Course.find({ isActive: true })
    .then(result => {

        if (result.length > 0) {

            return res.status(200).send(result);

        } else {

            return res.status(404).send(false)
        }
    })
    .catch(error => errorHandler(error, req, res));

};

//[SECTION] Retrieve a specific course
/*
    Steps: 
    1. Retrieve a course using the mongoose "findById" method
    2. Use the "then" method to send a response back to the client appliction based on the result of the "find" method
*/
module.exports.getCourse = (req, res) => {

    // req.params.id is used to access the value of the id route parameter extracted from the URL. (/specific/:id)
    Course.findById(req.params.id)
    .then(course => {
        if(course) {

            return res.status(200).send(course);

        } else {

            return res.status(404).send(false);
        }
    })
    .catch(error => errorHandler(error, req, res));

    
};
/* ACTIVITY SOLUTION END */

module.exports.updateCourse = (req, res)=>{

    let updatedCourse = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price
    }

    // findByIdandUpdate() finds the the document in the db and updates it automatically
    // req.body is used to retrieve data from the request body, commonly through form submission
    // req.params is used to retrieve data from the request parameters or the url
    // req.params.courseId - the id used as the reference to find the document in the db retrieved from the url
    // updatedCourse - the updates to be made in the document
    return Course.findByIdAndUpdate(req.params.courseId, updatedCourse)
    .then(course => {
        if (course) {

            res.status(200).send(true);

        } else {

            res.status(404).send(false);

        }
    })
    .catch(error => errorHandler(error, req, res));
};

module.exports.archiveCourse = (req, res) => {

    let updateActiveField = {
        isActive: false
    }

    return Course.findByIdAndUpdate(req.params.courseId, updateActiveField)
    .then(course => {
        if (course) {

            /* ACTIVITY SOLUTION START */ 
            if (!course.isActive) {
                return res.status(200).send('Course already archived');
            }
            /* ACTIVITY SOLUTION END */

            res.status(200).send(true);

        } else {

            res.status(400).send(false);

        }
    })
    .catch(error => errorHandler(error, req, res));
};

module.exports.activateCourse = (req, res) => {

    let updateActiveField = {
        isActive: true
    }
    
    return Course.findByIdAndUpdate(req.params.courseId, updateActiveField)
    .then(course => {
        if (course) {

            /* ACTIVITY SOLUTION START */ 
            if (course.isActive) {
                return res.status(200).send('Course already activated');
            }
            /* ACTIVITY SOLUTION END */

            res.status(200).send(true);

        } else {

            res.status(400).send(false);

        }
    })
    .catch(error => errorHandler(error, req, res));
};


module.exports.searchByPriceRange = async (req, res) => {
    try {
        const { minPrice, maxPrice } = req.body;
        const query = {};

        if (minPrice !== undefined) query.price = { $gte: minPrice };
        if (maxPrice !== undefined) {
            query.price = { ...query.price, $lte: maxPrice };
        }

        const courses = await Course.find(query);

        return res.status(200).send({
            message: "Courses retrieved successfully",
            count: courses.length,
            courses
        });

    } catch (error) {
        return res.status(500).send({ message: "Server error", error });
    }
};