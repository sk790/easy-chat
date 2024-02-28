import React, { useEffect } from "react";
import useGetFriendRequests from "../../hooks/useGetFriendRequests";

const Notification = () => {
  const { friendRequests } = useGetFriendRequests();

  useEffect(() => {
    console.log(friendRequests);
  }, []);
  return (
    <>
      <div>
        {friendRequests.map((request) => (
          <div key={request._id} className=" my-2 flex flex-row gap-2">
            <button className="bg-green-700 gap-2 p-2">Accept</button>
            <button className="bg-red-500 p-2">Decline</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Notification;
