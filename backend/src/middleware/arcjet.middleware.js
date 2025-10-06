import aj from "../utils/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";

export const arcjetProtection = asyncHandler(async (req, res, next) => {
  try {
    const decision = await aj.protect(req);
    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        throw new ApiError(429, "Rate limit exceeded. Please try again later.");
      } else if (decision.reason.isBot()) {
        throw new ApiError(403, "Bot access denied.");
      } else {
        throw new ApiError(403, "Access denied due to security policy.");
      }
    }

    // checking for spoofed bots
    if (decision.results.some(isSpoofedBot)) {
      throw new ApiError(
        403,
        "Spoofed bot detected. Malicious bot activity detected."
      );
    }

    next();
  } catch (error) {
    console.log("Arcjet Protection Error.", error);
    next(error);
  }
});
