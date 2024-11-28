const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcrypt");

// Connect to SQLite database
const db = new sqlite3.Database("./users.db", (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to the database.");
  }
});

// Function to add a new user to the database
const insertUser = async (email, password) => {
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // SQL query to insert a new user
    const query = `INSERT INTO users (email, password) VALUES (?, ?)`;

    // Execute the query with parameterized input
    db.run(query, [email, hashedPassword], function (err) {
      if (err) {
        console.error("Error inserting user:", err.message);
      } else {
        console.log(`New user added with ID: ${this.lastID}`);
      }
    });
  } catch (error) {
    console.error("Error during user insertion:", error.message);
  }
};

// Example usage
insertUser("newuser@example.com", "SecurePassword123!");
