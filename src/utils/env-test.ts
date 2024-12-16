export const checkEnvironmentVariables = () => {
  const variables = {
    HUGGINGFACE_API_KEY: import.meta.env.VITE_HUGGINGFACE_API_KEY,
  };

  console.log('Environment Variables Check:');
  console.log('HUGGINGFACE_API_KEY:', variables.HUGGINGFACE_API_KEY ? 
    `Present (starts with: ${variables.HUGGINGFACE_API_KEY.substring(0, 8)}...)` : 
    'Missing');
    
  return variables.HUGGINGFACE_API_KEY ? true : false;
}; 