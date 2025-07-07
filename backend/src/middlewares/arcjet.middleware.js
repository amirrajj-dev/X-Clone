export const arcjetMiddleware = async (req, res, next) => {
  try {
    // Skip Arcjet for mobile clients (like React Native)
    const userAgent = req.headers['user-agent'] || '';
    if (/okhttp|reactnative|expo/i.test(userAgent)) {
      return next(); // skip bot check for mobile app
    }

    const decision = await aj.protect(req, { requested: 1 });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res.status(429).json({
          error: "Too Many Requests",
          message: "Rate limit exceeded. Please try again later.",
          success: false
        });
      } else if (decision.reason.isBot()) {
        return res.status(403).json({
          error: "Bot access denied",
          message: "Automated requests are not allowed.",
          success: false
        });
      } else {
        return res.status(403).json({
          error: "Forbidden",
          message: "Access denied by security policy.",
          success: false
        });
      }
    }

    // Detect spoofed bots
    if (decision.results.some(r => r.reason.isBot() && r.reason.isSpoofed())) {
      return res.status(403).json({
        error: "Spoofed bot detected",
        message: "Malicious bot activity detected.",
      });
    }

    next();
  } catch (error) {
    console.error("Arcjet middleware error:", error);
    next(); // allow requests to continue if Arcjet fails
  }
};