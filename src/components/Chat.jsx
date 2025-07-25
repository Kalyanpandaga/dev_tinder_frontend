import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { API_BASE_URL } from "../utils/constants";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const messagesEndRef = useRef(null); // For auto-scroll

  const fetchChatMessages = async () => {
    const chat = await axios.get(API_BASE_URL + "/chat/" + targetUserId, {
      withCredentials: true,
    });

    const chatMessages = chat?.data?.chatData.messages.map((msg) => {
      const { senderId, text, createdAt } = msg;
      return {
        firstName: senderId?.firstName,
        lastName: senderId?.lastName,
        text,
        createdAt,
      };
    });
    setMessages(chatMessages);
  };

  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    if (!userId) {
      return;
    }
    const socket = createSocketConnection();
    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", ({ firstName, lastName, text, createdAt }) => {
      setMessages((messages) => [
        ...messages,
        { firstName, lastName, text, createdAt },
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim()) return; // Prevent empty messages
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatDateTime = (dateString) =>
    new Date(dateString).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

  return (
    <div className="flex flex-col w-full sm:w-11/12 md:w-7/8 lg:w-3/4 my-6 mx-auto h-[80vh] bg-base-100 rounded-xl shadow-lg overflow-hidden">
      <div className="p-4 border-b border-gray-700 bg-gradient-to-r from-base-300 to-base-200 sticky top-0 z-10 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-white">Chat</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={
              "flex flex-col max-w-[98%]" +
              (user.firstName === msg.firstName
                ? " self-end items-end"
                : " self-start items-start")
            }
          >
            <span className="text-[10px] sm:text-xs text-gray-400 mb-1">
              {msg.firstName} {msg.lastName} • {formatDateTime(msg.createdAt)}
            </span>

            <div
              className={
                "px-3 py-1.5 rounded-2xl shadow-md text-xs sm:text-sm md:text-base " +
                (user.firstName === msg.firstName
                  ? "bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-br-none"
                  : "bg-gray-700 text-white rounded-bl-none")
              }
            >
              {msg.text}
            </div>

            {/* Footer */}
            <span className="text-[8px] sm:text-[10px] text-gray-500 mt-1">
              Seen
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-3 border-t border-gray-600 bg-base-300 flex gap-2 items-center">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          className="flex-1 input input-bordered bg-base-100 text-white rounded-full px-4 focus:ring-2 focus:ring-secondary"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="btn btn-secondary rounded-full px-6 shadow-md hover:scale-105 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
