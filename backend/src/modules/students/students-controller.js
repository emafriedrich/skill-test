const asyncHandler = require("express-async-handler");
const { getAllStudents, addNewStudent, getStudentDetail, setStudentStatus, updateStudent } = require("./students-service");

const handleGetAllStudents = asyncHandler(async (req, res) => {
    const queryParams = req.query;
    const params = { ...req.query, className: queryParams.class };
    const result = await getAllStudents(params);
    res.json({ students: result });
});

const handleAddStudent = asyncHandler(async (req, res) => {
    const result = await addNewStudent(req.body);
    res.json(result);
});

const handleUpdateStudent = asyncHandler(async (req, res) => {
    const result = await updateStudent(req.params.id, req.body);
    res.json(result);
});

const handleGetStudentDetail = asyncHandler(async (req, res) => {
    const result = await getStudentDetail(req.params.id);
    res.json(result);
});

const handleStudentStatus = asyncHandler(async (req, res) => {
    const result = await setStudentStatus({
        userId: req.params.id,
        reviewerId: req.user.id,
        isActive: req.body.is_active,
    });
    res.json(result);
});

module.exports = {
    handleGetAllStudents,
    handleGetStudentDetail,
    handleAddStudent,
    handleStudentStatus,
    handleUpdateStudent,
};
