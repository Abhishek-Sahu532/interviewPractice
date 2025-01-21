import React from "react";
import { useParams } from "react-router-dom";

const User = () => {
  const { userid } = useParams();
  //   console.log(userid);
  const user = [
    { name: "user 1", age: 21 },
    { name: "user 2", age: 37 },
    { name: "user 3", age: 68 },
  ];
  return (
    <div className="bg-gray-500 px-2 py-3">
      {user &&
        user.map((us, index) => (
          <p key={index}>
            user : {us.name}, age : {us.age}{" "}
          </p>
        ))}
      <p> user: {userid}</p>
    </div>
  );
};
export default User;
