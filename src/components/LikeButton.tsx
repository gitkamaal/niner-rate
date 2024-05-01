import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';

interface Reaction {
    id,
    reviewId,
    likeCount,
    dislikeCount
}

const LikeButton: React.FC<{ reviewId: string }> = ({ reviewId }) => {
    const { data: session } = useSession();
    const [courseName, setCourseName] = useState<string>('');
    const [likeCount, setLikeCount] = useState<number>(0);
    const [dislikeCount, setDislikeCount] = useState<number>(0);
    const [activeBtn, setActiveBtn] = useState<string>('');
    const [currentReactionId, setCurrentReactionId] = useState<number>(0);
    useEffect(() => {
        // Fetch like and dislike counts for the course when component mounts
        fetchLikeDislikeCounts();
    }, []);

    const fetchLikeDislikeCounts = async () => {
        try {
            // Fetch like and dislike counts for the course from the server
            const courseResponse = await fetch(`/api/LikeButton?reviewId=${reviewId}`);
            const courseData = await courseResponse.json();
            console.log(courseData?._id);
            if (courseData?._id != null)
                setCurrentReactionId(courseData._id);
            // Update like and dislike counts in the component state
            if (courseData) {
                setLikeCount(courseData.likeCount || 0);
                setDislikeCount(courseData.dislikeCount || 0);
            }
        } catch (error) {
            console.error('Error fetching like and dislike counts:', error);
        }
    };

    // handle a like or dislike button click
    const handleReactionClick = async (reaction: string): Promise<void> => {
        try {
            // Update like and dislike counts based on the reaction
            if (reaction == 'like') {
                setLikeCount((prevCount) => prevCount + 1);
                if (activeBtn == 'dislike') {
                    setDislikeCount((prevCount) => prevCount - 1);
                }
            } else {
                setDislikeCount((prevCount) => prevCount + 1);
                if (activeBtn == 'like') {
                    setLikeCount((prevCount) => prevCount - 1);
                }
            }

            let currentId = 0;
            if (currentReactionId !== 0) currentId = currentReactionId;

            let req = { currentId: currentId, reviewId: reviewId, likeCount: likeCount, dislikeCount: dislikeCount };
            console.log("Request input: ");
            console.log(req);
            const response = await fetch('/api/LikeButton', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(req)
            });

            if (!response.ok) {
                fetchLikeDislikeCounts();
                throw new Error('Failed to save reaction');
            }

            // Toggle active button
            setActiveBtn((prevActiveBtn) => (prevActiveBtn === reaction ? '' : reaction));
        } catch (error) {
            console.error('Error:', error);
            // Handle error here (e.g., show an error message)
        }
    };

    if (!session) {
        return <div>Session is not available</div>;
    }

    return (
        <div>
            {/* Button for liking */}
            <button
                className={`inactive-btn ${activeBtn === 'like' ? 'like-active' : ''}`}
                onClick={() => handleReactionClick('like')}
            >
                <AiOutlineLike /> {likeCount}
            </button>

            {/* Button for disliking */}
            <button
                className={`inactive-btn ${activeBtn === 'dislike' ? 'dislike-active' : ''}`}
                onClick={() => handleReactionClick('dislike')}
            >
                <AiOutlineDislike /> {dislikeCount}
            </button>
        </div>
    );
};

export default LikeButton;