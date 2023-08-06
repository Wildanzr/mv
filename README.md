This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

This project uses [pnpm](https://pnpm.io/) as the package manager. You can install it with `npm i -g pnpm`.

Copy `.env.example` to `.env.local` and fill in the values.
Example values are provided in gmail message.

To run the project in the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Why Next.js?

Next.js is a React framework that provides a lot of features out of the box, such as:

- Server-side rendering
- Static site generation
- Automatic code splitting
- CSS and Sass support
- TypeScript support
- Fast refresh
- API routes
- File-system routing
- Built-in Image Optimization

## Pros and Cons

### Pros

- Fast development
- Easy to use and deploy
- Serverless deployment
- Great developer experience

### Cons

- Not as flexible as a custom solution
- Cold start times can be slow (all path are prerendered on first request)
