import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Box, Avatar, Typography, Button, IconButton } from "@mui/material";

import { IoMdSend } from "react-icons/io";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import { useAuth } from "../../context/auth.context";
import {
  deleteUserChats,
  getUserChats,
  sendChatRequest,
} from "../../helpers/api-communication";
import { ChatItem } from "../../components/chat-item/chat-item";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export function RoutePlanner() {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const auth = useAuth();

  const [chatMessages, setChatMessages] = useState<Message[]>([]);

  const handleSubmit = async () => {
    const content = inputRef.current?.value as string;
    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }
    const newMessage: Message = { role: "user", content };
    setChatMessages((prev) => [...prev, newMessage]);
    try {
      const chatData = await sendChatRequest(content);
      setChatMessages((prev) => [...prev, ...chatData.chats]);
    } catch (error) {
      console.error("Error sending chat request:", error);
      toast.error("Nachricht konnte nicht übermittelt werden");
    }
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

  useLayoutEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      toast.loading("Lade Chats...", { id: "loadchats" });
      getUserChats()
        .then((data) => {
          setChatMessages([...data.chats]);
          toast.success("Die Chats wurden erfolgreich geladen", {
            id: "loadchats",
          });
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

  if (!auth?.user) {
    return <p>No Auth</p>;
  }

  return (
    <Box
      sx={{
        width: "100%",
        height: "1450px",
        borderRadius: 3,
        mx: "auto",
        marginTop: "1rem",
        display: "flex",
        flexDirection: "row",
        overflow: "scroll",
        overflowX: "hidden",
        overflowY: "auto",
        scrollBehavior: "smooth",
      }}
    >
      <Box
        sx={{
          display: { md: "flex", xs: "none", sm: "none" },
          flex: 0.25,
          flexDirection: "column",
          px: "1.5rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            height: "60vh",
            bgcolor: "var(--secondary-background)",
            borderRadius: 5,
            flexDirection: "column",
          }}
        >
          <Avatar
            sx={{
              mx: "auto",
              my: 2,
              bgcolor: "var(--primary-color)",
              color: "var(--light-text-color)",
              border: "1px solid #ddd",
              fontWeight: 700,
            }}
          >
            {auth.user.name[0]}
            {auth.user.name.split(" ")[1]?.[0] || ""}
          </Avatar>
          <Typography
            sx={{
              mx: "auto",
              my: 0,
              p: 3,
              textAlign: "center",
              color: "var(--text-color)",
            }}
          >
            Sie sprechen mit einem speziellen Routenplanungs-ChatBOT
          </Typography>
          <Typography
            sx={{
              mx: "auto",
              my: 0,
              p: 3,
              textAlign: "center",
              color: "var(--text-color)",
            }}
          >
            Sie können alle Informationen die zu einer effizienten Erstellung
            einer optimierten Route bereitstellen.
          </Typography>
          <Button
            onClick={handleDeleteChats}
            sx={{
              width: "200px",
              my: "auto",
              color: "var(--light-text-color)",
              fontWeight: "700",
              borderRadius: 3,
              mx: "auto",
              bgcolor: "var(--primary-color)",
              ":hover": {
                bgcolor: "var(--secondary-color)",
              },
            }}
          >
            Konversation leeren
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          height: "585px",
          flex: { md: 0.8, xs: 1, sm: 1 },
          flexDirection: "column",
          px: "1.75rem",
          overflow: "scroll",
          overflowX: "hidden",
          overflowY: "auto",
          scrollBehavior: "smooth",
        }}
      >
        <Box
          sx={{
            width: "100%",
            borderRadius: 3,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            overflow: "scroll",
            overflowX: "hidden",
            overflowY: "auto",
            scrollBehavior: "smooth",
          }}
        >
          {chatMessages.map((chat, index) => (
            <ChatItem content={chat.content} role={chat.role} key={index} />
          ))}
        </Box>
        <div
          style={{
            width: "100%",
            borderRadius: 8,
            backgroundColor: "var(--secondary-background)",
            border: "1px solid var(--border-color)",
            display: "flex",
            margin: "auto",
          }}
        >
          <input
            ref={inputRef}
            type="text"
            style={{
              width: "100%",
              marginTop: "auto",
              backgroundColor: "transparent",
              padding: "30px",
              border: "none",
              outline: "none",
              color: "var(--primary-color)",
              fontSize: "20px",
            }}
          />
          <IconButton
            onClick={handleSubmit}
            sx={{ color: "var(--primary-color)", mx: 1 }}
          >
            <IoMdSend color="var(--primary-color)" />
          </IconButton>
        </div>
      </Box>
    </Box>
  );
}
