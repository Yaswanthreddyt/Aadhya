import React, { useState, useEffect } from 'react';
import { testHuggingFaceConnection, validateApiKey } from '../utils/test-api';
import { checkEnvironmentVariables } from '../utils/env-test';
import { AI_CONFIG } from '../config/ai';

export const APITest: React.FC = () => {
  const [testResult, setTestResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [envCheck, setEnvCheck] = useState<boolean | null>(null);
  const [validationResult, setValidationResult] = useState<string>('');

  useEffect(() => {
    const result = checkEnvironmentVariables();
    setEnvCheck(result);
    
    // Validate API key on component mount
    if (result && AI_CONFIG.HUGGINGFACE_API_KEY) {
      validateApiKey(AI_CONFIG.HUGGINGFACE_API_KEY).then(validation => {
        setValidationResult(validation.details);
      });
    }
  }, []);

  const runTest = async () => {
    setIsLoading(true);
    try {
      const result = await testHuggingFaceConnection();
      setTestResult(result.message);
    } catch (error) {
      setTestResult(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">API Connection Test</h2>
      
      <div className="mb-4">
        <h3 className="font-semibold">Environment Check:</h3>
        <div className={`text-sm ${envCheck ? 'text-green-600' : 'text-red-600'}`}>
          {envCheck ? 'API Key is present' : 'API Key is missing'}
        </div>
        {validationResult && (
          <div className={`text-sm mt-2 ${
            validationResult.includes('valid') ? 'text-green-600' : 'text-red-600'
          }`}>
            {validationResult}
          </div>
        )}
      </div>

      <button
        onClick={runTest}
        disabled={isLoading || !envCheck}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {isLoading ? 'Testing...' : 'Test Connection'}
      </button>
      
      {testResult && (
        <div className="mt-4 p-3 bg-gray-100 rounded">
          <pre className="whitespace-pre-wrap">{testResult}</pre>
        </div>
      )}
    </div>
  );
}; 