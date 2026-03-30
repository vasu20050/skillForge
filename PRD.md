# Product Requirements Document: SkillForge

Project: SkillForge  
Version: 2.0 (Production Blueprint)  
Status: Architecture Locked  
Last Updated: March 29, 2026

## 1. Product Definition
SkillForge is a closed-campus skill economy platform that converts students from beginners into verified earners through one controlled progression:

Learn -> Prove -> Earn

The platform is intentionally workflow-first, trust-first, and outcome-first. It is not a social app, not a random gig board, and not an open marketplace.

## 2. Core Constraints (Non-Negotiable)
1. Campus-only authentication using college domains and admin verification.
2. Beginners and professionals are not mixed in the same experience stage.
3. No external paid APIs required for MVP.
4. No social feed, no vanity engagement loops.
5. Every earning action must have proof-of-work and a contract trail.
6. Credit flow must be ledger-backed and escrow-safe.

## 3. Why SkillForge Beats WhatsApp
WhatsApp fails on enforceable trust, auditability, and fairness. SkillForge wins because it provides:

1. Verifiable work history (portfolio entries linked to project and proof).
2. Mandatory mutual rating and reputation impact.
3. Escrow and milestone release controls.
4. Built-in contract acceptance before work starts.
5. Dispute workflow with accountable resolution.

## 4. User Roles
1. Student Beginner: can access Learn Mode and Apprentice tasks only.
2. Verified Student Earner: can accept Earn Mode projects.
3. Client (student club/startup/campus org): can post projects and fund escrow.
4. Admin: controls seeding, verification overrides, dispute finalization, abuse handling.
5. Neutral Voter: verified users eligible to vote in community disputes.

## 5. Product Modes

### 5.1 Learn Mode (Beginner Zone)
Purpose: safe practice with structured dummy projects.

Rules:
1. Projects are admin-seeded only.
2. Step-based tasks with required deliverables.
3. Submission must include one proof type: GitHub link, demo URL, or file upload.
4. Completion creates Proof-of-Work records.
5. Credits are small and capped to avoid farming abuse.

### 5.2 Verification Gate
Purpose: ensure only prepared users enter earning marketplace.

Default unlock criteria:
1. Complete at least 3 Learn projects.
2. Minimum average score >= 3.8/5 from evaluators.
3. At least 2 on-time submissions.
4. No unresolved integrity flags.

Result:
1. User status changes from learner to verified_earner.
2. Earn Mode routes and APIs become accessible.

### 5.3 Earn Mode (Marketplace)
Purpose: real campus project economy for verified earners.

Features:
1. Project posting with credits, deadlines, milestones.
2. Smart recommendation ranking for worker-project fit.
3. Single-worker and team project support.
4. Contract generation and acceptance mandatory.
5. Milestone-based escrow release.

## 6. Trust and Safety System

### 6.1 Two-Sided Rating (Mandatory)
1. Client rates worker after completion.
2. Worker rates client after completion.
3. Rating window: 7 days; then auto-close.
4. Missing ratings reduce reputation confidence score.

### 6.2 Reputation Score
Reputation score is bounded in [0, 100].

Formula (MVP):
Rep = 30*CompletionRate + 30*AvgRatingNorm + 20*OnTimeRate + 20*RepeatCollabRate

Where each component is normalized in [0,1].

Interpretation:
1. 80-100: Trusted
2. 60-79: Reliable
3. 40-59: Developing
4. <40: Restricted (limited project cap)

### 6.3 Dispute System
Entry points:
1. Milestone rejection disagreement.
2. Scope deviation claims.
3. Delivery quality disputes.

Resolution paths:
1. Admin Arbitration (default for high-value projects).
2. Community Jury (3 neutral verified users) for medium/low-value disputes.

Community jury logic:
1. Randomly pick 3 neutral voters with no relationship to either party.
2. Majority decision final unless admin escalates.
3. Voters receive small credits for participation.

### 6.4 Milestone Escrow
1. Client funds total credits at contract start.
2. Credits move to escrow ledger, not directly to worker.
3. Each approved milestone releases its percentage split.
4. On dispute, disputed milestone amount is frozen until resolution.

Example split: 30/40/30.

## 7. Credit Economy and Reward Conversion

### 7.1 Credit Sources
1. Learn Mode completion rewards (capped).
2. Earn Mode milestone payouts.
3. Reputation bonuses.
4. Community jury participation rewards.

### 7.2 Credit Sinks
1. Project funding by clients.
2. Platform fee reserve (optional, configurable).
3. Reward conversion redemption.

### 7.3 Reward Conversion System
Credits are redeemable through admin-configured reward catalog:

1. Internship Priority Pass (high tier).
2. Campus Certificate Unlock.
3. Featured Leaderboard Badge.
4. Club Perks (event pass, lab credits, merch).

