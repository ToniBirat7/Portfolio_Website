---
title: "Context Management Is Actually Workflow Design"
date: "2026-04-17"
excerpt: "The 1M token window didn't just give us more room—it exposed a hidden layer of AI development nobody was talking about. How you manage context reveals how well you understand your own work."
author: "Birat"
---

When Thariq released that article on session management with 1M context windows, I realized I'd been thinking about this wrong for months. I kept treating context management as a *constraint*—something to optimize around, like minimizing API calls or reducing latency. But after working with Claude Code on increasingly complex projects, I see now that it's the opposite. Context management is actually workflow design, and the way you handle it says everything about how clearly you've defined your task.

![A whiteboard planning session showing structured work breakdown](/blog-images/context-management/wikimania-planning-whiteboard.jpg "Image: Stevie Benton (WMUK), CC BY-SA 4.0, via Wikimedia Commons.")

Here's what shifted for me: **I was getting bad compacts not because Claude was failing, but because I hadn't decided what I was actually doing.**

## The Hidden Tax of Unclear Intentions

Last month I spun up a subagent to refactor a chunk of authentication middleware, thinking "I'll just have it explore the options." The subagent came back with a synthesis, I pulled it back into the parent session, and then spent three turns asking Claude to "clean this up" and "make it more idiomatic." 

What was actually happening? I didn't know if I wanted a minimal refactor or a full rewrite. I didn't have opinions about the tradeoffs, so I kept pushing Claude to guess mine. By the third turn, the context was polluted with rejected attempts and my own indecision.

The problem wasn't context rot. It was that I was using Claude as a substitute for thinking.

Here's the pattern I've noticed: **the better you define your task upfront, the easier context management becomes.** When I switched to writing a one-paragraph brief before starting work—"We're refactoring auth middleware. Constraint: no changes to the login flow. Files that matter: auth.ts, middleware.ts, routes.ts. Approach: move token validation into a decorator pattern"—the compacts started working cleanly. Claude could actually predict where the work was going because I'd already done that prediction myself.

## Rewind Is Where Expertise Shows

Thariq mentioned rewind as a habit of good context management. I'd agree, but I'd push further: **rewind is where you learn how to think clearly about incremental work.**

Most people—me included, at first—use rewind as a "fix my mistake" button. Claude tries an approach, it breaks, you rewind and tell it to try again. That's fine, it works, but you're still in reactive mode.

The shift happens when you start rewinding *proactively*. You're not rewinding because something went wrong; you're rewinding because you realized the direction was wrong. For instance, Claude reads five files to understand a codebase structure. As it's exploring, you realize it's going down a path that won't work—not because of an error, but because you now understand the architecture better than when you started. You rewind to just after the file reads and re-prompt with what you learned.

This feels like a small thing, but it's actually the cognitive move that matters: you're training yourself to intervene *when you have clarity*, not when there's a failure. That changes how you work with the tool entirely.

The old flow: "Let's try this approach." → Wait for failure → React and correct. The new flow: "I see where this is heading." → Rewind → "Here's actually what matters."

## Why Fresh Sessions Beat Long Context Most of the Time

This is where I'll diverge slightly from what I'd expect most people to hear. The 1M context window makes it *possible* to keep working in a single session for hours. It doesn't make it optimal.

![A desk setup with a laptop and notebook ready for focused work](/blog-images/context-management/desk-laptop-notebook-table.jpg "Image: CC0 via Wikimedia Commons.")

I've done both. I've kept a session open and hit 800k tokens, compacting twice, and still getting useful work. I've also started fresh sessions five times in a single working day. The fresh sessions almost always produce cleaner code.

The reason isn't that Claude forgets things. It's that *you* think differently in a fresh session. When you start fresh, you're forced to articulate what you actually need. When you keep the same session open, you're coasting on the previous context. Your mental model doesn't get refreshed, so the work drifts.

I notice this most in longer projects. Day one, I build a feature in a single session, maybe two. By day three, I *always* start fresh—not because Claude's model has degraded (though context rot is real), but because I've learned things that make my initial approach slightly off-target. A fresh session forces me to incorporate that learning into the brief itself, which changes everything downstream.

