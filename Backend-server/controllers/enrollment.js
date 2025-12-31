//[SECTION] Dependencies and Modules
const Enrollment = require("../models/Enrollment");

//[SECTION] Enroll a user to a course
/*
    Steps:
    1. Retrieve the user's id
    2. Change the password to an empty string to hide the password
    3. Return the updated user record
*/
module.exports.enroll = (req, res) => {

    // The user's id from the decoded token after verify()
    console.log(req.user.id);
    // The course from our request body
    console.log(req.body.enrolledCourses) ;

    // Process stops here and sends response IF user is an admin
    if(req.user.isAdmin){
        // Admins should not be allowed to enroll to a course, so we need the "verify" to check the req.user.isAdmin
        return res.status(403).send(false);
    }

    let newEnrollment = new Enrollment ({
        // Adds the id of the logged in user from the decoded token
        userId : req.user.id,
        // Gets the courseIds from the request body
        enrolledCourses: req.body.enrolledCourses,
        totalPrice: req.body.totalPrice
    })

    return newEnrollment.save()
    .then(enrolled => {
        return res.status(201).send(true);
    })
    .catch(error => errorHandler(error, req, res));
    
}

//[SECTION] Get enrollments
/*
    Steps:
    1. Use the mongoose method "find" to retrieve all enrollments for the logged in user
    2. If no enrollments are found, return a 404 error. Else return a 200 status and the enrollment record
*/
module.exports.getEnrollments = (req, res) => {
    return Enrollment.find({userId : req.user.id})
        .then(enrollments => {
            if (enrollments.length > 0) {
                return res.status(200).send(enrollments);
            }
            return res.status(404).send(false);
        })
        .catch(error => errorHandler(error, req, res));
};

module.exports.updateEnrollmentStatus = (req, res) => {
    const { userId, courseId, status } = req.body;

    if (!userId || !courseId || !status) {
        return res.status(400).send({
            message: "userId, courseId, and status are required."
        });
    }

    const validStatuses = ["Enrolled", "Completed", "Cancelled"];
    if (!validStatuses.includes(status)) {
        return res.status(400).send({ message: "Invalid status value" });
    }

    Enrollment.findOneAndUpdate(
        { userId, "enrolledCourses.courseId": courseId },
        { status },
        { new: true }
    )
    .then(updatedRecord => {
        if (!updatedRecord) {
            return res.status(404).send({ message: "Enrollment not found" });
        }

        return res.status(200).send({
            message: "Enrollment status updated successfully",
            updatedRecord
        });
    })
    .catch(error => errorHandler(error, req, res));
};