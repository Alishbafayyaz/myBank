"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
console.log("Guess a Number between 1 to 10");
let a = Math.floor(Math.random() * 10);
while (true) {
    let input = await inquirer_1.default.prompt({ name: "guess", type: "number", message: "Enter your guess number between 1 to 10:" });
    let ans = input.guess;
    if (a == ans) {
        console.log("Congratulation! Your Guess number absolutely Correct");
        break;
    }
    else {
        console.log("Sorry you guess wrong number try again");
    }
}
