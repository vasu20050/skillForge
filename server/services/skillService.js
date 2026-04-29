const User = require('../models/User');
const Project = require('../models/Project');

/**
 * Skill Path Service
 * Manages the "Neural Pathfinding" and skill progression.
 */
class SkillService {
  /**
   * Updates user skills based on a completed project.
   * @param {string} userId 
   * @param {string} projectId 
   */
  async updateSkillsFromProject(userId, projectId) {
    const user = await User.findById(userId);
    const project = await Project.findById(projectId);
    
    if (!user || !project) return;

    // Each project increases skill levels
    const skillsGained = project.required_skills || [project.category];
    
    skillsGained.forEach(skill => {
      const currentLevel = user.skill_path.get(skill) || 0;
      // Increment skill level (more for earn projects, less for learn projects)
      const increment = project.type === 'earn_real' ? 15 : 10;
      user.skill_path.set(skill, Math.min(100, currentLevel + increment));
    });

    // Unlock neural nodes based on skill levels
    this.checkAndUnlockNodes(user);

    // Update Rank
    this.updateUserRank(user);

    await user.save();
  }

  /**
   * Unlocks new "Neural Nodes" if thresholds are met.
   */
  checkAndUnlockNodes(user) {
    const thresholds = {
      'Frontend Master': { skill: 'Web Development', level: 80 },
      'Backend Architect': { skill: 'Backend Development', level: 80 },
      'Design Sensei': { skill: 'Graphic Design', level: 70 }
    };

    for (const [node, criteria] of Object.entries(thresholds)) {
      if (user.skill_path.get(criteria.skill) >= criteria.level) {
        if (!user.neural_nodes_unlocked.includes(node)) {
          user.neural_nodes_unlocked.push(node);
        }
      }
    }
  }

  /**
   * Updates user rank based on reputation and skill nodes.
   */
  updateUserRank(user) {
    const nodeCount = user.neural_nodes_unlocked.length;
    const rep = user.reputation.score;

    if (rep > 90 && nodeCount >= 3) user.rank = 'Diamond';
    else if (rep > 80 && nodeCount >= 2) user.rank = 'Platinum';
    else if (rep > 60 && nodeCount >= 1) user.rank = 'Gold';
    else if (rep > 40) user.rank = 'Silver';
    else user.rank = 'Bronze';

    // Check for Fast-Track Eligibility
    if (user.rank === 'Platinum' || user.rank === 'Diamond') {
      user.fast_track_eligible = true;
    }
  }

  /**
   * Gets recommended projects for the Neural Path.
   */
  async getRecommendedPath(userId) {
    const user = await User.findById(userId);
    // Find projects that match user's current top skills or help unlock nodes
    return await Project.find({
      status: 'open',
      required_skills: { $in: Array.from(user.skill_path.keys()) }
    }).limit(3);
  }
}

module.exports = new SkillService();
