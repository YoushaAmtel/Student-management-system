import inquirer from "inquirer";

// Generate a random student ID
const randomNumber:number = Math.floor(10000 + Math.random() * 90000);

// Initialize student balance
let myBalance:number = 0;

async function main() {
    // Gather student information
    const studentInfo = await inquirer.prompt([
        {
            name: "studentName",
            type: "input",
            message: "Enter student name:",
            validate: function (value) {
                return value.trim() !== "" ? true : "Please enter a non-empty value";
            },
        },
        {
            name: "course",
            type: "list",
            message: "Select the course to enroll",
            choices: ["MS.Office", "HTML", "Typescript", "Python", "CSS"],
        },
    ]);

    // Course fees
    const CoursesFees: {[key:string]: number} = {
        "MS.Office": 3000,
        "HTML": 5000,
        "Typescript": 6000,
        "Python": 6500,
        "CSS": 7000,
    };

    // Display selected course fee and current balance
    const courseFee = CoursesFees[studentInfo.course];
    console.log(`\nCourse Fee: ${courseFee}/-\n`);
    console.log(`Balance: ${myBalance}\n`);

    // Gather payment information
    const paymentType = await inquirer.prompt([
        {
            name: "payment",
            type: "list",
            message: "Select payment method",
            choices: ["Bank Transfer", "Easypaisa", "Jazzcash"],
        },
        {
            name: "amount",
            type: "input",
            message: "Enter payment amount:",
            validate: function(value) {
                return value.trim() !== "" ? true : "Please enter a non-empty value";
            },
        },
    ]);

    // Convert payment amount to number
    const paymentAmount = parseFloat(paymentType.amount);

    // Check if payment amount matches course fee
    if (courseFee === paymentAmount) {
        console.log(`Congratulations! You are enrolled in the ${studentInfo.course} course.\n`);

        // Gather additional option from the student
        const ans = await inquirer.prompt([
            {
                name: "select",
                type: "list",
                message: "What would you like to do?",
                choices: ["View status", "Exit"],
            },
        ]);

        if (ans.select === "View status") {
            console.log("\n************ Status **************");
            console.log(`Student name: ${studentInfo.studentName}`);
            console.log(`Student ID: ${randomNumber}`);
            console.log(`Course: ${studentInfo.course}`);
            console.log(`Tuition fees paid: ${paymentAmount}`);
            console.log(`Balance: ${myBalance += paymentAmount}`);
        } else {
            console.log("\nExiting student management system\n");
        }
    } else {
        console.log("Invalid amount due to course\n");
    }
}

main();
