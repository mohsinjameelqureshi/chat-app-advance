import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore.js";
import UsersLoadingSkelton from "./UsersLoadingSkelton.jsx";
import NoChatsFound from "./NoChatsFound.jsx";

function ContactList() {
  const { getAllContacts, allcontacts, isUsersLoading, setSelectedUser } =
    useChatStore();

  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);

  if (isUsersLoading) return <UsersLoadingSkelton />;
  if (allcontacts.length === 0) return <NoChatsFound />;

  return (
    <>
      {allcontacts.map((contact) => (
        <div
          key={contact._id}
          className="bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors"
          onClick={() => setSelectedUser(contact)}
        >
          <div className="flex items-center gap-3">
            {/* TODO: fix this online status and make it work with socket */}
            <div className="avatar avatar-online">
              <div className="size-12 rounded-full overflow-hidden">
                <img
                  src={contact.profilePic || "/avatar.png"}
                  alt={contact.fullname}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            <h4 className="text-slate-200 font-medium truncate">
              {contact.fullname}
            </h4>
          </div>
        </div>
      ))}
    </>
  );
}

export default ContactList;
