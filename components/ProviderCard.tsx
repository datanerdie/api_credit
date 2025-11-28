'use client';

import { useState } from 'react';

interface ProviderCardProps {
  name: string;
  description: string;
  endpoint: string;
  color: string;
}

interface CreditData {
  [key: string]: any;
}

export default function ProviderCard({ name, description, endpoint, color }: ProviderCardProps) {
  const [apiKey, setApiKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState<CreditData | null>(null);

  const fetchCredits = async () => {
    if (!apiKey.trim()) {
      setError('Please enter an API key');
      return;
    }

    setLoading(true);
    setError('');
    setData(null);

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ apiKey }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || 'Failed to fetch data');
        return;
      }

      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = () => {
    if (error) return 'border-red-500';
    if (data) return 'border-green-500';
    return 'border-gray-300 dark:border-gray-700';
  };

  return (
    <div className={`border-2 ${getStatusColor()} rounded-lg p-6 bg-white dark:bg-gray-800 shadow-lg transition-all duration-300`}>
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-3 h-3 rounded-full ${color}`}></div>
        <h2 className="text-xl font-bold">{name}</h2>
      </div>
      
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{description}</p>

      <div className="space-y-3">
        <input
          type="password"
          placeholder="Enter API Key"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={fetchCredits}
          disabled={loading}
          className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-md font-medium transition-colors duration-200"
        >
          {loading ? 'Loading...' : 'Check Credits'}
        </button>
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 rounded-md">
          <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
        </div>
      )}

      {data && (
        <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-md border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold mb-2 text-green-600 dark:text-green-400">Results:</h3>
          <div className="space-y-2 text-sm">
            {data.provider && (
              <div>
                <span className="font-medium">Provider:</span> {data.provider}
              </div>
            )}
            
            {data.limitRemaining !== undefined && (
              <div>
                <span className="font-medium">Credits Remaining:</span> {data.limitRemaining === null ? 'Unlimited' : data.limitRemaining}
              </div>
            )}
            
            {data.limit !== undefined && (
              <div>
                <span className="font-medium">Credit Limit:</span> {data.limit === null ? 'Unlimited' : data.limit}
              </div>
            )}
            
            {data.usage !== undefined && (
              <div>
                <span className="font-medium">Total Usage:</span> {data.usage}
              </div>
            )}
            
            {data.usageDaily !== undefined && (
              <div>
                <span className="font-medium">Daily Usage:</span> {data.usageDaily}
              </div>
            )}
            
            {data.usageMonthly !== undefined && (
              <div>
                <span className="font-medium">Monthly Usage:</span> {data.usageMonthly}
              </div>
            )}
            
            {data.totalCost !== undefined && (
              <div>
                <span className="font-medium">Total Cost:</span> ${data.totalCost} {data.currency}
              </div>
            )}
            
            {data.status && (
              <div>
                <span className="font-medium">Status:</span> {data.status}
              </div>
            )}
            
            {data.note && (
              <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded">
                <p className="text-xs text-blue-700 dark:text-blue-300">{data.note}</p>
              </div>
            )}
            
            {data.dashboardUrl && (
              <div className="mt-2">
                <a 
                  href={data.dashboardUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline text-xs"
                >
                  View Dashboard →
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
