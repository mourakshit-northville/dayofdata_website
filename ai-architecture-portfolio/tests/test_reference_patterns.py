"""Regression tests for the illustrative AI architecture reference patterns.

The portfolio deliberately keeps examples dependency-light. These tests use only
Python's standard library so they can run in GitHub Actions without installing a
project-specific test stack.
"""

from __future__ import annotations

import importlib.util
from pathlib import Path
import unittest


PORTFOLIO_ROOT = Path(__file__).resolve().parents[1]


def load_module(name: str, relative_path: str):
    path = PORTFOLIO_ROOT / relative_path
    spec = importlib.util.spec_from_file_location(name, path)
    if spec is None or spec.loader is None:
        raise RuntimeError(f"Unable to load {path}")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


agent = load_module(
    "agent_orchestrator",
    "enterprise-agentic-ai-reference/src/orchestrator.py",
)
databricks = load_module(
    "databricks_policy",
    "databricks-ai-governance/src/policy_engine.py",
)
fabric = load_module(
    "fabric_action_policy",
    "fabric-realtime-agentic-intelligence/src/action_policy.py",
)
genie = load_module(
    "genie_quality_gate",
    "governed-conversational-bi-genie/src/question_quality_gate.py",
)


class EnterpriseAgentTests(unittest.TestCase):
    def setUp(self) -> None:
        self.user = agent.UserContext(
            user_id="analyst-1",
            roles={"analyst"},
            approved_tools={"lookup_customer"},
        )
        self.gateway = agent.ToolGateway(
            {"lookup_customer": lambda customer_id: {"customer_id": customer_id}}
        )

    def test_low_risk_authorized_tool_executes(self) -> None:
        request = agent.ToolRequest(
            tool_name="lookup_customer",
            arguments={"customer_id": "C-1001"},
            risk=agent.RiskLevel.LOW,
        )
        self.assertEqual(
            self.gateway.execute(request, self.user),
            {"customer_id": "C-1001"},
        )

    def test_unapproved_tool_is_denied(self) -> None:
        request = agent.ToolRequest(
            tool_name="delete_customer",
            arguments={},
            risk=agent.RiskLevel.HIGH,
        )
        with self.assertRaises(agent.PolicyViolation):
            self.gateway.execute(request, self.user)

    def test_high_risk_action_requires_approval(self) -> None:
        request = agent.ToolRequest(
            tool_name="lookup_customer",
            arguments={"customer_id": "C-1001"},
            risk=agent.RiskLevel.HIGH,
        )
        with self.assertRaises(agent.ApprovalRequired):
            self.gateway.execute(request, self.user)

    def test_model_plan_requires_structured_fields(self) -> None:
        with self.assertRaises(ValueError):
            agent.build_tool_request({"tool_name": "lookup_customer"})


class DatabricksGovernanceTests(unittest.TestCase):
    def setUp(self) -> None:
        self.config = databricks.PolicyConfig(
            allowed_use_cases={"analytics-assistant"},
            allowed_model_services={"enterprise-general"},
            approval_cost_threshold_usd=5.0,
        )

    def test_approved_request_is_allowed(self) -> None:
        request = databricks.AIRequest(
            user_id="user-1",
            use_case="analytics-assistant",
            model_service="enterprise-general",
            estimated_cost_usd=0.25,
            contains_sensitive_data=False,
            performs_external_action=False,
        )
        decision, _ = databricks.evaluate_request(request, self.config)
        self.assertEqual(decision, databricks.Decision.ALLOW)

    def test_unapproved_use_case_is_denied(self) -> None:
        request = databricks.AIRequest(
            user_id="user-1",
            use_case="unapproved-experiment",
            model_service="enterprise-general",
            estimated_cost_usd=0.25,
            contains_sensitive_data=False,
            performs_external_action=False,
        )
        decision, _ = databricks.evaluate_request(request, self.config)
        self.assertEqual(decision, databricks.Decision.DENY)

    def test_sensitive_external_action_requires_approval(self) -> None:
        request = databricks.AIRequest(
            user_id="user-1",
            use_case="analytics-assistant",
            model_service="enterprise-general",
            estimated_cost_usd=0.25,
            contains_sensitive_data=True,
            performs_external_action=True,
        )
        decision, _ = databricks.evaluate_request(request, self.config)
        self.assertEqual(decision, databricks.Decision.REQUIRE_APPROVAL)

    def test_high_cost_request_requires_approval(self) -> None:
        request = databricks.AIRequest(
            user_id="user-1",
            use_case="analytics-assistant",
            model_service="enterprise-general",
            estimated_cost_usd=8.0,
            contains_sensitive_data=False,
            performs_external_action=False,
        )
        decision, _ = databricks.evaluate_request(request, self.config)
        self.assertEqual(decision, databricks.Decision.REQUIRE_APPROVAL)


class FabricRealtimeTests(unittest.TestCase):
    def test_low_confidence_action_does_not_execute(self) -> None:
        decision = fabric.decide(
            fabric.ProposedAction(
                action_type="notify",
                target="service-a",
                confidence=0.55,
                risk=fabric.ActionRisk.LOW,
            )
        )
        self.assertFalse(decision.execute)
        self.assertFalse(decision.requires_approval)

    def test_high_risk_action_requires_approval(self) -> None:
        decision = fabric.decide(
            fabric.ProposedAction(
                action_type="open_incident",
                target="service-a",
                confidence=0.95,
                risk=fabric.ActionRisk.HIGH,
            )
        )
        self.assertFalse(decision.execute)
        self.assertTrue(decision.requires_approval)

    def test_allowlisted_medium_risk_action_executes(self) -> None:
        decision = fabric.decide(
            fabric.ProposedAction(
                action_type="open_incident",
                target="service-a",
                confidence=0.95,
                risk=fabric.ActionRisk.MEDIUM,
            )
        )
        self.assertTrue(decision.execute)
        self.assertFalse(decision.requires_approval)


class GenieQualityTests(unittest.TestCase):
    def test_clear_governed_question_can_proceed(self) -> None:
        result = genie.evaluate_question(
            "Show order count by region for last week",
            known_domain="sales",
        )
        self.assertTrue(result.proceed)

    def test_ambiguous_metric_requires_clarification(self) -> None:
        result = genie.evaluate_question(
            "Why did revenue fall last week?",
            known_domain="finance",
        )
        self.assertFalse(result.proceed)
        self.assertTrue(any("revenue" in item for item in result.clarifications))

    def test_sensitive_question_warns_before_querying(self) -> None:
        result = genie.evaluate_question(
            "Show employee salary by department",
            known_domain="hr",
        )
        self.assertFalse(result.proceed)
        self.assertTrue(result.warnings)

    def test_unknown_domain_requires_resolution(self) -> None:
        result = genie.evaluate_question("Show order count by region")
        self.assertFalse(result.proceed)
        self.assertTrue(any("business domain" in item for item in result.clarifications))


if __name__ == "__main__":
    unittest.main()
