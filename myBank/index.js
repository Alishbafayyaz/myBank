"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const chalk_1 = __importDefault(require("chalk"));
// BankAccount class
class BankAccount {
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    withdraw(amount) {
        return __awaiter(this, void 0, void 0, function* () {
            const confirmWithdraw = yield inquirer_1.default.prompt({
                name: "confirm",
                type: "confirm",
                message: `Are you sure you want to withdraw $${amount}?`,
                default: false,
            });
            if (confirmWithdraw.confirm) {
                if (this.balance >= amount) {
                    this.balance -= amount;
                    console.log(chalk_1.default.yellow(`You withdraw $${amount}`));
                    console.log(chalk_1.default.yellow(`Your remaining balance: $${this.balance}\n`));
                }
                else {
                    console.log(chalk_1.default.red(`Transaction Failed. You don't have enough balance.\n`));
                }
            }
            else {
                console.log(chalk_1.default.yellow(`Withdrawal cancelled.\n`));
            }
        });
    }
    deposit(amount) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(chalk_1.default.yellow(`Deposited Amount $${amount}`));
            if (amount >= 100) {
                amount -= 1;
            }
            this.balance += amount;
            console.log(chalk_1.default.yellow(`Bank Charges: $1`));
            console.log(chalk_1.default.yellow(`Your current balance: $${this.balance}\n`));
        });
    }
    checkBalance() {
        console.log(chalk_1.default.yellow(`Your balance: $${this.balance}\n`));
    }
    accountInformation() {
        console.log(`Account Number: ${chalk_1.default.magenta(this.accountNumber)}`);
        console.log(`Balance: ${chalk_1.default.magenta(this.balance)}`);
    }
}
// Customer class
class Customer {
    constructor(firstName, lastName, gender, age, mobileNumber, account) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
    customerInformation() {
        console.log(`Name: ${chalk_1.default.magenta(this.firstName)} ${chalk_1.default.magenta(this.lastName)}`);
        console.log(`Gender: ${chalk_1.default.magenta(this.gender)}`);
        console.log(`Age: ${chalk_1.default.magenta(this.age)}`);
        console.log(`Mobile Number: ${chalk_1.default.magenta(this.mobileNumber)}`);
        this.account.accountInformation();
    }
}
// Creating bank accounts
const accounts = [
    new BankAccount(1001, 50000),
    new BankAccount(1002, 20000),
    new BankAccount(1003, 30000),
];
// Creating customers
const customers = [
    new Customer("shanzay", "kamran", "Female", 20, 923214569877, accounts[0]),
    new Customer("Hamzah", "syed", "Male", 24, 923219876547, accounts[1]),
    new Customer("Momina", "khan", "Female", 22, 9232115963247, accounts[2]),
];
console.log(chalk_1.default.rgb(212, 15, 110)(`\nWelcome to OOP My Bank Details\n`));
function service() {
    return __awaiter(this, void 0, void 0, function* () {
        while (true) {
            let input = yield inquirer_1.default.prompt([
                {
                    name: "accountNumber",
                    type: "number",
                    message: "Enter Your Account Number or press 0 to exit: ",
                },
            ]);
            if (input.accountNumber === 0) {
                console.log(chalk_1.default.rgb(196, 46, 122)(`\n----------Thank you for using our service. Goodbye!----------`));
                break;
            }
            let customer = customers.find((customer) => customer.account.accountNumber === input.accountNumber);
            if (customer) {
                console.log(chalk_1.default.rgb(51, 169, 157)(`\nHello ${customer.firstName} ${customer.lastName}\n`));
                let exit = true;
                while (exit) {
                    let options = yield inquirer_1.default.prompt([
                        {
                            name: "select",
                            type: "list",
                            choices: ["Account Information", "Withdraw", "Deposit", "Check Balance", "Log Out"],
                            message: "What do you want to do? ",
                        },
                    ]);
                    if (options.select === "Account Information") {
                        customer.customerInformation();
                    }
                    else if (options.select === "Withdraw") {
                        let withdraw = yield inquirer_1.default.prompt([
                            {
                                name: "amount",
                                type: "number",
                                message: "Enter the amount you want to withdraw: ",
                            },
                        ]);
                        yield customer.account.withdraw(withdraw.amount);
                    }
                    else if (options.select === "Deposit") {
                        let deposit = yield inquirer_1.default.prompt([
                            {
                                name: "amount",
                                type: "number",
                                message: "Enter the amount you want to deposit: ",
                            },
                        ]);
                        yield customer.account.deposit(deposit.amount);
                    }
                    else if (options.select === "Check Balance") {
                        customer.account.checkBalance();
                    }
                    else if (options.select === "Log Out") {
                        console.log(chalk_1.default.rgb(110, 51, 169)(`\n----------You have been logged out----------\n`));
                        break;
                    }
                }
            }
            else {
                console.log(chalk_1.default.red(`Account not Found.`));
            }
        }
    });
}
service();
