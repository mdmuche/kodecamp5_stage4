"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import Node.js built-in readline module to handle user input
const readline_1 = __importDefault(require("readline"));
// Arithmetic operation functions
/**
 * Adds two numbers
 * @param {number} a
 * @param {number} b
 * @returns {number} a number
 */
function add(a, b) {
    return a + b;
}
/**
 * Subtracts second number from the first
 * @param {number} a
 * @param {number} b
 * @returns {number} a number
 */
function subtract(a, b) {
    return a - b;
}
/**
 * Multiplies two numbers
 * @param {number} a
 * @param {number} b
 * @returns {number} a  number
 */
function multiply(a, b) {
    return a * b;
}
/**
 * Divides two numbers
 * @param {number} a
 * @param {number} b
 * @returns {number} a number
 */
function divide(a, b) {
    if (b === 0) {
        throw new Error("Cannot divide by zero");
    }
    return a / b;
}
/**
 * Create the readline interface to interact with the user via the terminal
 */
const r1 = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout,
});
/**
 * Enums and interfaces
 */
var OperationsChoice;
(function (OperationsChoice) {
    OperationsChoice[OperationsChoice["ADD"] = 1] = "ADD";
    OperationsChoice[OperationsChoice["SUBTRACT"] = 2] = "SUBTRACT";
    OperationsChoice[OperationsChoice["MULTIPLY"] = 3] = "MULTIPLY";
    OperationsChoice[OperationsChoice["DIVIDE"] = 4] = "DIVIDE";
    OperationsChoice[OperationsChoice["EXIT"] = 5] = "EXIT";
})(OperationsChoice || (OperationsChoice = {}));
/**
 * Displays welcome message when the program starts
 */
function showWelcome() {
    console.log("Welcome to Node.js calculator");
}
/**
 *Shows the main menu of available operations
 */
function showMenu() {
    console.log(`
        Select operation:
        1. Add
        2. Subtract
        3. Multiply
        4. Divide
        5. Exit
        `);
}
/**
 * Asks the user for a number input and validates it
 * @param {string} prompt
 * @returns {Promise<number>} a valid number
 */
function getNumber(prompt) {
    return new Promise((resolve) => {
        r1.question(prompt, (input) => {
            const number = parseFloat(input); // Convert input to number
            if (isNaN(number) || !isFinite(number)) {
                // If not a number, show error and retry
                console.log("Invalid number. Please try again.");
                resolve(getNumber(prompt)); // retry
            }
            else {
                resolve(number); // Valid number
            }
        });
    });
}
/**
 * Asks the user to choose an operation (1–5) and validates the choice
 * @returns {Promise<number>} a valid choice between 1 and 5
 */
function getChoice() {
    return new Promise((resolve) => {
        r1.question("Enter choice (1 - 5): ", (input) => {
            const choice = parseInt(input); // Convert input to integer
            if (choice >= OperationsChoice.ADD && choice <= OperationsChoice.EXIT) {
                resolve(choice); // Valid choice
            }
            else {
                // Invalid choice, show error and retry
                console.log("Invalid choice. Please enter a number from 1 to 5.");
                resolve(getChoice()); // retry
            }
        });
    });
}
/**
 * Error handling functions
 */
function handleCalculationError(error) {
    console.log(`Calculation error: ${error.message}`);
}
function exitGraceFully() {
    console.log("Thanks for using the calculator. Goodbye!");
    r1.close();
    process.exit(0);
}
/**
 * Main program loop
 */
async function main() {
    showWelcome();
    while (true) {
        showMenu();
        const choice = await getChoice(); // Get user operation choice
        // Exit the program if user selects option 5
        if (choice === OperationsChoice.EXIT) {
            exitGraceFully();
            break;
        }
        // Get the two numbers from user
        const num1 = await getNumber("Enter first number: ");
        const num2 = await getNumber("Enter second number: ");
        try {
            let result;
            // Perform the selected operation
            switch (choice) {
                case OperationsChoice.ADD:
                    result = add(num1, num2);
                    break;
                case OperationsChoice.SUBTRACT:
                    result = subtract(num1, num2);
                    break;
                case OperationsChoice.MULTIPLY:
                    result = multiply(num1, num2);
                    break;
                case OperationsChoice.DIVIDE:
                    result = divide(num1, num2);
                    break;
            }
            // Display the result
            console.log(`Result: ${result}\n`);
        }
        catch (error) {
            // Handle any unexpected errors (e.g., division by zero)
            handleCalculationError(error);
        }
    }
}
// Start the calculator
main();
