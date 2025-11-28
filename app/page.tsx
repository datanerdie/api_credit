'use client';

import ProviderCard from '@/components/ProviderCard';

export default function Home() {
  const providers = [
    {
      name: 'OpenAI',
      description: 'GPT-4, GPT-3.5, and other OpenAI models',
      endpoint: '/api/openai',
      color: 'bg-green-500',
    },
    {
      name: 'Anthropic',
      description: 'Claude models with detailed usage reports',
      endpoint: '/api/anthropic',
      color: 'bg-orange-500',
    },
    {
      name: 'Google AI',
      description: 'Gemini and other Google AI models',
      endpoint: '/api/google',
      color: 'bg-blue-500',
    },
    {
      name: 'OpenRouter',
      description: 'Access to multiple AI models through one API',
      endpoint: '/api/openrouter',
      color: 'bg-purple-500',
    },
    {
      name: 'Kilocode',
      description: 'AI coding assistant with gateway to 500+ models',
      endpoint: '/api/kilocode',
      color: 'bg-cyan-500',
    },
    {
      name: 'Requesty',
      description: 'AI API service (verification needed)',
      endpoint: '/api/requesty',
      color: 'bg-pink-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            AI API Credit Checker
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Check your remaining API credits and usage across major AI providers. 
            Enter your API keys below to view your current status.
          </p>
          <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg max-w-2xl mx-auto">
            <p className="text-sm text-yellow-800 dark:text-yellow-300">
              <strong>Security Note:</strong> API keys are sent directly to the respective providers and are not stored on our servers. 
              For maximum security, consider using read-only or restricted API keys.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {providers.map((provider) => (
            <ProviderCard
              key={provider.name}
              name={provider.name}
              description={provider.description}
              endpoint={provider.endpoint}
              color={provider.color}
            />
          ))}
        </div>

        <div className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            Built with Next.js and Tailwind CSS • 
            <a 
              href="https://github.com/datanerdie/api_credit" 
              target="_blank" 
              rel="noopener noreferrer"
              className="ml-1 text-blue-600 dark:text-blue-400 hover:underline"
            >
              View on GitHub
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
