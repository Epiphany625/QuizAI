// Quiz generation prompts
const mcqFormat = `
    Following this format:
    For example, the quiz questions are:
    Which planet is known as the Red Planet? A) Venus B) Jupiter C) Mars D) Saturn--- C
    What is the chemical symbol for water? A) H2 B) O2 C) H2O D) CO2--- C
    Who wrote the play "Romeo and Juliet"? A) William Shakespeare B) Charles Dickens C) Mark Twain D) Jane Austen--- A

    Your response should be in the format:
    # Which planet is known as the Red Planet? # A) Venus B) Jupiter C) Saturn D) Mars --- B
    # What is the chemical symbol for water? # A) H2 B) O2 C) H2O D) CO2 --- B
    Etc. please do not omit the # sign. `;

const shortAnswerFormat = `
    Your response should be in the format:
    # [QUESTION]? # [ANSWER]
    # Who wrote the play "Romeo and Juliet"? # William Shakespeare
`;

// Summary generation prompts
const summaryInstructions = `Generate a detailed, structured, and concise summary of the content below: `;

// test content for testing functions, sample content
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
Embedded into the fabric of a host, e.g., an embedded controller in a host device.`;

// Function to get quiz generation prompt
function getQuizPrompt(content, numQuestions, questionType, exampleQuestion=null) {
    return `generate a quiz of ${numQuestions} ${questionType} questions

        ${questionType === "short answer" ? shortAnswerFormat : ""}

        ${questionType === "multiple choice" || questionType === "True/False" ? mcqFormat : ""}

        ${exampleQuestion ? `Here is an example question showcasing the type of style: ${exampleQuestion}` : ""}

        Please use the content below to generate a quiz:
        ${content}
    `;
}

export {
    mcqFormat,
    shortAnswerFormat,
    summaryInstructions,
    getQuizPrompt,
    testContent
};