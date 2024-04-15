//
import { useState } from "react";
import { initialFriends } from "./assets/friendsData";

function Button({ children, onClick, typeSubmit }) {
  return (
    <>
      <button className="button" onClick={onClick} type={typeSubmit}>
        {children}
      </button>
    </>
  );
}

export default function App() {
  const [showAddFriend, setShowAddFriend] = useState(false);
  const handelShowAddFriend = () => {
    setShowAddFriend((prev) => !prev);
  };
  return (
    <>
      <div className="app">
        <div className="sidebar">
          <FriendList />
          {showAddFriend && <FormAddFriend />}
          <Button onClick={handelShowAddFriend}>
            {showAddFriend ? "Close" : "Add Friend"}
          </Button>
        </div>
        <FormSplitBill />
      </div>
    </>
  );
}

function FriendList() {
  return (
    <>
      <ul>
        {initialFriends?.map((item) => (
          <Friend key={item.id} item={item} />
        ))}
      </ul>
    </>
  );
}

function Friend({ item }) {
  return (
    <>
      <li className="border">
        <img src={item.image} alt="" className="" />
        <h3 className="font-semibold"> {item.name} </h3>
        {/* --------------------------------- Start Conditions On Balance ------------------------- */}
        {item.balance < 0 && (
          <p className="red">
            You Owe {item.name} {Math.abs(item.balance)}$
          </p>
        )}
        {item.balance > 0 && (
          <p className="green">
            You Owe {item.name} {Math.abs(item.balance)}$
          </p>
        )}
        {item.balance === 0 && <p>You And {item.name} Are Even</p>}
        {/* --------------------------------- End Conditions On Balance ------------------------- */}
        <Button>Select</Button>
      </li>
    </>
  );
}

function FormAddFriend() {
  const [friendName, setFriendName] = useState("");
  const [friendImage, setFriendImage] = useState("https://i.pravatar.cc/48");
  const id = crypto.randomUUID();
  const handelAddFriend = (e) => {
    e.preventDefault();
    const newFriend = {
      id,
      friendName,
      friendImage: `${friendImage}?=${id}`,
      balance: 0,
    };
    console.log(newFriend);
  };
  return (
    <>
      <form className="form-add-friend border" onSubmit={handelAddFriend}>
        <label htmlFor=""> 👭 Friend name </label>
        <input
          type="text"
          value={friendName}
          onChange={(e) => setFriendName(e.target.value)}
        />

        <label htmlFor=""> 🖼 Image URL </label>
        <input
          type="text"
          value={friendImage}
          onChange={(e) => setFriendImage(e.target.value)}
        />

        <Button typeSubmit="submit">Add</Button>
      </form>
    </>
  );
}

function FormSplitBill() {
  return (
    <>
      <form className="form-split-bill">
        <h2> Split a Bill with XXX </h2>

        <label htmlFor=""> 💰 Bill Value </label>
        <input type="text" />

        <label htmlFor=""> 🧍‍♂️ Your Expense </label>
        <input type="text" />

        <label htmlFor=""> 👭 XXX Expense </label>
        <input type="text" disabled />

        <label htmlFor=""> 🤑 Who Is Paying The Bill ? </label>
        <select>
          <option value="user"> You </option>
          <option value="xx"> XX </option>
        </select>

        <Button>Spilt Bill</Button>
      </form>
    </>
  );
}
