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

    // Fetch key information from OpenRouter
    const response = await fetch('https://openrouter.ai/api/v1/auth/key', {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
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
        { error: 'Failed to fetch OpenRouter data', details: await response.text() },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    return NextResponse.json({
      provider: 'OpenRouter',
      label: data.data?.label || 'N/A',
      limit: data.data?.limit,
      limitRemaining: data.data?.limit_remaining,
      usage: data.data?.usage,
      usageDaily: data.data?.usage_daily,
      usageWeekly: data.data?.usage_weekly,
      usageMonthly: data.data?.usage_monthly,
      isFreeTier: data.data?.is_free_tier,
      data: data,
    });
  } catch (error) {
    console.error('OpenRouter API error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
