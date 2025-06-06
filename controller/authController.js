const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { pool } = require("../config/db");  // Updated import path
const db = pool


exports.signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        await pool.query(
            "INSERT INTO users (full_name, email, password_hash) VALUES (?, ?, ?)",
            [name, email, hashedPassword]
        );

        return res.status(201).json({ msg: "User registered successfully" });

    } catch (error) {
        // ✅ Check for duplicate email error
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ msg: "Email already exists" });
        }

        console.error("Signup error:", error);
        return res.status(500).json({ msg: "Server error" });
    }
};


exports.login = async (req, res) => {
    const { email, password } = req.body;
    console.log("Login request received:", email);

    try {
        const [results] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);

        if (results.length === 0) {
            return res.status(404).json({ msg: "User not found" });
        }

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (!isMatch) {
            return res.status(401).json({ msg: "Invalid credentials" });
        }

        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.json({ token });

    } catch (err) {
        console.error("Login error:", err);
        return res.status(500).json({ msg: "Server error" });
    }
};

exports.simple = (req, res) => {
    return res.status(200).send("working")
}
    