const Milestone = require('../models/Milestone');
const Project = require('../models/Project');

/**
 * Sahara AI Audit Service
 * Simulates an automated audit of milestone submissions.
 */
class AIAuditService {
  /**
   * Performs an audit on a submitted milestone.
   * @param {string} milestoneId 
   */
  async performAudit(milestoneId) {
    try {
      const milestone = await Milestone.findById(milestoneId).populate('project_id');
      if (!milestone) throw new Error('Milestone not found');

      console.log(`[Sahara AI] Auditing milestone: ${milestone.title}...`);

      // Update status to pending
      milestone.ai_audit.status = 'pending';
      await milestone.save();

      // Simulate audit logic (In production, call Gemini/LLM here)
      // For now, we use a timeout to simulate "processing"
      setTimeout(async () => {
        const { submission_proof } = milestone;
        let auditResult = {
          score: 0,
          feedback: '',
          status: 'passed'
        };

        // Basic simulation logic
        if (submission_proof.github_url) {
          auditResult.score = 85 + Math.floor(Math.random() * 15);
          auditResult.feedback = "Code structure looks clean. No immediate vulnerabilities found. Proof-of-work verified via repository history.";
        } else if (submission_proof.video_url) {
          auditResult.score = 90 + Math.floor(Math.random() * 10);
          auditResult.feedback = "Visual proof-of-logic confirmed. Student demonstrated clear understanding of the implementation.";
        } else {
          auditResult.status = 'flagged';
          auditResult.score = 40;
          auditResult.feedback = "Missing primary proof-of-work artifact. Manual review recommended.";
        }

        // Update milestone with audit results
        await Milestone.findByIdAndUpdate(milestoneId, {
          'ai_audit.status': auditResult.status,
          'ai_audit.score': auditResult.score,
          'ai_audit.feedback': auditResult.feedback,
          'ai_audit.audited_at': new Date()
        });

        console.log(`[Sahara AI] Audit completed for: ${milestone.title}. Result: ${auditResult.status}`);
      }, 3000);

      return { message: 'Audit initiated' };
    } catch (error) {
      console.error('AI Audit Error:', error);
      throw error;
    }
  }
}

module.exports = new AIAuditService();
