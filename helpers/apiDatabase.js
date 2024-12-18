const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sqlite3 = require("sqlite3").verbose();

const app = express();
app.use(express.json());
app.use(express.urlencoded());


// Bypass CORS
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

// JWT secret key
const SECRET_KEY = "your_secret_key";

// Initialize SQLite database
const db = new sqlite3.Database("./users.db", (err) => {
  if (err) {
    console.error("Error opening database:", err);
  } else {
    db.run(
      `CREATE TABLE IF NOT EXISTS users_new (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE,
        password TEXT,
        role TEXT DEFAULT 'user',
        IsAdminAccount BIT DEFAULT 0,
        firstname TEXT,
        lastname TEXT,
        age INTEGER
      )`,
      (err) => {
        if (err) {
          console.error("Error creating table:", err);
        }
      }
    );
  }
});

// Logic for Signup path
app.post("/signup", async (req, res) => {

  const { email, password, firstname, lastname, age } = req.body;

  if (!email || !password || !firstname || !lastname || !age)  {
    return res.status(400).json({ message: "Email and password are required." });
  }

  // // Validate email format
  // if (!validateEmail(email)) {
  //   return res.status(400).json({ message: "Invalid email format." });
  // }
  
  // // Validate password complexity
  // if (!validatePassword(password)) {
  //   return res.status(400).json({
  //     message:
  //       "Password must be at least 8 characters long, include a number, an uppercase letter, and a special character.",
  //   });
  // }



try{
    // Check if user already exists
    db.get("SELECT * FROM users_new WHERE email = ?", [email], async (err, user) => {
      if (user) {
        return res.status(400).json({ message: "Email already registered." });
      }

      if(age < 18 || age > 60) {
        return res.status(400).json({ message: "Invalid age. Age must be more than 17 and less than 61" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert user into database
      db.run(
        "INSERT INTO users_new (email, password, role, isadminaccount, firstname, lastname, age) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [email, hashedPassword, "user", 0, firstname, lastname, age],
        (err) => {
          if (err) {
            console.error("Error inserting user:", err);
            return res.status(500).json({ message: "Internal server error." });
          }
          res.status(201).json({ message: "User registered successfully." });
        }
      );
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
});

// Logic for Login path
app.post("/login", (req, res) => {
  const { email, password } = req.body;
console.log(email,password)
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  // Check if user exists
  db.get("SELECT * FROM users_new WHERE email = ?", email, async (err, user) => {
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Generate JWT
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
      expiresIn: "1h",
    });


    res.json({ message: "Login successful.", token, isAdmin: user.IsAdminAccount});
  });
});

// Route to display all users
app.get("/viewusers", (req, res) => {
  db.all("SELECT * FROM users_new", [], (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error fetching users.");
    } else {
      res.render("users", { users: rows });
    }
  });
});

// Route to update a user
app.post("/update/:id", (req, res) => {
  const userId = req.params.id;
  const { firstname, lastname, age } = req.body;

  if (!first || !lastname || !age ) {
    return res.status(400).json({ message: "Firstname, lastname, or age can not be empty" });
  }

  if(age < 18 || age > 60) {
    return res.status(400).json({ message: "Invalid age. Age must be more than 17 and less than 61" });
  }

  db.run(
    "UPDATE users SET firstname = ?, lastname = ?, age = ? WHERE id = ?",
    [firstname, lastname, age, userId],
    (err) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error updating user.");
      } else {
        res.redirect("/");
      }
    }
  );
});

// Route to delete a user
app.post("/delete/:id", (req, res) => {
  const userId = req.params.id;
  db.run("DELETE FROM users WHERE id = ?", [userId], (err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error deleting user.");
    } else {
      res.redirect("/");
    }
  });
});

// Protected route
app.get("/protected", (req, res) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).json({ message: "Token required." });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token." });
    }
    res.json({ message: "This is a protected route.", user });
  });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
