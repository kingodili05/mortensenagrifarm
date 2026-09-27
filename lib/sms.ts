// A2P 10DLC / CTIA-TCPA compliance constants for the SMS program.
// Keep consent strings as the single source of truth: the exact text shown
// on the opt-in checkbox is also what gets persisted with every consent record.

export const SMS_PROGRAM_NAME = "Mortensen AgriSupply Alerts";

export const SMS_PROGRAM_DESCRIPTION =
  "Order confirmations, delivery and pickup scheduling, equipment and fertilizer availability updates, and account notifications. Occasional promotional offers only if you separately opt in.";

export const SMS_CONSENT_TEXT =
  "I agree to receive order, delivery, and account text messages from Mortensen AgriSupply at the number provided. Message frequency varies. Message and data rates may apply. Reply STOP to opt out, HELP for help. Consent is not a condition of purchase. See our Terms and Privacy Policy.";

export const SMS_MARKETING_CONSENT_TEXT =
  "I'd also like to receive occasional promotional and marketing text messages from Mortensen AgriSupply. Message frequency varies. Message and data rates may apply. Reply STOP to opt out anytime.";

export const SMS_SUCCESS_MESSAGE =
  "You're signed up for Mortensen AgriSupply Alerts. Reply STOP anytime to opt out.";
