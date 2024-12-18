import { useState } from "react";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import AdminViewPage from "./components/AdminViewPage";
import { AdminContext, AuthContext } from "./context";
import {SignUpContext } from "./context";

// const AuthContext = React.createContext('false');

/* initial data */
const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

/* component */
function Button({ onClick, children }) {
  return (
    <button onClick={onClick} className="button">
      {children}
    </button>
  );
}

/* app */
export default function App() {
  /* initial app state */
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSignUpPage, setShowSignUpPage] = useState(false);
  const [isAdmin, setIsAdmin] = useState(AdminContext);


  function handleShowAddFriend() {
    setShowAddFriend(!showAddFriend);
  }

  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  }

  function handleSelection(friend) {
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
    setShowAddFriend(false);
  }

  function handleSplitBill(value) {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );

    setSelectedFriend(null);
  }

  const handleShowSignUp = () => {
    setShowSignUpPage(true);
  };
  console.log(isAdmin)
  return (
    <div className="app">
      { (!isAuthenticated && !showSignUpPage) && <LogInComponent/> }
      { (!isAuthenticated && showSignUpPage) && <SignUpInComponent/> }
      { isAuthenticated == true && <MainComponent/> }
      { isAdmin === true && <AdminViewPage/>}
    </div>
  )

function LogInComponent () {
  return (
    <div>
      
      <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated}}>
        <AdminContext.Provider value={{ isAdmin, setIsAdmin }}>
          <LoginForm />
          <Button onClick={() => setShowSignUpPage(true)}> Sign Up </Button>
        </AdminContext.Provider>
      </AuthContext.Provider>

    </div>   
  )
}
function SignUpInComponent () {
  return (
    <div>
      
      <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
        <SignUpContext.Provider value={{showSignUpPage, setShowSignUpPage}}>
            <SignUpForm />
        </SignUpContext.Provider>
      </AuthContext.Provider>

    </div>   
  )
}
function MainComponent  () {
  return (
  <div>
    <div className="sidebar">
      <FriendList
        friends={friends}
        onSelection={handleSelection}
        selectedFriend={selectedFriend}
      />

      {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}

      <Button onClick={handleShowAddFriend}>
        {showAddFriend ? "Close" : "Add Friend"}
      </Button>
      </div>

      <div>
        {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitBill}
          key={selectedFriend.id}
        />)}
      </div>

  </div>
  )
}
// Friend List
function FriendList({ friends, onSelection, selectedFriend }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          onSelection={onSelection}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
}

// Friends
function Friend({ friend, onSelection, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend.id;

  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>

      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} {Math.abs(friend.balance)}£
        </p>
      )}

      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you {Math.abs(friend.balance)}£
        </p>
      )}

      {friend.balance === 0 && <p>You and {friend.name} are even </p>}

      <Button onClick={() => onSelection(friend)}>
        {isSelected ? "close" : "Select"}
      </Button>
    </li>
  );
}

// Add Friends Form
function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !image) return;

    const id = crypto.randomUUID();
    const newFriend = {
      name,
      image: `${image}?u=${id}`,
      balance: 0,
      id,
    };

    onAddFriend(newFriend);

    setName("");
    setImage("https://i.pravatar.cc/48");
  };

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label> 👩🏽‍🤝‍🧑🏿 Friend Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>🌆 Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <Button>Add</Button>
    </form>
  );
}

// Form Split Bill
function FormSplitBill({ selectedFriend, onSplitBill }) {
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const paidByFriend = bill ? bill - paidByUser : "";
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!bill || !paidByUser) return;

    onSplitBill(whoIsPaying === "user" ? paidByFriend : -paidByUser);
  };

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {selectedFriend.name}</h2>

      <label>💰 Bill Value</label>
      <input
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
        type="number"
      />

      <label>🧍‍♀️ Your Expenses</label>
      <input
        value={paidByUser}
        onChange={(e) =>
          setPaidByUser(
            Number(e.target.value) > bill ? paidByUser : Number(e.target.value)
          )
        }
        type="number"
      />

      <label>👩🏽‍🤝‍🧑🏿 {selectedFriend.name}'s expense </label>
      <input type="number" disabled value={paidByFriend} />

      <label>🤑 Who is paying the bill</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
      {/* <Button>Split Bill</Button> */}
    </form>
  );
}
}
