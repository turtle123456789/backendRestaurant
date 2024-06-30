import * as adminService from "../services/adminService";

const handleGetAllStaff = async (req, res) => {
    try {
        let data = await adminService.getAllStaff();
        return res.json(data);
    } catch (e) {
        console.log(e);
        return res.status(500).json({
        status: 500,
        message: "Error from server...",
        data: "",
        });
    }
}

module.exports = {
    handleGetAllStaff,
}