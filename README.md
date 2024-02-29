This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Branching

When picking up a new story, create a new branch off of master, the name should be a description of what the story entails
A pull request will need to be created and approved by other members before merging the feature branch with master
We cannot edit main branch directly and make commits.

## File Structure

Inside the src/app/ directory is where we create new routes.
Each route needs a page.tsx and layout.tsx (The one not in a folder is the default / route)

layout.tsx: This is a component that wraps around the main content of your pages. It's typically used to apply a consistent set of components or styling across multiple pages. For example, if you have a navigation bar or a footer that appears on every page, you would include it in your layout component.

page.tsx: This represents an individual page in your application. Each page.tsx file is associated with a specific route in your app. When a user navigates to that route, the associated page.tsx file is rendered inside the layout.tsx component

/components: For reusable UI components. Organize further into subdirectories as needed (e.g., /common, /layout).

/styles: Contains your CSS or Sass files. You might have global styles here and individual component styles close to their respective components.

/public: For static files like images, fonts, etc., that Next.js can serve directly.

/lib or /utils: For utility functions and library code that's not specific to any single component.

/hooks: Custom React hooks to encapsulate and reuse stateful logic.

/services: For code that interfaces with external services, like fetching data from an API.

/models (if applicable): Definitions for the shapes of data you're using, possibly mirroring your database models.

/context (if using React Context): For global state management files.
