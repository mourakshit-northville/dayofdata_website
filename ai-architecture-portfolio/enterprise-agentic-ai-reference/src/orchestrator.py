"""Illustrative enterprise agent orchestration pattern.

This example is intentionally vendor-neutral. It demonstrates how to keep model
reasoning separate from authorization and execution controls.
"""

from dataclasses import dataclass
from enum import Enum
from typing import Any, Callable


class RiskLevel(str, Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"


@dataclass(frozen=True)
class ToolRequest:
    tool_name: str
    arguments: dict[str, Any]
    risk: RiskLevel


@dataclass(frozen=True)
class UserContext:
    user_id: str
    roles: set[str]
    approved_tools: set[str]


class PolicyViolation(Exception):
    pass


class ApprovalRequired(Exception):
    pass


class ToolGateway:
    def __init__(self, registry: dict[str, Callable[..., Any]]) -> None:
        self.registry = registry

    def execute(self, request: ToolRequest, user: UserContext) -> Any:
        self._authorize(request, user)
        if request.risk is RiskLevel.HIGH:
            raise ApprovalRequired(
                f"Human approval required before executing {request.tool_name}."
            )
        return self.registry[request.tool_name](**request.arguments)

    def _authorize(self, request: ToolRequest, user: UserContext) -> None:
        if request.tool_name not in self.registry:
            raise PolicyViolation(f"Unknown tool: {request.tool_name}")
        if request.tool_name not in user.approved_tools:
            raise PolicyViolation(
                f"User {user.user_id} is not authorized for {request.tool_name}."
            )


def build_tool_request(model_plan: dict[str, Any]) -> ToolRequest:
    """Convert structured model output into an independently validated request."""
    required = {"tool_name", "arguments", "risk"}
    missing = required - model_plan.keys()
    if missing:
        raise ValueError(f"Missing required plan fields: {sorted(missing)}")

    return ToolRequest(
        tool_name=str(model_plan["tool_name"]),
        arguments=dict(model_plan["arguments"]),
        risk=RiskLevel(str(model_plan["risk"])),
    )


def example_lookup(customer_id: str) -> dict[str, str]:
    return {"customer_id": customer_id, "status": "active"}


if __name__ == "__main__":
    user = UserContext(
        user_id="demo-user",
        roles={"analyst"},
        approved_tools={"lookup_customer"},
    )
    gateway = ToolGateway({"lookup_customer": example_lookup})

    proposed_plan = {
        "tool_name": "lookup_customer",
        "arguments": {"customer_id": "C-1001"},
        "risk": "low",
    }

    request = build_tool_request(proposed_plan)
    print(gateway.execute(request, user))
