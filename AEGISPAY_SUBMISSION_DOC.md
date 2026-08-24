# 🛡️ AegisPay — Next-Gen On-Device AI Guardian for UPI & QR Fraud Shield

> **Track:** FinTech & Commerce  
> **Target Event:** iQOO Hackathon 2026 (Idea Submission & City Battle)  
> **Core Tech:** On-Device Edge AI / Quantized SLM + Native Mobile Sensors + Real-Time Zero-Knowledge Privacy Architecture  

---

## 1. Executive Summary

Digital payments via UPI have revolutionized India’s economy, processing over **14+ Billion transactions per month**. However, digital payment fraud has exploded proportionally—over **₹1,750+ Crore** is lost annually to QR tampering (*quishing*), social engineering scams (*"Enter PIN to receive cashback"*), remote desktop exploits, and fake payment spoofing apps.

**AegisPay** is a **phone-first, zero-latency, on-device AI security guardian** that prevents UPI and QR payment fraud *before* money leaves the victim's account. Operating entirely on the device's NPU/CPU without leaking sensitive financial data to cloud servers, AegisPay provides:
1. **Dynamic QR & Quishing Shield:** Real-time deep inspection of UPI deep-links, VPA entropy, merchant spoofing, and malicious intent redirection.
2. **Ambient Social Engineering Interceptor:** On-device NLP/SLM detection of coercive fraud patterns during active calls and incoming SMS (e.g., AnyDesk prompts, fake electricity bill threats, deceptive reverse-charge requests).
3. **Merchant Receipt & Soundbox Verifier:** Instant offline computer-vision authentication of payment confirmation screens to eliminate fake payment spoofing apps.

---

## 2. Problem Statement & Real-World Impact

### The Critical Vulnerabilities in Modern UPI:
1. **QR Code Tampering ("Quishing"):** Malicious stickers pasted over genuine merchant QR codes at tea stalls, retail counters, and parking meters secretly redirect payments to mule accounts or initiate hidden "Collect Requests".
2. **Reverse-Charge & Cashback Deceptions:** Fraudsters trick first-time or non-tech-savvy users into entering their UPI PIN under the pretext of *receiving* refunds, lottery winnings, or OLX buyer payments.
3. **Remote Access & Phishing Malware:** Scammers guide victims over phone calls to install screen-sharing apps (AnyDesk, RustDesk) while initiating banking transactions.
4. **Offline / Rural Blindspots:** In areas with spotty connectivity, cloud-based fraud checks introduce high latency or fail completely, leaving users unprotected.

### Target Audience & Beneficiaries:
- **Everyday Consumers & Seniors:** Vulnerable to psychological manipulation and deceptive collect requests.
- **Small & Micro Merchants (Kirana Stores):** Targeted by fraudsters using fake screenshot generators and spoofed payment soundbox apps.
- **Tier-2 & Tier-3 City Users:** Often transacting with vernacular interfaces and limited cybersecurity awareness.

---

## 3. The Solution: Three-Pillar On-Device Defense

```
                        ┌──────────────────────────────────────────────┐
                        │           AEGISPAY MOBILE ENGINE             │
                        └──────────────────────┬───────────────────────┘
                                               │
           ┌───────────────────────────────────┼───────────────────────────────────┐
           ▼                                   ▼                                   ▼
┌──────────────────────┐             ┌───────────────────┐               ┌───────────────────┐
│ 1. Dynamic QR &      │             │ 2. Social Eng.    │               │ 3. Receipt &      │
│    Quishing Shield   │             │    Interceptor    │               │    Soundbox Guard │
├──────────────────────┤             ├───────────────────┤               ├───────────────────┤
│ • VPA Entropy Check  │             │ • Voice & Text    │               │ • Layout & Font   │
│ • Intent URI Parser  │             │   Pattern SLM     │               │   Forgery Vision  │
│ • Reverse-Collect    │             │ • Screen-share    │               │ • UTR Hash Check  │
│   Disguise Detection │             │   Active Alert    │               │ • Audio Tone Sync │
└──────────┬───────────┘             └─────────┬─────────┘               └─────────┬─────────┘
           │                                   │                                   │
           └───────────────────────────────────┼───────────────────────────────────┘
                                               ▼
                              ┌─────────────────────────────────┐
                              │  ON-DEVICE EDGE INFERENCE CORE  │
                              │  • Quantized MobileBERT / SLM   │
                              │  • Sub-15ms Latency             │
                              │  • 100% Zero Cloud Leakage      │
                              └────────────────┬────────────────┘
                                               ▼
                              ┌─────────────────────────────────┐
                              │    INSTANT HAPTIC / AR SHIELD   │
                              │   (Block / Warn / Explain / Bio)│
                              └─────────────────────────────────┘
```

