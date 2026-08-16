"""Illustrative pre-query quality gate for conversational analytics."""

from dataclasses import dataclass, field


AMBIGUOUS_TERMS = {
    "revenue": "Specify gross, net, recognized, booked, or another governed definition.",
    "customer": "Specify account, household, legal entity, subscriber, or another domain definition.",
    "active": "Specify the activity window and qualifying event.",
    "margin": "Specify gross, contribution, operating, or another governed definition.",
}

SENSITIVE_INTENTS = {
    "employee salary",
    "social security number",
    "medical diagnosis",
    "credit card number",
}


@dataclass(frozen=True)
class QualityGateResult:
    proceed: bool
    clarifications: list[str] = field(default_factory=list)
    warnings: list[str] = field(default_factory=list)


def evaluate_question(question: str, known_domain: str | None = None) -> QualityGateResult:
    normalized = question.lower().strip()
    clarifications: list[str] = []
    warnings: list[str] = []

    for term, guidance in AMBIGUOUS_TERMS.items():
        if term in normalized:
            clarifications.append(f"'{term}' may be ambiguous. {guidance}")

    for sensitive_intent in SENSITIVE_INTENTS:
        if sensitive_intent in normalized:
            warnings.append(
                "Question may involve sensitive data; verify authorization and policy before querying."
            )
            break

    if not known_domain:
        clarifications.append("Resolve the business domain before selecting governed data assets.")

    proceed = not clarifications and not warnings
    return QualityGateResult(
        proceed=proceed,
        clarifications=clarifications,
        warnings=warnings,
    )


if __name__ == "__main__":
    result = evaluate_question(
        "Why did revenue decline last week?",
        known_domain="finance",
    )
    print(result)
