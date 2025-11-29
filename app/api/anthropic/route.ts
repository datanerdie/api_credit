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

    // Fetch cost report from Anthropic
    const response = await fetch('https://api.anthropic.com/v1/organizations/cost_report', {
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
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
        { error: 'Failed to fetch Anthropic data', details: await response.text() },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    // Calculate total cost
    let totalCost = 0;
    if (data.data && Array.isArray(data.data)) {
      data.data.forEach((bucket: any) => {
        if (bucket.results && Array.isArray(bucket.results)) {
          bucket.results.forEach((result: any) => {
            totalCost += parseFloat(result.amount || 0);
          });
        }
      });
    }

    return NextResponse.json({
      provider: 'Anthropic',
      totalCost: (totalCost / 100).toFixed(2), // Convert cents to dollars
      currency: 'USD',
      data: data,
    });
  } catch (error) {
    console.error('Anthropic API error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
