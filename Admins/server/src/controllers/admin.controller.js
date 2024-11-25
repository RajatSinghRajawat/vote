const { z } = require('zod');
const { Admin } = require("../models/admin.model");


const signInSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});

const signIn = async (req, res) => {
    const result = signInSchema.safeParse(req.body);

    if (!result.success) {
        const errors = result.error.format();
        return res.status(400).json({ message: "false", errors });
    }

    try {
        
        const { email, password } = result.data;
        
        const response = await Admin.findOne({ email, password });

        
        if (!response) {
            return res.status(404).json({ status: "false", error: "Admin not found" });
        }

        return res.status(200).json({ status: "true", message: "Login Successfull" });
    } catch (error) {
        return res.status(500).json({ status: "false", error: message });
    }
};










module.exports = {
    signIn
};
