const express = require("express");
const app = express();

// app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

// Function to validate email format
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Function to validate password complexity
const validatePassword = (password) => {
  // Password must be at least 8 characters, include a number, an uppercase letter, and a special character
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

// Signup route with validation
app.post("/signup", (req, res) => {
  const { email, password } = req.body;

  // Check for missing fields
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  // Validate email format
  if (!validateEmail(email)) {
    return res.status(400).json({ message: "Invalid email format." });
  }

  // Validate password complexity
  if (!validatePassword(password)) {
    return res.status(400).json({
      message:
        "Password must be at least 8 characters long, include a number, an uppercase letter, and a special character.",
    });
  }

  // Proceed with registration logic (e.g., hashing password, saving user to database)
  res.status(201).json({ message: "User registered successfully." });
});

// Login route with validation
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Check for missing fields
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  // Validate email format
  if (!validateEmail(email)) {
    return res.status(400).json({ message: "Invalid email format." });
  }

  // Proceed with authentication logic (e.g., checking user credentials)
  res.status(200).json({ message: "Login successful." });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
