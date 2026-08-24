# 🛡️ AegisPay — Autonomous On-Device AI Guardian for UPI & QR Fraud Prevention

[![iQOO Hackathon 2026](https://img.shields.io/badge/iQOO_Hackathon-2026-blue.svg)](https://iqoo.reskilll.com)
[![Track](https://img.shields.io/badge/Track-FinTech_%26_Commerce-cyan.svg)](#)
[![Edge AI](https://img.shields.io/badge/Core_AI-LiteRT_MobileBERT_(INT8)-emerald.svg)](#)
[![Privacy](https://img.shields.io/badge/Privacy-100%25_Zero_Cloud_Leakage-purple.svg)](#)

> 🌐 **Live Demo:** [https://temporary-speedy-birch-68h8nej.vercel.app/](https://temporary-speedy-birch-68h8nej.vercel.app/)  
> 📦 **GitHub Repository:** [https://github.com/dineshkumarc-1/aegispay-iqoo-hackathon](https://github.com/dineshkumarc-1/aegispay-iqoo-hackathon)  
> 📊 **Interactive Slide Deck:** [`presentation.html`](./presentation.html) | [`AEGISPAY_PITCH_DECK_SLIDES.md`](./AEGISPAY_PITCH_DECK_SLIDES.md)  
> 📄 **Idea Submission Document:** [`AEGISPAY_SUBMISSION_DOC.md`](./AEGISPAY_SUBMISSION_DOC.md)

---

## 📌 Overview

Digital payments via UPI process **over 14+ Billion transactions monthly** in India. However, over **₹1,750+ Crore** is lost annually to QR sticker tampering (*quishing*), reverse-charge traps (*"Enter PIN to receive cashback"*), and counterfeit payment apps.

**AegisPay** is a phone-first, autonomous on-device security co-pilot designed to intercept and prevent UPI payment fraud **before the user enters their PIN**. Operating 100% locally on the device's NPU/CPU using quantized LiteRT SLM models, AegisPay ensures zero cloud data leakage while delivering **sub-15ms threat protection**.

---

## ✨ Key Features & Defensive Pillars

### 1. 👁️ Dynamic QR & Quishing Shield
* Real-time optical AR viewfinder that inspects UPI deep-links (`pa`, `pn`, `mc`, `am`, `tn`).
* Detects physical QR sticker replacements, payee name vs VPA entropy mismatches, and blocks disguised reverse-collect requests.
* **Live Camera Support:** Switch between simulated test vectors or point your real phone camera at QR codes.
* **Vernacular Voice Warnings:** Multi-lingual voice alerts (Hindi, English, Tamil, Telugu, Kannada) that verbally warn the user before PIN entry.

### 2. 🛡️ Ambient Social Engineering Interceptor
* Quantized on-device NLP model (MobileBERT) analyzing incoming calls, SMS, and screen prompts locally.
* Real-time threat token extraction for utility cutoff panic threats, AnyDesk/QuickSupport remote-access scams, and lottery fraud.
* **Automated System Lockdown:** Simulates an Android barrier overlay that physically disables touch input over banking apps when high fraud risk is detected.

### 3. 🧾 Kirana Merchant Receipt & Soundbox Verifier
* Instant on-device computer vision to detect counterfeit payment screenshots (e.g. fake Paytm/GPay spoof apps).
* Validates UI geometry, font kerning, Luhn mod-10 UTR checksums, and audio soundbox frequencies offline.

---

## 📱 Why Phone-First? (Hardware Integration)

| Mobile Hardware Capability | How AegisPay Uses It |
|---|---|
| **60 FPS Optical Stream** | In-stream frame dissection of UPI parameters before payment handoff |
| **Android Overlay Service** | System-level emergency lock drawn over third-party UPI apps |
| **Hardware Haptics** | High-intensity sensory pulses to snap victims out of psychological trance |
| **Biometric Enclave** | Enforces hardware face/fingerprint validation before any override |

---

## 🧠 On-Device Edge AI Architecture *(Brownie Points)*

* **Runtime:** Google LiteRT (TensorFlow Lite) / ONNX Runtime Mobile
* **Core Model:** Quantized `MobileBERT-INT8` (18MB footprint)
* **Latency:** **11.4 ms** on modern mobile NPU / CPU
* **Zero-Knowledge Privacy:** 100% DPDP Act Compliant — Zero bytes sent to external cloud servers.

---

## 🛠️ Local Development & Quick Start

```bash
# Clone the repository
git clone https://github.com/dineshkumarc-1/aegispay-iqoo-hackathon.git
cd aegispay-iqoo-hackathon

# Install dependencies
npm install

# Start local development server
npm run dev

# Build for production
npm run build
```

---

## 🏆 iQOO Hackathon 2026 Submission

* **Team:** Team AegisPay
* **Track:** FinTech & Commerce
* **Deliverables:** Pitch Document, 10-Slide Presentation Deck, Live Web/PWA Prototype.
