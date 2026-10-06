# Keyword / intent map — filtered for our verified content

**Source brief:** `Hemant_Sheth_SEO_GEO_AIO_Agent_Prompt.md` (competitor-benchmark keyword research against `osamamoussa.co.uk`).
**Purpose of this file:** that brief lists competitor-observed keyword clusters as *research input, not a target list*. This document is the filtered result — every phrase below has been checked against what our own data files (`src/data/*.ts`) actually verify, per the content-verification gate in `CLAUDE.md`. Nothing here has been implemented; this is the map to work from before editing any page.

**Status legend**
- ✅ **Ready** — backed by a `status: 'verified'` fact already in the codebase; safe to phrase into a title/H1/body copy.
- ⚠️ **Content gap** — factually true per our data, but not yet expressed as visible on-page text anywhere live. Needs a content pass, not new evidence.
- ⛔ **Do not use yet** — the underlying fact is `pending` / `conflicting` / `clinical-review-required`, or isn't in our data at all. Needs verification before targeting, per the same gate that blocks it from rendering elsewhere.

---

## 1. Verified foundation (what these keywords are allowed to say)

| Fact | Source | Status |
|---|---|---|
| Working title: "Consultant Upper GI, Laparoscopic & Hepatobiliary Surgeon" | `professionalIdentity.ts` | ✅ verified |
| NHS role: "Consultant Upper GI, Hepatobiliary & Laparoscopic Surgeon", London North West University Healthcare NHS Trust, Ealing Hospital | `professionalIdentity.ts`, `clinics.ts` | ✅ verified |
| Robotic (da Vinci) activity — **scoped to the Ealing NHS programme**, used for gallbladder, hernia and anti-reflux procedures | `docs/aeo-geo-source-register.md` (LNWH sources) | ✅ verified, but bounded — see §5 |
| Memberships: RCS England, ASGBI, BMA, AUGIS, E-AHPBA, IHPBA | `professionalIdentity.ts` | ✅ verified |
| Public consultation locations: **Syon Clinic (Brentford, West London)**, **Chiswick Medical Centre (Chiswick, West London)** | `clinics.ts` — `publicationStatus: 'verified'` | ✅ verified |
| "Hertfordshire" clinics (Clementine Churchill/Harrow, Spire Bushey, Wellington Elstree) | `clinics.ts` — `publicationStatus: 'pending'` | ⛔ **not publicly live** — see §5 flag |
| GMC number, qualifications string, "Clinical Professor" title | `professionalIdentity.ts` | ⛔ pending / conflicting / clinical-review-required — never target or render |
| "Robotic Surgeon" as a personal **title** (as opposed to a service he provides) | `professionalIdentity.ts` comment: word "Robotic" explicitly *not* corroborated for the formal title | ⚠️ see §5 nuance |
| Treatment pages live today: Upper GI (+ endoscopy, anti-reflux/fundoplication), HPB (gallbladder/cholecystectomy, bile duct exploration, benign liver disease, splenectomy), Hernia (laparoscopic TEP/TAPP, diaphragmatic, complex incisional), Appendicectomy | `treatmentHierarchy.ts` | ✅ verified |
| Named inguinal / umbilical hernia sub-pages | `treatmentHierarchy.ts` | ⛔ **no dedicated page exists** — general hernia page covers the concept, but don't title a page "Inguinal Hernia Surgeon London" until one is written |
| LINX device, bariatric surgery, Versius, "da Vinci 5", cancer surgery | *(absent from all data files)* | ⛔ do not target — not part of the verified practice |

---

## 2. Cluster A — Brand / person entity

| Keyword | Status | Notes |
|---|---|---|
| Prof. Hemant Sheth | ✅ | primary entity name used site-wide |
| Prof Hemant Sheth (no full stop) | ✅ | same entity; don't create a second title variant, Google treats punctuation loosely |
| Professor Hemant Sheth | ✅ | natural variant, fine in body copy |
| Hemant Sheth Surgeon | ✅ | |
| Hemant Sheth Robotic Surgeon | ⚠️ | fine as a *service* description ("Hemant Sheth, robotic surgery"), avoid as a formal title string — see §5 |
| Hemant Sheth Upper GI Surgeon | ✅ | matches verified working title |
| Hemant Sheth HPB Surgeon | ✅ | "Hepatobiliary" is verified |
| Hemant Sheth London Surgeon | ✅ | |
| Hemant Sheth reviews / Hemant Sheth appointment | ⛔ | testimonials are separately status-gated (`testimonials.ts`) — don't imply a review aggregator exists |

