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

    // Kilocode API endpoint is not publicly documented
    // Attempting common patterns
    const endpoints = [
      'https://api.kilocode.ai/v1/account/credits',
      'https://api.kilocode.ai/v1/usage',
      'https://kilocode.ai/api/v1/account',
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
            provider: 'Kilocode',
            data: data,
          });
        }
        
        lastError = await response.text();
      } catch (e) {
        lastError = e instanceof Error ? e.message : 'Unknown error';
      }
    }

    return NextResponse.json({
      provider: 'Kilocode',
      status: 'API endpoint not available',
      note: 'Kilocode API documentation is not publicly available. Please check your dashboard at kilocode.ai for usage details.',
      dashboardUrl: 'https://kilocode.ai/',
      lastError: lastError,
    });
  } catch (error) {
    console.error('Kilocode API error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
