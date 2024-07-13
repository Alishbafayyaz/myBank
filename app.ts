import inquirer from "inquirer";
console.log("Guess a Number between 1 to 10");

let a:number=Math.floor(Math.random()*10)
while(true){
    let input =await inquirer.prompt(
    {name : "guess" , type: "number" , message: "Enter your guess number between 1 to 10:"})
    let ans:number=input.guess
    if (a==ans)
        {console.log("Congratulation! Your Guess number absolutely Correct")
    break;}
    else{console.log("Sorry you guess wrong number try again")}
        }