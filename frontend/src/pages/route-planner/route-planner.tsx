import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Box, Avatar, Button, IconButton, Modal } from "@mui/material";
import { IoMdSend } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth.context";
import {
  deleteUserChats,
  getUserChats,
  sendChatRequest,
} from "../../helpers/api-communication";
import { MdInfoOutline } from "react-icons/md";
import { ChatItem } from "../../components/chat-item/chat-item";

import "./route-planner.scss";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export function RoutePlanner() {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const auth = useAuth();

  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSubmit = async () => {
    const content = inputRef.current?.value as string;
    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }
    const newMessage: Message = { role: "user", content };
    setChatMessages((prev) => [...prev, newMessage]);
    try {
      const chatData = await sendChatRequest(content);
      setChatMessages((prev) => [
        ...prev,
        ...chatData.chats.filter(
          (chat: { content: string }) =>
            !prev.some((existingChat) => existingChat.content === chat.content)
        ),
      ]);
    } catch (error) {
      console.error("Error sending chat request:", error);
      toast.error("Nachricht konnte nicht übermittelt werden");
    }
    scrollToBottom();
  };

  const handleDeleteChats = async () => {
    try {
      toast.loading("Lösche Chats...", { id: "deletechats" });
      await deleteUserChats();
      setChatMessages([]);
      toast.success("Chats erfolgreich gelöscht", { id: "deletechats" });
    } catch (error) {
      console.log(error);
      toast.error("Chats konnten nicht gelöscht werden", { id: "deletechats" });
    }
  };

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useLayoutEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      toast.loading("Lade Chats...", { id: "loadchats" });
      getUserChats()
        .then((data) => {
          setChatMessages(data.chats);
          toast.success("Die Chats wurden erfolgreich geladen", {
            id: "loadchats",
          });
          scrollToBottom();
        })
        .catch((err) => {
          console.log(err);
          toast.error(
            "Etwas ist schiefgelaufen, versuchen Sie es zu einem späteren Zeitpunkt",
            { id: "loadchats" }
          );
        });
    }
  }, [auth]);

  useEffect(() => {
    if (!auth?.user) {
      return navigate("/login");
    }
  }, [auth, navigate]);

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  if (!auth?.user) {
    return <p>No Auth</p>;
  }

  const handleOpenSidebar = () => setIsSidebarOpen(true);
  const handleCloseSidebar = () => setIsSidebarOpen(false);

  return (
    <Box className="route-planner">
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button onClick={handleOpenSidebar} className="open-button">
          <MdInfoOutline size={25} /> Chat
        </Button>
      </Box>
      <Modal open={isSidebarOpen} onClose={handleCloseSidebar}>
        <Box className="sidebar-modal">
          <Box className="profile">
            <Avatar className="avatar">
              {auth.user.name[0]}
              {auth.user.name.split(" ")[1]?.[0] || ""}
            </Avatar>
            <p className="profile-text">
              Sie sprechen mit einem speziellen Routenplanungs-ChatBOT
            </p>
            <p className="profile-text">
              Sie können alle Informationen die zu einer effizienten Erstellung
              einer optimierten Route bereitstellen.
            </p>
            <Button
              onClick={handleDeleteChats}
              variant="outlined"
              color="error"
            >
              Konversation leeren
            </Button>
          </Box>
        </Box>
      </Modal>
      <Box className="chat">
        <Box className="messages">
          {chatMessages.map((chat, index) => (
            <ChatItem content={chat.content} role={chat.role} key={index} />
          ))}
          <div ref={chatEndRef} />
        </Box>
        <div className="input-container">
          <input ref={inputRef} type="text" className="input" />
          <IconButton onClick={handleSubmit} className="send-button">
            <IoMdSend />
          </IconButton>
        </div>
      </Box>
    </Box>
  );
}
