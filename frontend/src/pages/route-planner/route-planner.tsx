import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Box, Avatar, Typography, Button, IconButton } from "@mui/material";
import red from "@mui/material/colors/red";

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
        display: "flex",
        flex: 1,
        width: "100%",
        height: "100%",
        mt: 3,
        gap: 3,
      }}
    >
      <Box
        sx={{
          display: { md: "flex", xs: "none", sm: "none" },
          flex: 0.2,
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "60vh",
            bgcolor: "rgb(17,29,39)",
            borderRadius: 5,
            flexDirection: "column",
            mx: 3,
          }}
        >
          <Avatar
            sx={{
              mx: "auto",
              my: 2,
              bgcolor: "white",
              color: "black",
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
              color: "white",
              fontWeight: "700",
              borderRadius: 3,
              mx: "auto",
              bgcolor: red[300],
              ":hover": {
                bgcolor: red.A400,
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
          flex: { md: 0.8, xs: 1, sm: 1 },
          flexDirection: "column",
          px: 3,
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "60vh",
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
            backgroundColor: "rgb(17,27,39)",
            display: "flex",
            margin: "auto",
          }}
        >
          <input
            ref={inputRef}
            type="text"
            style={{
              width: "100%",
              backgroundColor: "transparent",
              padding: "30px",
              border: "none",
              outline: "none",
              color: "white",
              fontSize: "20px",
            }}
          />
          <IconButton onClick={handleSubmit} sx={{ color: "white", mx: 1 }}>
            <IoMdSend />
          </IconButton>
        </div>
      </Box>
    </Box>
  );
}
