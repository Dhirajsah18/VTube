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

        <div className="mt-3">
          <h3 className="text-sm font-medium line-clamp-2">
            {video.title}
          </h3>
        </div>
      </Link>

      <div className="mt-1">
        {video.owner?.username ? (
          <Link
            to={`/c/${video.owner.username}`}
            className="inline-flex items-center gap-2 text-xs text-neutral-400 hover:text-neutral-200"
          >
            <span className="h-5 w-5 rounded-full overflow-hidden bg-neutral-800">
              {video.owner?.avatar ? (
                <img
                  src={video.owner.avatar}
                  alt={video.owner.username}
                  className="h-full w-full object-cover"
                />
              ) : null}
            </span>
            <span>@{video.owner.username}</span>
          </Link>
        ) : (
          <p className="text-xs text-neutral-400">Unknown</p>
        )}

        <p className="text-xs text-neutral-500 mt-1">
          {video.views} views
        </p>
      </div>

      {message && (
        <div className="mt-1 text-xs text-neutral-400">
          {message}
        </div>
      )}
    </div>
  );
}
