import appForm from '../model.js';

export const getUsers = async(req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    try {
        const startIndex = (page - 1) * limit;
        const totalUsers = await appForm.countDocuments({ isDelete: false });
        const users = await appForm.find({ isDelete: false }).skip(startIndex).limit(limit);
        console.log(users)
        return res.status(200).json({
            status: true,
            message: "Users fetched successfully",
            data: {
                pages: Math.ceil(totalUsers/limit),
                currentPage: page,
                users: users
            }
        })
    } catch (err) {
        return res.status(500).json({
            status: false,
            data: null,
            message: "Internal server error"
        })
    }
}