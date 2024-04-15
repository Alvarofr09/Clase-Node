const { verifyToken } = require("../utils/verifyToken");

const addOrder = async (req, res) => {
	const payload = await verifyToken(req);

	if (!payload) return res.sendStatus(401);
};

module.exports = { addOrder };