### Pillar 1: Dynamic QR & Quishing Shield
- Directly intercepts the camera feed or UPI intent link (`upi://pay?...`).
- Analyzes parameter anomalies: `am` (amount tampering), `tn` (transaction note obfuscation), payee handle reputation, and flags disguised **Collect Requests** (`upi://collect`).
- Provides real-time AR/HUD feedback: Green (Verified Merchant), Amber (Unverified/High Risk), Red (Confirmed Malicious/Quishing attempt).

### Pillar 2: Social Engineering & Coercive Scam Interceptor
- Runs a lightweight, on-device NLP classifier (quantized MobileBERT / LiteRT model) that evaluates incoming SMS, notification text, and on-call audio cues (with user permission).
- Detects high-risk scam triggers:
  - *"Enter PIN to get reward / refund"*
  - *"Electricity connection will be disconnected tonight unless you pay here"*
  - *"Install screen sharing APK to verify KYC"*
- Instantly triggers a high-contrast modal lock with haptic vibration, explaining in the user's native language why this is a scam before they can enter their PIN.

### Pillar 3: Spoofed Merchant Receipt & Soundbox Verifier
- Kirana store merchants can flash their phone camera at a customer’s payment confirmation screen.
- The local CV model validates UI geometry, font kerning, dynamic UTR checksum, and animation artifacts to instantly detect counterfeit payment apps (e.g. fake Paytm/PhonePe mock apps).

---

## 4. Why Phone-First? Why Hardware Matters

AegisPay cannot exist as a simple website or server-side API:
* **Zero-Latency In-the-Loop Interception:** Fraud happens in milliseconds. Checking transactions in the cloud adds 500ms–2000ms latency. On-device edge inference delivers threat scoring in **under 15ms**.
* **Direct Hardware & OS Integration:** Utilizes the phone's native Camera stream, AR overlays, Android Accessibility/Overlay APIs, Biometric Enclave (Face/Fingerprint lockdown), and Hardware Haptics.
* **Absolute Privacy & Data Sovereignty:** Financial logs, SMS alerts, UPI VPAs, and personal messages never leave the user's phone. Zero cloud data storage ensures compliance with DPDP Act (India) and eliminates third-party breach risks.
* **100% Offline Capability:** Operates flawlessly in basements, underground metros, rural markets, and remote booths with zero internet connection.

---

## 5. Technology Stack & On-Device AI Architecture

| Layer | Technologies Used |
|---|---|
| **Mobile Client** | Flutter / React Native / Native Android (Kotlin) / PWA |
| **Edge AI Runtime** | Google LiteRT (TensorFlow Lite) / ONNX Runtime Mobile / MediaPipe |
| **Core Models** | Quantized MobileBERT (Scam Intent Classifier), Tiny-YOLO/MobileNetV4 (OCR & Screen Tampering), Gemma-2B (Offline Local Context Explainer) |
| **Storage & Caching**| High-Speed Local SQLite with Bloom Filter for known fraudulent VPAs |
| **Sensors & I/O** | Camera Viewfinder (60 FPS), Haptic Engine, Biometric Prompt API |

---

## 6. 30-Hour Hackathon Build Plan (City Battle Roadmap)

- **Hours 0–6 (Foundation & Core UX):** Setup camera pipeline, UPI intent URI deep-parser, and interactive HUD viewfinder.
- **Hours 6–18 (Edge AI Integration):** Embed on-device LiteRT/ONNX scam intent classification model and offline VPA risk engine.
- **Hours 18–24 (Defensive Lockdown & Audio/Haptics):** Build real-time modal interception, warning badges, and haptic feedback.
- **Hours 24–30 (End-to-End Stress Testing & Demo Polish):** Test with real-world scam datasets, fake receipts, and quishing QR samples.

---

## 7. Competitive Advantage & Why AegisPay Wins

| Evaluation Metric | Traditional Banking/UPI Apps | AegisPay |
|---|---|---|
| **Threat Detection Point** | Post-transaction (chargeback/complaint) | **Pre-transaction (preventative lock)** |
| **Latency** | 800ms – 3000ms (Cloud API) | **< 15ms (On-Device NPU/CPU)** |
| **Privacy** | Cloud data telemetry required | **100% Zero-Knowledge On-Device** |
| **Social Engineering Defense** | Static warning banners | **Context-Aware Active Audio/Text Interception** |
| **Offline Performance** | Fails without active internet | **Fully functional 100% Offline** |

---

## 8. Conclusion

**AegisPay** transforms every smartphone into an autonomous, proactive financial shield. By combining cutting-edge edge AI models with deep mobile hardware capabilities, AegisPay protects millions of digital payment users across India, bringing zero-trust security to the palm of every citizen's hand.
