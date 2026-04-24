import { db } from '../../database/db.js';
import { eq, or, and } from 'drizzle-orm';
import { usersTable } from '../../database/schema.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function registerUser(req, res){
    try {
        const {name, email,username, password} = req.body;

        if(!name || !email || !username || !password){
            return res.status(400).json({message: "Please fill in all fields!!"});
        }
        const trimmedName = name.trim();
        const trimmedEmail = email.trim();
        const trimmedUsername = username.trim();

        const existingUser = await db.select().from(usersTable).where(or(eq(usersTable.email, trimmedEmail), eq(usersTable.username, trimmedUsername)));
        if(existingUser && existingUser.length > 0) {
            return res.status(400).json({message:"user already exists proceed to login"});
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await db.insert(usersTable).values({name: trimmedName, email: trimmedEmail, username: trimmedUsername, password: hashedPassword}).returning();
        res.status(201).json({newUser});
    } catch (error) {
        console.error("Register Error:", error);
        res.status(500).json({message: error.message || "Internal server error during registration"});
    }
}

export async function loginUser(req, res){
    try {
        const {username, password} = req.body;

        if(!username || !password){
            return res.status(400).json({message: "Please fill in all fields!!"});
        }

        const userRecords = await db.select().from(usersTable).where(eq(usersTable.username, username));
        if (!userRecords || userRecords.length === 0) {
            return res.status(401).json({message: "Invalid credentials"});
        }

        const user = userRecords[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({message: "Invalid credentials"});
        }

        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET || 'fallback_secret_key',
            { expiresIn: '1h' }
        );

        res.status(200).json({ token, user: { name: user.name, username: user.username, email: user.email } });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({message: error.message || "Internal server error during login"});
    }
}

export async function getUser(req, res) {
    try {
        const userId = req.user.id;
        const userRecords = await db.select().from(usersTable).where(eq(usersTable.id, userId));
        
        if (!userRecords || userRecords.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        
        const user = userRecords[0];
        res.status(200).json({ 
            user: { 
                id: user.id, 
                name: user.name, 
                username: user.username, 
                email: user.email 
            } 
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}
