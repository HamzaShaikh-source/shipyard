"use client";

import { useState } from "react";

interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  helpfulCount: number;
  verified: boolean;
}

const SAMPLE_REVIEWS: Record<string, Review[]> = {
  "wave-runner": [
    {
      id: "wr-1",
      author: "Alex Morgan",
      rating: 5,
      date: "2 days ago",
      title: "Best running shoes I have owned",
      comment: "The foam midsole gives incredible springback on long 10k runs. Breathable knit keeps feet cool.",
      helpfulCount: 24,
      verified: true,
    },
    {
      id: "wr-2",
      author: "David Chen",
      rating: 4,
      date: "1 week ago",
      title: "Great cushioning, runs slightly snug",
      comment: "Super comfortable out of the box. Consider going half a size up if you have wider feet.",
      helpfulCount: 11,
      verified: true,
    },
    {
      id: "wr-3",
      author: "Sarah Jenkins",
      rating: 5,
      date: "3 weeks ago",
      title: "Lightweight and durable",
      comment: "Logged over 150 miles so far and outsole wear is minimal. Highly recommend!",
      helpfulCount: 8,
      verified: true,
    },
  ],
  "trail-blazer": [
    {
      id: "tb-1",
      author: "Marcus Vance",
      rating: 5,
      date: "3 days ago",
      title: "Unstoppable on wet rocks and mud",
      comment: "The 6mm lugs grip like claws. Kept my feet dry through wet terrain and stream crossings.",
      helpfulCount: 19,
      verified: true,
    },
    {
      id: "tb-2",
      author: "Elena Rostova",
      rating: 4,
      date: "2 weeks ago",
      title: "Solid rock plate protection",
      comment: "Saved my feet from sharp limestone trails. A bit stiff at first but broke in nicely.",
      helpfulCount: 7,
      verified: true,
    },
  ],
};

const DEFAULT_REVIEWS: Review[] = [
  {
    id: "def-1",
    author: "Jordan Lee",
    rating: 5,
    date: "4 days ago",
    title: "Exceeded my expectations",
    comment: "Build quality is top notch. Sleek design, premium feel, and works reliably every day.",
    helpfulCount: 15,
    verified: true,
  },
  {
    id: "def-2",
    author: "Taylor Reed",
    rating: 4,
    date: "2 weeks ago",
    title: "Well engineered product",
    comment: "Does exactly what it promises on the tin. Excellent battery life and durable materials.",
    helpfulCount: 9,
    verified: true,
  },
  {
    id: "def-3",
    author: "Casey Miller",
    rating: 5,
    date: "1 month ago",
    title: "Worth every penny",
    comment: "Shipped quickly and packaging was pristine. Has become an essential part of my daily gear.",
    helpfulCount: 6,
    verified: true,
  },
];

export default function Reviews({ productId }: { productId: string }) {
  const reviews = SAMPLE_REVIEWS[productId] || DEFAULT_REVIEWS;
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [helpfulVotes, setHelpfulVotes] = useState<Record<string, number>>({});

  const filteredReviews = selectedRating
    ? reviews.filter((r) => r.rating === selectedRating)
    : reviews;

  const totalReviews = reviews.length;
  const avgRating = (
    reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews
  ).toFixed(1);

  const handleVote = (id: string) => {
    setHelpfulVotes((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  return (
    <section className="reviews-section" id="reviews">
      <div className="section-head">
        <h2 className="section-title">Customer Reviews</h2>
        <span className="section-count">{totalReviews} verified reviews</span>
      </div>

      <div className="reviews-summary">
        <div className="reviews-score-card">
          <span className="reviews-avg">{avgRating}</span>
          <div className="reviews-stars">
            {"★".repeat(Math.round(Number(avgRating)))}
            {"☆".repeat(5 - Math.round(Number(avgRating)))}
          </div>
          <span className="reviews-based">Based on {totalReviews} reviews</span>
        </div>

        <div className="reviews-breakdown">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = reviews.filter((r) => r.rating === star).length;
            const pct = Math.round((count / totalReviews) * 100);
            return (
              <button
                key={star}
                type="button"
                className={`reviews-bar-row ${selectedRating === star ? "active" : ""}`}
                onClick={() =>
                  setSelectedRating(selectedRating === star ? null : star)
                }
              >
                <span className="star-label">{star}★</span>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: `${pct}%` }} />
                </div>
                <span className="bar-count">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {selectedRating && (
        <div className="reviews-filter-tag">
          <span>Showing {selectedRating}★ reviews</span>
          <button type="button" onClick={() => setSelectedRating(null)}>
            Clear filter
          </button>
        </div>
      )}

      <div className="reviews-list">
        {filteredReviews.map((rev) => (
          <div key={rev.id} className="review-card">
            <div className="review-meta">
              <div className="review-stars">
                {"★".repeat(rev.rating)}
                {"☆".repeat(5 - rev.rating)}
              </div>
              <span className="review-author">{rev.author}</span>
              {rev.verified && (
                <span className="review-badge">Verified Buyer</span>
              )}
              <span className="review-date">{rev.date}</span>
            </div>
            <h4 className="review-title">{rev.title}</h4>
            <p className="review-comment">{rev.comment}</p>
            <button
              type="button"
              className="helpful-btn"
              onClick={() => handleVote(rev.id)}
            >
              Helpful ({rev.helpfulCount + (helpfulVotes[rev.id] || 0)})
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
