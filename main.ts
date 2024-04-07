#!/usr/bin/env node

import inquirer from "inquirer";

const welcome = () => {
    console.log("Welcome to Calculator");
    return new Promise((resolve) => {
        setTimeout(resolve, 2000);
    });
};

welcome();



async function askQuestion() {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'from',
            message: 'Enter the time period to end countdown in seconds:',
        }
    ])
    const countdownDuration = parseInt(answers.from, 10) 
    if (isNaN(countdownDuration)){
        console.log("Please enter a valid number of seconds to end countdown")
        return;
    }
    console.log(`Starting countdown from ${countdownDuration} seconds...`)
    let secondsRemaining = countdownDuration;

    return new Promise(resolve => {
            const countdownInterval = setInterval(() => {
                secondsRemaining--;
                console.log(`${secondsRemaining} seconds remaining`)
            
            if(secondsRemaining <= 0){
                clearInterval(countdownInterval);
                console.log(`Countdown Ended`)
                resolve(true)
            }
        }, 1000)
        })
}

async function repeatedly() {
    do {
        await askQuestion(); // Wait for the countdown to finish before continuing

        var again = await inquirer.prompt({
            type: "input",
            name: "restart",
            message: "Do you want to continue? Press 'y' for yes and 'n' for no:",
        });
    } while (again.restart.toLowerCase() === "y");
}

// Call the function to start the process
repeatedly();

await repeatedly();