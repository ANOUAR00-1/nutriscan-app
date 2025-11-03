/**
 * AI Model Configuration for NutriScan
 * Using Groq + Llama 3.2 Vision (Open Source, FREE)
 */

export const AI_CONFIG = {
  // Primary provider: Groq (FREE tier: 14,400 requests/day)
  provider: 'groq' as const,
  
  // Model: Llama 3.2 Vision 11B (Meta's open source vision model)
  model: 'llama-3.2-11b-vision-preview',
  
  // Temperature: Lower = more consistent nutrition data
  temperature: 0.3,
  
  // Max tokens for response
  maxTokens: 2000,
  
  // Request timeout (ms)
  timeout: 30000,
  
  // Retry attempts on failure
  maxRetries: 2,
};

// Provider configurations
export const PROVIDERS = {
  groq: {
    name: 'Groq',
    apiUrl: 'https://api.groq.com/openai/v1',
    model: 'llama-3.2-11b-vision-preview',
    features: {
      vision: true,
      jsonMode: true,
      streaming: false,
    },
    limits: {
      free: {
        requestsPerDay: 14400,
        requestsPerMinute: 30,
      },
    },
  },
  
  together: {
    name: 'Together AI',
    apiUrl: 'https://api.together.xyz/v1',
    model: 'meta-llama/Llama-Vision-Free',
    features: {
      vision: true,
      jsonMode: true,
      streaming: true,
    },
    limits: {
      free: {
        credits: 25, // $25 initial credits
      },
    },
  },
  
  ollama: {
    name: 'Ollama (Local)',
    apiUrl: 'http://localhost:11434/api',
    model: 'llama3.2-vision:11b',
    features: {
      vision: true,
      jsonMode: true,
      offline: true,
    },
    limits: {
      free: {
        unlimited: true,
      },
    },
  },
};

// Environment variable names
export const ENV_KEYS = {
  GROQ_API_KEY: 'GROQ_API_KEY',
  TOGETHER_API_KEY: 'TOGETHER_API_KEY',
  OLLAMA_URL: 'OLLAMA_URL',
};