## 3. Cluster B — Core specialty (highest priority)

| Keyword | Status | Primary page |
|---|---|---|
| Upper GI Surgeon London | ✅ | `/` , `/about-prof-hemant-sheth` |
| Consultant Upper GI Surgeon London | ✅ | `/about-prof-hemant-sheth` |
| Laparoscopic Surgeon London | ✅ | `/` |
| Hepatobiliary Surgeon London / HPB Surgeon London | ✅ | `/treatments/hpb` |
| Minimally Invasive Surgeon London / Keyhole Surgeon London | ✅ | `/` |
| Robotic Surgeon London | ⚠️ | already used site-wide as branding; keep, but see §5 — prefer "Robotic Surgery London" / "robotic-assisted surgery" in new copy where precision matters |
| Private Upper GI Surgeon London | ✅ | practice is private + NHS, both verified |
| General Surgeon London | ⛔ | not his verified designation — he's Upper GI/HPB, not general surgery |
| NHS Consultant Surgeon | ✅ | Ealing Hospital NHS role is verified |

## 4. Cluster C — Robotic surgery

| Keyword | Status | Notes |
|---|---|---|
| Robotic Surgery London | ✅ | |
| Robotic-assisted Surgery | ✅ | preferred neutral phrasing |
| Robotic Gallbladder Surgery (London) | ✅ | explicitly named in LNWH programme scope |
| Robotic Hernia Surgery / Repair (London) | ✅ | explicitly named in LNWH programme scope |
| Robotic Anti-reflux Surgery | ✅ | explicitly named in LNWH programme scope |
| da Vinci / da Vinci system | ⚠️ | verified fact, but the exact words "da Vinci" don't currently appear in any live page's visible text (only in the evidence register) — a content gap, not a fabrication risk |
| Robotic Upper GI Surgery (general) | ⚠️ | upper GI is his verified specialty, but the LNWH evidence names gallbladder/hernia/anti-reflux specifically, not upper GI surgery as a category — phrase carefully, don't over-generalise |
| Robotic HPB / liver surgery | ⛔ | not part of the cited programme scope — don't claim yet |
| Robotic Appendix Surgery | ⛔ | not part of the cited programme scope |
| "da Vinci Xi" (named model) | ⛔ | only appears in `procedures.ts`, which is **not a live-rendered file** (unused component per `CLAUDE.md`) — do not use this specific model name until it's confirmed and the content is actually published |
| da Vinci 5 / Versius | ⛔ | absent from all evidence — explicitly excluded in the source brief too |

## 5. Important nuance flags (read before writing any copy)

1. **"Robotic Surgeon" as a title vs. "robotic surgery" as a service.** `professionalIdentity.ts` deliberately omits "Robotic" from the verified `workingTitle` and `nhsRole` strings — the comment there notes the word isn't corroborated by the legacy NHS-role wording. The site's existing title tags already say "Robotic Surgeon London" (pre-existing convention, not something this doc is overturning), so it's not being flagged as wrong — just: when writing *new* copy, prefer framing him as someone who **provides robotic-assisted surgery** (service, verified via the LNWH programme evidence) rather than minting new instances of "Robotic Surgeon" as a standalone professional title.
2. **Hertfordshire is not currently a verified public location.** Three of the five clinics in `clinics.ts` (Clementine Churchill/Harrow, Spire Bushey, Wellington Elstree — the Hertfordshire-area ones) are marked `publicationStatus: 'pending'`, so they're filtered out of `publicClinicLocations` and don't render anywhere on the live site. Only **Syon Clinic (Brentford)** and **Chiswick Medical Centre** — both West London — are verified public locations. The existing homepage/about meta description already says "serving London and Hertfordshire," which is a pre-existing inconsistency worth flagging to the practice, not something to compound by adding more Hertfordshire-targeted keyword pages until those clinics are confirmed and flipped to `verified`.
3. **Robotic programme scope is bounded.** Per `docs/aeo-geo-source-register.md`, the LNWH evidence supports robotic activity for gallbladder, hernia and anti-reflux procedures specifically, and must stay framed as an *Ealing Hospital programme* statement — not converted into a general or lifetime personal claim.

