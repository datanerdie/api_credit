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

    // OpenAI doesn't have a direct credits endpoint, but we can check usage
    // Using the billing/usage endpoint (may require organization access)
    const response = await fetch('https://api.openai.com/v1/dashboard/billing/subscription', {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        return NextResponse.json(
          { error: 'Invalid API key' },
          { status: 401 }
        );
      }
      return NextResponse.json(
        { error: 'Failed to fetch OpenAI data', details: await response.text() },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    return NextResponse.json({
      provider: 'OpenAI',
      data: data,
      note: 'OpenAI billing data - check dashboard for detailed usage'
    });
  } catch (error) {
    console.error('OpenAI API error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
