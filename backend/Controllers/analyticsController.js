import Engagement from '../Models/engagementModel.js';

// Fetch analytics on user interactions
export const getUserEngagement = async (req, res) => {
  try {
    // Group by userId and sum total interactions (engagement actions)
    const engagementData = await Engagement.aggregate([
      { 
        $group: { 
          _id: "$userId", 
          totalEngagement: { $sum: 1 } 
        }
      },
    ]);
    res.status(200).json(engagementData);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving engagement data', error });
  }
};

// Analyze engagement on specific topics or content
export const getTopicEngagement = async (req, res) => {
  try {
    // Group by topicId to get total engagements for each topic
    const topicEngagement = await Engagement.aggregate([
      { 
        $group: { 
          _id: "$topicId", 
          totalEngagement: { $sum: 1 }
        }
      },
    ]);
    res.status(200).json(topicEngagement);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving topic engagement data', error });
  }
};

// Track how many users have taken specific quizzes or simulations
export const getQuizEngagement = async (req, res) => {
  try {
    const quizEngagement = await Engagement.aggregate([
      { 
        $match: { quizId: req.params.quizId }  // Filter by specific quiz
      },
      { 
        $group: { 
          _id: "$quizId", 
          usersTaken: { $sum: 1 } 
        }
      },
    ]);
    res.status(200).json(quizEngagement);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving quiz engagement data', error });
  }
};

// Track voting participation in mock elections
export const getVoteEngagement = async (req, res) => {
  try {
    const voteEngagement = await Engagement.aggregate([
      { 
        $match: { actionType: 'vote_cast' }  // Filter by vote action
      },
      { 
        $group: { 
          _id: "$actionType", 
          totalVotes: { $sum: 1 } 
        }
      },
    ]);
    res.status(200).json(voteEngagement);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving voting engagement data', error });
  }
};
