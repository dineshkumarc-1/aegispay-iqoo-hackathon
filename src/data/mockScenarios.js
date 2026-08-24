// Existing Technical Security Test Cases (Preserved 100%)
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
      "Known Quishing sticker replacement pattern flagged in locality database",
      "3D Parallax Optical depth anomaly: +0.35mm physical paper step detected"
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

// ==========================================
// REALISTIC FINTECH & RETAIL COMMERCE DATA
// ==========================================

export const COMMERCE_TRANSACTIONS = [
  {
    id: "TXN_98234109",
    utr: "423610982341",
    customer: "Aditi Sharma",
    email: "aditi.sharma@gmail.com",
    phone: "+91 98450 12384",
    amount: 1450.00,
    currency: "INR",
    method: "UPI QR (PhonePe)",
    terminalId: "TERM_BLR_04",
    date: "2026-08-24 22:45",
    timestamp: "12 mins ago",
    status: "COMPLETED",
    riskLevel: "LOW",
    riskScore: 6,
    items: [
      { name: "Organic Assam Green Tea (500g)", qty: 2, price: 900.00 },
      { name: "Raw Himalayan Honey (250g)", qty: 1, price: 550.00 }
    ],
    riskDetails: {
      quishingCheck: "PASS (0.01mm depth, verified VPA)",
      vpaEntropy: "SAFE (aditi@ybl registered 2021)",
      settlementStatus: "Settled to HDFC Bank A/c ...4012"
    }
  },
  {
    id: "TXN_98234108",
    utr: "423610982340",
    customer: "Rajesh Patel",
    email: "r.patel88@outlook.com",
    phone: "+91 99201 44819",
    amount: 4999.00,
    currency: "INR",
    method: "UPI Intent (GPay)",
    terminalId: "TERM_BLR_01",
    date: "2026-08-24 22:31",
    timestamp: "26 mins ago",
    status: "UNDER_REVIEW",
    riskLevel: "CRITICAL",
    riskScore: 94,
    items: [
      { name: "Disguised Collect Reward Request", qty: 1, price: 4999.00 }
    ],
    riskDetails: {
      quishingCheck: "BLOCKED (Deceptive upi://collect disguised as reward)",
      vpaEntropy: "CRITICAL (Discovered high-entropy mule vpa: cashback_claim@ybl)",
      settlementStatus: "Payment frozen on device by AegisPay"
    }
  },
  {
    id: "TXN_98234107",
    utr: "423610982339",
    customer: "Karthik Sundaram",
    email: "karthik.s@zoho.com",
    phone: "+91 94440 99120",
    amount: 320.00,
    currency: "INR",
    method: "UPI QR (Paytm)",
    terminalId: "TERM_BLR_04",
    date: "2026-08-24 22:15",
    timestamp: "42 mins ago",
    status: "COMPLETED",
    riskLevel: "LOW",
    riskScore: 4,
    items: [
      { name: "Special Masala Chai + Samosa Box", qty: 4, price: 320.00 }
    ],
    riskDetails: {
      quishingCheck: "PASS (Verified merchant store handle)",
      vpaEntropy: "SAFE",
      settlementStatus: "Settled to SBI Current A/c ...8810"
    }
  },
  {
    id: "TXN_98234106",
    utr: "423610982338",
    customer: "Priya Nair",
    email: "priya.nair@icloud.com",
    phone: "+91 97401 22819",
    amount: 2450.00,
    currency: "INR",
    method: "Counterfeit App (Blocked)",
    terminalId: "TERM_BLR_02",
    date: "2026-08-24 21:50",
    timestamp: "1 hr ago",
    status: "FAILED",
    riskLevel: "HIGH",
    riskScore: 97,
    items: [
      { name: "Alphonso Mango Pulp Cans (3x)", qty: 3, price: 2450.00 }
    ],
    riskDetails: {
      quishingCheck: "BLOCKED (CV Font kerning mismatch & invalid Luhn UTR)",
      vpaEntropy: "SPOOFED_SCREENSHOT",
      settlementStatus: "No funds arrived at merchant bank. Cashier alerted."
    }
  },
  {
    id: "TXN_98234105",
    utr: "423610982337",
    customer: "Vikram Malhotra",
    email: "vikram.m@techcorp.in",
    phone: "+91 98110 55432",
    amount: 8750.00,
    currency: "INR",
    method: "Debit Card (Razorpay POS)",
    terminalId: "TERM_BLR_01",
    date: "2026-08-24 21:10",
    timestamp: "2 hrs ago",
    status: "COMPLETED",
    riskLevel: "LOW",
    riskScore: 8,
    items: [
      { name: "Premium Filter Coffee Maker", qty: 1, price: 6250.00 },
      { name: "Coorg Arabica Roast (1kg)", qty: 1, price: 2500.00 }
    ],
    riskDetails: {
      quishingCheck: "PASS (EMV Chip + PIN Authorized)",
      vpaEntropy: "N/A",
      settlementStatus: "Settled to HDFC Bank A/c ...4012"
    }
  },
  {
    id: "TXN_98234104",
    utr: "423610982336",
    customer: "Sneha Rao",
    email: "sneha.rao@gmail.com",
    phone: "+91 96320 11984",
    amount: 1500.00,
    currency: "INR",
    method: "UPI QR (BHIM)",
    terminalId: "TERM_BLR_03",
    date: "2026-08-24 20:30",
    timestamp: "3 hrs ago",
    status: "REFUNDED",
    riskLevel: "MEDIUM",
    riskScore: 68,
    items: [
      { name: "Dynamic Parking Slot Booking (Surcharge Injected)", qty: 1, price: 1500.00 }
    ],
    riskDetails: {
      quishingCheck: "WARNING (Injected surcharge flagged)",
      vpaEntropy: "SAFE",
      settlementStatus: "Refunded ₹1,470 back to user after correcting surcharge"
    }
  },
  {
    id: "TXN_98234103",
    utr: "423610982335",
    customer: "Amitav Ghosh",
    email: "amitav.g@kolkata.org",
    phone: "+91 98300 77123",
    amount: 680.00,
    currency: "INR",
    method: "UPI Intent (Cred Pay)",
    terminalId: "TERM_BLR_04",
    date: "2026-08-24 19:45",
    timestamp: "4 hrs ago",
    status: "COMPLETED",
    riskLevel: "LOW",
    riskScore: 2,
    items: [
      { name: "Darjeeling First Flush Tea (200g)", qty: 1, price: 680.00 }
    ],
    riskDetails: {
      quishingCheck: "PASS",
      vpaEntropy: "SAFE",
      settlementStatus: "Settled"
    }
  },
  {
    id: "TXN_98234102",
    utr: "423610982334",
    customer: "Deepak Choudhary",
    email: "deepak.c@jaipur.biz",
    phone: "+91 94140 33819",
    amount: 12400.00,
    currency: "INR",
    method: "NetBanking (HDFC)",
    terminalId: "TERM_BLR_01",
    date: "2026-08-24 18:20",
    timestamp: "5 hrs ago",
    status: "COMPLETED",
    riskLevel: "LOW",
    riskScore: 5,
    items: [
      { name: "Commercial Espresso Grinder Parts", qty: 2, price: 12400.00 }
    ],
    riskDetails: {
      quishingCheck: "PASS",
      vpaEntropy: "SAFE",
      settlementStatus: "Settled"
    }
  }
];

