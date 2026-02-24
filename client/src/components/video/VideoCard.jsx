import { Link } from "react-router-dom";
import { useState } from "react";
import AddToPlaylistMenu from "../playlist/AddToPlaylistMenu";

export default function VideoCard({
  video,
  playlists = [],
  onAddToPlaylist,
  showPlaylistMenu = false,
}) {
  const [message, setMessage] = useState("");

  const handleAdd = async (playlistId) => {
    if (!onAddToPlaylist) return;
    try {
      setMessage("");
      await onAddToPlaylist(video._id, playlistId);
      setMessage("Saved");
    } catch (err) {
      setMessage(
        err?.response?.data?.message || "Failed"
      );
    }
  };

  return (
    <div className="group relative">
      {showPlaylistMenu && (
        <div
          className="absolute right-2 top-2 z-10"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <AddToPlaylistMenu
            playlists={playlists}
            onAdd={handleAdd}
          />
        </div>
      )}

      <Link
        to={`/watch/${video._id}`}
        className="block"
      >
        {/* Thumbnail */}
        <div className="aspect-video bg-neutral-800 rounded-xl overflow-hidden">
          {video.thumbnail ? (
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-full object-cover group-hover:scale-105 transition"
            />
          ) : (
            <div className="w-full h-full grid place-items-center text-neutral-500">
              No thumbnail
            </div>
          )}
        </div>

        {/* Info */}
        <div className="mt-3">
          <h3 className="text-sm font-medium line-clamp-2">
            {video.title}
          </h3>

          <p className="text-xs text-neutral-400 mt-1">
            {video.owner?.username || "Unknown"}
          </p>

          <p className="text-xs text-neutral-500">
            {video.views} views
          </p>
        </div>
      </Link>

      {message && (
        <div className="mt-1 text-xs text-neutral-400">
          {message}
        </div>
      )}
    </div>
  );
}
