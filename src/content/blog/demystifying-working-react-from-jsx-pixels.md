---
title: "Demystifying the Working of ReactJs: From JSX to Pixels"
date: "2024-08-30"
dateModified: "2024-08-30"
tags: ["React", "JSX", "Babel", "Vite", "Frontend"]
excerpt: "A beginner-friendly deep dive into how React and JSX work under the hood, from createElement to transpilation and production builds."
readTime: 15
coverImage: "/blog/react-jsx-pixels/image-01.jpg"
author: "Birat Gautam"
authorUrl: "https://np.linkedin.com/in/biratgautam7"
---

> Source: LinkedIn article by Birat Gautam
> Original URL: https://www.linkedin.com/pulse/demystifying-working-react-from-jsx-pixels-birat-gautam-4rqif/

Ever wondered how React transforms complex UI code into blazing-fast websites? Or how JSX, a seemingly simple syntax that turns into powerful JavaScript under the hood? Let’s dive into the magic that powers modern web development.

To understand the working of React and JSX under the hood, this article is divided into two parts.

---

## Part One: Without JSX

Before diving deep into React without JSX, keep one thing in mind.

A browser directly understands HTML, CSS, and JavaScript. It does not understand JSX. That is why transpilers like Babel and build tools like Webpack or Vite are used to convert JSX into browser-executable JavaScript.

### Example

Suppose we have a simple HTML file with a root div. We want to render an h1 containing "Hello, React!" inside this div using React.

![Original Article Image 1](/blog/react-jsx-pixels/image-03.jpg)

If we open this HTML file in the browser, the h1 renders inside #root because we used React.createElement() to build the element and ReactDOM to render it.

React.createElement() is just a JavaScript function exposed by the React library loaded in the page.

### How React and ReactDOM become available globally

They are available because we load their script files in the HTML page.

When the browser parses HTML top-to-bottom and finds a script tag, it:
1. Downloads the script from src.
2. Blocks further parsing until download completes.
3. Executes the script immediately.
4. Exposes globals like React and ReactDOM to window.

Example CDN links used in explanation:
- https://unpkg.com/react@17/umd/react.development.js
- https://unpkg.com/react-dom@17/umd/react-dom.development.js

### Accessing React and ReactDOM in console

Because both are attached to window, they can be inspected directly in browser console.

![Original Article Image 2](/blog/react-jsx-pixels/image-04.jpg)

### Problem and solution

If those libraries are downloaded every page load, performance suffers due to repeated HTTP requests.

Common solution:
- Use bundlers (Webpack/Vite) to ship one optimized bundle.

If bundling is not used, browser caching may still reduce repeated downloads.

---

## Part Two: With JSX

In the earlier example, no JSX was used, so no transpiler was required.

### What changes when JSX is used

If we rewrite the same logic using JSX syntax, a browser cannot execute it directly.

![Original Article Image 3](/blog/react-jsx-pixels/image-05.jpg)

If run directly, you will see an error like:
- Uncaught SyntaxError: Unexpected token '<'

### What is JSX

JSX (JavaScript XML) is a syntax extension that lets you write HTML-like UI code in JavaScript files.

It is not a separate language. It is syntactic sugar that gets transformed into React.createElement() calls.

![Original Article Image 4](/blog/react-jsx-pixels/image-06.jpg)

### Features of JSX

1. Embedding expressions with {}.

![Original Article Image 5](/blog/react-jsx-pixels/image-07.jpg)

2. Passing attributes.

![Original Article Image 6](/blog/react-jsx-pixels/image-08.jpg)

In JSX, use className instead of class because class is a reserved keyword in JavaScript.

3. Inline styles using JavaScript objects.

![Original Article Image 7](/blog/react-jsx-pixels/image-09.jpg)

### JSX to JavaScript

To execute JSX in browsers, it must be transpiled to plain JavaScript equivalent.

![Original Article Image 8](/blog/react-jsx-pixels/image-10.jpg)

---

## What is a Transpiler?

A transpiler converts source code from one language/syntax to equivalent source code in another.

In React's JSX context, Babel converts JSX into valid JavaScript.

### Babel transpilation flow

1. Input code: developer writes JSX in .jsx files.
2. Parsing: Babel builds an AST.
3. Transformation: Babel converts JSX nodes and modern syntax as configured.
4. Output: Babel emits plain JavaScript.
5. Execution: browser runs emitted JavaScript.

---

## Babel Configuration

There are two common ways to configure Babel:

### 1. Babel via CDN

You can include Babel in HTML for demos/small cases, then mark scripts with type="text/babel".

![Original Article Image 9](/blog/react-jsx-pixels/image-11.jpg)

How browser behaves:
- Loads React and ReactDOM first.
- Loads Babel.
- Babel transpiles text/babel scripts in browser.
- Browser executes transpiled output.

Important note:
- Babel-in-browser is not recommended for production because runtime transpilation adds overhead.

### 2. Babel/transformation via build tools

In production React apps, transpilation and bundling are handled by build tools like Vite or Webpack.

For the walkthrough, Vite is used.

![Original Article Image 10](/blog/react-jsx-pixels/image-12.jpg)
![Original Article Image 11](/blog/react-jsx-pixels/image-13.jpg)

---

## What is a Build Tool?

A build tool automates compilation, transformation, bundling, optimization, and output generation.

For React apps, a build tool bundles dependencies (including framework code) and outputs deployment-ready assets.

### Vite walkthrough summary

- Create project.
- Install React and ReactDOM.
- Build components in JSX.
- Configure build behavior.
- Run dev server.
- Run production build.

![Original Article Image 12](/blog/react-jsx-pixels/image-14.jpg)
![Original Article Image 13](/blog/react-jsx-pixels/image-15.jpg)

### Why Vite is fast

Vite uses esbuild for fast transformation and Rollup for production bundling of assets.

---

## Understanding `npm run build` in Vite

When you run build:

1. Vite reads config.
2. Builds dependency graph from entry points.
3. Bundles app code and dependencies.
4. Minifies and optimizes output.
5. Writes production files to dist.

![Original Article Image 14](/blog/react-jsx-pixels/image-16.jpg)

The dist folder typically contains:
- Optimized index.html
- Bundled hashed JS/CSS files
- Copied and optimized static assets

---

## How Browser Works After Build

Once deployed:

1. Browser requests dist/index.html.
2. Browser downloads optimized hashed assets.
3. Browser executes bundled JavaScript.
4. React mounts app into root element.

Now React/ReactDOM do not need separate CDN downloads because they are bundled.

![Original Article Image 15](/blog/react-jsx-pixels/image-17.jpg)

---

## Final Thoughts

This write-up explained:
- How React/ReactDOM become globally available without JSX.
- Why browsers fail on raw JSX.
- How Babel transpiles JSX.
- How Vite build flow prepares production-ready output.
- How browser behavior differs before and after build.

Understanding these internals helps developers build more efficient React applications and reason better about performance, tooling, and deployment.

---

## Local Image Archive from Original Post

For completeness, the available downloaded media assets from the original article are archived in:

- `/public/blog/react-jsx-pixels/image-01.jpg` through `/public/blog/react-jsx-pixels/image-17.jpg`

If you want, I can additionally map each image to exact original section labels once we run OCR on the screenshots.
