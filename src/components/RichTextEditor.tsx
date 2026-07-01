import { useEffect, useRef } from "react";
import {
  Box,
  Divider,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Stack,
  Tooltip,
} from "@mui/material";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import LinkIcon from "@mui/icons-material/Link";

import { sanitizeHtml } from "../lib/html";

type RichTextEditorProps = {
  value: string;
  onChange: (value: string) => void;
};

const runCommand = (command: string, value?: string) => {
  document.execCommand(command, false, value);
};

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const editor = editorRef.current;
    if (editor && editor.innerHTML !== value) {
      editor.innerHTML = value;
    }
  }, [value]);

  const syncValue = () => {
    onChange(sanitizeHtml(editorRef.current?.innerHTML ?? ""));
  };

  const handleCommand = (command: string, commandValue?: string) => {
    runCommand(command, commandValue);
    editorRef.current?.focus();
    syncValue();
  };

  const handleLink = () => {
    const url = window.prompt("Paste the link URL");

    if (!url?.trim()) return;

    handleCommand("createLink", url.trim());
  };

  return (
    <Paper variant="outlined" sx={{ overflow: "hidden" }}>
      <Stack
        direction="row"
        spacing={0.5}
        alignItems="center"
        sx={{ p: 1, flexWrap: "wrap" }}
      >
        <Select
          size="small"
          value="paragraph"
          onChange={(event) => {
            const value = event.target.value;
            handleCommand(
              "formatBlock",
              value === "paragraph" ? "p" : value
            );
          }}
          sx={{ minWidth: 130 }}
        >
          <MenuItem value="paragraph">Paragraph</MenuItem>
          <MenuItem value="h2">Heading</MenuItem>
          <MenuItem value="h3">Subheading</MenuItem>
        </Select>

        <Divider flexItem orientation="vertical" />

        <Tooltip title="Bold">
          <IconButton
            size="small"
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => handleCommand("bold")}
          >
            <FormatBoldIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Italic">
          <IconButton
            size="small"
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => handleCommand("italic")}
          >
            <FormatItalicIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Bulleted list">
          <IconButton
            size="small"
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => handleCommand("insertUnorderedList")}
          >
            <FormatListBulletedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Numbered list">
          <IconButton
            size="small"
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => handleCommand("insertOrderedList")}
          >
            <FormatListNumberedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Quote">
          <IconButton
            size="small"
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => handleCommand("formatBlock", "blockquote")}
          >
            <FormatQuoteIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Add link">
          <IconButton
            size="small"
            onMouseDown={(event) => event.preventDefault()}
            onClick={handleLink}
          >
            <LinkIcon />
          </IconButton>
        </Tooltip>
      </Stack>

      <Box
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={syncValue}
        sx={{
          minHeight: 180,
          p: 2,
          outline: "none",
          borderTop: "1px solid",
          borderColor: "divider",
          typography: "body1",
          "& h2": { fontSize: "1.35rem", mt: 1, mb: 1 },
          "& h3": { fontSize: "1.1rem", mt: 1, mb: 1 },
          "& blockquote": {
            borderLeft: "4px solid",
            borderColor: "primary.main",
            color: "text.secondary",
            m: 0,
            pl: 2,
          },
          "& a": { color: "primary.main", fontWeight: 700 },
        }}
      />
    </Paper>
  );
}
