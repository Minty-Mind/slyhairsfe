"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Star, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { apiClient } from "@/lib/api/client";
import { toast } from "sonner";
import type { Review } from "@/types";
import Link from "next/link";

function StarRating({ rating, onRate, interactive = false, size = 18 }: {
  rating: number;
  onRate?: (r: number) => void;
  interactive?: boolean;
  size?: number;
}) {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={!interactive}
          onClick={() => onRate?.(star)}
          onMouseEnter={() => interactive && setHover(star)}
          onMouseLeave={() => interactive && setHover(0)}
          className={interactive ? "cursor-pointer transition-transform hover:scale-110" : "cursor-default"}
        >
          <Star
            size={size}
            className={
              star <= (hover || rating)
                ? "fill-gold-500 text-gold-500"
                : "text-gray-600"
            }
          />
        </button>
      ))}
    </div>
  );
}

export default function ProductReviews({ productId, reviews: initialReviews }: {
  productId: string;
  reviews: Review[];
}) {
  const { data: session } = useSession();
  const [reviews, setReviews] = useState(initialReviews);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const avgRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    setSubmitting(true);
    try {
      const { review } = await apiClient<{ review: Review }>("/api/reviews", {
        method: "POST",
        body: JSON.stringify({ productId, rating, comment }),
      });
      setReviews((prev) => {
        const existing = prev.findIndex((r) => r.user?.name === review.user?.name);
        if (existing >= 0) {
          const updated = [...prev];
          updated[existing] = review;
          return updated;
        }
        return [review, ...prev];
      });
      setRating(0);
      setComment("");
      setShowForm(false);
      toast.success("Review submitted!");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div>
            <span className="text-3xl font-black text-white">{avgRating.toFixed(1)}</span>
            <span className="text-gray-500 text-sm ml-1">/ 5</span>
          </div>
          <div>
            <StarRating rating={Math.round(avgRating)} size={16} />
            <p className="text-gray-500 text-xs mt-1">{reviews.length} review{reviews.length !== 1 ? "s" : ""}</p>
          </div>
        </div>

        {session ? (
          <Button
            onClick={() => setShowForm(!showForm)}
            variant="outline"
            className="border-white/10 text-white hover:bg-white/5 rounded-xl text-xs uppercase tracking-wider h-10"
          >
            {showForm ? "Cancel" : "Write a Review"}
          </Button>
        ) : (
          <Link href="/auth/signin">
            <Button variant="outline" className="border-white/10 text-white hover:bg-white/5 rounded-xl text-xs uppercase tracking-wider h-10">
              Sign in to Review
            </Button>
          </Link>
        )}
      </div>

      {/* Review Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-neutral-900 rounded-xl border border-white/5 p-5 space-y-4">
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Your Rating</label>
            <StarRating rating={rating} onRate={setRating} interactive size={24} />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Comment (optional)</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              placeholder="Share your experience with this product..."
              className="w-full bg-black border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:border-gold-500 outline-none placeholder:text-gray-600"
            />
          </div>
          <Button
            type="submit"
            disabled={submitting || rating === 0}
            className="bg-gold-500 text-black font-bold rounded-xl hover:bg-gold-400 h-10 px-6 uppercase tracking-wider text-xs disabled:opacity-50"
          >
            {submitting ? "Submitting..." : "Submit Review"}
          </Button>
        </form>
      )}

      {/* Reviews List */}
      {reviews.length > 0 ? (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="bg-neutral-900/50 rounded-xl border border-white/5 p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gold-500/10 flex items-center justify-center">
                    <User size={16} className="text-gold-500" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">{review.user?.name || "Customer"}</p>
                    <p className="text-gray-600 text-[10px]">
                      {new Date(review.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                    </p>
                  </div>
                </div>
                <StarRating rating={review.rating} size={14} />
              </div>
              {review.comment && (
                <p className="text-gray-400 text-sm leading-relaxed">{review.comment}</p>
              )}
            </div>
          ))}
        </div>
      ) : !showForm && (
        <div className="text-center py-8">
          <p className="text-gray-600 text-sm">No reviews yet. Be the first to share your experience!</p>
        </div>
      )}
    </div>
  );
}
