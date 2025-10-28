# AI Assistant Integration Guide

## Overview
Your PC Builder application now includes an AI-powered assistant that can provide personalized component recommendations based on user budget and preferences using OpenAI's ChatGPT API.

## Features
- **Smart Recommendations**: AI analyzes budget and provides specific component suggestions
- **Interactive Chat**: Users can ask questions about PC building, compatibility, and performance
- **Contextual Responses**: AI understands the current component selection and budget context
- **Fallback System**: Mock responses ensure functionality even without API key configuration

## Setup Instructions

### 1. Get OpenAI API Key
1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign in or create an account
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key (you won't be able to see it again)

### 2. Configure Environment Variables
1. Open the `.env` file in your project root
2. Replace `YOUR_API_KEY_HERE` with your actual API key:
   ```
   VITE_OPENAI_API_KEY=sk-your-actual-api-key-here
   ```
3. Save the file

**Important:** The environment variable must be prefixed with `VITE_` to be accessible in the browser environment.

### 3. Security Best Practices
- The `.env` file is already added to `.gitignore` to prevent accidental commits
- Never commit your `.env` file to version control
- Keep your API key private and secure
- Consider using backend integration for production apps
- Monitor your API usage on OpenAI's dashboard

## How It Works

### Chat Interface
- **Fixed Position Button**: AI assistant button appears on component selection screens
- **Modal Chat**: Full-screen chat interface with message history
- **Quick Questions**: Preset questions to get users started
- **Real-time Responses**: Streaming-style responses with loading indicators

### AI Functionality
- **Component Recommendations**: Specific product suggestions with prices and reasons
- **Budget Analysis**: Optimizes component selection within budget constraints
- **Compatibility Check**: Ensures recommended parts work together
- **Performance Guidance**: Explains expected performance for different use cases

### Fallback System
If no API key is configured, the system provides:
- Detailed mock responses for each budget range
- Component-specific recommendations
- Educational content about PC building
- Compatibility guidance

## API Usage & Costs

### Token Estimation
- System prompt: ~100 tokens
- User message: ~20-50 tokens
- AI response: ~200-400 tokens
- **Total per interaction**: ~320-550 tokens

### Cost Calculation (GPT-3.5-turbo)
- Input: $0.0015 per 1K tokens
- Output: $0.002 per 1K tokens
- **Estimated cost per chat**: $0.0008 - $0.0015
- **100 chats**: ~$0.08 - $0.15

### Usage Optimization
- Responses are limited to 500 tokens to control costs
- System uses efficient prompting
- Contextual information reduces need for long conversations

## Customization Options

### Modify AI Behavior
Edit the system prompt in `/services/openai.ts`:
```typescript
private createSystemPrompt(budget: string, componentType: string): string {
  return `Your custom instructions here...`;
}
```

### Add New Component Types
1. Update component data in `App.tsx`
2. Add corresponding mock responses in `openai.ts`
3. Update the chat interface labels

### Styling Customization
- Chat modal styling in `/components/AIRecommendationChat.tsx`
- Button positioning and appearance in `App.tsx`
- Color schemes match existing design system

## Troubleshooting

### Common Issues
1. **"API key not configured" error**
   - Check `.env` file exists and has correct key
   - Ensure key starts with `sk-`
   - Verify no extra spaces or quotes

2. **"API rate limit exceeded"**
   - You've exceeded OpenAI's usage limits
   - Wait for limit reset or upgrade plan

3. **"Model not available"**
   - Ensure you have access to GPT-3.5-turbo
   - Try using GPT-4 if available

### Mock Responses Not Working
- Check mock data in `getMockRecommendation()` function
- Ensure budget ranges match your application

## Integration with Supabase

For production deployment, consider integrating with Supabase for:
- **Secure API Key Storage**: Store OpenAI key as encrypted environment variable
- **Usage Tracking**: Log AI interactions for analytics
- **Rate Limiting**: Implement user-based rate limits
- **Caching**: Cache common responses to reduce API costs
- **User Authentication**: Personalize recommendations based on user history

## Support

The AI assistant enhances your PC builder with intelligent recommendations while maintaining full functionality through fallback responses. Users get valuable guidance whether or not the OpenAI API is configured, ensuring a great experience for all users.