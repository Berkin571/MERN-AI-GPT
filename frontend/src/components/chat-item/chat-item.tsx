import { Box, Avatar, Typography } from "@mui/material";
import { useAuth } from "../../context/auth.context";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

function extractCodeFromString(message: string) {
  if (message.includes("```")) {
    const blocks = message.split("```");
    return blocks;
  }
}

function isCodeBlock(str: string) {
  if (
    str.includes("=") ||
    str.includes(";") ||
    str.includes("[") ||
    str.includes("]") ||
    str.includes("{") ||
    str.includes("}") ||
    str.includes("#") ||
    str.includes("//")
  ) {
    return true;
  }
  return false;
}

export const ChatItem = ({
  content,
  role,
}: {
  content: string;
  role: "user" | "assistant";
}) => {
  const messageBlocks = extractCodeFromString(content);
  const auth = useAuth();
  const userInitials = auth?.user
    ? `${auth.user.name[0]}${auth.user.name.split(" ")[1]?.[0] || ""}`
    : "";

  return role === "assistant" ? (
    <Box
      sx={{
        display: "flex",
        p: 2,
        bgcolor: "var(--primary-background)",
        gap: 2,
        my: 0.5,
        borderRadius: 2,
      }}
    >
      <Avatar sx={{ ml: "0" }}>AI</Avatar>
      <Box>
        {!messageBlocks ? (
          <Typography sx={{ fontSize: "20px", color: "var(--text-color)" }}>
            {content}
          </Typography>
        ) : (
          messageBlocks.map((block, index) =>
            isCodeBlock(block) ? (
              <SyntaxHighlighter
                key={index}
                style={coldarkDark}
                language="javascript"
              >
                {block}
              </SyntaxHighlighter>
            ) : (
              <Typography
                key={index}
                sx={{ fontSize: "20px", color: "var(--text-color)" }}
              >
                {block}
              </Typography>
            )
          )
        )}
      </Box>
    </Box>
  ) : (
    <Box
      sx={{
        display: "flex",
        p: 2,
        bgcolor: "var(--secondary-background)",
        gap: 2,
        my: 0.5,
        borderRadius: 2,
      }}
    >
      <Avatar
        sx={{
          ml: "0",
          bgcolor: "var(--primary-color)",
          color: "var(--light-text-color)",
        }}
      >
        {userInitials}
      </Avatar>
      <Box>
        {!messageBlocks ? (
          <Typography sx={{ fontSize: "20px", color: "var(--text-color)" }}>
            {content}
          </Typography>
        ) : (
          messageBlocks.map((block, index) =>
            isCodeBlock(block) ? (
              <SyntaxHighlighter
                key={index}
                style={coldarkDark}
                language="javascript"
              >
                {block}
              </SyntaxHighlighter>
            ) : (
              <Typography
                key={index}
                sx={{ fontSize: "20px", color: "var(--text-color)" }}
              >
                {block}
              </Typography>
            )
          )
        )}
      </Box>
    </Box>
  );
};