Redemption workflow:
1. User requests conversion.
2. Credits are debited from wallet and recorded in transaction ledger.
3. Admin/partner marks reward fulfilled.
4. Fulfillment record linked to profile.

## 8. Contract System (Auto-Generated)
Generated when client selects worker/team and both confirm scope.

Contract includes:
1. Scope summary.
2. Deliverables list.
3. Deadlines and milestone dates.
4. Total credits and milestone percentages.
5. Acceptance conditions.
6. Dispute jurisdiction (admin or jury-eligible).

Activation rule:
1. Status remains pending_contract until both parties accept.
2. Work cannot start and escrow cannot release before acceptance.

## 9. Apprentice Mode
Goal: bridge beginners into real execution safely.

Rules:
1. Only verified earners can create apprentice slots in team projects.
2. Apprentices can handle bounded sub-tasks only.
3. Mentor review required before milestone marks complete.
4. Apprentice contribution is portfolio-visible but labeled mentored.

## 10. Proof-of-Work and Portfolio
Every completed learn/earn/apprentice task must store at least one proof artifact:
1. github_url
2. demo_url
3. file_submission

Auto-portfolio entry includes:
1. Project title and role.
2. Proof links/files.
3. Ratings received.
4. Outcome and completion timestamp.

## 11. System Architecture

### 11.1 Frontend
1. React.js with Tailwind CSS.
2. Role-aware routing with protected routes.
3. UI modules for Learn, Verify, Earn, Contracts, Disputes, Rewards.

### 11.2 Backend
1. Node.js + Express.js REST API.
2. JWT auth with role and mode guards.
3. Transaction-safe service layer for escrow and credits.
4. Event logging for audit (project lifecycle, dispute decisions).

### 11.3 Database
1. MongoDB + Mongoose.
2. Indexed collections for project filtering, dispute lookup, reputation reads.
3. Ledger collections for immutable credit accounting.

## 12. Data Model (Required Schemas)

### 12.1 User
1. email (unique, college-domain validated)
2. password_hash
3. roles: [student, client, admin]
4. mode_status: learner | verified_earner | suspended
5. profile: name, department, year, skills
6. reputation: score, completion_rate, on_time_rate, repeat_collab_rate
7. credits_wallet: available, escrow_locked, lifetime_earned, lifetime_spent
8. verification: completed_learn_projects, average_learn_rating, verified_at

Indexes:
1. unique email
2. mode_status + reputation.score

### 12.2 Project
1. type: learn_dummy | earn_real
2. title, description, category
3. client_id
4. team: worker_ids, apprentice_ids
5. status: draft | open | pending_contract | active | submitted | completed | disputed | cancelled
6. credits_total
7. deadline
8. verification_required (true for earn projects)
9. proof_requirements

Indexes:
1. type + status
2. client_id + created_at
3. deadline

### 12.3 Milestone
1. project_id
2. title, description
3. amount_credits
4. percentage_split
5. due_date
6. status: pending | submitted | approved | rejected | disputed | paid
7. submission_proof

Indexes:
1. project_id + status
2. due_date

### 12.4 Transaction (Credit Ledger)
1. tx_type: earn_payout | escrow_lock | escrow_release | reward_redeem | bonus | refund | penalty
2. from_user_id (nullable for system)
3. to_user_id (nullable)
4. project_id (nullable)
5. milestone_id (nullable)
6. amount
7. balance_snapshot_before_after
8. status: pending | confirmed | reversed
9. metadata

Indexes:
1. to_user_id + created_at
2. project_id + tx_type

### 12.5 Rating
1. project_id
2. rater_id
3. ratee_id
4. role_context: client_to_worker | worker_to_client
5. score (1-5)
6. feedback
7. submitted_at

Unique index:
1. project_id + rater_id + role_context

### 12.6 Dispute
1. project_id
2. milestone_id (nullable)
3. raised_by
4. against_user
5. reason_code
6. evidence_links
7. resolution_mode: admin | jury
8. jury_voter_ids
9. votes
10. verdict
11. status: open | investigating | resolved | escalated

Indexes:
1. status + created_at
2. project_id

### 12.7 Contract
1. project_id
2. client_id
3. worker_ids
4. scope
5. deliverables
6. milestones_snapshot
7. terms
8. acceptance: client_accepted_at, worker_accepted_at
9. status: draft | active | rejected | superseded

Unique index:
1. project_id + status(active)

## 13. API Structure

Base: /api/v1

### 13.1 Auth
1. POST /auth/register
2. POST /auth/login
3. GET /auth/me

### 13.2 Learn Mode
1. GET /learn/projects
2. POST /learn/projects/:id/submit
3. GET /learn/progress

