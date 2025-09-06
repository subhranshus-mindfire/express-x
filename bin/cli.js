#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
const chalk = require("chalk");

const configPath = path.join(process.cwd(), "express-x.json");

(async () => {
  console.log(chalk.green.bold("Express-X Secure Configurator\n"));

  const answers = await inquirer.prompt([
    { type: "confirm", name: "helmet", message: "Enable Helmet (security headers)?", default: true },
    { type: "confirm", name: "rateLimit", message: "Enable Rate Limiting?", default: true },
    { type: "confirm", name: "csrf", message: "Enable CSRF Protection?", default: true },
    { type: "confirm", name: "cors", message: "Enable CORS?", default: true },
    { type: "confirm", name: "jwt", message: "Enable JWT Authentication?", default: true },
    { type: "confirm", name: "inputValidation", message: "Enable Input Validation?", default: true },
    { type: "confirm", name: "logger", message: "Enable Logging (Winston + Morgan)?", default: true },
    { type: "confirm", name: "session", message: "Enable Secure Session Cookies?", default: false },

  ]);

  fs.writeFileSync(configPath, JSON.stringify(answers, null, 2));
  console.log(chalk.blue("\n Config saved at express-x.json"));
})();
