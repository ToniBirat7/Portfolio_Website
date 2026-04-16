---
title: "Prompt Injection in Agents: Defense Patterns That Actually Work"
date: "2026-04-16"
dateModified: "2026-04-16"
tags: ["Agentic AI", "Security", "Production Systems"]
excerpt: "Prompt injection in agents isn't a ChatGPT problem—it's an architecture problem. Real defenses are architectural, not literary."
readTime: 15
author: "Birat Gautam"
authorUrl: "https://birat.codes/#profile"
---

## Agent-Specific Injection Vectors

Prompt injection isn't just user input attacks. It's system-wide:

1. **Retrieval poisoning**: Malicious documents in knowledge base
2. **Tool argument injection**: Crafted arguments to tool calls
3. **Memory corruption**: Injected facts into agent memory
4. **Model output reuse**: Agent1 output fed as Agent2 input

### The Contrarian Position

Prompting for security is theater. Real defenses are architectural:

1. **Type-checked tool outputs**: Use Pydantic models
2. **Sandboxed execution**: Run tools in isolated environments
3. **Strict parsing**: Don't trust model outputs
4. **Input validation**: Sanitize before passing to model

### Defense Layers

```python
from pydantic import BaseModel, validator

class ReturnCheckRequest(BaseModel):
    customer_id: int
    order_id: int
    reason: str
    
    @validator('customer_id')
    def validate_customer_id(cls, v):
        # Reject obviously invalid IDs
        if v < 0 or v > 1_000_000_000:
            raise ValueError('invalid customer_id')
        return v

class Agent:
    async def handle_request(self, raw_input: dict):
        """Type-check all inputs before trusting them."""
        try:
            request = ReturnCheckRequest(**raw_input)
        except ValueError as e:
            return {"error": "invalid request", "details": str(e)}
        
        # Only now trust request.customer_id etc.
        return await self.process_return_check(request)
```

### Actionable Takeaways

- [ ] Never trust raw model outputs; parse to type-checked models
- [ ] Sanitize all retrieval results before passing to model
- [ ] Run tool calls in sandboxed environments (subprocess, container)
- [ ] Implement output whitelist filters before returning to users
- [ ] Monitor for injection patterns (obvious markers, escaped quotes)
- [ ] Test with adversarial prompts; build regression tests

---

## Related Posts

- [State Management Without the Mess: Deterministic Agent Memory for Long-Running Systems](/blog/state-management-agent-memory)
- [The Hallucination Budget: Quantifying Risk for Mission-Critical Agents](/blog/hallucination-budget)
- [When Agents Should Not Decide: Building Confidence Thresholds for Human Handoff](/blog/agent-confidence-thresholds)