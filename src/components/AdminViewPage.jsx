import React, { useState, useEffect } from "react";

const ViewUsers = () => {
  const [users, setUsers] = useState([]);

  // Fetch users from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/viewusers");
        const data = await response.json();
        setUsers(data); // Assuming the backend sends an array of users
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Handle delete user
  const handleDelete = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this user?");
    if (!isConfirmed) {
      return; // Do nothing if the user cancels
    }

    try {
      const response = await fetch(`http://localhost:5000/delete/${id}`, {
        method: "POST",
      });

      if (response.ok) {
        setUsers(users.filter((user) => user.id !== id)); // Remove user from state
        alert("User deleted successfully.");
      } else {
        console.error("Error deleting user");
        alert("Failed to delete user. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("An error occurred while deleting the user.");
    }
  };

  // Handle update user
  const handleUpdate = async (id, updatedUser) => {
    try {
      const response = await fetch(`http://localhost:5000/update/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });

      if (response.ok) {
        const updatedUsers = users.map((user) =>
          user.id === id ? { ...user, ...updatedUser } : user
        );
        setUsers(updatedUsers);
      } else {
        console.error("Error updating user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "1rem" }}>
      <h2>View Users</h2>
      <table border="1" style={{ width: "100%", textAlign: "left" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Email</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstname}</td>
              <td>{user.lastname}</td>
              <td>{user.email}</td>
              <td>{user.age}</td>
              <td>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    const updatedUser = {
                      firstname: formData.get("firstname"),
                      lastname: formData.get("lastname"),
                      email: formData.get("email"),
                      age: formData.get("age"),
                    };
                    handleUpdate(user.id, updatedUser);
                  }}
                  style={{ display: "inline" }}
                >
                  <input
                    type="text"
                    name="firstname"
                    placeholder="Firstname"
                    defaultValue={user.firstname}
                    required
                  />
                  <input
                    type="text"
                    name="lastname"
                    placeholder="Lastname"
                    defaultValue={user.lastname}
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    defaultValue={user.email}
                    required
                  />
                  <input
                    type="number"
                    name="age"
                    placeholder="Age"
                    defaultValue={user.age}
                    required
                  />
                  <button type="submit">Update</button>
                </form>
                <button
                  onClick={() => handleDelete(user.id)}
                  style={{
                    marginLeft: "10px",
                    backgroundColor: "#d9534f",
                    color: "#fff",
                    border: "none",
                    padding: "5px 10px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewUsers;
