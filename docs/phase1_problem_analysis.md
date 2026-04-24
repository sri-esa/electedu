# ElectEdu — Phase 1: Problem Space Analysis

> **Document version:** 1.0  
> **Date:** 2026-04-24  
> **Prepared for:** ElectEdu — AI-powered Election Process Education Assistant  
> **AI Engine:** Google Gemini API  
> **Deployment Target:** Google Cloud Run  
> **Primary Focus:** Indian Elections (ECI System)  
> **Secondary Focus:** Global Election Systems (user-selectable)  
> **Feeds into:** Phase 1 Step 2 — Architecture Design

---

## Table of Contents

- [Part A — User Personas](#part-a--user-personas)
- [Part B — Knowledge Domain Mapping](#part-b--knowledge-domain-mapping)
- [Part C — Interaction Design](#part-c--interaction-design)
- [Part D — Content Accuracy Requirements](#part-d--content-accuracy-requirements)
- [Part E — System Requirements (SHALL Statements)](#part-e--system-requirements-shall-statements)
- [Part F — Risk Analysis](#part-f--risk-analysis)
- [Part G — Success Metrics](#part-g--success-metrics)
- [Appendix — Assumptions Log](#appendix--assumptions-log)

---

## Part A — User Personas

### Persona 1: Priya Sharma — The First-Time Voter

| Attribute | Detail |
|---|---|
| **Name / Age** | Priya Sharma, 18 years old |
| **Background** | Class 12 student in Pune, Maharashtra. Just received voter ID. She follows Instagram reels and YouTube shorts. Has never participated in any form of civic process. |
| **Biggest Confusion** | "I have my Voter ID card. Now what? Where do I go? What does the machine look like? Will I get it wrong?" She fears making a procedural mistake at the polling booth and being embarrassed. |
| **Preferred Learning Style** | Highly visual — short video clips, step-by-step visual walkthroughs, progress bars. Cannot sit through long text. Gamified flows (✅ Done, Next Step) hold her attention. |
| **Device** | Android smartphone (mid-range, 4G). Uses apps in portrait mode exclusively. |
| **Language Comfort** | English (comfortable reading), Hindi (spoken), Marathi (native). Likely to switch to Hindi if English becomes formal or dense. |
| **What Success Looks Like** | Priya walks up to the polling booth on election day, clearly understands the process, casts her vote without confusion, and feels proud. She shares ElectEdu with her friends. |

---

### Persona 2: Ramkishan Yadav — The Rural Voter

| Attribute | Detail |
|---|---|
| **Name / Age** | Ramkishan Yadav, 54 years old |
| **Background** | Farmer in a village near Varanasi, Uttar Pradesh. Has voted 6 times but primarily relies on village elders and party workers for guidance. Low formal education (up to Class 5). Only recently got a smartphone through a government scheme. |
| **Biggest Confusion** | "I heard the machine was changed. The button I pressed last time was different. My thumb mark — did it register? How do I know my vote was counted?" He has deep trust anxiety about EVMs. |
| **Preferred Learning Style** | Audio-first. Prefers hearing explanations in Hindi in a calm, reassuring voice. Pictorial guides with labelled diagrams. Minimal reading. Metaphors from daily life (e.g., "EVM is like a strong iron safe"). |
| **Device** | Entry-level Android smartphone, slow internet, often 2G/3G. May have data limitations. |
| **Language Comfort** | Hindi (spoken fluency), very limited English reading ability. Regional dialect (Bhojpuri) is native but not expected to be supported fully. |
| **What Success Looks Like** | Ramkishan feels reassured and confident about the EVM process. He does not need to rely on others to explain voting to him. He trusts the system more because he understands it. |

---

### Persona 3: Arjun Mehta — The NRI Researcher

| Attribute | Detail |
|---|---|
| **Name / Age** | Arjun Mehta, 34 years old |
| **Background** | Software engineer working in San Jose, California. Has lived in USA for 8 years. Follows Indian election news closely on Twitter/X and Indian news channels. Holds OCI (Overseas Citizen of India) card. Curious about systemic comparisons but often confused by which rules apply to him as NRI. |
| **Biggest Confusion** | "Can I vote from abroad? How is India's FPTP different from proportional representation? What is the role of the Election Commission compared to the FEC in the USA?" |
| **Preferred Learning Style** | Comparative tables, structured articles, deep-dive expandable sections. Comfortable reading long-form content if it is well-structured. |
| **Device** | MacBook Pro (desktop) primarily, iPhone for quick lookups. Large screen, high bandwidth. |
| **Language Comfort** | English (full fluency). Hindi comfortable but not required. |
| **What Success Looks Like** | Arjun can clearly articulate to his American colleagues how Indian elections work versus US elections. He also understands his NRI voting eligibility status unambiguously. |

---

### Persona 4: Meera Nair — The Civics Student

| Attribute | Detail |
|---|---|
| **Name / Age** | Meera Nair, 21 years old |
| **Background** | Political Science undergraduate at Delhi University. Working on a research paper titled "Digital Governance in Indian Elections." Needs accurate, citable information. Already knows basics — wants depth, nuance, legal references. |
| **Biggest Confusion** | Not confusion per se, but frustration: "I find conflicting information online. Which source is authoritative? How has the Model Code of Conduct evolved? What are the actual legal penalties for MCC violation?" |
| **Preferred Learning Style** | Text-heavy with citations, structured sections, legal references. Wants to export or quote information. Needs depth beyond surface explanations. |
| **Device** | Laptop (Windows), with occasional smartphone use. Chrome browser, multiple tabs open. |
| **Language Comfort** | English (full academic fluency). Hindi secondary. |
| **What Success Looks Like** | Meera can use ElectEdu as a starting point for research, trust the citations, and quickly drill down to specific legal provisions or ECI documents. ElectEdu saves her hours of cross-referencing. |

---

### Persona 5: Geeta Aunty — The Senior Skeptic

| Attribute | Detail |
|---|---|
| **Name / Age** | Geeta Krishnamurthy, 68 years old |
| **Background** | Retired schoolteacher in Chennai. Has voted in every election since 1977. Recently heard neighbours say "EVMs can be hacked and votes changed." Deeply worried. Also confused about whether her name is still on the voter roll after her son moved to a different city. |
| **Biggest Confusion** | "Is EVM safe? My neighbour said votes can be changed remotely. Also, if I moved to a new address, has my vote registration changed? I don't know how to use the internet properly." |
| **Preferred Learning Style** | Step-by-step conversational explanations. Analogies to familiar things (ballot paper days, bank passbooks). Large text, high contrast. Reassuring, non-condescending tone. |
| **Device** | Old Android tablet gifted by family. Large screen helps with readability. Very slow at typing; prefers pre-set options/chips over free text. |
| **Language Comfort** | Tamil (native), English (good reading comprehension), Hindi (basic). Would benefit from Tamil support. |
| **What Success Looks Like** | Geeta finishes one conversation about EVMs feeling reassured and informed enough to correct misinformation she hears from others. She successfully checks her name on the voter roll with guided help from ElectEdu. |

---

## Part B — Knowledge Domain Mapping

### Section 1: Election Commission of India (ECI)

#### Structure and Powers

The Election Commission of India is a constitutional body established under **Article 324** of the Constitution of India. It has superintendence, direction, and control of the preparation of electoral rolls and the conduct of elections to Parliament, State Legislatures, and the offices of President and Vice-President.

**Composition:**
- Chief Election Commissioner (CEC)
- Two Election Commissioners (as amended by law; currently three-member body)
- The CEC can only be removed through a process similar to removal of a Supreme Court judge (impeachment by Parliament)

**Powers of ECI:**
- Announce election schedules and enforce the Model Code of Conduct
- Register and de-register political parties
- Recognize national and state parties; assign election symbols
- Transfer or suspend government officials during election period
- Discipline candidates and parties for MCC violations
- Issue Model Code of Conduct at the time of election announcement
- Conduct bye-elections when vacancies arise

#### How Elections Are Announced

1. The President (for Lok Sabha/Presidential elections) or Governor (for State Assembly elections) issues a **Notification** on the advice of ECI.
2. ECI issues a **Schedule** specifying: notification date, last date of nomination, scrutiny date, last date for withdrawal, polling date(s), counting date.
3. This triggers the Model Code of Conduct (MCC) immediately upon announcement.

#### Model Code of Conduct (MCC)

**What it is:** A set of guidelines issued by ECI to regulate the conduct of political parties and candidates during the election period. It is not a statutory law but derives authority from constitutional powers of ECI; violations are enforceable through criminal law (IPC sections) in extreme cases.

**When it kicks in:** The moment the election schedule is announced by ECI (typically 4–8 weeks before polling day).

**What it prohibits:**
- Governments from announcing new welfare schemes, policy decisions, or projects that could influence voters
- Use of government machinery, vehicles, or official staff for campaign purposes
- Appeal to voters on the basis of caste, religion, or communal sentiments
- Bribery — distribution of cash, liquor, gifts to voters
- Defacement of public property with campaign material
- Holding meetings or processions after 10:00 PM on the eve of polling (silence period: 48 hours before voting)
- Entry of armed forces/police into polling areas without ECI permission
- Exit polls during the voting period

**Consequences of violation:**
- ECI can issue notices, issue censures
- In extreme cases, ECI can recommend removal of a government official or direct FIR registration
- Candidates can be barred from campaigning for a period
- [ASSUMPTION: Statutory backing for MCC enforcement comes primarily from Representation of the People Act, 1951, Sections 123–134A on "Corrupt Practices" and "Illegal Practices"]

#### Role of Chief Election Commissioner

- Head of ECI; final authority on election administration
- Chairs all three-member commission meetings
- Has casting vote in case of deadlock [ASSUMPTION]
- Represents ECI in all official communications
- Security of tenure: Can only be removed via process equivalent to Supreme Court judge — ensuring independence from executive pressure
- Term: 6 years or until age 65, whichever is earlier

---

### Section 2: Voter Registration

#### Eligibility Criteria

- **Age:** 18 years or above (as on January 1 of the year of electoral roll revision)
- **Citizenship:** Indian citizen only (NRIs with Indian passport are eligible to register in their home constituency even if residing abroad — NRI voters)
- **Residence:** Ordinarily resident of the constituency where registering. [ASSUMPTION: "Ordinary residence" has been interpreted by ECI and courts to mean the place where the person normally lives, not necessarily where they have a permanent home]
- **Mental competency:** Not disqualified by a court of law as a person of unsound mind
- **Criminal disqualification:** Not convicted of certain electoral offences or sentenced to imprisonment of 2 years or more for certain crimes under Representation of the People Act, 1951

#### Voter Registration Forms

| Form | Purpose |
|---|---|
| **Form 6** | New registration — for first-time voters or for those registering in a new constituency |
| **Form 6A** | Registration for NRI voters (overseas electors) |
| **Form 7** | Deletion of a name from electoral roll (can be filed by the elector or by another elector objecting to a name) |
| **Form 8** | Correction of entries in electoral roll, change of address within same Assembly constituency |
| **Form 8A** | Transposition of entry to another part of electoral roll (shift within constituency) |

#### EPIC — Electors' Photo Identity Card (Voter ID)

- **How to get:** Apply via Form 6 on nvsp.in or voterportal.eci.gov.in. BLO (Booth Level Officer) verifies and dispatches. Takes approximately 2–4 weeks for new applications.
- **How to replace:** Apply for replacement on voterportal.eci.gov.in or visit nearest ERO (Electoral Registration Officer). Replacement EPIC is issued if original is lost, damaged, or contains errors.
- Colour-coded since 2015 (different states may have different designs)
- Biometric (photo + signature) embedded

#### Voter Helpline: 1950

- Toll-free helpline operated by ECI
- Available in multiple languages
- Can be used to: check name on voter list, report MCC violations, get booth information, report booth problems on polling day

#### Checking Name on Voter List

- **Online:** voterportal.eci.gov.in → "Search in Electoral Roll"
- **Online:** nvsp.in (National Voter Services Portal) — also supports Form submissions
- **SMS:** SMS "ECI SPACE EPIC_NUMBER" to 1950 (availability may vary by state) [ASSUMPTION: Verify exact SMS format with ECI documentation]
- **Offline:** Visit local ERO/AERO office or BLO

---

### Section 3: Election Phases

#### Why India Has Multi-Phase Elections

India's general elections (Lok Sabha) are the largest democratic exercise in the world — approximately 970 million eligible voters (2024 estimate), 543 constituencies, 28 states and 9 Union Territories. Multi-phase voting is necessitated by:

1. **Security deployment:** India has limited central security forces (CAPF — Central Armed Police Forces). Forces must be rotated across states. A simultaneous single-day election is logistically impossible.
2. **Geography:** Extreme terrain — Himalayan regions (Ladakh, Himachal Pradesh), island territories (Andaman & Nicobar, Lakshadweep), forests (Chhattisgarh, Jharkhand) require separate logistical planning.
3. **Workforce:** Election duty officers, polling personnel, and EVMs must be reused across phases. EVMs from completed phases are redeployed.
4. **Weather:** Scheduling avoids major festivals, harvest seasons, and extreme weather events — which vary regionally.

#### How Phases Are Decided

ECI considers:
- Law & order situation in each state/district (Naxal-affected areas may vote earlier/later for security reasons)
- Availability of CAPF battalions
- School examination schedules (schools are used as polling booths)
- State-specific festivals and agricultural cycles
- Geographic accessibility (mountain passes, monsoon flooding)

#### Phase Count — 2024 Lok Sabha Elections

The 2024 General Election (18th Lok Sabha) was conducted in **7 phases:**

| Phase | Date (2024) | Notable States Covered (illustrative) |
|---|---|---|
| Phase 1 | April 19, 2024 | Andhra Pradesh, Arunachal Pradesh, Assam (5 seats), Bihar (4 seats), etc. |
| Phase 2 | April 26, 2024 | Kerala (all 20), Karnataka (14 seats), Rajasthan (13 seats), etc. |
| Phase 3 | May 7, 2024 | Goa (all 2), Gujarat (all 26), Madhya Pradesh (8 seats), etc. |
| Phase 4 | May 13, 2024 | Remaining Andhra Pradesh, Jharkhand (5 seats), Madhya Pradesh (8 seats), etc. |
| Phase 5 | May 20, 2024 | Jharkhand (remaining), Uttarakhand (all 5), West Bengal (7 seats), etc. |
| Phase 6 | May 25, 2024 | Bihar (remaining), Haryana (all 10), Delhi (all 7), etc. |
| Phase 7 | June 1, 2024 | Bihar (remaining), Chandigarh, Himachal Pradesh (all 4), Punjab (all 13), etc. |

> [ASSUMPTION: Exact constituency breakdowns above are illustrative approximations. For precise 2024 data, reference the ECI official schedule document.]

#### Full Election Timeline Arc

```
Election Announcement (ECI press conference + Presidential notification)
    |
    v
Model Code of Conduct BEGINS (same day as announcement)
    |
    v
Notification issued for Phase 1 constituencies
    |
    v
Last date for filing nominations (Phase 1)
    |
    v
Scrutiny of nominations (Phase 1)
    |
    v
Last date for withdrawal of candidature (Phase 1)
    |
    v
Phase 1 Polling Day
    |
    v
[Phases 2 through N follow same cycle, staggered by ~1 week each]
    |
    v
Last Phase Polling Day
    |
    v
Silence Period ends; Counting Day (typically 4-8 days after last polling day)
    |
    v
Results Declared (constituency by constituency as counting progresses)
    |
    v
New government formation (party/coalition with majority stakes claim)
    |
    v
President invites leader to form government
    |
    v
Council of Ministers sworn in
```

#### Role of Observer Teams

ECI deploys three categories of Observers:
1. **General Observers:** Senior IAS officers. Monitor overall election conduct, spending, booth management.
2. **Expenditure Observers:** Monitor candidate campaign expenditure against limits.
3. **Police Observers:** Senior IPS officers. Monitor law and order, deployment of security forces.

Microobservers may also be deployed at sensitive booths.

---

### Section 4: Voting Process

#### How to Find Your Polling Booth

- Use ECI Voter Helpline app (available on Android/iOS)
- Visit voterportal.eci.gov.in → "Know Your Polling Booth"
- Enter EPIC number or name + date of birth
- Each voter is assigned to a specific booth within their constituency; booth number is printed on EPIC slip
- Polling booths are typically within 2 km of every registered voter [ASSUMPTION: Based on ECI guidelines; may vary in remote areas]

#### What to Carry on Voting Day

**Primary ID:** EPIC (Voter ID card)

**12 Alternative IDs accepted (as per ECI notification):**
1. Aadhaar Card
2. MNREGA Job Card
3. Passbooks with photograph issued by Bank/Post Office
4. Health Smart Card issued under the scheme of Ministry of Labour
5. Driving Licence
6. PAN Card
7. Smart Card issued by RGI under NPR
8. Indian Passport
9. Pension document with photograph
10. Service Identity Card issued to employees by Central/State Govt./PSU/Public Limited Companies
11. Disability Certificate (Unique Disability ID) issued by Dept. of Empowerment of Persons with Disabilities
12. Official Identity Card issued to Members of Parliament/State Legislature/MLCs

> The voter must appear in the electoral roll for the concerned polling station; alternative ID is only for identity verification.

#### EVM — Electronic Voting Machine

**How it works mechanically:**
- Two units: **Control Unit** (with polling officer) + **Ballot Unit** (in voting compartment behind screen)
- Connected by a 5-metre cable
- Ballot Unit has candidate buttons with labels (name + symbol) — one button per candidate
- Voter presses the button of their choice — blue light glows — single beep confirms vote recorded
- Control Unit displays vote count (only accessible after counting begins with proper authorisation)

**Why it cannot be hacked (simplified technical explanation):**
- EVMs are **standalone devices** — they have no WiFi, Bluetooth, internet, or any wireless receiver. There is physically no channel to transmit data to or from the machine remotely.
- The software (firmware) is **one-time programmable** — burned into ROM chips at manufacture. It cannot be updated, overwritten, or executed again.
- EVM chips are manufactured by **Bharat Electronics Limited (BEL)** and **Electronics Corporation of India Limited (ECIL)** — government undertakings — not imported.
- Source code is independently reviewed by a Technical Expert Committee.
- Each machine has a unique hardware ID.
- Physical tamper-evident seals are applied; any tampering destroys the seal visibly.
- First-Level Checking (FLC) is done by engineers before deployment; candidates' representatives may attend.

**VVPAT — Voter Verifiable Paper Audit Trail:**
- A printer unit attached to each EVM Ballot Unit (mandatory since 2019 Lok Sabha elections for all booths)
- When a vote is cast, a paper slip is printed for approximately 7 seconds, visible through a transparent window
- The slip shows: candidate name, symbol, and serial number
- The slip automatically cuts and falls into a sealed box — voter cannot take it out
- VVPAT provides **independent paper verification** of the electronic vote

**VVPAT Verification Process:**
- As per Supreme Court of India order (2019 and revisited in 2024 proceedings), VVPAT slips may be counted for a specified number of EVMs per constituency to verify accuracy
- [ASSUMPTION: The exact number of VVPATs verified per constituency has been debated in court; the current operative order should be verified against the latest Supreme Court ruling as of 2024]

#### Voting Procedure — Step by Step

1. Voter arrives at polling booth during polling hours (typically 7:00 AM to 6:00 PM; varies by constituency)
2. Voter presents EPIC or alternative ID to **Booth Level Officer (BLO)** at the entry
3. Name is verified against electoral roll; finger is checked for indelible ink mark (to prevent double voting)
4. Voter signs or places thumb impression in the register
5. **Indelible blue ink** is applied to the left index finger (or another finger if previous already marked for another purpose)
6. Voter receives a **ballot slip** (paper authorisation slip with voter's serial number) from the presiding officer
7. Voter proceeds to voting compartment, presents ballot slip to polling officer, who then **enables** the Ballot Unit from the Control Unit
8. Voter presses button of their chosen candidate on the Ballot Unit
9. Blue light next to chosen candidate lights up; single beep confirms registration
10. Voter sees VVPAT slip through window for approximately 7 seconds confirming their selection
11. Voter exits the booth (their ballot slip is retained by the polling officer)

#### Accessibility Provisions

- **PwD (Persons with Disabilities):** Priority queuing at booths; accessible booths (ramps mandatory from 2011); companion allowed if voter files prior declaration; ECI's SAKSHAM app for PwD voters; braille-enabled Ballot Unit pilot in some states [ASSUMPTION: Braille BU availability may vary by election]
- **Elderly (85+):** May opt for **postal ballot** from home (extended to 80+ in some elections) [ASSUMPTION: Age threshold for home postal ballot may vary; verify against current ECI notification]
- **Postal Ballot:** Available for service voters (military, CAPF), government employees on election duty, persons with disabilities, and senior citizens as notified
- **Absentee voters:** Limited provisions; NRI voters must physically be present in constituency to vote (no overseas voting)

---

### Section 5: Candidate & Party Process

#### Filing Nominations

- Candidates must file nomination papers (Form 2A for Lok Sabha) with the Returning Officer of the constituency
- Accompanied by: Affidavit of assets and liabilities (Form 26), criminal history disclosure (mandatory — public document), security deposit (Rs 25,000 for general candidates, Rs 12,500 for SC/ST candidates for Lok Sabha) [ASSUMPTION: Amounts as per Representation of the People Act, 1951; may be updated]
- Proposers required: 1 proposer for recognised party candidates; 10 proposers for independent candidates [ASSUMPTION]

#### Scrutiny and Withdrawal

- **Scrutiny:** Returning Officer examines all nomination papers for legal validity on a fixed date
- Invalid nominations (incomplete affidavits, wrong proposers, disqualified candidates) are rejected with reasons recorded
- **Withdrawal:** Candidates may withdraw candidature by submitting a notice to the RO before the withdrawal deadline (typically 2 days after scrutiny)
- Final list of candidates is published after withdrawal deadline

#### Election Symbols

- Recognised **National Parties** have **reserved symbols** that are non-transferable and known nationally
- Recognised **State Parties** have reserved symbols within their state
- **Independent candidates** are assigned one of the **free symbols** from ECI's approved free symbol list — allotted on first-come-first-served or random assignment basis
- When a party splits, ECI adjudicates which faction gets the original symbol (using membership and legislative majority tests) — recent examples: NCP (2023), Shiv Sena (2022)

#### Campaign Rules Under MCC

- Processions must not block traffic or use sound equipment after 10:00 PM
- No campaigning within 200 metres of a polling booth
- Campaign silence period: 48 hours before polling begins (no public meetings, processions, or electioneering)
- Star campaigners (up to 40 per national party, 20 per state party): Their expenses do not count against the candidate's limit
- Permitted: Door-to-door canvassing (max 5 persons at a time), digital/social media campaigns, wall paintings on private property with permission

#### Expenditure Limits

- **Lok Sabha constituency:** Rs 95 lakh per candidate (as of 2022 revised limit) [ASSUMPTION: Limit may have been further revised; verify with ECI]
- **Vidhan Sabha constituency:** Rs 40 lakh per candidate
- Candidates must maintain a full expenditure register
- Expenditure Observers monitor accounts
- Violations can lead to disqualification under Section 10A of the Representation of the People Act, 1951

#### NOTA — None of the Above

- **Introduced:** April 2013 (order by Supreme Court in People's Union for Civil Liberties case)
- **Symbol:** A ballot paper with a cross mark
- **How it works:** Voter presses the NOTA button (last button on Ballot Unit) to register a vote for "None of the Above." The vote is counted but cannot elect a candidate. Even if NOTA gets the highest votes, the candidate with next highest votes wins — NOTA never "wins."
- **Purpose:** Allows voter to officially express disapproval of all candidates while still participating

---

### Section 6: Counting & Results

#### Counting Day Process

1. Counting typically begins at 8:00 AM on designated counting day
2. Counting happens at designated **Counting Centres** (often a government building or election office)
3. **Strong Room** is opened in the presence of candidates' counting agents, observers, and Returning Officer
4. EVMs are taken to counting tables in rounds
5. For Lok Sabha constituencies, Postal Ballots are counted first
6. VVPAT slips counted for specified EVMs per Supreme Court directive
7. Each round of counting on EVM Control Unit is read by the RO
8. Figures are simultaneously updated on ECI result dashboard (results.eci.gov.in)
9. RO declares winner by **Returning Officer's Certificate** when a candidate secures a lead that cannot be overtaken

#### Strong Room Security

- EVMs are stored in **Strong Rooms** between polling day and counting day
- 24x7 CCTV surveillance with recordings
- Three-tier security: District Magistrate's seal, candidate agents' seals, CAPF guard
- Candidates' representatives are allowed to camp outside Strong Room and monitor via CCTV relay [ASSUMPTION: CCTV relay access may vary by state]
- Any breach of Strong Room security is a serious criminal offence

#### EVM Transport and Storage Chain

```
Polling day
  --> EVMs sealed at booth
  --> Transported to Reception Centre by RO
  --> Stored in Strong Room with seals intact
  --> Candidates verify seals before counting
  --> EVMs transported to counting tables
  --> Results read
  --> EVMs resealed
  --> Stored for 45 days (challenge period)
  --> Destroyed as per ECI schedule
```

[ASSUMPTION: 45-day retention period is subject to any election petition filed; if petition filed, EVMs stored until court order]

#### Majority Types in Indian Context

| Type | Definition | When Applicable |
|---|---|---|
| **Simple Majority (Plurality)** | Highest votes in constituency (FPTP) | Election of individual MPs and MLAs |
| **Absolute Majority** | More than 50% of total seats (273+ in Lok Sabha of 543) | Required to form a majority government without coalition |
| **Special Majority** | Typically 2/3rd of members present and voting + more than 50% of total membership | Constitutional amendments under Article 368 |
| **Effective Majority** | More than 50% of total members excluding vacancies | Removal of Vice President, etc. |

#### Hung Parliament

A **Hung Parliament** occurs when no single party or pre-election alliance wins an absolute majority (272+ seats in 543-seat Lok Sabha).

**Process:**
1. President invites the leader of the **single largest party** to form government and prove majority within a specified time (floor test)
2. If unable, President may invite the leader of the next largest alliance
3. A **floor test (confidence vote)** is conducted in Lok Sabha
4. Government may survive through post-election alliances and coalition agreements
5. If no government can be formed, President may either appoint a caretaker government or dissolve the house (requires fresh elections)

#### President's Rule

Conditions for invoking President's Rule (Article 356):
- State government has lost majority and no alternative government can be formed
- Constitutional machinery has failed in a state (constitutional crisis)
- State fails to comply with directions of Union Government under the Constitution
- Law and order breakdown beyond state's capacity

[ASSUMPTION: These are broad constitutional grounds; judicial review has significantly narrowed the practical application since the S.R. Bommai case, 1994]

---

### Section 7: Global Comparison

#### India vs USA

| Parameter | India | USA |
|---|---|---|
| **System type** | Parliamentary democracy | Presidential democracy (federal republic) |
| **Head of government** | Prime Minister (leader of majority in lower house) | President (directly elected via Electoral College) |
| **Election system** | First Past The Post (FPTP) for Lok Sabha | FPTP for Congressional seats; Electoral College for President |
| **Election body** | Election Commission of India (constitutional, independent) | Federal Election Commission (FEC) + State-administered |
| **Election frequency** | General elections every 5 years (unless dissolved earlier) | Presidential every 4 years; House every 2 years; Senate every 6 years (staggered) |
| **Voter ID** | EPIC / 12 alternative IDs | Varies by state (some require photo ID, some do not) |
| **Voting machine** | EVM (standalone, government-manufactured) | DRE machines or paper ballots — varies widely by state and county |
| **Voter registration** | Centralised electoral roll (ECI) | Decentralised — varies by state |
| **Can NRI/overseas vote?** | NRI must be physically present in constituency | US citizens abroad can vote absentee by federal law (UOCAVA) |

#### India vs UK

| Parameter | India | UK |
|---|---|---|
| **System type** | Parliamentary republic | Parliamentary constitutional monarchy |
| **Election system** | FPTP | FPTP for Westminster; Proportional for devolved assemblies (Scotland, Wales) |
| **Election body** | Election Commission of India | Electoral Commission (independent statutory body) |
| **Constituencies** | 543 Lok Sabha seats | 650 Westminster constituencies |
| **Voting method** | EVM | Paper ballot (no national EVM equivalent) |
| **Voter registration** | Central (national) roll | Individual Electoral Registration (IER) — household-based until 2014 |
| **Coalition history** | Common (UPA, NDA coalitions) | Less common; notable: 2010 coalition government (Con-LibDem) |

#### India vs European Parliament

| Parameter | India | European Parliament |
|---|---|---|
| **System type** | National parliamentary democracy | Supranational legislative body |
| **Election system** | FPTP | Proportional Representation (d'Hondt method in most EU states) |
| **Voter constituency** | Single-member constituencies | Multi-member constituencies (country-wise) |
| **Threshold** | No minimum vote threshold for MPs | Some countries have 5% threshold for seats |
| **Mandate** | 5 years | 5 years |
| **Direct election?** | Yes (direct) | Yes (direct since 1979) |
| **Head of government via election?** | Indirectly (PM elected by/from Parliament) | No (President of European Commission not directly elected) |

#### Key Differences Summary

- **FPTP vs Proportional:** FPTP (India, UK, USA Congress) tends to produce majority governments but can lead to parliament not reflecting vote shares accurately. Proportional representation (EU, Germany, New Zealand) gives smaller parties more seats proportional to their vote share.
- **Direct vs Indirect:** India and USA elect legislators directly; the executive (PM in India, President in USA) gains power indirectly through Parliament or Electoral College respectively.
- **Centralised vs Decentralised election administration:** India's ECI is a single national body — more uniformity. USA delegates significant election administration to states and counties — leading to variability in rules.

---

## Part C — Interaction Design

### Flow 1: New User Onboarding

```
[User opens ElectEdu app]
    |
    v
[Welcome Screen — animated Indian flag waving softly in background]

ElectEdu Bot:
"Namaste! Welcome to ElectEdu.
I can help you understand how elections work in India
and around the world — step by step, in plain language.

What brings you here today?"

[Chip options displayed as tappable cards]:
  [I'm voting for the first time]
  [I want to understand EVMs]
  [How does vote counting work?]
  [Compare India with other countries]
  [I have a specific question]

[Language selector at top right: EN | HI | TA | TE | BN ...]
```

**Design Notes:**
- Onboarding should complete in under 10 seconds
- No login required for first session [ASSUMPTION: Session persistence via localStorage for non-PII state]
- Language selector persists across sessions via localStorage
- On mobile: chips stack vertically in 1-column grid; on tablet/desktop: 2-column grid

---

### Flow 2: Guided Learning Path — "First-Time Voter"

```
User selects: [I'm voting for the first time]
    |
    v
ElectEdu:
"Great choice! Voting for the first time is exciting.
Let's make sure you're fully ready.

First question — are you already registered as a voter?"

  [Yes, I have my Voter ID]       [No, I need to register]
          |                                |
          v                                v
   Jump to Step 2            Show registration guide
                             (Form 6 + nvsp.in walkthrough)

---
STEP 1: CHECK YOUR REGISTRATION  [Progress: 1 of 5]
---
"Let's check that your name is on the voter list.
 Visit voterportal.eci.gov.in or type your details
 and I'll guide you through the search."

[Visual: Screenshot-style mock of voter portal search box]
[Button: Open Voter Portal] [Button: Next Step]

---
STEP 2: FIND YOUR POLLING BOOTH  [Progress: 2 of 5]
---
"Your polling booth is where you'll go to vote.
 It's usually within 2 km of your registered address.

 How to find it:
 1. Open ECI Voter Helpline App
 2. Tap 'Know Your Polling Station'
 3. Your booth will appear with address + map"

[Visual: Map pin animation with booth location]
[Button: Download Voter App] [Button: Next Step]

---
STEP 3: WHAT TO BRING ON VOTING DAY  [Progress: 3 of 5]
---
"On voting day, bring ONE of these:
 - Voter ID Card (EPIC) — preferred
 - Aadhaar Card
 - Driving Licence
 - PAN Card
 - Passport
 ... and 7 more options"

[Expandable: "See all 12 accepted IDs"]
[Button: Next Step]

---
STEP 4: HOW TO USE THE EVM  [Progress: 4 of 5]
---
"The EVM (Electronic Voting Machine) is simple to use.
 Here's exactly what happens inside the booth:"

[Animated step-by-step visual:
 1. You see a panel with candidate names and symbols
 2. Press the button next to your choice
 3. A blue light confirms your vote
 4. A paper slip appears briefly in the VVPAT window
 5. The slip drops automatically — your vote is recorded!]

[Button: Learn how EVM works in depth]  [Button: Next Step]

---
STEP 5: AFTER YOU VOTE  [Progress: 5 of 5]
---
"After voting:
 - Your finger is marked with indelible blue ink
 - You'll receive a voter slip receipt (varies by state)
 - Check election results on results.eci.gov.in on counting day

 That's it — you've done your civic duty!"

[Completion card with shareable graphic: "I'm ready to vote!"]
[Button: Ask another question]  [Button: Share]
```

---

### Flow 3: Visual Interactive Timeline

The timeline renders as a horizontally scrollable track on mobile and full-width on desktop. Each node is a circular icon with a label. Clicking or tapping expands an inline explanation card.

**Timeline Nodes (left to right):**

```
Announcement --> MCC Begins --> Nomination --> Scrutiny --> Withdrawal 
  --> Phase 1 Voting --> Phase 2 ... --> Phase N --> Counting --> Results --> Swearing In
```

**Example expanded node (Model Code of Conduct):**

```
CLICKED: "MCC Begins"
---
  Model Code of Conduct
  Starts: Same day as election announcement
  Ends: After counting is complete

  What changes today:
  - Government cannot announce new welfare schemes
  - No use of government vehicles for election campaigns
  - 48-hour silence period before each voting phase

  [Learn more about MCC]  [Close]
```

**Timeline Data:** Populated from a curated data file per election year. Defaults to 2024 Lok Sabha as the example timeline. When a live election is ongoing, Gemini API is called to provide current schedule context.

---

### Flow 4: Free Question Mode

**Example interaction:**

```
User types: "Can a candidate contest from two constituencies?"

ElectEdu responds:

  Yes — a candidate can contest from up to 2 constituencies
  simultaneously in Indian elections.

  However, if they win both seats, they must vacate one within
  10 days. A bye-election is then held in the vacated constituency.

  Source: Section 33(7), Representation of the People Act, 1951

  [Learn more]

  Related questions:
  [What is a bye-election?]
  [Can an NRI contest Indian elections?]
  [What happens if a sitting MP contests again?]
```

**"Learn more" expands to:**
```
Historical context: Contesting from 2 seats is legal but debated because 
of the cost burden of bye-elections on the public exchequer. Some election 
reform commissions have recommended limiting this to 1 constituency.

[ASSUMPTION: Verify specific historical examples with ECI records before
displaying to users]
```

---

### Flow 5: Country Selector

```
[Country selector in top navigation — flag emoji buttons]

India  |  USA  |  UK  |  EU

[User taps USA flag]
    |
    v
Gemini system prompt updates automatically:
"You are now answering questions about the United States election system.
 Refer to FEC guidelines, the US Constitution, and federal/state election laws.
 Always flag if a rule varies by state."

ElectEdu:
"Switched to United States elections.

 What would you like to know?
 [How does the US Presidential election work?]
 [What is the Electoral College?]
 [How do I register to vote in the USA?]
 [Compare USA with India]"
```

The active country is always visible in the header. Conversation context resets on country switch (with a warning prompt asking the user to confirm if mid-conversation).

---

## Part D — Content Accuracy Requirements

### 1. Factual Claims — Mandatory Source Attribution

Every factual claim about election procedures made by ElectEdu must include a source citation. The Gemini system prompt will enforce this:

```
"When stating a fact about Indian elections, always attribute it using one of these formats:
 - 'According to the Representation of the People Act, 1951, Section [X]...'
 - 'As per ECI guidelines / ECI notification dated [date if known]...'
 - 'Based on 2024 Lok Sabha election data...'
 - 'As per the Constitution of India, Article [X]...'

If you cannot attribute a fact to a specific source, state clearly:
'[I am providing general knowledge here — please verify at eci.gov.in]'"
```

### 2. Opinion Prohibition Rules

The Gemini system prompt will contain explicit hard prohibitions:

```
"YOU MUST NEVER:
 1. Express a preference for, or criticism of, any political party, candidate, or alliance.
 2. Predict or speculate on election outcomes.
 3. Comment on allegations of electoral fraud in a way that favours any side.
 4. Discuss ongoing electoral disputes or court cases with any editorial bias.
 5. Characterise any election result as 'fair' or 'unfair.'
 6. Suggest that any EVM manipulation has occurred or is possible as a matter of fact,
    even in hypothetical scenarios, unless citing an official court or ECI position.

If a user asks for your opinion on a party or candidate, respond:
'ElectEdu is a non-partisan education tool. I explain how elections work,
 but I don't take positions on political parties or candidates.'"
```

### 3. Uncertainty Handling Protocol

```
"If you are uncertain about a specific fact, date, or procedure:
 1. DO NOT hallucinate or guess.
 2. State explicitly: 'I don't have confirmed information on this specific detail.'
 3. Redirect the user: 'Please verify this at eci.gov.in or call the Voter Helpline at 1950.'
 4. You may provide surrounding context you are confident about:
    'I know the general process is X, but the specific deadline for [Y]
     should be confirmed directly with ECI.'"
```

### 4. Date Sensitivity Management

```
"Election schedules, candidate lists, result details, and notifications are time-sensitive.
 Always qualify time-sensitive information with:
 'This was the schedule/rule for [year]. Election details change each cycle.
  For the current schedule, please visit eci.gov.in or the Voter Helpline app.'

Do not present past election date information as present or future fact
unless the user has explicitly asked for historical information."
```

### 5. Language Accessibility Standard

```
"Follow these plain language guidelines:
 1. Define every election-specific term on its first use in any conversation session.
    Example: 'VVPAT (Voter Verifiable Paper Audit Trail) — this is a printer attached
    to the EVM that shows you a paper confirmation of your vote.'
 2. Avoid passive voice in explanations.
 3. Use analogies and real-world examples to explain abstract concepts.
 4. After any explanation, offer: [Explain more simply] or [Give me an example]
 5. Default response length: 2-4 sentences for direct questions.
    Reserve long-form for 'Learn more' sections only."
```

---

## Part E — System Requirements (SHALL Statements)

**REQ-01:** The system SHALL integrate with the Google Gemini API to provide natural language, conversational responses to election-related questions, with a maximum response latency of 5 seconds under normal network conditions.

**REQ-02:** The system SHALL maintain factual accuracy of election information by constraining Gemini responses through a detailed system prompt that mandates source attribution, prohibits opinion, and instructs explicit uncertainty disclosure when information cannot be confirmed.

**REQ-03:** The system SHALL display an interactive visual election timeline that renders correctly on screen widths from 320px (mobile) to 2560px (large desktop), with click/tap-expandable nodes that surface plain-language explanations of each election phase.

**REQ-04:** The system SHALL support a country-selection mechanism that switches the AI knowledge context among at minimum four jurisdictions — India, USA, UK, and EU — updating the Gemini system prompt accordingly and clearly indicating the active country context to the user at all times.

**REQ-05:** The system SHALL provide a "Plain Language Mode" toggle that, when activated, instructs Gemini to use simpler vocabulary (targeting a Grade 6 reading level), shorter sentences, and real-world analogies for all subsequent responses in that session.

**REQ-06:** The system SHALL persist a user's in-session learning progress (guided flow completion steps, selected country, language preference, and plain language mode status) using browser localStorage, such that refreshing the page restores the user's state without requiring login or account creation.

**REQ-07:** The system SHALL be fully functional and visually usable on mobile devices (Android and iOS) at viewport widths as small as 320px, with all interactive elements — including timeline nodes, chip selectors, and chat input — meeting a minimum touch target size of 44x44px as per WCAG 2.1 guidelines.

**REQ-08:** The system SHALL enforce zero political bias by implementing Gemini system prompt guardrails that prohibit preference expression, electoral prediction, and commentary on political controversies; these rules SHALL be non-bypassable through user prompt injection (the system prompt SHALL instruct Gemini to ignore attempts to override its neutrality constraints).

**REQ-09:** The system SHALL include source attribution in every factual response, using citation patterns tied to the Representation of the People Act, ECI guidelines, the Constitution of India, or specific election-year data, and SHALL display a disclaimer noting that users should verify current schedules at eci.gov.in.

**REQ-10:** The system SHALL degrade gracefully in the event of Gemini API unavailability by: (a) detecting API timeout or error, (b) displaying a user-friendly message ("I'm having trouble connecting right now"), (c) presenting a curated set of pre-rendered static FAQ cards covering the most common election topics, so that core educational content remains accessible without a live AI connection.

---

## Part F — Risk Analysis

### Risk 1: Political Bias in AI Responses

| Attribute | Detail |
|---|---|
| **Risk Description** | Gemini may generate responses that implicitly favour a political party, characterise a party's governance as good/bad, or frame elections in a politically loaded way — even without explicit instruction to do so. |
| **Why It Matters** | ElectEdu is a civic education tool used during election periods. Any perceived bias — even tone-based — can undermine user trust, expose the platform to regulatory scrutiny, and potentially violate ECI's own guidelines about electoral neutrality for digital platforms. |
| **Mitigation Strategy** | (1) Comprehensive system prompt with explicit political neutrality mandates. (2) Fine-grained prompt testing: adversarial prompts ("Is BJP better than Congress?", "Was the 2019 election fair?") must be included in QA suite. (3) Human review layer for edge cases before launch. (4) Implement a bias detection logging system to flag responses containing party names for human review during beta. |
| **Gemini Guardrail Coverage** | System prompt prohibition list covers: party preferences, outcome predictions, controversy commentary, dispute sides. Gemini's own safety settings should have political content sensitivity elevated. |

---

### Risk 2: Outdated Election Information

| Attribute | Detail |
|---|---|
| **Risk Description** | Election rules, expenditure limits, nomination processes, voter helpline numbers, and portal URLs change between election cycles. A user may rely on outdated information and make a consequential civic mistake — e.g., not bring the right ID, miss a registration deadline, or go to the wrong booth. |
| **Why It Matters** | For a first-time voter or low-literacy user, wrong factual information (e.g., wrong form number, wrong eligibility date) could disenfranchise them. This is the highest-stakes accuracy failure mode. |
| **Mitigation Strategy** | (1) All time-sensitive facts must carry a year qualifier and a verification instruction. (2) Build a "factual currency" layer — a human-curated knowledge base (JSON/Markdown) versioned by election year that overrides Gemini's general knowledge with authoritative, dated content. (3) Establish a pre-election update ritual: before each major election, update the knowledge base and test all key factual assertions. (4) Clear UI label: "ElectEdu knowledge updated for [month/year]. Verify current info at eci.gov.in." |
| **Gemini Guardrail Coverage** | Date sensitivity instruction mandates qualification of temporal claims. Gemini also instructed to recommend eci.gov.in as the canonical source for current data. |

---

### Risk 3: Misinformation Amplification

| Attribute | Detail |
|---|---|
| **Risk Description** | Users may arrive with existing misinformation (e.g., "EVMs are hacked remotely", "your vote is not secret", "certain communities are removed from voter lists"). An AI that engages ambiguously with these beliefs — even in an attempt to refute them — can appear to validate them if phrasing is poor. |
| **Why It Matters** | Election misinformation is a documented threat to democratic participation. An AI system that amplifies a myth — even accidentally — can have disproportionate reach. A civic education tool must proactively counter common myths with clear, sourced rebuttals. |
| **Mitigation Strategy** | (1) Build a "myth registry" — a curated list of top 20 Indian election myths with authoritative rebuttals. These are injected into Gemini context when myth-indicators are detected in user messages. (2) Train the system (via few-shot examples in system prompt) to say "This is a common misconception — here's what the evidence shows..." not "Some people believe...". (3) Never present a myth as a valid alternative view without citing its lack of factual basis. |
| **Gemini Guardrail Coverage** | EVM hacking myths are specifically addressed in the knowledge domain. The system prompt instructs Gemini to reference ECI's official EVM verification whitepaper when hacking is mentioned. |

---

### Risk 4: User Data Privacy — Voter Data Handling

| Attribute | Detail |
|---|---|
| **Risk Description** | Users may share personally identifiable information (EPIC numbers, addresses, names, date of birth) while trying to check their voter registration via ElectEdu. If this data is logged, stored, or transmitted insecurely, it creates a voter data privacy breach. |
| **Why It Matters** | Voter data is sensitive PII under India's Digital Personal Data Protection Act, 2023 (DPDP Act). Misuse of voter identity information — including EPIC numbers — could enable identity fraud or targeted voter suppression. ElectEdu must not become a data aggregation point. |
| **Mitigation Strategy** | (1) ElectEdu must NOT store any user-entered EPIC numbers, names, or DOB server-side. (2) If users need to check voter roll, redirect them to the official portal rather than providing a lookup service that proxies their data through ElectEdu. (3) Privacy policy must explicitly state: "ElectEdu does not store your voter information." (4) Use localStorage only for non-PII session state (flow step, language preference). (5) All API calls to Gemini must not include user-entered PII in the prompt. (6) Implement Content Security Policy (CSP) headers to prevent data exfiltration. |
| **Gemini Guardrail Coverage** | Gemini is instructed to never ask for EPIC numbers or other ID details. If a user offers them unprompted, Gemini responds: "Please don't share your Voter ID number here. Visit voterportal.eci.gov.in directly to check your registration." |

---

### Risk 5: Accessibility Failure for Low-Literacy Users

| Attribute | Detail |
|---|---|
| **Risk Description** | The users who most need election education — rural, low-literacy, elderly, linguistically diverse voters — are the least likely to benefit from a standard chat interface. A text-heavy, English-only, jargon-filled tool becomes yet another exclusionary resource. |
| **Why It Matters** | India has 22 officially scheduled languages. Approximately 25% of adults have limited literacy. If ElectEdu only works well for educated urban users, it fails its core civic mission precisely where the need is greatest. |
| **Mitigation Strategy** | (1) Phase 1: Full support for Hindi + English; Phase 2: Add Tamil, Telugu, Bengali, Marathi, Kannada [ASSUMPTION: Language support phased based on development resource constraints]. (2) Plain Language Mode toggled by default for users who select regional languages. (3) Audio output (text-to-speech) for key explanations using Web Speech API or Google Cloud TTS. (4) Visual-first design: chip-based interaction reduces typing burden for low-literacy users. (5) Illustrated step-by-step guides (static images) for core flows (EVM, booth finding) that work even without connectivity. (6) Font size accessibility: minimum 16px body text; large text option (20px+). |
| **Gemini Guardrail Coverage** | Plain language instruction in system prompt sets Grade 6 target. Language-specific system prompts (in Hindi, Tamil, etc.) ensure Gemini responds appropriately in the user's chosen language without code-switching. |

---

## Part G — Success Metrics

### For Hackathon / Submission Judges

| Evaluation Criterion | ElectEdu Differentiator |
|---|---|
| **Why demonstrably useful?** | ElectEdu converts a complex, bureaucratic process (voter registration, booth finding, EVM operation) into a 5-step guided walkthrough completable in under 3 minutes. A first-time voter can go from zero knowledge to polling-booth-ready in a single session. |
| **Better than Google Search?** | Google returns 10 blue links requiring the user to evaluate source credibility and reconcile contradictions. ElectEdu delivers one guided, conversational answer tailored to the user's specific situation — no link-hopping, no conflicting results, no prior knowledge required. |
| **Better than Wikipedia?** | Wikipedia's Indian election article requires prior political/legal knowledge to navigate. ElectEdu is interactive, adapts to what the user already knows, and answers follow-up questions contextually in the same session. It speaks in plain language; Wikipedia defaults to legal and political science terminology. |
| **Technical distinction** | Real-time Gemini AI integration; interactive visual timeline; country-switching knowledge context; guardrail system ensuring non-partisan responses; graceful offline degradation — none of which a static informational website offers. |

---

### For Real Users — Quantitative KPIs

| Metric | Definition | Target (Phase 1) |
|---|---|---|
| **Guided Flow Completion Rate** | % of users who select a guided learning path and complete all steps | >= 60% |
| **Fallback Rate** | % of questions where AI responds with "I don't know / please verify" | <= 10% |
| **Pre vs. Post Quiz Score Improvement** | Average improvement in user score on 5-question election knowledge quiz taken before and after a session | >= 40% improvement |
| **Time to First Answer** | Seconds from user submitting a question to AI response appearing on screen | <= 5 seconds (P95) |
| **Time to Find Specific Information** | Time taken by a user to find the answer to a targeted factual question (e.g., "What ID do I need to vote?") | <= 90 seconds median |
| **Language Switch Usage** | % of sessions using a non-English language | Track; target >= 20% (indicator of accessibility reach) |
| **Session Depth** | Average number of questions asked per session | >= 3 (indicates engagement vs. single-query bounce) |
| **Return Sessions** | % of users who return within 7 days (e.g., close to election day) | >= 25% |

---

### For Real Users — Qualitative KPIs

- **Confidence Score (exit survey):** "How confident do you feel about voting after using ElectEdu?" (1 to 5 scale). Target: >= 4.0/5.0 average.
- **Trust Score:** "Do you trust the information provided?" Target: >= 4.0/5.0.
- **Comprehension Check:** Can users answer 3 basic election questions correctly immediately after their first session without referring back to ElectEdu? Target: >= 80% of test users.
- **NPS (Net Promoter Score):** "Would you recommend ElectEdu to a friend or family member before an election?" Target: NPS >= 40.

---

## Appendix — Assumptions Log

All items marked `[ASSUMPTION]` in this document are listed below for verification before development begins:

| # | Section | Assumption | Suggested Verification Source |
|---|---|---|---|
| A1 | Part B, Sec 1 — MCC | MCC enforcement tied to IPC Sections 123-134A of RPA 1951 | Representation of the People Act, 1951 |
| A2 | Part B, Sec 2 — Residence | "Ordinary residence" defined by ECI/court interpretation, not fixed address | ECI handbooks, Supreme Court rulings |
| A3 | Part B, Sec 2 — EPIC | SMS format for voter list check via 1950 may vary | ECI Voter Helpline official documentation |
| A4 | Part B, Sec 3 — Phases | 2024 phase-by-state breakdown is illustrative, not official | ECI 2024 General Election Schedule (official PDF) |
| A5 | Part B, Sec 3 — Booth distance | 2 km max booth distance is a policy target | ECI polling station rationalisation guidelines |
| A6 | Part B, Sec 4 — Braille BU | Braille ballot unit is a pilot, not universally deployed | ECI Accessibility Guidelines |
| A7 | Part B, Sec 4 — Postal ballot age | Home postal ballot threshold (85+/80+) varies by notification | Latest ECI notification on facilitation for senior voters |
| A8 | Part B, Sec 5 — Security deposit | Rs 25,000 / Rs 12,500 deposit amounts per RPA 1951 may be revised | Latest ECI notification |
| A9 | Part B, Sec 5 — Proposers | 1 proposer (recognised party) vs. 10 (independent) | RPA 1951, Section 33 |
| A10 | Part B, Sec 5 — Expenditure | Rs 95 lakh Lok Sabha candidate limit (2022) may have been revised | Latest ECI expenditure limit notification |
| A11 | Part B, Sec 6 — EVM retention | 45-day retention period subject to election petition status | RPA 1951 + ECI strong room guidelines |
| A12 | Part B, Sec 6 — VVPAT | Number of VVPATs verified per constituency as per latest SC order | Latest Supreme Court order (2024 proceedings) |
| A13 | Part C — localStorage | Session persistence via localStorage does not constitute PII storage | Legal review against DPDP Act 2023 |
| A14 | Part F, Risk 5 — Languages | Phase 2 regional language support sized to development resources | Project resource planning document |

---

*Document End — ElectEdu Phase 1 Problem Space Analysis v1.0*  
*Status: Complete*  
*Next: Phase 1 Step 2 — Architecture Design*
