
class CourseController {

    // [GET] /courses
    async getCourses(req, res) {
        try {
            res.json({ message: "Get all courses" });
        } catch {
            res.status(500).json({ message: "Internal server error" });
        }
    }


}

module.exports = new CourseController;