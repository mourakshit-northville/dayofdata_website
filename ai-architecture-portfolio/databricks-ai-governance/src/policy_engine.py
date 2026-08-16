"""Illustrative application-policy layer for governed Databricks AI workloads.

This file does not call Databricks APIs. It demonstrates deterministic business
controls that complement platform-level governance such as Unity Catalog and
Unity AI Gateway.
"""

from dataclasses import dataclass
from enum import Enum


class Decision(str, Enum):
    ALLOW = "allow"
    DENY = "deny"
    REQUIRE_APPROVAL = "require_approval"


@dataclass(frozen=True)
class AIRequest:
    user_id: str
    use_case: str
    model_service: str
    estimated_cost_usd: float
    contains_sensitive_data: bool
    performs_external_action: bool


@dataclass(frozen=True)
class PolicyConfig:
    allowed_use_cases: set[str]
    allowed_model_services: set[str]
    approval_cost_threshold_usd: float = 5.0


def evaluate_request(request: AIRequest, config: PolicyConfig) -> tuple[Decision, str]:
    if request.use_case not in config.allowed_use_cases:
        return Decision.DENY, "Use case is not approved."

    if request.model_service not in config.allowed_model_services:
        return Decision.DENY, "Model service is not approved for this application."

    if request.contains_sensitive_data and request.performs_external_action:
        return Decision.REQUIRE_APPROVAL, (
            "Sensitive data combined with an external action requires approval."
        )

    if request.estimated_cost_usd >= config.approval_cost_threshold_usd:
        return Decision.REQUIRE_APPROVAL, "Estimated request cost exceeds threshold."

    return Decision.ALLOW, "Request satisfies application policy."


if __name__ == "__main__":
    config = PolicyConfig(
        allowed_use_cases={"customer-support", "analytics-assistant"},
        allowed_model_services={"enterprise-general", "enterprise-reasoning"},
    )

    request = AIRequest(
        user_id="demo-user",
        use_case="analytics-assistant",
        model_service="enterprise-general",
        estimated_cost_usd=0.18,
        contains_sensitive_data=False,
        performs_external_action=False,
    )

    print(evaluate_request(request, config))
