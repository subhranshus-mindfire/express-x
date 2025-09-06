#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
const chalk = require("chalk");

const configPath = path.join(process.cwd(), "express-secure-x.json");

(async () => {
  try {
    console.log(chalk.green.bold("\nexpress-secure-x Secure Configurator\n"));

    const answers = await inquirer.prompt([
      { type: "confirm", name: "helmet", message: "Enable Helmet (security headers)?", default: true },
      { type: "confirm", name: "rateLimit", message: "Enable Rate Limiting?", default: true },
      { type: "confirm", name: "csrf", message: "Enable CSRF Protection?", default: true },
      { type: "confirm", name: "cors", message: "Enable CORS?", default: true },
      { type: "confirm", name: "jwt", message: "Enable JWT Authentication?", default: true },
      { type: "confirm", name: "inputValidation", message: "Enable Input Validation?", default: true },
      { type: "confirm", name: "logger", message: "Enable Logging (Winston + Morgan)?", default: true },
      { type: "confirm", name: "session", message: "Enable Secure Session Cookies?", default: false },
      { type: "confirm", name: "uploads", message: "Enable Secure File Uploads?", default: true }
    ]);

    if (fs.existsSync(configPath)) {
      const { overwrite } = await inquirer.prompt([
        { type: "confirm", name: "overwrite", message: "express-secure-x.json already exists. Overwrite?", default: false }
      ]);

      if (!overwrite) {
        console.log(chalk.yellow("Aborted. Config not overwritten."));
        process.exit(0);
      }
    }

    fs.writeFileSync(configPath, JSON.stringify(answers, null, 2));
    console.log(chalk.blue(`\nConfig saved successfully at ${configPath}\n`));
  } catch (err) {
    console.error(chalk.red("\nError creating config:"), err);
    process.exit(1);
  }
})();
