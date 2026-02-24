import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import MainLayout from "../layout/MainLayout";
import { useAuth } from "../context/AuthContext";

import useSubscribe from "../hooks/useSubscribe";
import SubscribeButton from "../components/ui/SubscribeButton";
import EmptyState from "../components/ui/EmptyState";

import { getAllVideos } from "../api/video.api";
import { getChannelProfile } from "../api/user.api";
import VideoGrid from "../components/video/VideoGrid";

export default function Channel() {
  const { username } = useParams();
  const { user } = useAuth();

  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);
  const [activeTab, setActiveTab] = useState("videos");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchChannelData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  const fetchChannelData = async () => {
    try {
      setLoading(true);
      setError("");

      const profileRes = await getChannelProfile(username);
      const channelData = profileRes?.data?.data;

      if (!channelData?._id) {
        throw new Error("Channel not found");
      }

      const videosRes = await getAllVideos({
        userId: channelData._id,
        page: 1,
        limit: 24,
        sortBy: "createdAt",
        sortType: "desc",
      });

      setChannel(channelData);
      setVideos(videosRes?.data?.data?.videos || []);
    } catch (err) {
      setError(
        err?.response?.status === 404
          ? "Channel not found"
          : "Failed to load channel"
      );
      setChannel(null);
      setVideos([]);
    } finally {
      setLoading(false);
    }
  };

  const subscribe = useSubscribe({
    channelId: channel?._id,
    initialSubscribed: channel?.isSubscribed,
    initialCount: channel?.subscribersCount,
  });

  if (loading) {
    return (
      <MainLayout>
        <div className="text-neutral-400">Loading channel...</div>
      </MainLayout>
    );
  }

  if (error || !channel) {
    return (
      <MainLayout>
        <div className="text-red-400">
          {error || "Channel not found"}
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        {/* ================= Channel Header ================= */}
        <div className="flex items-center gap-4 py-6 border-b border-neutral-800">
          {/* Avatar */}
          <div className="h-20 w-20 rounded-full bg-neutral-700 overflow-hidden">
            {channel.avatar && (
              <img
                src={channel.avatar}
                alt={channel.username}
                className="h-full w-full object-cover"
              />
            )}
          </div>

          {/* Info */}
          <div className="flex-1">
            <h1 className="text-xl font-semibold">
              @{channel.username}
            </h1>
            <p className="text-sm text-neutral-400">
              {subscribe.count} subscribers
            </p>
          </div>

          {/* Subscribe button */}
          {user && String(user._id) !== String(channel._id) && (
            <SubscribeButton
              subscribed={subscribe.subscribed}
              count={subscribe.count}
              onClick={subscribe.toggle}
              disabled={subscribe.loading}
            />
          )}

          {!user && (
            <span className="text-sm text-neutral-500">
              Login to subscribe
            </span>
          )}
        </div>

        {/* ================= Tabs ================= */}
        <div className="flex gap-6 border-b border-neutral-800 mt-4">
          <button
            onClick={() => setActiveTab("videos")}
            className={`pb-2 text-sm font-medium transition ${
              activeTab === "videos"
                ? "text-orange-500 border-b-2 border-orange-500"
                : "text-neutral-400 hover:text-neutral-200"
            }`}
          >
            Videos
          </button>

          <button
            onClick={() => setActiveTab("playlists")}
            className={`pb-2 text-sm font-medium transition ${
              activeTab === "playlists"
                ? "text-orange-500 border-b-2 border-orange-500"
                : "text-neutral-400 hover:text-neutral-200"
            }`}
          >
            Playlists
          </button>
        </div>

        {/* ================= Tab Content ================= */}
        <div className="mt-6">
          {activeTab === "videos" && (
            <>
              {videos.length > 0 ? (
                <VideoGrid videos={videos} />
              ) : (
                <EmptyState
                  title="No videos yet"
                  description="This channel has not uploaded any videos."
                />
              )}
            </>
          )}

          {activeTab === "playlists" && (
            <EmptyState
              title="No playlists"
              description="Playlists will appear here once created."
            />
          )}
        </div>
      </div>
    </MainLayout>
  );
}
