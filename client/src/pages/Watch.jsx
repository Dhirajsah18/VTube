import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import MainLayout from "../layout/MainLayout";
import { useAuth } from "../context/AuthContext";

import { getVideoById } from "../api/video.api";

import useLike from "../hooks/useLike";
import useSubscribe from "../hooks/useSubscribe";

import VideoPlayer from "../components/video/VideoPlayer";
import LikeButton from "../components/ui/LikeButton";
import SubscribeButton from "../components/ui/SubscribeButton";
import CommentList from "../components/comment/CommentList";

export default function Watch() {
  const { videoId } = useParams();
  const { user } = useAuth();

  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // fetch video only
  useEffect(() => {
    fetchVideo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoId]);

  const fetchVideo = async () => {
    try {
      setLoading(true);
      const res = await getVideoById(videoId);
      setVideo(res.data.data);
    } catch (err) {
      setError("Failed to load video");
    } finally {
      setLoading(false);
    }
  };

  // hooks (logic lives here, not in page)
  const like = useLike({
    type: "video",
    id: video?._id,
    initialLiked: video?.isLiked,
    initialCount: video?.likesCount,
  });

  const subscribe = useSubscribe({
    channelId: video?.owner?._id,
    initialSubscribed: video?.isSubscribed,
    initialCount: video?.subscribersCount,
  });

  if (loading) {
    return (
      <MainLayout>
        <div className="text-neutral-400">Loading video…</div>
      </MainLayout>
    );
  }

  if (error || !video) {
    return (
      <MainLayout>
        <div className="text-red-400">{error || "Video not found"}</div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto">
        {/* Player */}
        <VideoPlayer src={video.videoFile} />

        {/* Title */}
        <h1 className="mt-4 text-lg font-semibold">
          {video.title}
        </h1>

        {/* Meta */}
        <div className="flex items-center gap-4 text-sm text-neutral-400 mt-2">
          <span>{video.views} views</span>
          <span>•</span>
          <span>@{video.owner?.username || "unknown"}</span>
        </div>

        {/* Actions */}
        <div className="mt-4 flex items-center gap-6 flex-wrap">
          <LikeButton
            liked={like.liked}
            count={like.count}
            onClick={like.toggle}
            disabled={!user || like.loading}
          />

          <SubscribeButton
            subscribed={subscribe.subscribed}
            count={subscribe.count}
            onClick={subscribe.toggle}
            disabled={!user || subscribe.loading}
          />

          {!user && (
            <span className="text-sm text-neutral-500">
              Login to like or subscribe
            </span>
          )}
        </div>

        {/* Description */}
        <div className="mt-4 bg-neutral-900 border border-neutral-800 rounded-xl p-4">
          <p className="text-sm text-neutral-300 whitespace-pre-line">
            {video.description}
          </p>
        </div>

        {/* Comments */}
        <CommentList videoId={video._id} />
      </div>
    </MainLayout>
  );
}
