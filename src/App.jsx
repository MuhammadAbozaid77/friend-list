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
  const [friendsList, setfriendsList] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);

  const handelShowAddFriend = () => {
    setShowAddFriend((prev) => !prev);
  };

  const handelUpdatedList = (friend) => {
    setfriendsList((prev) => [...prev, friend]);
  };

  const handelSelectedFriend = (arg) => {
    if (selectedFriend?.id === arg?.id) {
      setSelectedFriend(null);
      setShowAddFriend(false);
    } else {
      setSelectedFriend(arg);
      setShowAddFriend(false);
    }
  };

  const handelSplitBill = (args) => {
    console.log(args);
  };

  return (
    <>
      <div className="app">
        <div className="sidebar">
          <FriendList
            data={friendsList}
            handelSelectedFriend={handelSelectedFriend}
            selectedFriend={selectedFriend}
          />
          {showAddFriend && (
            <FormAddFriend handelUpdatedList={handelUpdatedList} />
          )}
          <Button onClick={handelShowAddFriend}>
            {showAddFriend ? "Close" : "Add Friend"}
          </Button>
        </div>
        {selectedFriend && (
          <FormSplitBill
            selectedFriend={selectedFriend}  
            handelSplitBill={handelSplitBill}
          />
        )}
      </div>
    </>
  );
}

function FriendList({ data, handelSelectedFriend, selectedFriend }) {
  return (
    <>
      <ul>
        {data?.map((item) => (
          <Friend
            key={item.id}
            item={item}
            handelSelectedFriend={handelSelectedFriend}
            selectedFriend={selectedFriend}
          />
        ))}
      </ul>
    </>
  );
}

function Friend({ item, handelSelectedFriend, selectedFriend }) {
  const isSelected = item?.id === selectedFriend?.id;
  return (
    <>
      <li className={`border ${isSelected ? "bg-[#ff922b]/30" : ""}`}>
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
        <Button onClick={() => handelSelectedFriend(item)}>
          {isSelected ? "Close" : "Select"}
        </Button>
      </li>
    </>
  );
}

function FormAddFriend({ handelUpdatedList }) {
  const [friendName, setFriendName] = useState("");
  const [friendImage, setFriendImage] = useState("https://i.pravatar.cc/48");
  const id = crypto.randomUUID();
  const handelAddFriend = (e) => {
    e.preventDefault();
    if (!friendName || !friendImage) return;
    const newFriend = {
      id,
      name: friendName,
      image: `${friendImage}?=${id}`,
      balance: 0,
    };
    handelUpdatedList(newFriend);
    setFriendName("");
    setFriendImage("https://i.pravatar.cc/48");
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

function FormSplitBill({ selectedFriend , handelSplitBill}) {
  const [billValue, setBillValue] = useState("");
  const [yourBillValue, setYourBillValue] = useState("");
  const [whoIsPaying, setWhoIsPaying] = useState("user");
  // console.log(billValue, yourBillValue);
  const friendBill = billValue ? billValue - yourBillValue : "";

  const handelSubmit = (e) => {
    e.preventDefault();
    if (!billValue || !yourBillValue) return;
    handelSplitBill()
    // const newSplitBill = {
    //   billValue,
    //   yourBillValue,
    //   whoIsPaying,
    // };
    // console.log(newSplitBill);
  };

  return (
    <>
      <form className="form-split-bill" onSubmit={handelSubmit}>
        <h2>
          Split a Bill with
          <span className=" text-[#ffa94d] mx-2">{selectedFriend.name}</span>
        </h2>

        <label htmlFor=""> 💰 Bill Value </label>
        <input
          type="text"
          value={billValue}
          onChange={(e) => setBillValue(e.target.value)}
        />

        <label htmlFor=""> 🧍‍♂️ Your Expense </label>
        <input
          type="text"
          value={yourBillValue}
          onChange={(e) =>
            setYourBillValue(
              +e.target.value > +billValue ? billValue : e.target.value
            )
          }
        />

        <label htmlFor=""> 👭 {selectedFriend.name}s Expense </label>
        <input type="text" disabled value={friendBill} />

        <label htmlFor=""> 🤑 Who Is Paying The Bill ? </label>
        <select
          value={whoIsPaying}
          onChange={(e) => setWhoIsPaying(e.target.value)}
        >
          <option value="user"> You </option>
          <option value={selectedFriend.name}> {selectedFriend.name} </option>
        </select>

        <Button>Spilt Bill</Button>
      </form>
    </>
  );
}
