import { useState } from "react";
import "./App.css";
import axios from "axios";

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";

function App() {
  const [emailContent, setEmailContent] = useState("");
  const [tone, setTone] = useState("");
  const [generatedReply, setGeneratedReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:8080/api/email/generate",
        {
          emailContent,
          tone,
        }
      );

      setGeneratedReply(
        typeof response.data === "string"
          ? response.data
          : JSON.stringify(response.data, null, 2)
      );
    } catch (err) {
      setError("Failed to generate email reply. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedReply);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #e0f2fe 0%, #f8fafc 50%, #dbeafe 100%)",
        py: 6,
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={8}
          sx={{
            p: 4,
            borderRadius: 5,
            backdropFilter: "blur(10px)",
          }}
        >
          {/* Header */}
          <Box textAlign="center" mb={4}>
            <Typography
              variant="h3"
              fontWeight={700}
              gutterBottom
            >
              ✉️ Email Reply Generator
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
            >
              Generate professional AI-powered email replies instantly
            </Typography>
          </Box>

          {/* Character Counter */}
          <Box
            display="flex"
            justifyContent="space-between"
            mb={1}
          >
            <Typography variant="body2" color="text.secondary">
              Original Email
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {emailContent.length} characters
            </Typography>
          </Box>

          {/* Email Content */}
          <TextField
            fullWidth
            multiline
            rows={8}
            variant="outlined"
            label="Paste Email Content"
            value={emailContent}
            onChange={(e) => setEmailContent(e.target.value)}
            sx={{
              mb: 3,
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
              },
            }}
          />

          {/* Tone Selector */}
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Select Tone </InputLabel>

            <Select
              value={tone}
              label="Select Tone"
              onChange={(e) => setTone(e.target.value)}
              sx={{
                borderRadius: 3,
              }}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="professional">Professional</MenuItem>
              <MenuItem value="casual">Casual</MenuItem>
              <MenuItem value="friendly">Friendly</MenuItem>
              <MenuItem value="humorous">Humorous</MenuItem>
              <MenuItem value="empathetic">Empathetic</MenuItem>
              <MenuItem value="assertive">Assertive</MenuItem>
              <MenuItem value="persuasive">Persuasive</MenuItem>
              <MenuItem value="optimistic">Optimistic</MenuItem>
              <MenuItem value="pessimistic">Pessimistic</MenuItem>
              <MenuItem value="formal">Formal</MenuItem>
              <MenuItem value="informal">Informal</MenuItem>
              <MenuItem value="romantic">Romantic</MenuItem>
              <MenuItem value="sarcastic">Sarcastic</MenuItem>
              <MenuItem value="sympathetic">Sympathetic</MenuItem>
              <MenuItem value="encouraging">Encouraging</MenuItem>
              <MenuItem value="critical">Critical</MenuItem>
              <MenuItem value="respectful">Respectful</MenuItem>
              <MenuItem value="enthusiastic">Enthusiastic</MenuItem>
              <MenuItem value="neutral">Neutral</MenuItem>
              <MenuItem value="urgent">Urgent</MenuItem>
              <MenuItem value="informative">Informative</MenuItem>
              <MenuItem value="thoughtful">Thoughtful</MenuItem>
              <MenuItem value="happy">Happy</MenuItem>
              <MenuItem value="sad">Sad</MenuItem>
              <MenuItem value="angry">Angry</MenuItem>
              <MenuItem value="confident">Confident</MenuItem>
              <MenuItem value="curious">Curious</MenuItem>
            </Select>
          </FormControl>

          {/* Generate Button */}
          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={handleSubmit}
            disabled={!emailContent || loading}
            sx={{
              py: 1.5,
              borderRadius: 3,
              fontSize: "1rem",
              fontWeight: 600,
              textTransform: "none",
            }}
          >
            {loading ? (
              <CircularProgress
                size={24}
                color="inherit"
              />
            ) : (
              "🚀 Generate Reply"
            )}
          </Button>

          {/* Generated Reply */}
          {generatedReply && (
            <Paper
              elevation={2}
              sx={{
                mt: 4,
                p: 3,
                borderRadius: 4,
                bgcolor: "grey.50",
              }}
            >
              <Typography
                variant="h6"
                fontWeight={600}
                gutterBottom
              >
                ✨ Generated Reply
              </Typography>

              <TextField
                fullWidth
                multiline
                rows={8}
                value={generatedReply}
                InputProps={{
                  readOnly: true,
                }}
                sx={{
                  mb: 2,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                  },
                }}
              />

              <Button
                variant="outlined"
                onClick={handleCopy}
                sx={{
                  borderRadius: 3,
                  textTransform: "none",
                }}
              >
                {copied ? "✅ Copied!" : "📋 Copy Reply"}
              </Button>
            </Paper>
          )}
        </Paper>

        {/* Error Snackbar */}
        <Snackbar
          open={!!error}
          autoHideDuration={4000}
          onClose={() => setError("")}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
        >
          <Alert
            severity="error"
            variant="filled"
            onClose={() => setError("")}
          >
            {error}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}

export default App;
