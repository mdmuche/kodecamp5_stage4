// Import Node.js built-in readline module to handle user input
import readline from "readline";

// Arithmetic operation functions

/**
 * Adds two numbers
 * @param a - First number
 * @param b - Second number
 * @returns The sum of a and b
 */
function add(a: number, b: number): number {
  return a + b;
}

/**
 * Subtracts second number from the first
 * @param a - First number
 * @param b - Second number
 * @returns The subtraction of a and b
 */
function subtract(a: number, b: number): number {
  return a - b;
}

/**
 * Multiplies two numbers
 * @param a - First number
 * @param b - Second number
 * @returns The multiplication of a and b
 */
function multiply(a: number, b: number): number {
  return a * b;
}

/**
 * Divides two numbers
 * @param a - First number
 * @param b - Second number
 * @returns The division of a and b
 */
function divide(a: number, b: number): number {
  if (b === 0) {
    throw new Error("Cannot divide by zero");
  }
  return a / b;
}

/**
 * Create the readline interface to interact with the user via the terminal
 */
const r1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/**
 * Enums and interfaces
 */
enum OperationsChoice {
  ADD = 1,
  SUBTRACT,
  MULTIPLY,
  DIVIDE,
  EXIT,
}

/**
 * Displays welcome message when the program starts
 */
function showWelcome(): void {
  console.log("Welcome to Node.js calculator");
}

/**
 *Shows the main menu of available operations
 */
function showMenu(): void {
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
function getNumber(prompt: string): Promise<number> {
  return new Promise((resolve) => {
    r1.question(prompt, (input: string) => {
      const number = parseFloat(input); // Convert input to number
      if (isNaN(number) || !isFinite(number)) {
        // If not a number, show error and retry
        console.log("Invalid number. Please try again.");
        resolve(getNumber(prompt)); // retry
      } else {
        resolve(number); // Valid number
      }
    });
  });
}

/**
 * Asks the user to choose an operation (1–5) and validates the choice
 * @returns {Promise<number>} a valid choice between 1 and 5
 */
function getChoice(): Promise<OperationsChoice> {
  return new Promise((resolve) => {
    r1.question("Enter choice (1 - 5): ", (input: string) => {
      const choice = parseInt(input) as OperationsChoice; // Convert input to integer
      if (choice >= OperationsChoice.ADD && choice <= OperationsChoice.EXIT) {
        resolve(choice); // Valid choice
      } else {
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
function handleCalculationError(error: Error): void {
  console.log(`Calculation error: ${error.message}`);
}

function exitGraceFully(): void {
  console.log("Thanks for using the calculator. Goodbye!");
  r1.close();
  process.exit(0);
}

/**
 * Main program loop
 */
async function main(): Promise<void> {
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
      let result: number;

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
    } catch (error: any) {
      // Handle any unexpected errors (e.g., division by zero)
      handleCalculationError(error as Error);
    }
  }
}

// Start the calculator
main();
