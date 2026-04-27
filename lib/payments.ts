export type MockPaymentIntent = {
  provider: "stub";
  reference: string;
  amount: number;
  currency: string;
  status: "pending" | "requires_action";
};

/**
 * Replace with Paystack, Stripe, etc.
 */
export function createMockPaymentIntent(request: {
  id: string;
  quoteAmount: number | null;
  quoteCurrency: string | null;
}): MockPaymentIntent {
  const amount = request.quoteAmount ?? 0;
  const currency = request.quoteCurrency ?? "NGN";
  return {
    provider: "stub",
    reference: `stub_${request.id}_${Date.now()}`,
    amount,
    currency,
    status: amount > 0 ? "pending" : "requires_action",
  };
}
