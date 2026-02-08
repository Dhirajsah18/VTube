import { useEffect, useState } from "react";

import MainLayout from "../layout/MainLayout";
import { getAllVideos } from "../api/video.api";
import VideoGrid from "../components/video/VideoGrid";

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

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
          <VideoGrid videos={videos} />

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