## 6. Cluster E — Gallbladder / gallstones

| Keyword | Status | Primary page |
|---|---|---|
| Gallbladder Surgeon London | ✅ (already targeted) | `/treatments/hpb/gallbladder-surgery` |
| Gallbladder Surgery London / Gallstone Surgery London | ✅ | same |
| Laparoscopic Cholecystectomy London | ✅ | same |
| Robotic Gallbladder Surgery London | ✅ | same (LNWH-scoped) |
| Cholecystitis / Biliary Colic / Gallbladder Disease | ✅ | condition terms already used in page body |
| Gallstone Specialist London | ✅ | natural variant |

## 7. Cluster F — Reflux / GORD / hiatus hernia

| Keyword | Status | Primary page |
|---|---|---|
| Anti-reflux Surgery London | ✅ | `/treatments/upper-gi/anti-reflux-surgery` |
| Laparoscopic Fundoplication (London) | ✅ | same — page subtitle already says "fundoplication" |
| Hiatus Hernia Repair (London) | ✅ | same — subtitle already says "reflux-related hiatus hernia repair" |
| Reflux Surgeon London / GORD Surgeon London | ⚠️ | condition is covered, but no page currently uses "GORD" or "reflux surgeon" as an explicit phrase — content gap, easy to close since the clinical content already exists |
| GERD Specialist London | ⚠️ | GERD is the US spelling of GORD; same content gap as above |
| LINX / Magnetic Sphincter Augmentation | ⛔ | not offered per any data file — explicitly excluded |

## 8. Cluster G — Hernia

| Keyword | Status | Primary page |
|---|---|---|
| Hernia Surgeon London / Hernia Repair London | ✅ | `/treatments/hernia` |
| Laparoscopic Hernia Repair (TEP/TAPP) London | ✅ | `/treatments/hernia/laparoscopic-hernia-surgery` |
| Robotic Hernia Repair London | ✅ | same (LNWH-scoped) |
| Diaphragmatic Hernia Repair | ✅ | `/treatments/hernia/diaphragmatic-hernia` |
| Complex Incisional Hernia Surgery London | ✅ | `/treatments/hernia/complex-incisional-hernia` |
| Inguinal Hernia Surgeon / Umbilical Hernia Surgeon London | ⛔ | no dedicated page or named-type content yet — TEP/TAPP repair implicitly covers inguinal hernia clinically, but don't publish a page titled around a hernia type that isn't named anywhere in the data |

## 9. Cluster H — Liver / HPB / hepatobiliary (differentiator vs. competitor)

| Keyword | Status | Primary page |
|---|---|---|
| HPB Surgeon London / Hepatobiliary Surgeon London | ✅ | `/treatments/hpb` |
| Liver Surgery London / Benign Liver Disease Surgery | ✅ | `/treatments/hpb/benign-liver-disease-surgery` |
| Bile Duct Surgery / Laparoscopic Bile Duct Exploration London | ✅ | `/treatments/hpb/bile-duct-exploration` |
| Splenectomy / Spleen Surgery London | ✅ | `/treatments/hpb/splenectomy` |
| Liver cancer / tumour surgery | ⛔ | not stated anywhere — data only supports "selected benign liver lesions/cysts" |

## 10. Cluster I — Upper GI endoscopy

| Keyword | Status | Primary page |
|---|---|---|
| Upper GI Endoscopy London / Gastroscopy London | ✅ | `/treatments/upper-gi/endoscopy` |
| Diagnostic Gastroscopy London | ✅ | same |

## 11. Cluster J — Appendix / general laparoscopic

| Keyword | Status | Primary page |
|---|---|---|
| Appendicectomy / Appendix Surgery London | ✅ | `/treatments/appendicectomy/laparoscopic-appendicectomy` |
| Emergency appendix surgery / "emergency general surgery" | ⛔ | site doesn't state emergency-response availability — avoid implying it |

## 12. Local / location strategy — verified only

Do **not** copy the competitor's location list (Watford, St Albans, Notting Hill, Chelsea, Belgravia, Fitzrovia, Holland Park, Hemel Hempstead, etc.) — none of those are in our clinic data at all.