### 13.3 Verification
1. GET /verification/status
2. POST /verification/request
3. POST /verification/admin/approve

### 13.4 Marketplace (Earn Mode)
1. POST /projects
2. GET /projects
3. POST /projects/:id/apply
4. POST /projects/:id/assign
5. GET /projects/:id

### 13.5 Contracts and Milestones
1. POST /projects/:id/contract/generate
2. POST /contracts/:id/accept
3. POST /milestones/:id/submit
4. POST /milestones/:id/approve
5. POST /milestones/:id/reject

### 13.6 Credits and Rewards
1. GET /wallet
2. GET /transactions
3. GET /rewards/catalog
4. POST /rewards/redeem

### 13.7 Ratings and Reputation
1. POST /ratings
2. GET /users/:id/reputation

### 13.8 Disputes
1. POST /disputes
2. GET /disputes/:id
3. POST /disputes/:id/vote
4. POST /disputes/:id/resolve

### 13.9 Admin
1. POST /admin/seed/learn-projects
2. POST /admin/seed/simulate-activity
3. GET /admin/moderation/disputes
4. PATCH /admin/users/:id/status

## 14. UI Screens (Required)
1. Signup/Login (college email only).
2. Dashboard (credits, level, verification progress, active contracts).
3. Learn Mode project list.
4. Submission page with proof upload/link.
5. Verification status page.
6. Earn Marketplace listing.
7. Project detail page.
8. Contract review and acceptance screen.
9. Milestone tracker with release states.
10. Profile with portfolio and reputation.
11. Dispute panel and evidence timeline.
12. Admin panel with fake project seeding.

## 15. Implementation Folder Structure

Root:
1. client/
2. server/
3. docs/

client/src:
1. app/
2. features/auth/
3. features/learn/
4. features/verification/
5. features/marketplace/
6. features/contracts/
7. features/milestones/
8. features/disputes/
9. features/rewards/
10. features/profile/
11. components/
12. services/
13. hooks/
14. utils/

server/src:
1. config/
2. models/
3. controllers/
4. services/
5. routes/
6. middleware/
7. validators/
8. jobs/
9. events/
10. utils/
11. tests/

## 16. Key Logic (Pseudo-Workflows)

### 16.1 Verification Engine
1. On learn project completion, update counters and ratings.
2. On status check, evaluate criteria set.
3. If criteria met, switch mode_status to verified_earner.
4. Emit event: USER_VERIFIED.

### 16.2 Escrow Engine
1. On contract activation, lock credits from client wallet.
2. Create escrow_lock transaction record.
3. On milestone approval, release milestone amount.
4. Create escrow_release and earn_payout transactions atomically.
5. Reject if wallet or ledger integrity checks fail.

### 16.3 Dispute Engine
1. Freeze disputed milestone amount.
2. Route to admin or jury based on project value policy.
3. Record decision and unlock funds according to verdict.
4. Apply penalties or reputation impact where applicable.

## 17. Demo Flow (Must Work)
1. New user signs up with college email.
2. User enters Learn Mode and completes seeded dummy project.
3. User submits proof and receives evaluation.
4. User gets verified and unlocks Earn Mode.
5. User accepts real project and signs contract.
6. User delivers milestone proof.
7. Client approves milestone and credits are released.
8. User redeems credits through reward catalog.

## 18. Step-by-Step Build Plan

Phase 1: Foundation
1. Finalize schemas and indexes.
2. Implement auth with college email whitelist.
3. Add RBAC and mode guards.

Phase 2: Learn + Verification
1. Build admin seeding APIs.
2. Build learn submission and evaluator flow.
3. Implement verification criteria evaluator.

Phase 3: Marketplace Core
1. Build project posting, assignment, and team support.
2. Implement contract generation and acceptance.
3. Build milestone submission and approval.

Phase 4: Trust Layer
1. Implement two-sided ratings.
2. Implement reputation score updates.
3. Implement dispute workflows (admin + jury).

Phase 5: Economy
1. Implement immutable transaction ledger.
2. Implement escrow lock/release logic.
3. Implement reward conversion and redemption states.

Phase 6: Product Hardening
1. Add audit logs and abuse monitoring.
2. Add test coverage for economic integrity and dispute decisions.
3. Add dashboards and operational admin tools.

## 19. Open-Source and API Policy
1. Platform remains fully open-source.
2. No external paid API keys required for MVP operation.
3. If optional integrations are added later, all core flows remain functional without them.
4. Secrets are self-hosted via .env and never hardcoded.

## 20. Out-of-Scope for MVP
1. Social media feed.
2. Generic AI chatbot features.
3. Off-platform direct fiat payment gateways.
4. Cross-campus expansion before trust metrics stabilize.