export const COMMERCE_PRODUCTS = [
  {
    id: "PRD_001",
    sku: "TEA-ASS-01",
    name: "Organic Assam CTC Tea (1kg)",
    category: "Beverages & Pantry",
    price: 480.00,
    inventory: 142,
    status: "IN_STOCK",
    sales30d: 384,
    rating: 4.8
  },
  {
    id: "PRD_002",
    sku: "COF-CRG-02",
    name: "Coorg Single Origin Arabica Beans (500g)",
    category: "Beverages & Pantry",
    price: 650.00,
    inventory: 18,
    status: "LOW_STOCK",
    sales30d: 219,
    rating: 4.9
  },
  {
    id: "PRD_003",
    sku: "HON-HIM-03",
    name: "Raw Himalayan Multi-Flora Honey (500g)",
    category: "Organic Grocery",
    price: 550.00,
    inventory: 64,
    status: "IN_STOCK",
    sales30d: 180,
    rating: 4.7
  },
  {
    id: "PRD_004",
    sku: "RIC-BAS-04",
    name: "Royal Aged Basmati Rice (5kg Bag)",
    category: "Grains & Staples",
    price: 920.00,
    inventory: 8,
    status: "LOW_STOCK",
    sales30d: 142,
    rating: 4.6
  },
  {
    id: "PRD_005",
    sku: "MCH-STM-05",
    name: "Retail Steam Milk Frother (Commercial)",
    category: "Store Equipment",
    price: 4250.00,
    inventory: 0,
    status: "OUT_OF_STOCK",
    sales30d: 24,
    rating: 4.9
  },
  {
    id: "PRD_006",
    sku: "SPC-KRL-06",
    name: "Kerala Cardamom & Cinnamon Spice Pack (250g)",
    category: "Organic Grocery",
    price: 380.00,
    inventory: 95,
    status: "IN_STOCK",
    sales30d: 310,
    rating: 4.8
  }
];