| Location keyword | Status |
|---|---|
| [Specialty] + London | ✅ |
| [Specialty] + West London | ✅ (both verified clinics are West London) |
| [Specialty] + Brentford | ✅ (Syon Clinic) |
| [Specialty] + Chiswick | ✅ (Chiswick Medical Centre) |
| [Specialty] + Harrow | ⛔ — Clementine Churchill is `pending`, not verified |
| [Specialty] + Hertfordshire / Bushey / Elstree | ⛔ — both Hertfordshire clinics are `pending`, not verified |
| [Specialty] + Watford / St Albans / Chelsea / Belgravia / Fitzrovia / Holland Park / Notting Hill / Hemel Hempstead | ⛔ — these are the *competitor's* locations, not ours; absent from all our data |
| Ealing (NHS) | ✅ | for NHS-role context specifically, not private consultation booking |

## 13. Question / AIO bank — grounded in content that already exists

These are phrased as user questions our existing page content can already answer accurately (no new claims needed) — use as heading/FAQ seeds, not verbatim stuffing.

**Robotic surgery** *(already answered in `authorityEvidence.ts` → `/robotic-surgery`)*
- What is robotic-assisted surgery?
- Does the robot perform the operation by itself?
- Is robotic surgery always better than laparoscopic or open surgery?
- Which procedures are included in the Ealing Hospital robotic programme?
- How is suitability for robotic surgery decided?

**Gallbladder** *(answerable from `treatmentHierarchy.ts` gallbladder-surgery sections)*
- What are common symptoms of gallstones?
- When is gallbladder removal recommended?
- What happens during a laparoscopic cholecystectomy?
- What are the risks of gallbladder surgery?
- What does recovery involve after gallbladder removal?

**Reflux / hiatus hernia** *(answerable from the anti-reflux-surgery page sections)*
- What is anti-reflux (fundoplication) surgery?
- When is surgery considered for reflux or a hiatus hernia?
- What does recovery involve after fundoplication?

**Hernia** *(answerable from the three hernia treatment pages)*
- What is TEP/TAPP laparoscopic hernia repair?
- When does a hernia need surgical repair?
- What is a complex incisional hernia repair?

**Upper GI endoscopy**
- What is an upper GI endoscopy / gastroscopy?
- How should I prepare for a gastroscopy?
- What happens during and after the procedure?

**Logistics** *(already live in `faqs.ts`, keep as-is)*
- Do I need a GP referral for a private consultation?
- Which private health insurance providers are accepted?
- How soon can I return to driving/work after keyhole or robotic surgery?

---

## 14. Primary keyword → page map (avoid two pages competing for the same intent)

| Primary intent | Target page |
|---|---|
| upper gi surgeon london | `/` , `/about-prof-hemant-sheth` |
| robotic surgeon london / robotic surgery london | `/robotic-surgery` |
| gallbladder surgeon london / gallstone surgery london | `/treatments/hpb/gallbladder-surgery` |
| reflux surgeon london / hiatus hernia repair london | `/treatments/upper-gi/anti-reflux-surgery` |
| hernia surgeon london | `/treatments/hernia` |
| laparoscopic hernia repair london | `/treatments/hernia/laparoscopic-hernia-surgery` |
| hpb surgeon london / hepatobiliary surgeon london | `/treatments/hpb` |
| liver surgery london | `/treatments/hpb/benign-liver-disease-surgery` |
| upper gi endoscopy london / gastroscopy london | `/treatments/upper-gi/endoscopy` |
| appendix surgery london | `/treatments/appendicectomy/laparoscopic-appendicectomy` |

---

## 15. Explicitly excluded — do not target automatically

- Bariatric Surgeon UK / bariatric surgery / weight loss surgery
- LINX device / magnetic sphincter augmentation
- Versius, da Vinci 5, da Vinci Xi (specific model — see §4)
- Any cancer-surgery phrasing
- Any location not in `clinics.ts` as `publicationStatus: 'verified'` (currently only Brentford/Syon Clinic and Chiswick)
- "Best", "top", "#1", "leading", "most experienced" or similar superiority claims
- GMC number, a specific qualifications string, or the "Clinical Professor" title — all pending/conflicting per `professionalIdentity.ts`

---

**Next step (not done here):** once reviewed, the ✅ items are safe to work into titles/H1s/H2s/FAQ copy page-by-page; the ⚠️ items need a short content pass (no new evidence required) before they're used; the ⛔ items need either clinical sign-off or updated `clinics.ts` status before they can be targeted at all. No code or content was changed as part of producing this map.
