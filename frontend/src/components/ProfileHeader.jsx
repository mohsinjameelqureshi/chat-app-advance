import React, { useRef, useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import { useChatStore } from "../store/useChatStore.js";
import {
  LogOutIcon,
  VolumeOffIcon,
  Volume2Icon,
  LoaderIcon,
} from "lucide-react";

const mouseClickSound = new Audio("/sounds/mouse-click.mp3");

function ProfileHeader() {
  const { logout, authUser, updateProfile, isUploadingImage } = useAuthStore();
  const { isSoundEnabled, toggleSound } = useChatStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Show preview instantly
    const previewURL = URL.createObjectURL(file);
    setSelectedImg(previewURL);

    const formData = new FormData();
    formData.append("profilePic", file);

    try {
      await updateProfile(formData);
    } catch (error) {
      console.log("Upload failed:", error);
    }
  };

  return (
    <div className="p-6 border-b border-slate-700/50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar avatar-online">
            <button
              className="size-14 rounded-full overflow-hidden relative group cursor-pointer"
              onClick={() => fileInputRef.current.click()}
            >
              {isUploadingImage ? (
                <LoaderIcon className="w-full h-5 animate-spin text-center" />
              ) : (
                <img
                  src={selectedImg || authUser.profilePic || "/avatar.png"}
                  alt=""
                  className="size-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-black/50  opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <span className="text-white text-xs">Change</span>
              </div>
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
          {/* Username & Online text */}
          <div>
            <h3 className="text-slate-200 font-medium text-base max-w-[180px] truncate">
              {authUser.fullname}
            </h3>
            <p className="text-slate-400">Online</p>
          </div>
        </div>
        {/* Buttons */}
        <div className="flex gap-4 items-center">
          {/* Logout Btn */}
          <button
            className="text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
            onClick={logout}
          >
            <LogOutIcon />
          </button>
          {/* Sound toggle btn */}
          <button
            className="text-slate-400 hover:text-slate-200 transition-colors"
            onClick={() => {
              // play click sound before toggling
              mouseClickSound.currentTime = 0; // reset to start
              mouseClickSound
                .play()
                .catch((error) => console.log("Audio play fialed:", error));
              toggleSound();
            }}
          >
            {isSoundEnabled ? (
              <Volume2Icon className="size-5" />
            ) : (
              <VolumeOffIcon className="size-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
