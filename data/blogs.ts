export interface Blog {
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    readTime: string;
    tags: string[];
    image?: string;
}

export const BLOGS: Blog[] = [
    {
        slug: "strangler-fig-pattern-system-evolution",
        title: "Evolving Systems with the Strangler Fig Pattern",
        excerpt: "A practical look at the Strangler Fig pattern and how it helps evolve legacy systems without risky full rewrites.",
        content: `
# Evolving Systems with the Strangler Fig Pattern

While working on improving the robustness of a backend service recently, I came across an interesting architecture pattern called the **Strangler Fig Pattern**.

The idea behind it is surprisingly simple but extremely practical for real-world systems.

Instead of rewriting an entire system from scratch, you **gradually replace parts of it over time**.

## The Problem with Big Rewrites

When systems grow large, rewriting them completely is risky:

- Long development cycles
- High chance of introducing new bugs
- Business features get blocked during migration
- Deployment risk increases

Many companies have learned the hard way that **big rewrites often fail**.

This is where the Strangler Fig Pattern becomes useful.

## Where the Name Comes From

The pattern is inspired by the **strangler fig tree**.

A strangler fig grows around an existing tree and slowly replaces it over time. Eventually the original tree disappears, leaving only the new one.

Software systems can evolve in a similar way.

## How the Pattern Works

Instead of replacing the system completely, you introduce a **new layer around the existing system**.

\`\`\`mermaid
flowchart TD
    Clients --> Gateway
    Gateway --> LegacySystem[Legacy System]
\`\`\`

Then gradually move functionality into new services.

\`\`\`mermaid
flowchart TD
    Clients --> Gateway
    Gateway --> NewService[New Service]
    Gateway --> LegacySystem[Legacy System]
\`\`\`

Over time, more functionality moves to the new system until the legacy component can be removed.

\`\`\`mermaid
flowchart TD
    Clients --> Gateway
    Gateway --> NewSystem[New System]
\`\`\`

The key advantage is that the system **keeps working during the entire migration**.

## Where This Pattern is Used

The Strangler Fig Pattern is commonly used when:

- Migrating **monoliths to microservices**
- Moving **on-premise systems to the cloud**
- Replacing **legacy enterprise systems**
- Gradually modernizing large platforms

Many large companies use similar approaches when evolving their architectures.

## A Simple Example

Imagine a legacy backend service responsible for encryption.

Instead of replacing it directly, you can introduce a **gateway service**:

\`\`\`mermaid
flowchart TD
    Gateway --> PhiEncryptionService[Legacy Encryption Service]
\`\`\`

Later you can add a new implementation:

\`\`\`mermaid
flowchart TD
    Gateway --> NewEncryptionService[New Encryption Service]
    Gateway --> PhiEncryptionService[Legacy Encryption Service]
\`\`\`

Eventually the legacy service can be removed entirely.

\`\`\`mermaid
flowchart TD
    Gateway --> NewEncryptionService[New Encryption Service]
\`\`\`

## Why This Approach Works

The pattern provides several advantages:

- Reduced migration risk
- Incremental improvements
- Continuous system availability
- Easier rollback if something fails
- Smaller, manageable changes

Most importantly, teams can **modernize systems without stopping development**.

## Final Thoughts

One interesting part about learning system design is realizing that many things we do during refactoring or architecture improvements already resemble known patterns.

The Strangler Fig Pattern is a great example of this — a simple concept that enables **safe and gradual system evolution**.

If you're working with large or legacy systems, this pattern is definitely worth knowing.
`,
        date: "2026-03-10",
        readTime: "5 min read",
        tags: ["Architecture", "System Design", "Backend"],
        image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80"
    },
    {
        slug: "github-whatsapp-notifications",
        title: "Sending GitHub Notifications to WhatsApp with Webhooks",
        excerpt: "A simple way to receive GitHub PR and CI notifications directly on WhatsApp using webhooks and Twilio.",
        content: `
# Sending GitHub Notifications to WhatsApp with Webhooks

While working on several repositories, I noticed that I was receiving **many GitHub email notifications** for things like PR reviews, assignments, and CI failures.

Checking emails or switching to GitHub repeatedly was interrupting the workflow.

So I thought of a simple idea:  
**What if GitHub notifications came directly to WhatsApp?**

This small automation turned out to be surprisingly useful.

## The Idea

Instead of relying on email notifications, we can connect **GitHub Webhooks** to a small backend service that sends messages through **Twilio's WhatsApp API**.

\`\`\`mermaid
flowchart LR
    GitHub --> Webhook
    Webhook --> Server
    Server --> Twilio
    Twilio --> WhatsApp
\`\`\`

Whenever something happens in the repository, GitHub sends an event to the webhook, and the backend forwards the message to WhatsApp.

## Events We Can Track

Using GitHub Webhooks we can track several useful events:

- Pull Request assigned
- Pull Request review requested
- Pull Request approved
- Pull Request merged
- CI workflow failures

Each event can trigger a WhatsApp message.

\`\`\`mermaid
flowchart TD
    PRAssigned[PR Assigned] --> Notification
    ReviewRequested[Review Requested] --> Notification
    PRMerged[PR Merged] --> Notification
    CI[CI Failed] --> Notification
    Notification --> WhatsApp
\`\`\`

## Basic Architecture

The system itself is very lightweight.

\`\`\`mermaid
flowchart TD
    Developer --> GitHub
    GitHub --> WebhookEndpoint
    WebhookEndpoint --> NodeServer
    NodeServer --> TwilioAPI
    TwilioAPI --> WhatsApp
\`\`\`

The server simply receives webhook payloads and sends a formatted message.

## Example Message

A typical WhatsApp notification might look like this:

\`\`\`
👀 PR Review Requested

Reviewer: imRahul05

Fix authentication bug

https://github.com/org/repo/pull/42
\`\`\`

This makes it much easier to quickly check important updates without opening GitHub.

## Why This Helps

This small automation improves workflow in several ways:

- Faster awareness of PR updates
- No need to constantly check GitHub
- Less email clutter
- Quick mobile notifications

Instead of checking multiple tools, everything appears directly in WhatsApp.

## Tech Stack Used

The implementation is quite simple:

- **Node.js**
- **GitHub Webhooks**
- **Twilio WhatsApp API**
- **Vercel Serverless Functions**

The backend simply listens for GitHub events and forwards them to WhatsApp.

## Turning It Into an npm Package

After using this setup for a while, I realized the idea could be useful for other developers too.

Instead of requiring everyone to manually build the webhook server, I turned the project into a small **npm scaffolding package** that generates a ready-to-run GitHub → WhatsApp notifier.

Now you can create your own bot in seconds.

### Quick Start

\`\`\`bash
npx create-github-whatsapp-notifier my-bot
cd my-bot
npm install
cp .env.example .env
npm start
\`\`\`

After generating the project, you only need to:

1. Add your **Twilio credentials** in \`.env\`
2. Map **GitHub usernames to WhatsApp numbers**
3. Add the **GitHub webhook URL**

That's it — the bot will start sending repository updates directly to WhatsApp.

You can check the package here:

[create-github-whatsapp-notifier on npm](https://www.npmjs.com/package/create-github-whatsapp-notifier)

## Final Thoughts

Receiving GitHub notifications on WhatsApp turned out to be a simple but effective way to keep track of PR activity without constantly switching tools.

What started as a small personal automation eventually turned into a reusable tool that anyone can set up in seconds.
`,
        date: "2026-03-10",
        readTime: "4 min read",
        tags: ["Automation", "GitHub", "DevTools"],
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80"
    },
    {
        slug: "blocking-script-injection-with-csp",
        title: "Blocking Script Injection with Content Security Policy",
        excerpt: "A quick look at how Content Security Policy (CSP) prevents malicious scripts from executing in web apps.",
        content: `
# Blocking Script Injection with Content Security Policy

While working on a security task, I wondered:

**What actually prevents a malicious script from running if it gets injected into a web app?**

The answer is **Content Security Policy (CSP)**.

CSP is a browser security feature that allows scripts to run **only from trusted sources**.

## Without CSP

If an attacker injects a script, the browser may execute it.

\`\`\`mermaid
flowchart LR
    Attacker --> InjectedScript
    InjectedScript --> Browser
    Browser --> App
\`\`\`

## With CSP

With CSP enabled, the browser checks whether the script source is allowed.

\`\`\`mermaid
flowchart LR
    Attacker --> InjectedScript
    InjectedScript --> Browser
    Browser --> CSPPolicy
    CSPPolicy -->|Blocked| Script
\`\`\`

If the script is not from a trusted source, the browser **refuses to execute it**.

## Example CSP Header

\`\`\`ts
export const headers = {
  "Content-Security-Policy": "script-src 'self'"
}
\`\`\`

This means:

- Only scripts from the **same domain** are allowed
- Injected scripts from external sources are **blocked**

## Why It Matters

CSP adds an extra layer of protection against **XSS (Cross-Site Scripting)** attacks.

Even if a script somehow gets injected into the page, the browser will **not run it unless it matches the policy**.

Sometimes security improvements are not complex —  
they're just about **configuring the browser correctly**.
`,
        date: "2026-03-10",
        readTime: "2 min read",
        tags: ["Security", "Next.js", "Web Security"],
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80"
    }
];