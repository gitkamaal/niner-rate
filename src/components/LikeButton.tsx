import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';

const LikeButton = ({ reviewId }) => {
  const { data: session } = useSession();
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [activeBtn, setActiveBtn] = useState('');

  // Helper to update local storage and state
  const updateReactionState = (newActiveBtn, likes, dislikes) => {
    setActiveBtn(newActiveBtn);
    setLikeCount(likes);
    setDislikeCount(dislikes);
    localStorage.setItem(
      `reaction_${reviewId}`,
      JSON.stringify({
        activeBtn: newActiveBtn,
        likeCount: likes,
        dislikeCount: dislikes,
      })
    );
  };

  useEffect(() => {
    // Fetch initial counts and set up local state based on local storage
    const reactionData = localStorage.getItem(`reaction_${reviewId}`);
    const savedData = reactionData ? JSON.parse(reactionData) : null;

    const fetchLikeDislikeCounts = async () => {
      try {
        const response = await fetch(`/api/LikeButton?reviewId=${reviewId}`);
        const data = await response.json();
        if (data) {
          const initialLikes = data.likeCount || 0;
          const initialDislikes = data.dislikeCount || 0;
          const initialActiveBtn = savedData ? savedData.activeBtn : '';
          updateReactionState(initialActiveBtn, initialLikes, initialDislikes);
        }
      } catch (error) {
        console.error('Error fetching like and dislike counts:', error);
      }
    };

    fetchLikeDislikeCounts();
  }, [reviewId]);

  const handleReactionClick = async (reaction) => {
    // Check if the current button click is different from the last active button
    if (activeBtn && activeBtn !== reaction) {
      // Calculate adjusted counts for toggling reactions
      let adjustment = activeBtn === 'like' ? -1 : 1; // If previously liked, we subtract one; if disliked, we add one.
      const newLikeCount = reaction === 'like' ? likeCount + 1 : likeCount + adjustment;
      const newDislikeCount = reaction === 'dislike' ? dislikeCount + 1 : dislikeCount - adjustment;
  
      try {
        const response = await fetch('/api/LikeButton', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            reviewId,
            likeCount: newLikeCount,
            dislikeCount: newDislikeCount,
            userReaction: reaction,
          }),
        });
  
        if (!response.ok) {
          throw new Error('Failed to save reaction');
        }
  
        // Update the local state and local storage
        updateReactionState(reaction, newLikeCount, newDislikeCount);
      } catch (error) {
        console.error('Error:', error);
        // Optionally, revert changes if the request fails
      }
    } else if (activeBtn === reaction) {
      // If the active button is clicked again, toggle it off
      const adjustment = reaction === 'like' ? -1 : 1;
      const newLikeCount = reaction === 'like' ? likeCount - 1 : likeCount;
      const newDislikeCount = reaction === 'dislike' ? dislikeCount - 1 : dislikeCount;
      updateReactionState('', newLikeCount, newDislikeCount);
    } else {
      // Handle first-time click
      const newLikeCount = reaction === 'like' ? likeCount + 1 : likeCount;
      const newDislikeCount = reaction === 'dislike' ? dislikeCount + 1 : dislikeCount;
  
      try {
        const response = await fetch('/api/LikeButton', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            reviewId,
            likeCount: newLikeCount,
            dislikeCount: newDislikeCount,
            userReaction: reaction,
          }),
        });
  
        if (!response.ok) {
          throw new Error('Failed to save reaction');
        }
  
        // Update the local state and local storage
        updateReactionState(reaction, newLikeCount, newDislikeCount);
      } catch (error) {
        console.error('Error:', error);
        // Optionally, revert changes if the request fails
      }
    }
  };
  

  if (!session) {
    return <div>Session is not available</div>;
  }

  return (
    <div>
      <button
        className={`inactive-btn ${activeBtn === 'like' ? 'like-active' : ''}`}
        onClick={() => handleReactionClick('like')}
      >
        <AiOutlineLike /> {likeCount}
      </button>
      <button
        className={`inactive-btn ${
          activeBtn === 'dislike' ? 'dislike-active' : ''
        }`}
        onClick={() => handleReactionClick('dislike')}
      >
        <AiOutlineDislike /> {dislikeCount}
      </button>
    </div>
  );
};

export default LikeButton;
