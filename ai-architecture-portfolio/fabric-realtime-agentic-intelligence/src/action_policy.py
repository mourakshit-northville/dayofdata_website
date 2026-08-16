"""Illustrative risk-aware action policy for real-time agent workflows."""

from dataclasses import dataclass
from enum import Enum


class ActionRisk(str, Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"


@dataclass(frozen=True)
class ProposedAction:
    action_type: str
    target: str
    confidence: float
    risk: ActionRisk


@dataclass(frozen=True)
class ActionDecision:
    execute: bool
    requires_approval: bool
    reason: str


def decide(action: ProposedAction) -> ActionDecision:
    if action.confidence < 0.70:
        return ActionDecision(
            execute=False,
            requires_approval=False,
            reason="Insufficient confidence; collect more real-time evidence.",
        )

    if action.risk is ActionRisk.HIGH:
        return ActionDecision(
            execute=False,
            requires_approval=True,
            reason="High-impact action requires human approval.",
        )

    if action.action_type not in {"notify", "open_incident", "request_diagnosis"}:
        return ActionDecision(
            execute=False,
            requires_approval=True,
            reason="Action is outside the automatic allowlist.",
        )

    return ActionDecision(
        execute=True,
        requires_approval=False,
        reason="Action is within policy and may be automated.",
    )


if __name__ == "__main__":
    proposed = ProposedAction(
        action_type="open_incident",
        target="service-checkout",
        confidence=0.94,
        risk=ActionRisk.MEDIUM,
    )
    print(decide(proposed))
