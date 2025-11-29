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

    // Google AI (Gemini) doesn't provide a programmatic API for checking credits
    // We'll validate the key by making a simple API call
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models', {
      headers: {
        'x-goog-api-key': apiKey,
      },
    });

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        return NextResponse.json(
          { error: 'Invalid API key' },
          { status: 401 }
        );
      }
      return NextResponse.json(
        { error: 'Failed to validate Google AI key', details: await response.text() },
        { status: response.status }
      );
    }

    return NextResponse.json({
      provider: 'Google AI (Gemini)',
      status: 'API key is valid',
      note: 'Google AI does not provide programmatic access to quota/usage. Please check AI Studio dashboard for usage details.',
      dashboardUrl: 'https://aistudio.google.com/',
    });
  } catch (error) {
    console.error('Google AI API error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
