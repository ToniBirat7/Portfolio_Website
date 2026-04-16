---
title: "State Management Without the Mess: Deterministic Agent Memory for Long-Running Systems"
date: "2026-04-16"
dateModified: "2026-04-16"
tags: ["Agentic AI", "State Management", "Production Systems"]
excerpt: "Vector databases are sexy. Event-sourcing is not. Here's why deterministic, versioned memory is what mission-critical agents actually need for reproducibility and compliance."
readTime: 16
author: "Birat Gautam"
authorUrl: "https://birat.codes/#profile"
---

## The Problem With Semantic Search

Your agent reads a document. It extracts the key facts using embeddings. It stores them in a vector database. A month later, you need to explain why the agent made a particular decision.

Good luck.

Vector databases have become the default choice for agent memory because they're conceptually simple: embed everything, retrieve by semantic similarity. But they have a fatal flaw in production: **irreproducibility**.

When your embedding model updates (even a minor version bump), similarity scores change. When your vector store rebuilds its indices, retrieved results might reorder. When you need to debug why an agent made a harmful decision three weeks ago, you can't time-travel through semantic space.

This is fine for chat applications. It's a disaster for agent systems that make business-critical decisions.

### The Reproducibility Crisis

Consider a healthcare agent that recommends treatment plans. It reads medical records, queries knowledge bases, and synthesizes recommendations. Six months later, a patient's outcome is worse than expected, and you're asked in deposition: "Exactly what information did your agent see when making this recommendation?"

Vector database retrieval? "Well, semantic similarity was 0.87, but that was before we updated our embeddings model..."

This is not a satisfactory answer in a courtroom.

### The Contrarian Position: Event Sourcing Over Vector Search

Here's the uncomfortable truth: **for mission-critical agents, you need both**:

1. **Event log** (immutable, deterministic): Complete record of every fact the agent observed
2. **Vector index** (mutable, fuzzy): For fast semantic retrieval during normal operations

But the event log is the source of truth. The vector index is a cache—useful for performance, but never authoritative.

This is event sourcing applied to agent memory.

### Event-Sourced Agent Memory

Instead of storing "extracted facts," store "facts as events":

```python
from dataclasses import dataclass
from datetime import datetime
from typing import Any, Optional
from enum import Enum

class FactType(Enum):
    OBSERVATION = "observation"
    INFERENCE = "inference"
    CORRECTION = "correction"
    RETRACTION = "retraction"

@dataclass
class MemoryEvent:
    event_id: str  # UUID for deterministic tracking
    timestamp: datetime
    fact_type: FactType
    content: str
    source: str  # Where did this fact come from?
    confidence: float  # 0.0 to 1.0
    reasoning: str  # Why did we extract this fact?
    embedding: Optional[list] = None  # Cached embedding at time of event
    model_version: str = "gpt-4-turbo-2024-04"  # Which model created this?
    metadata: dict = None
    superseded_by: Optional[str] = None  # event_id of correcting event

class EventSourcedMemory:
    def __init__(self, store_path: str):
        self.store_path = store_path
        self.events = []  # Immutable log
        self.current_state = {}  # Derived view
        self._load_from_disk()
    
    def append_observation(self, 
                          content: str, 
                          source: str,
                          confidence: float,
                          reasoning: str,
                          model_version: str) -> str:
        """
        Append an observation to the event log.
        Returns event_id for traceability.
        """
        event_id = self._generate_deterministic_id()
        embedding = self._embed(content)
        
        event = MemoryEvent(
            event_id=event_id,
            timestamp=datetime.utcnow(),
            fact_type=FactType.OBSERVATION,
            content=content,
            source=source,
            confidence=confidence,
            reasoning=reasoning,
            embedding=embedding,
            model_version=model_version
        )
        
        self.events.append(event)
        self._persist_event(event)
        self._update_derived_state(event)
        
        return event_id
    
    def append_correction(self, 
                         original_event_id: str,
                         corrected_content: str,
                         reasoning: str) -> str:
        """
        Mark a fact as corrected without deleting the original.
        This preserves the full history.
        """
        new_event_id = self._generate_deterministic_id()
        
        correction_event = MemoryEvent(
            event_id=new_event_id,
            timestamp=datetime.utcnow(),
            fact_type=FactType.CORRECTION,
            content=corrected_content,
            source=f"correction_of:{original_event_id}",
            confidence=1.0,
            reasoning=reasoning,
            embedding=self._embed(corrected_content),
            model_version="system"
        )
        
        # Mark the original as superseded
        for event in self.events:
            if event.event_id == original_event_id:
                event.superseded_by = new_event_id
                break
        
        self.events.append(correction_event)
        self._persist_event(correction_event)
        self._update_derived_state(correction_event)
        
        return new_event_id
    
    def get_memory_for_decision(self, decision_id: str) -> dict:
        """
        Reconstruct exactly what the agent "knew" at the time
        a specific decision was made. This is deterministic and auditable.
        """
        decision_timestamp = self._get_decision_timestamp(decision_id)
        
        # Find all events that were part of the agent's state at decision time
        relevant_events = [
            e for e in self.events 
            if e.timestamp <= decision_timestamp and 
               (e.superseded_by is None or 
                self._event_timestamp(e.superseded_by) > decision_timestamp)
        ]
        
        return {
            "decision_id": decision_id,
            "timestamp": decision_timestamp,
            "events": relevant_events,
            "derived_facts": self._compute_derived_facts(relevant_events)
        }
```

### Compliance and Governance

Event sourcing gives you complete auditability—every fact has an origin and lineage.

### Actionable Takeaways

- [ ] Implement an event log for your agent memory **now**. Use SQLite, PostgreSQL, or even a JSONL file.
- [ ] Keep vector indices as a performance layer, not the source of truth.
- [ ] Record the model version, confidence score, and reasoning for every extracted fact.
- [ ] Implement versioning for correction events. Never delete a fact; mark it as superseded.
- [ ] Build audit tools that can reconstruct agent state at any point in time.
- [ ] For regulated industries, this isn't optional—it's table stakes.

---

## Related Posts

- [The Tool-Use Illusion: Why Most Agent Frameworks Fail at Production Scale](/blog/tool-use-illusion)
- [The Hallucination Budget: Quantifying Risk for Mission-Critical Agents](/blog/hallucination-budget)
- [Orchestrating Agents at Scale: When You Need a Supervisor, Not a Bigger Model](/blog/orchestrating-agents-scale)