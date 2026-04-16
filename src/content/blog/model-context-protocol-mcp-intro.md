---
title: "The Architecture of Agency: Model Context Protocol (MCP)"
date: "2026-04-15"
dateModified: "2026-04-16"
tags: ["Agentic AI", "MCP", "AI Systems"]
excerpt: "Exploring the Model Context Protocol (MCP) — the new standard for connecting AI models to external tools, data, and environments."
readTime: 12
coverImage: "/blog/mcp/mcp.png"
author: "Birat Gautam"
authorUrl: "https://birat.codes/#profile"
---

## What is Model Context Protocol (MCP)?

The **Model Context Protocol (MCP)** is an open standard designed to harmonize how AI models interact with their surrounding environment. As we move from standalone chat models to **Agentic Workflows**, we need a robust way to give LLMs "hands" and "eyes."

MCP provides a standardized interface for:
1. **Tools**: Execution capabilities (e.g., searching the web, running code).
2. **Resources**: Data access (e.g., reading local files, querying databases).
3. **Prompts**: Contextual templates for complex tasks.

> "MCP is the USB-C version for AI Model connectivity. It doesn't matter who built the model or who built the tool; if they speak MCP, they can collaborate instantly."

---

## Technical Architecture

At its core, MCP follows a **Client-Server-Host** pattern. 

### 1. The Host
The application where the user interacts with the AI (e.g., Claude Desktop, IDEs, or a custom-built agent interface).

### 2. The Client
A layer within the Host that manages individual connections to various servers.

### 3. The Server
Exposes specific resources or tools via the protocol. For example, a "Google Search MCP Server" or a "Local Filesystem MCP Server."

![MCP Architecture](/blog/mcp/archi2.png)
*Figure 1: Traditional siloed connectivity vs. the standardized MCP ecosystem.*

---

## Why standardizing Context matters?

Before MCP, every integration was a customized, brittle piece of glue-code. If you wanted your agent to use a PostgreSQL database, you had to write a specific wrapper for OpenAI, another for Anthropic, and another for Llama.

With MCP:
- **Write once**: Build a database connector as an MCP server.
- **Run anywhere**: Any MCP-compliant model can now query that database.

### Core Capabilities
- **Sampling**: When a server needs the model to perform a task (e.g., "Summarize this file").
- **Transport**: Supports both `stdio` (local processes) and `HTTP/SSE` (cloud-based).

---

## Implementation Example: A Simple Python Server

Here is how you can define an MCP server in Python to provide system metadata:

```python
from mcp.server.fastmcp import FastMCP

# Create an MCP server
mcp = FastMCP("SystemMonitor")

@mcp.tool()
def get_system_load() -> str:
    """Returns the current CPU and Memory load."""
    import psutil
    return f"CPU: {psutil.cpu_percent()}% | RAM: {psutil.virtual_memory().percent}%"

if __name__ == "__main__":
    mcp.run()
```

---

## The Future: Agentic Ecosystems

As the ecosystem grows, we will see the rise of **MCP Marketplaces** where researchers and developers share specialized servers. Imagine a "Bioinformatics MCP Server" that gives any LLM the ability to analyze genomic data with zero custom code.

This is the foundation of true **Agentic Autonomy**. 

---
*Authored by Birat Gautam. Exploring the limits of AI-human collaboration.*
