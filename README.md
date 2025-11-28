# AI API Credit Checker

A modern web application to check remaining API credits and usage across major AI providers.

## Supported Providers

- **OpenAI** - GPT-4, GPT-3.5, and other OpenAI models
- **Anthropic** - Claude models with detailed usage reports
- **Google AI (Gemini)** - Gemini and other Google AI models
- **OpenRouter** - Access to multiple AI models through one API
- **Kilocode** - AI coding assistant with gateway to 500+ models
- **Requesty** - AI API service (verification needed)

## Features

- ✅ Check API credits and usage for multiple providers
- ✅ Secure API key handling (keys sent directly to providers)
- ✅ Real-time credit information
- ✅ Responsive design with dark mode support
- ✅ Color-coded status indicators
- ✅ Individual refresh for each provider

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Runtime**: Node.js 22

## Getting Started

### Prerequisites

- Node.js 22 or higher
- npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/datanerdie/api_credit.git
cd api_credit
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Usage

1. Enter your API key for any provider in the respective card
2. Click "Check Credits" to fetch your current usage and remaining credits
3. View detailed information including:
   - Remaining credits
   - Total usage
   - Daily/Monthly usage (where available)
   - Cost information (where available)

## Security Note

⚠️ **Important**: API keys are sent directly to the respective providers through secure API routes and are **not stored** on our servers. For maximum security, consider using read-only or restricted API keys when available.

## API Endpoints

The application includes the following API routes:

- `/api/openai` - OpenAI billing and usage
- `/api/anthropic` - Anthropic cost reports
- `/api/google` - Google AI (Gemini) validation
- `/api/openrouter` - OpenRouter credit information
- `/api/kilocode` - Kilocode usage (endpoint discovery)
- `/api/requesty` - Requesty usage (endpoint discovery)

## Provider-Specific Notes

### OpenAI
- Limited public API for billing information
- May require organization-level access
- Check OpenAI dashboard for detailed usage

### Anthropic
- Comprehensive usage and cost reporting API
- Supports detailed breakdowns by model and service tier
- Returns costs in USD

### Google AI (Gemini)
- No programmatic API for quota checking
- Key validation only
- View usage manually in AI Studio dashboard

### OpenRouter
- Excellent API with detailed metrics
- Shows credit limits and remaining balance
- Tracks daily, weekly, and monthly usage

### Kilocode & Requesty
- API endpoints not publicly documented
- Check respective dashboards for usage details

## Development

### Project Structure

```
/vercel/sandbox/
├── app/
│   ├── api/              # API routes for each provider
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Main page
│   └── globals.css       # Global styles
├── components/
│   └── ProviderCard.tsx  # Provider card component
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.ts
```

### Adding a New Provider

1. Create a new API route in `app/api/[provider]/route.ts`
2. Implement the POST handler with API key validation
3. Add the provider to the `providers` array in `app/page.tsx`
4. Choose a color for the status indicator

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

ISC

## Links

- [GitHub Repository](https://github.com/datanerdie/api_credit)
- [Report Issues](https://github.com/datanerdie/api_credit/issues)

## Acknowledgments

Built with Next.js, React, TypeScript, and Tailwind CSS.
