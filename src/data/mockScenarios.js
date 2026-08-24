export const QR_TEST_CASES = [
  {
    id: "legit-chai",
    title: "☕ Genuine Kirana Merchant",
    merchant: "Sharma Chai Point",
    vpa: "sharmachai@okhdfcbank",
    rawUri: "upi://pay?pa=sharmachai@okhdfcbank&pn=Sharma%20Chai%20Point&mc=5411&cu=INR&tn=Tea%20and%20Snacks",
    riskScore: 4,
    status: "SAFE",
    type: "pay",
    flags: ["Verified Merchant Category (5411 - Grocery)", "Registered Banking VPA Handle", "Safe entropy ratio (0.82)"],
    recommendation: "Safe to proceed with payment."
  },
  {
    id: "quishing-tampered",
    title: "🚨 Quishing Sticker Overlap (Mule Account)",
    merchant: "Tea Stall (Overlaid Sticker)",
    vpa: "quick_refund_x98234@ibl",
    rawUri: "upi://pay?pa=quick_refund_x98234@ibl&pn=Sharma%20Tea%20Stall&cu=INR&tn=Bill%20Clearance",
    riskScore: 92,
    status: "CRITICAL",
    type: "pay",
    flags: [
      "Payee Name mismatch: Displays 'Sharma Tea Stall' but resolves to disposable mule handle 'quick_refund_x98234'",
      "High Entropy VPA created in last 48 hours",
      "Known Quishing sticker replacement pattern flagged in locality database"
    ],
    recommendation: "PAYMENT BLOCKED! Physical QR overlay detected. Notify shopkeeper immediately."
  },
  {
    id: "fake-cashback-collect",
    title: "⚠️ Disguised Collect Request (Cashback Scam)",
    merchant: "Rewards Desk (Disguised)",
    vpa: "cashback_settle_claim@ybl",
    rawUri: "upi://collect?pa=cashback_settle_claim@ybl&pn=GPay%20Scratch%20Reward&am=4999.00&cu=INR&tn=Enter%20PIN%20To%20Credit%20Refund",
    riskScore: 98,
    status: "CRITICAL",
    type: "collect",
    flags: [
      "Deceptive Intent: URI is 'upi://collect' disguised as a reward receipt",
      "Preset Amount injection (₹4,999.00 will be DEBITED from your account)",
      "Coercive note: 'Enter PIN To Credit Refund' — violates NPCI protocol (PIN is NEVER needed to receive money)"
    ],
    recommendation: "DANGER! Entering your UPI PIN will DEDUCT ₹4,999 from your bank account."
  },
  {
    id: "amount-tamper",
    title: "⚡ Dynamic Parking QR with Injected Surcharge",
    merchant: "Metro Parking Authority",
    vpa: "metroparking@axisbank",
    rawUri: "upi://pay?pa=metroparking@axisbank&pn=Metro%20Parking&am=1500.00&cu=INR&tn=Express%20Parking%20Slot%205",
    riskScore: 68,
    status: "WARNING",
    type: "pay",
    flags: [
      "Unexpected Fixed Amount: Injected ₹1,500 for a standard ₹30 parking slot",
      "Valid Payee Handle but dynamic pricing anomaly detected",
      "Manual confirmation required before biometric approval"
    ],
    recommendation: "Warning: Verify amount manually before proceeding."
  }
];

export const SCAM_SCENARIOS = [
  {
    id: "scam-electricity",
    category: "Coercive Utility Threat",
    sender: "+91 98765 43210 (Spoofed BESCOM/Tata Power)",
    snippet: "URGENT: Dear Consumer, your Electricity power will be DISCONNECTED tonight at 9:30 PM because your previous month bill was not updated. Immediately call Electricity Officer Verma at 9876543210 or click bit.ly/power-bill-fix to update.",
    intent: "Urgency Manipulation + Phishing Link",
    riskScore: 96,
    threatTokens: ["DISCONNECTED tonight", "Immediately call", "bit.ly/power-bill-fix", "Electricity Officer"],
    aiExplanation: "Classic panic-inducing utility disconnection scam. Government discoms never send unofficial bit.ly links or mobile numbers for disconnection.",
    suggestedAction: "Block Sender & Report to 1930 Cyber Fraud Helpline"
  },
  {
    id: "scam-pin-reward",
    category: "Reverse PIN Deception",
    sender: "OLX Buyer / WhatsApp Call",
    snippet: "Sir, I have sent you a payment request for ₹8,500 on PhonePe for your used sofa. Please open your UPI app and enter your 6-digit PIN so that money gets credited to your account instantly.",
    intent: "Reverse UPI PIN Theft",
    riskScore: 99,
    threatTokens: ["enter your 6-digit PIN", "money gets credited", "payment request"],
    aiExplanation: "CRITICAL: You NEVER enter your UPI PIN to RECEIVE money. Entering your PIN authorizes a DEBIT from your bank account.",
    suggestedAction: "Emergency Lockdown: Blocked UPI Intent Screen"
  },
  {
    id: "scam-anydesk",
    category: "Remote Desktop Takeover",
    sender: "Fake Bank KYC Support Agent",
    snippet: "Your SBI Yono account has been suspended due to pending PAN card verification. Please install 'QuickSupport' / 'AnyDesk' from Play Store and share the 9-digit session code with me so I can complete your online KYC.",
    intent: "Screen Sharing & Credential Harvesting",
    riskScore: 97,
    threatTokens: ["account suspended", "QuickSupport", "AnyDesk", "share 9-digit session code"],
    aiExplanation: "Remote access scam attempt. Granting AnyDesk access allows fraudster to view OTPs and control your banking apps remotely.",
    suggestedAction: "App Lockdown Triggered: Terminating Background Screen-Share"
  },
  {
    id: "safe-bank-otp",
    category: "Legitimate Bank OTP",
    sender: "VK-HDFCBK",
    snippet: "492018 is your OTP for transaction of INR 450.00 at SWIGGY BANGALORE using HDFC Bank Card ending 4012. Valid for 10 mins. Do not share OTP with anyone including bank staff.",
    intent: "Legitimate Authentication",
    riskScore: 3,
    threatTokens: [],
    aiExplanation: "Legitimate automated transactional OTP with standard anti-sharing security warning and verifiable merchant context.",
    suggestedAction: "Safe: Ready for Auto-Fill"
  }
];

export const RECEIPT_TEST_CASES = [
  {
    id: "fake-paytm-app",
    title: "❌ Fake Paytm Spoof App Screenshot",
    amount: "₹ 2,450.00",
    claimedTime: "Just Now (21:04 PM)",
    utrNumber: "421900812903",
    status: "SPOOFED_FAKE",
    confidence: 97.4,
    detectedAnomalies: [
      "Font Kerning: Mismatched Roboto Slab font on Amount text (indicates dynamic spoof overlay)",
      "Missing Animation Hash: Static image without micro-tick pulse signature",
      "UTR Checksum Invalid: Luhn mod-10 check failed for banking branch routing code",
      "Missing Bank Reference Soundwave pattern"
    ]
  },
  {
    id: "genuine-gpay-receipt",
    title: "✅ Genuine Google Pay Merchant Confirmation",
    amount: "₹ 320.00",
    claimedTime: "21:02 PM",
    utrNumber: "423610982341",
    status: "AUTHENTIC",
    confidence: 99.1,
    detectedAnomalies: [
      "All NPCI cryptographic watermarks matched",
      "Standard vector font rendering verified",
      "Valid 12-digit RRN / UTR sequence verified with local bank settlement cache"
    ]
  }
];
