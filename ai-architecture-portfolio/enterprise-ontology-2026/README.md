# Ontology in Enterprise AI: Mapping the Architecture Patterns

An assessment of Microsoft Fabric IQ, Databricks Genie Ontology, Palantir, GraphRAG, OpenAI and Anthropic.

Ontology now appears across several layers of the enterprise AI stack. In Microsoft Fabric IQ it is used to model business entities and relationships. Databricks Genie Ontology focuses on enterprise context and authority for Genie. Palantir extends ontology into applications and actions. GraphRAG uses graph structure to support retrieval. OpenAI and Anthropic mainly work with context supplied by connected enterprise systems.

The terminology overlaps, but the architectural roles are quite different. This assessment places each technology in context by looking at what it builds, how the graph is used, and where governance is applied.

## Scope of the assessment

I am using five questions to place each architecture in context:

- What does the platform treat as the ontology or graph?
- How is that model created and maintained?
- What happens when a user or agent asks a question?
- Which parts are governed explicitly?
- Which parts are inferred or generated from existing enterprise activity?

## Product evolution and current status

The public product milestones most relevant to the current ontology landscape are:

- **May 2025:** Microsoft introduced Digital Twin Builder in Fabric Real-Time Intelligence Preview, using entity types, properties and relationships to model operational data.
- **November 2025:** Microsoft introduced Fabric IQ. Microsoft Learn continues to document Ontology as Preview.
- **June 2026:** Databricks announced Genie Ontology with Genie One and Genie Agents during the Data + AI Summit period.
- **June to August 2026:** Databricks rolled Genie Ontology and ontology snippets through Public Preview stages.

Timeline references: [Microsoft, May 2025](https://azure.microsoft.com/en-us/blog/powering-the-next-ai-frontier-with-microsoft-fabric-and-the-azure-data-portfolio/) · [Microsoft Fabric documentation](https://learn.microsoft.com/en-us/fabric/iq/ontology/overview) · [Databricks 2026 release notes](https://docs.databricks.com/gcp/en/ai-bi/release-notes/2026)

## Architecture assessment

### Microsoft Fabric IQ Ontology

Microsoft Fabric IQ Ontology defines entity types, properties, relationships and rules, then binds those definitions to data in OneLake. Fabric creates an instance graph from that model so the graph represents actual business objects and their relationships.

The model can be used to navigate business relationships such as Plant, Equipment, Sensor and Work Order without requiring the user to work directly with the underlying physical tables and joins.

- A Power BI semantic model can be used to generate a starting ontology.
- The ontology can bind to lakehouse, Eventhouse and Power BI semantic-model data.
- The graph supports relationship traversal and agent grounding.

### Databricks Genie Ontology

Databricks Genie Ontology focuses on the enterprise context used by Genie. That context can include governed definitions, SQL, dashboards, metric views, agents and usage signals. Databricks uses the ontology layer to capture and rank that context.

The context can include a business definition, a rule, a governed asset, a usage signal or information about source authority. These signals help Genie determine which context should be used for a question.

- Genie creates knowledge snippets from governed and inferred context.
- Authority uses signals described by Databricks such as origin, usage and freshness.
- Relevant context is ranked and permission-checked before the answer is produced.

### Palantir Ontology

Palantir Ontology includes objects, properties and links together with functions, actions and security. Applications can use the ontology as part of operational workflows as well as for retrieval and analysis.

### Neo4j GraphRAG

GraphRAG systems built with Neo4j use graph structure to improve retrieval. The graph may already exist in structured data, or an LLM may extract entities and relationships from documents, tickets, PDFs, emails or other unstructured material.

The advantage appears when an answer depends on several connected facts that do not sit in one text chunk. Retrieval can start from a matching entity or passage and then expand through graph relationships.

### OpenAI and Anthropic

OpenAI and Anthropic mainly operate at the agent and context-consumption layer in this assessment. Their agents retrieve and assemble context from connected enterprise systems. That context may come from a governed ontology, a graph database, search, documents or tools exposed through MCP.

## Roles played by the graph

Across these architectures, graph structure is used in several different ways:

- **Fabric IQ:** a business entity graph used to traverse real business objects and their relationships.
- **Genie Ontology:** a context and authority graph used to rank definitions, snippets and governed assets.
- **GraphRAG:** a retrieval graph used to expand search through entity relationships.
- **Palantir:** an operational graph that combines object retrieval with governed functions and actions.

## Architecture summary

| Technology | What is built | How it is built | Primary use |
|---|---|---|---|
| Microsoft Fabric IQ Ontology | Governed business entity model and instance graph | Manual modeling or generation from semantic models, then data binding | Business relationship traversal, analytics, reasoning and agent grounding |
| Databricks Genie Ontology | Enterprise context and authority graph | Governed semantics plus knowledge inferred from assets and usage | Retrieve, rank and resolve the context used by Genie |
| Palantir Ontology | Operational business object model | Objects, links, properties, functions, actions and security | Applications, decisions, workflows and agents |
| Neo4j GraphRAG | Knowledge graph | Structured data or LLM extraction from unstructured content | Relationship-based retrieval and multi-step reasoning |
| OpenAI and Anthropic | Agent runtime context | Search, connectors, MCP and tools | Consume context owned by enterprise systems |

## Governance and generated context

Some enterprise concepts still need explicit ownership and governance, especially definitions such as Customer, Revenue, Product, Asset, Contract and Supplier when they drive reporting, controls or operational decisions. Generated context can cover a much larger body of knowledge, but discovered knowledge should remain distinguishable from approved enterprise definitions.

These capabilities can coexist in the same enterprise architecture. A governed ontology can define stable business meaning. GraphRAG can surface relationships from unstructured content. Genie can rank context already present in the data estate. Agent platforms can consume those layers at runtime.

---

This assessment is part of my broader [Enterprise AI Architecture Portfolio](../README.md).