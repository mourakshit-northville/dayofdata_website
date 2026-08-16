# Enterprise AI Architecture Portfolio

[![AI Portfolio Tests](https://github.com/mourakshit-northville/dayofdata_website/actions/workflows/ai-portfolio-tests.yml/badge.svg)](https://github.com/mourakshit-northville/dayofdata_website/actions/workflows/ai-portfolio-tests.yml)

A collection of reference architectures and illustrative starter implementations for enterprise AI, data platforms, agentic systems, governance, and conversational analytics.

This portfolio is intended to show how I approach architecture decisions, trust boundaries, governance, observability, production-readiness, and engineering quality when applying modern AI capabilities to enterprise data.

## Portfolio projects

| Project | Focus |
|---|---|
| [Enterprise Agentic AI Reference Architecture](./enterprise-agentic-ai-reference/README.md) | Governed agent orchestration, retrieval, tools, evaluation, and human approval |
| [Databricks AI Governance Reference](./databricks-ai-governance/README.md) | Unity Catalog, Unity AI Gateway, MLflow, policy enforcement, lineage, and auditability |
| [Fabric Real-Time Agentic Intelligence](./fabric-realtime-agentic-intelligence/README.md) | Event-driven intelligence using Microsoft Fabric concepts, real-time context, and governed actions |
| [Governed Conversational BI with Genie](./governed-conversational-bi-genie/README.md) | Trusted natural-language analytics, semantic context, permissions, quality gates, and observability |

## Architecture principles

The projects use a consistent set of principles:

1. **Governance before autonomy** — agents receive only the identity, data, tools, and actions they are authorized to use.
2. **Ground responses in trusted enterprise context** — retrieval and semantic context should be governed and traceable.
3. **Separate reasoning from execution** — generated plans and tool actions are independently validated before execution.
4. **Human approval for material actions** — high-impact operations should support explicit approval paths.
5. **Evaluate continuously** — quality, grounding, safety, latency, and cost need observable metrics.
6. **Design for enterprise operations** — architecture should address identity, auditability, lineage, failure handling, and change management, not only model calls.

## Engineering quality

The illustrative Python controls are covered by regression tests for the behaviors that matter most in governed AI systems:

- unauthorized tools are denied;
- high-risk actions require approval;
- unapproved AI use cases are rejected;
- sensitive external actions are escalated;
- cost thresholds trigger approval;
- low-confidence real-time actions do not execute automatically;
- conversational analytics questions are checked for ambiguity, sensitive intent, and unresolved business domain.

GitHub Actions compiles and tests the examples across Python 3.11, 3.12, 3.13, and 3.14. The workflow grants only read access to repository contents and pins third-party GitHub Actions to release commit SHAs.

Run the same checks locally with:

```bash
python -m compileall -q ai-architecture-portfolio
python -m unittest discover -s ai-architecture-portfolio/tests -p "test_*.py" -v
```

## About me

I am a Principal Data & AI Solution Architect and Senior Manager focused on enterprise data and AI platforms, Applied AI, Agentic AI, Databricks, Microsoft Fabric, data engineering, governance, and real-time intelligence.

- Portfolio: https://mou-rakshit.vercel.app
- LinkedIn: https://www.linkedin.com/in/mourakshit/
- GitHub: https://github.com/mourakshit-northville
- Credly: https://www.credly.com/users/mou-rakshit.41a7198f/badges

## Important note

These are reference architectures and illustrative examples created to demonstrate technical thinking and implementation patterns. They do not contain client code, client data, proprietary employer material, secrets, or production credentials.
