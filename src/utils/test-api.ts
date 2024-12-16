import { AI_CONFIG } from '../config/ai';

export const validateApiKey = async (apiKey: string): Promise<{ isValid: boolean; details: string }> => {
  try {
    const response = await fetch('https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify("Test message"),
    });

    const statusCode = response.status;
    
    if (statusCode === 200) {
      return { isValid: true, details: "API key is valid and working" };
    } else if (statusCode === 401) {
      return { isValid: false, details: "API key is invalid or expired" };
    } else if (statusCode === 429) {
      return { isValid: true, details: "API key is valid but rate limited" };
    } else {
      const errorText = await response.text();
      return { isValid: false, details: `Unexpected response (${statusCode}): ${errorText}` };
    }
  } catch (error) {
    return { 
      isValid: false, 
      details: `Error validating API key: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
};

export const testHuggingFaceConnection = async (): Promise<{ success: boolean; message: string }> => {
  try {
    // First check if API key is configured
    if (!AI_CONFIG.HUGGINGFACE_API_KEY) {
      console.error('API Key is missing or empty');
      return {
        success: false,
        message: 'API Key is not configured. Please check your .env file.'
      };
    }

    console.log('Attempting API connection with key:', AI_CONFIG.HUGGINGFACE_API_KEY.substring(0, 8) + '...');
    
    const response = await fetch(AI_CONFIG.API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${AI_CONFIG.HUGGINGFACE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: {
          text: "Hello, are you working?",
          past_user_inputs: [],
          generated_responses: [],
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'No error details available');
      console.error('API Response:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText
      });
      
      throw new Error(`API Error: ${response.status} ${response.statusText}\n${errorText}`);
    }

    const data = await response.json();
    console.log('API Response:', data);
    
    return {
      success: true,
      message: "API connection successful! Response: " + data.generated_text
    };
  } catch (error) {
    console.error('Full error details:', error);
    return {
      success: false,
      message: `API connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}; 