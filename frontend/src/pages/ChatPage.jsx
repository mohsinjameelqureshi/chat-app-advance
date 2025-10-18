import React from "react";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer.jsx";
import ProfileHeader from "../components/ProfileHeader.jsx";
import ActiveTabSwitch from "../components/ActiveTabSwitch.jsx";
import ChatContainer from "../components/ChatContainer.jsx";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder.jsx";
import { useChatStore } from "../store/useChatStore.js";
import ChatList from "../components/ChatList.jsx";
import ContactList from "../components/ContactList.jsx";

function ChatPage() {
  const { selectedUser, activeTab } = useChatStore();

  return (
    <div className="relative w-full max-w-6xl h-[800px]">
      <BorderAnimatedContainer>
        {/* Left Side */}
        <div className="w-80 bg-slate-800/50 backdrop-blur-sm flex flex-col">
          <ProfileHeader />
          <ActiveTabSwitch />
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {activeTab === "chats" ? <ChatList /> : <ContactList />}
          </div>
        </div>
        {/* Right Side */}
        <div className="flex flex-1 flex-col bg-slate-900/50 backdrop-blur-sm">
          {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
        </div>
      </BorderAnimatedContainer>
    </div>
  );
}

export default ChatPage;
