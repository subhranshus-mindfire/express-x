#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
const chalk = require("chalk");

const configPath = path.join(process.cwd(), "express-secure-x.json");

// Full default configuration
const defaultConfig = {
  helmet: true,
  rateLimit: { windowMs: 15 * 60 * 1000, max: 100 },
  csrf: true,
  cors: { origin: "*" },
  jwt: { secret: process.env.JWT_SECRET || "default_secret", expiresIn: "1h" },
  inputValidation: true,
  logger: true,
  session: { 
    secret: process.env.SESSION_SECRET || "default_session_secret",
    cookie: { secure: false, httpOnly: true }
  },
  uploads: { maxSize: 1_000_000, allowedTypes: ["jpg", "jpeg", "png", "gif"] }
};

(async () => {
  try {
    console.log(chalk.green.bold("\nexpress-secure-x Secure Configurator\n"));

    // Ask user only yes/no for enabling each feature
    const answers = await inquirer.prompt(
      Object.keys(defaultConfig).map((key) => ({
        type: "confirm",
        name: key,
        message: `Enable ${key.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}?`,
        default: true
      }))
    );

    // Merge the yes/no answers with full defaults
    const finalConfig = {};
    for (const key of Object.keys(defaultConfig)) {
      finalConfig[key] = answers[key] ? defaultConfig[key] : false;
    }

    // If config exists, confirm overwrite
    if (fs.existsSync(configPath)) {
      const { overwrite } = await inquirer.prompt([
        { type: "confirm", name: "overwrite", message: "express-secure-x.json already exists. Overwrite?", default: false }
      ]);
      if (!overwrite) {
        console.log(chalk.yellow("Aborted. Config not overwritten."));
        process.exit(0);
      }
    }

    // Write full config JSON
    fs.writeFileSync(configPath, JSON.stringify(finalConfig, null, 2));
    console.log(chalk.blue(`\nConfig saved successfully at ${configPath}\n`));
  } catch (err) {
    console.error(chalk.red("\nError creating config:"), err);
    process.exit(1);
  }
})();
