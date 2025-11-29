import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { apiKey } = await request.json();

    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key is required' },
        { status: 400 }
      );
    }

    // Requesty service is unclear/not found
    // Attempting common patterns
    const endpoints = [
      'https://api.requesty.ai/v1/account',
      'https://api.requesty.io/v1/account',
      'https://requesty.ai/api/v1/usage',
    ];

    let lastError = '';
    
    for (const endpoint of endpoints) {
      try {
        const response = await fetch(endpoint, {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          return NextResponse.json({
            provider: 'Requesty',
            data: data,
          });
        }
        
        lastError = await response.text();
      } catch (e) {
        lastError = e instanceof Error ? e.message : 'Unknown error';
      }
    }

    return NextResponse.json({
      provider: 'Requesty',
      status: 'Service not found',
      note: 'Requesty API service could not be located. Please verify the service name and URL, or check your dashboard for usage details.',
      lastError: lastError,
    });
  } catch (error) {
    console.error('Requesty API error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