export const COMMERCE_ORDERS = [
  {
    id: "ORD_78912",
    customer: "Aditi Sharma",
    itemsCount: 3,
    total: 1450.00,
    paymentStatus: "PAID",
    fulfillmentStatus: "FULFILLED",
    date: "Today, 22:45",
    channel: "Retail POS Terminal #04"
  },
  {
    id: "ORD_78911",
    customer: "Karthik Sundaram",
    itemsCount: 4,
    total: 320.00,
    paymentStatus: "PAID",
    fulfillmentStatus: "FULFILLED",
    date: "Today, 22:15",
    channel: "QR Pay & Dine-In"
  },
  {
    id: "ORD_78910",
    customer: "Vikram Malhotra",
    itemsCount: 2,
    total: 8750.00,
    paymentStatus: "PAID",
    fulfillmentStatus: "DISPATCHED",
    date: "Today, 21:10",
    channel: "Online Merchant Store"
  },
  {
    id: "ORD_78909",
    customer: "Priya Nair",
    itemsCount: 3,
    total: 2450.00,
    paymentStatus: "BLOCKED_FRAUD",
    fulfillmentStatus: "CANCELLED",
    date: "Today, 21:50",
    channel: "Counter Spoof Attempt"
  },
  {
    id: "ORD_78908",
    customer: "Amitav Ghosh",
    itemsCount: 1,
    total: 680.00,
    paymentStatus: "PAID",
    fulfillmentStatus: "PROCESSING",
    date: "Today, 19:45",
    channel: "Store Pickup"
  }
];

export const COMMERCE_CUSTOMERS = [
  {
    id: "CUST_401",
    name: "Aditi Sharma",
    phone: "+91 98450 12384",
    ordersCount: 18,
    totalSpent: 24850.00,
    trustScore: "99.4% (Verified)",
    status: "ACTIVE"
  },
  {
    id: "CUST_402",
    name: "Karthik Sundaram",
    phone: "+91 94440 99120",
    ordersCount: 42,
    totalSpent: 16400.00,
    trustScore: "99.8% (Frequent Regular)",
    status: "ACTIVE"
  },
  {
    id: "CUST_403",
    name: "Vikram Malhotra",
    phone: "+91 98110 55432",
    ordersCount: 6,
    totalSpent: 48900.00,
    trustScore: "98.2% (Enterprise B2B)",
    status: "ACTIVE"
  },
  {
    id: "CUST_404",
    name: "Priya Nair",
    phone: "+91 97401 22819",
    ordersCount: 1,
    totalSpent: 0.00,
    trustScore: "12.0% (Flagged Counterfeit)",
    status: "RESTRICTED"
  }
];

export const REVENUE_TIMELINE = [
  { label: "Mon", revenue: 284000, txns: 2410 },
  { label: "Tue", revenue: 310000, txns: 2650 },
  { label: "Wed", revenue: 345000, txns: 2980 },
  { label: "Thu", revenue: 290000, txns: 2520 },
  { label: "Fri", revenue: 410000, txns: 3410 },
  { label: "Sat", revenue: 465000, txns: 3890 },
  { label: "Sun", revenue: 378450, txns: 3120 }
];

export const REQUIRES_ATTENTION = [
  {
    id: "ATTN_01",
    severity: "HIGH",
    title: "Quishing Sticker Tamper Attempt Blocked",
    description: "Counter #04 QR stand had a physical sticker overlay (+0.35mm depth) routing to disposable mule VPA quick_refund_x98234@ibl.",
    action: "Review Terminal Log",
    tab: "qr-shield",
    time: "26 mins ago"
  },
  {
    id: "ATTN_02",
    severity: "HIGH",
    title: "AI Voice Clone Impersonation Intercepted",
    description: "Incoming call audio flagged 98.4% deepfake probability demanding emergency ₹25,000 hospital transfer.",
    action: "Inspect Audio Waveform",
    tab: "deepfake-voice",
    time: "1 hr ago"
  },
  {
    id: "ATTN_03",
    severity: "MEDIUM",
    title: "2 Products Running Low on Retail Inventory",
    description: "Coorg Arabica Roast (18 units left) and Basmati Rice 5kg (8 units left) reached replenishment threshold.",
    action: "Manage Inventory",
    tab: "commerce-inventory",
    time: "2 hrs ago"
  },
  {
    id: "ATTN_04",
    severity: "LOW",
    title: "1930 Cybercrime Dossier Ready for Filing",
    description: "Mule account details (VPA: bescom.discom.urgent99@ibl, A/c: 30918239012) compiled from ScamBait session.",
    action: "Download Dossier",
    tab: "scambait",
    time: "3 hrs ago"
  }
];
