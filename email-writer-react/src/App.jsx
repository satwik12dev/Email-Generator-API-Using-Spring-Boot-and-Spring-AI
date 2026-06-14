import { useState } from 'react'
import './App.css'
import { Box, Button, CircularProgress, Container, FormControl, Input, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import axios from 'axios';

function App() {
  const [emailContent, setEmailContent] = useState('');
  const [tone, setTone] = useState('');
  const [generatedReply, setGeneratedReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post("http://localhost:8080/api/email/generate", {
       emailContent,
       tone 
      });
      setGeneratedReply(typeof response.data === 'string' ? response.data : JSON.stringify(response.data));
    } catch (error) {
      setError('Failed to generate eamil reply. Please try again');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{py:4}}>
      <Typography variant='h3' component="h1" gutterBottom>
        Email Reply Generator
      </Typography>

      <Box sx={{ mx: 3 }}>
        <TextField 
          fullWidth
          multiline
          rows={6}
          variant='outlined'
          label="Original Email Content"
          value={emailContent || ''}
          onChange={(e) => setEmailContent(e.target.value)}
          sx={{ mb:2 }}/>

          <FormControl fullWidth sx={{ mb:2 }}>
            <InputLabel>Tone (Optional)</InputLabel>
            <Select
              value={tone || ''}
              label={"Tone (Optional)"}
              onChange={(e) => setTone(e.target.value)}>
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
                
            </Select>
          </FormControl>

          <Button
            variant='contained'
            onClick={handleSubmit}
            disabled={!emailContent || loading}
            fullWidth>
            {loading ? <CircularProgress size={24}/> : "Generate Reply"}
          </Button>
      </Box>

      {error && (
        <Typography color='error' sx={{ mb:2 }}>
          {error}
        </Typography>
      )}

      {generatedReply && (
       <Box sx={{ mt: 3}}>
          <Typography variant='h6' gutterBottom>
            Generated Reply:
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={6}
            variant='outlined'
            value={generatedReply || ''}
            inputProps={{ readOnly: true }}/>
        
        <Button
          variant='outlined'
          sx={{ mt: 2 }}
          onClick={() => navigator.clipboard.writeText(generatedReply)}>
            Copy to Clipboard
        </Button>
       </Box> 
      )}
    </Container>
  )
}

export default App
