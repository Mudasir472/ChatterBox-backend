var jwt = require('jsonwebtoken');

const createTokenAndSaveCookie = (userId, res) => {
    try {
        const token = jwt.sign({ userId }, process.env.MY_SECRET, { expiresIn: '5d' });
        // console.log(userId)
        console.log(token)
        res.cookie("jwt", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 5 * 24 * 60 * 60 * 1000
        });

    } catch (error) {
        console.error("Error creating token or saving cookie:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = createTokenAndSaveCookie;