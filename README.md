# express-secure-x

A plug-and-play security middleware package for Node.js + Express REST APIs. Protect your app with JWT authentication, Helmet, CSRF protection, Rate Limiting, Secure Cookies, File Uploads, Logging, and more — all configurable via CLI or JSON.

---

## Features

- Helmet → Secure HTTP headers  
- JWT Authentication → Easy token-based auth  
- Secure Sessions & Cookies → `httpOnly`, `secure`, signed cookies  
- Rate Limiting → Prevent brute-force attacks  
- Input Validation & Sanitization → Prevent injections  
- Logging → Centralized request & error logging with Winston/Morgan  
- CSRF Protection → Mitigate cross-site request forgery  
- File Upload Security → Size/type validation & upload safety  
- CORS Management → Fine-grained cross-origin configuration  
- Custom Error Handling → Hide stack traces in production  
- CLI Tool → Quickly set up a `.secure-config.json` for your app  

---

## Installation

```bash
npm install express-secure-x
```

Or with yarn:

```bash
yarn add express-secure-x
```

---

## Quick Usage

```js
const express = require("express");
const secure = require("express-secure-x");

const app = express();

// Apply security features (auto-configured from JSON if present)
secure(app);

app.get("/", (req, res) => res.send("Hello Secure API"));

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
```

---

## Configuration

You can configure `express-secure-x` either via a CLI or a JSON file (`express-secure-x.json`) in your project root.

### CLI Setup

Run the initializer:

```bash
npx express-secure-x init
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

This generates an `express-secure-x.json`:

```json
{
  "helmet": true,
  "jwt": true,
  "rateLimit": true,
  "csrf": false,
  "session": true,
  "inputValidation": true,
  "logger": true,
  "cors": ["http://localhost:3000"]
}
```

### Default Settings (can be overridden)

- **Helmet:** `true`  
- **JWT:** `true`  
- **Rate Limiting:** `windowMs: 900000, max: 100`  
- **CSRF:** `true`  
- **Session:** `secure: NODE_ENV==='production', httpOnly: true`  
- **Input Validation:** `true`  
- **Logger:** `true`  
- **CORS:** `['http://localhost:3000']`

You can pass a custom config object when calling `secure(app, userConfig)` to override defaults or JSON settings.

---

## JWT Example

```js
const { generateToken, verifyToken } = require("express-secure-x/jwt");

// Generate token
const token = generateToken({ userId: 123 });

// Verify token
const payload = verifyToken(token);
console.log(payload); // { userId: 123 }
```

---

## Rate Limiting Example

```js
const { rateLimiter } = require("express-secure-x/middlewares");

app.use(rateLimiter); // defaults: 100 requests per 15 min
```

---

## Environment Variables

Set these in your `.env`:

```env
PORT=3000
JWT_SECRET=supersecretkey
SESSION_SECRET=anothersecret
CORS_ORIGINS=http://localhost:3000
NODE_ENV=production
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100
LOG_LEVEL=info
JWT_EXPIRES_IN=1h
```

---

## Scripts

```bash
# Run linter
npm run lint

# Run tests
npm run test
```

---

## License

MIT © [Subhranshu Sahoo](https://github.com/subhranshus-mindfire)

---

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you’d like to change.

---

## Support

If you find this project useful, consider giving it a star on GitHub.