**The hidden cost of keeping context is that you're betting against your own learning.** Every hour you keep a session open is an hour you're not forcing yourself to articulate what's changed.

## Subagents Changed How I Think About Intermediate Work

Before 1M context, the question was "Can I fit this in one session?" Now the question is "Do I need this work *in* my context, or just its result?"

That's a subtle shift, but it restructures your entire workflow.

I used to try to keep long debugging sessions alive because I was worried I'd lose details if I ended it. Now I'll spin off a subagent to debug a weird issue and just ask for a synthesis. "Here's the error trace. Debug it. Tell me (1) what it was, (2) why it happened, (3) how you fixed it." 

The parent session gets a clean summary. The subagent's messy exploration—all the false leads, the test outputs, the intermediate learnings—just disappears. This is less about context window optimization and more about *attention budget*. My attention is now free to think about what's next, not marinating in the debugging session.

But here's the psychological part: **this only works if you have absolute clarity on what problem the subagent is solving.** If you spin off a subagent and then realize halfway through that you actually needed to keep watching the exploration, you're in trouble. So the practice of delegating to subagents has made me much better at defining tasks upfront.

Again, it's workflow design, not context management.

## The Compact Problem That Nobody's Really Solved

Thariq's point about bad compacts hit close. I've had the exact experience: autocompact fires after a long debugging session, I ask the model something related but slightly different, and the context just doesn't have it anymore.

The suggestion is "use /compact proactively with a description." That works, but only if you're paying attention. It's adding friction to a moment when you're tired (after a long session).

What I've started doing instead is *less* compelling but more reliable: I rarely let a session get long enough to trigger autocompact. I compact proactively at around 400k tokens, *before* the model is in context rot territory and struggling to predict where the work is going. This is a cost (I'm compacting earlier than necessary), but the benefit is that my compact always works because the model still has enough clarity to make good decisions about what matters.

It feels like giving up the efficiency of the 1M window. But I think it's actually respecting it. The window exists, but the sweet spot for clear thinking is probably more like 300-500k tokens. Going beyond that is optimizing for the wrong thing.

## What This Teaches You About Your Own Brain

The deeper insight here is that context management with Claude is a mirror for how you think about your own work. If you find yourself needing long sessions with multiple compacts, it often means:

1. **You're not breaking work into clear chunks.** Each session should ideally be one "thing"—one feature, one fix, one investigation.

2. **You're discovering requirements as you work rather than defining them upfront.** This is sometimes unavoidable, but if it's frequent, you need more planning time before you start coding.

3. **You're using the tool to explore rather than execute.** Exploration is valid, but it shouldn't look like "I'll build this and see what happens." It should look like "I'll research the three approaches and decide which one."

4. **You don't have strong opinions about the work.** When I have clear opinions about architecture, tradeoffs, and constraints, Claude follows them cleanly. When I'm uncertain, the context starts to fray because we're both second-guessing.

This is actually useful feedback *outside* of working with Claude Code. The habits that make you good at session management—clear task definition, strong opinions, deliberate exploration—are the same habits that make you a better engineer generally.

## The Real Win: Workflow Clarity

At the end of this, the 1M window isn't valuable because it's large. It's valuable because it's *large enough* that you can't blame the tool for your unclear thinking anymore. You have enough room to do real work. Now the bottleneck is you.

This is both liberating and slightly humbling.

I've probably saved 3-4 hours of context management overhead by getting better at defining tasks and being more deliberate about when to keep a session versus start fresh. But the real win is that I'm shipping code faster because I spend less time in indecision. The context management habits are forcing me to think through the work before I start it, which changes the execution entirely.

Thariq's guide is excellent—it's the tactical playbook. But the strategic insight is that good context management *looks like* clarity of intention. If you're struggling with sessions, compacts, and subagents, the fix probably isn't learning more tricks. It's getting clearer about what you're trying to do.

The 1M tokens didn't change Claude. It changed what we can no longer hide from.
