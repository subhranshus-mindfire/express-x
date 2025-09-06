# 🔐 express-x

A plug-and-play **security middleware package** for Node.js + Express REST APIs.  
Protect your app with **JWT authentication, Helmet, CSRF protection, Rate Limiting, Secure Cookies, File Uploads, Logging, and more** — all configurable via CLI or JSON.

---

## ✨ Features

- 🛡 **Helmet** → Secure HTTP headers  
- 🔑 **JWT Authentication** → Easy token-based auth  
- 🔒 **Secure Sessions & Cookies** → `httpOnly`, `secure`, signed cookies  
- 📉 **Rate Limiting** → Prevent brute-force attacks  
- 🧹 **Input Validation & Sanitization** → Prevent injections  
- 🧾 **Logging** → Centralized request & error logging with Winston/Morgan  
- ⚔️ **CSRF Protection** → Mitigate cross-site request forgery  
- 🗂 **File Upload Security** → Size/type validation & upload safety  
- 🌍 **CORS Management** → Fine-grained cross-origin configuration  
- 🛠 **Custom Error Handling** → Hide stack traces in production  
- ⚡ **CLI Tool** → Quickly set up a `.secure-config.json` for your app  

---

## 🚀 Installation

```bash
npm install express-x
```

Or with yarn:

```bash
yarn add express-x
```

---

## ⚡ Quick Usage

```js
const express = require("express");
const secure = require("express-x");

const app = express();

// Apply selected security features
secure(app);

app.get("/", (req, res) => res.send("Hello Secure API 🚀"));

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
```

---

## 🛠 CLI Setup

Run the initializer to configure security features interactively:

```bash
npx express-x init
```

The CLI will ask questions like:

```
Enable Helmet? (y/n)
Enable JWT Authentication? (y/n)
Enable Rate Limiting? (y/n)
Enable CSRF Protection? (y/n)
Enable Secure Cookies? (y/n)
Enable File Uploads? (y/n)
```

A `.secure-config.json` file will be generated in your project root:

```json
{
  "helmet": true,
  "jwt": true,
  "rateLimit": true,
  "csrf": false,
  "cookies": true,
  "uploads": true,
  "cors": ["https://example.com"]
}
```

---

## 🔑 JWT Example

```js
const { generateToken, verifyToken } = require("express-x/jwt");

// Generate token
const token = generateToken({ userId: 123 });

// Verify token
const payload = verifyToken(token);
console.log(payload); // { userId: 123 }
```

---

## 📉 Rate Limiting Example

```js
const { rateLimiter } = require("express-x/middlewares");

app.use(rateLimiter); // defaults: 100 requests per 15 min
```

---

## 📦 Environment Variables

Set these in your `.env`:

```env
PORT=3000
JWT_SECRET=supersecretkey
SESSION_SECRET=anothersecret
NODE_ENV=production
```

---

## 🧪 Scripts

```bash
# Run linter
npm run lint

# Run tests
npm run test
```

---

## 📜 License

MIT © [Subhranshu Sahoo](https://github.com/subhranshus-mindfire)

---

## 🤝 Contributing

Pull requests are welcome!  
For major changes, please open an issue first to discuss what you’d like to change.  

---

## ⭐ Support

If you find this project useful, consider giving it a **star on GitHub** 🌟  