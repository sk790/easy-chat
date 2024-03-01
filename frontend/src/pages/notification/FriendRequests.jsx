import React, { useContext, useEffect } from "react";
import useGetFriendRequests from "../../hooks/useGetFriendRequests";
import useAcceptReq from "../../hooks/useAcceptReq";
import { AuthContext } from "../../context/AuthContext";

const FriendRequests = () => {
  const { friendRequests } = useGetFriendRequests();
  const { acceptReq, loading } = useContext(AuthContext);

  const accept = (id) => {
    acceptReq(id);
  };
  const decline = () => {};

  useEffect(() => {}, [loading, acceptReq, friendRequests]);
  return (
    <>
      {friendRequests.map((request) => {
        return (
          <div
            key={request._id}
            className="flex flex-col min-h-full w-1/3 max-h-screen mx-auto"
          >
            <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
              <h1 className="text-2xl font-semibold text-center text-gray-300">
                <div className="flex gap-4">
                  <div>Name</div>
                  <div>Username</div>
                </div>
                <div className="flex gap-8 border-t-2">
                  <div>{request.participants.senderId.fullName}</div>
                  <div>{request.participants.senderId.username}</div>
                </div>
                <div className=" my-2 flex flex-row gap-2 absolute right-0 top-0">
                  <button
                    onClick={() => accept(request._id)}
                    className="bg-green-700 gap-2 p-2"
                  >
                    {loading ? (
                      <span className="loading loading-spinner"></span>
                    ) : (
                      "Accept"
                    )}
                  </button>
                  <button onClick={decline} className="bg-red-500 p-2">
                    Decline
                  </button>
                </div>
              </h1>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default FriendRequests;
