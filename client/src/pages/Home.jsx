import { useEffect, useState } from "react";

import MainLayout from "../layout/MainLayout";
import { getAllVideos } from "../api/video.api";
import VideoGrid from "../components/video/VideoGrid";
import { useAuth } from "../context/AuthContext";
import {
  addVideoToPlaylist,
  getUserPlaylists,
} from "../api/playlist.api";

export default function Home() {
  const { user } = useAuth();
  const [videos, setVideos] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    if (!user?._id) {
      setPlaylists([]);
      return;
    }
    loadPlaylists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?._id]);

  const loadVideos = async () => {
    try {
      setLoading(true);

      const res = await getAllVideos({ page, limit: 12 });
      const { videos, total } = res.data.data;

      setVideos((prev) =>
        page === 1 ? videos : [...prev, ...videos]
      );

      setHasNext(page * 12 < total);
    } catch (err) {
      console.error("Failed to load videos", err);
    } finally {
      setLoading(false);
    }
  };

  const loadPlaylists = async () => {
    try {
      const res = await getUserPlaylists(user._id);
      setPlaylists(res?.data?.data || []);
    } catch (err) {
      console.error("Failed to load playlists", err);
      setPlaylists([]);
    }
  };

  const handleAddToPlaylist = async (videoId, playlistId) => {
    try {
      await addVideoToPlaylist(videoId, playlistId);
    } catch (err) {
      console.error("Failed to add video to playlist", err);
      throw err;
    }
  };

  return (
    <MainLayout>
      {loading && page === 1 ? (
        <div className="text-neutral-400">
          Loading videos…
        </div>
      ) : videos.length === 0 ? (
        <div className="text-neutral-500">
          No videos available
        </div>
      ) : (
      <>
          <VideoGrid
            videos={videos}
            playlists={playlists}
            onAddToPlaylist={handleAddToPlaylist}
            showPlaylistMenu
          />

          {hasNext && (
            <div className="flex justify-center mt-8">
              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={loading}
                className="
                  px-4 py-2 rounded-lg
                  bg-neutral-800 hover:bg-neutral-700
                  text-neutral-200 text-sm
                  disabled:opacity-60
                "
              >
                {loading ? "Loading…" : "Load more"}
              </button>
            </div>
          )}
        </>
      )}
    </MainLayout>
  );
}
