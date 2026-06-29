import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

app.post("/generate-notes", async (req, res) => {

    try {

        const { topic, instructions } = req.body;

        const prompt = `
Generate detailed study notes on:

Topic: ${topic}

Additional Instructions:
${instructions}

Format:
1. Introduction
2. Important Concepts
3. Key Points
4. Summary
5. Exam Tips

Make the notes easy to understand and suitable for students.
`;

        const response =
        await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt
        });

        res.json({
            notes: response.text
        });

    }
    catch(error){

        console.error(error);

        res.status(500).json({
            notes: "Error generating notes."
        });

    }

});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(
        `Server running on http://localhost:${PORT}`
    );
});