import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from 'fs';
import parseQuizToJson from './json_parser.js';
import dotenv from 'dotenv'
dotenv.config();

// error checking
const apiKey = process.env.GOOGLE_AI_KEY;
if (!apiKey) {
    throw new Error("API key is missing. run file in the backend folder and do node utility_functions/Gemini_API.js");
}


const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_KEY);
console.log("model successfully created.");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const testContent = `A mobile device or handheld computer is a computer small enough to hold and operate in hand. Mobile devices are typically battery-powered and possess a flat-panel display and one or more built-in input devices, such as a touchscreen or keypad. Modern mobile devices often emphasize wireless networking, to both the Internet and to other devices in their vicinity, such as headsets or in-car entertainment systems, via Wi-Fi, Bluetooth, cellular networks, or near-field communication.[1]

Characteristics
Device mobility can be viewed in the context of several qualities:[2]

Physical dimensions and weight
Whether the device is mobile or some kind of host to which it is attached is mobile
What kind of host devices it can be bound with
How devices communicate with a host
When mobility occurs
Strictly speaking, many so-called mobile devices are not mobile. It is the host that is mobile, i.e., a mobile human host carries a non-mobile smartphone device. An example of a true mobile computing device, where the device itself is mobile, is a robot. Another example is an autonomous vehicle.

There are three basic ways mobile devices can be physically bound to mobile hosts:

Accompanied,
Surface-mounted, or
Embedded into the fabric of a host, e.g., an embedded controller in a host device.
Accompanied refers to an object being loosely bound and accompanying a mobile host, e.g., a smartphone can be carried in a bag or pocket but can easily be misplaced.[2] Hence, mobile hosts with embedded devices such as an autonomous vehicle can appear larger than pocket-sized.

The most common size of a mobile computing device is pocket-sized, but other sizes for mobile devices exist. Mark Weiser, known as the father of ubiquitous computing,[3] referred to device sizes that are tab-sized, pad, and board sized,[4] where tabs are defined as accompanied or wearable centimeter-sized devices, e.g. smartphones, phablets and tablets are defined as hand-held decimeter-sized devices. If one changes the form of the mobile devices in terms of being non-planar, one can also have skin devices and tiny dust-sized devices.[2]

Dust refers to miniaturized devices without direct HCI interfaces, e.g., micro-electromechanical systems (MEMS), ranging from nanometers through micrometers to millimeters. See also Smart dust. Skin: fabrics based upon light emitting and conductive polymers and organic computer devices. These can be formed into more flexible non-planar display surfaces and products such as clothes and curtains, see OLED display. Also, see smart device.

`;
// generateQuiz(testContent);



// generate a streaming summary of the content
async function generateStreamingSummary(content) {
    try {
        const instructions = `Generate a detailed, structured, and concise summary of the content below: `;
        const result = await model.generateContentStream(instructions + content);
        
        for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            console.log(chunkText);
            // You can also implement custom handling of each chunk here
        }
        
        return result.text;  // Changed from result.response.text()
    } catch (err) {
        console.error('Error processing streaming summary:', err);
    }
}


async function generateSummary(content){
    try {
        const instructions = `Generate a detailed, structured, and concicse summary of the content below: `;
        const resultText = await promptModel(instructions + content);
        console.log(resultText);
        return resultText;
    } catch (err) {
        console.error('Error processing summary:', err);
    }
}

async function generateQuiz(content) {
    try {
        // const data = fs.readFileSync('./prompt.txt', 'utf8');
        const instructions = `generate a quiz of five questions, following this format:
For example, the quizzes are:
Which planet is known as the Red Planet? A) Venus B) Jupiter C) Mars D) Saturn--- C
What is the chemical symbol for water? A) H2 B) O2 C) H2O D) CO2--- C
Who wrote the play "Romeo and Juliet"? A) William Shakespeare B) Charles Dickens C) Mark Twain D) Jane Austen--- A

Your answer should be in the format:
# Which planet is known as the Red Planet? # A) Venus B) Jupiter C) Saturn D) Mars --- B
# What is the chemical symbol for water? # A) H2 B) O2 C) H2O D) CO2 --- B
Etc. please do not omit the # sign. 

Please use the content below to generate a quiz:
`;
        const resultText = await promptModel(instructions + content);
        const jsonOutput =  parseQuizToJson(resultText);
        console.log(jsonOutput);
        return jsonOutput;
    } catch (err) {
        console.error('Error processing quiz:', err);
    }
}


// general helper function for prompting the model
async function promptModel(prompt){
    try {
        const result = await model.generateContent(prompt);
        const resultText = result.response.text();
        return resultText;
    } catch (err) {
        console.error('Error reading file:', err);
    }
}


