import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore.js";
import UsersLoadingSkelton from "./UsersLoadingSkelton.jsx";
import NoChatsFound from "./NoChatsFound.jsx";

function ChatList() {
  const { getMyChatPartners, chats, isUsersLoading, setSelectedUser } =
    useChatStore();

  useEffect(() => {
    getMyChatPartners();
  }, [getMyChatPartners]);

  if (isUsersLoading) return <UsersLoadingSkelton />;
  if (chats.length === 0) return <NoChatsFound />;

  return (
    <>
      {chats.map((chat) => (
        <div
          key={chat._id}
          className="bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors"
          onClick={() => setSelectedUser(chat)}
        >
          <div className="flex items-center gap-3">
            {/* TODO: fix this online status and make it work with socket */}
            <div className="avatar avatar-online">
              <div className="size-12 rounded-full overflow-hidden">
                <img
                  src={chat.profilePic || "/avatar.png"}
                  alt={chat.fullname}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            <h4 className="text-slate-200 font-medium truncate">
              {chat.fullname}
            </h4>
          </div>
        </div>
      ))}
    </>
  );
}

export default ChatList;
