import { useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";

export default function AddToPlaylistMenu({
  playlists = [],
  onAdd,
  disabled = false,
  className = "",
}) {
  const [open, setOpen] = useState(false);
  const [addingId, setAddingId] = useState("");

  const handleAdd = async (playlistId) => {
    if (!onAdd || addingId) return;

    try {
      setAddingId(playlistId);
      await onAdd(playlistId);
      setOpen(false);
    } finally {
      setAddingId("");
    }
  };

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        disabled={disabled}
        className="rounded-full p-2 text-neutral-300 hover:bg-neutral-800 hover:text-white disabled:opacity-50"
        aria-label="Playlist options"
      >
        <HiOutlineDotsVertical className="h-5 w-5" />
      </button>

      {open && (
        <div className="absolute right-0 z-20 mt-2 w-56 rounded-lg border border-neutral-700 bg-neutral-900 p-2 shadow-xl">
          <div className="px-2 py-1 text-xs text-neutral-400">
            Save to playlist
          </div>

          {playlists.length === 0 ? (
            <div className="px-2 py-2 text-sm text-neutral-500">
              No playlists found
            </div>
          ) : (
            playlists.map((playlist) => (
              <button
                key={playlist._id}
                type="button"
                onClick={() => handleAdd(playlist._id)}
                disabled={!!addingId}
                className="w-full rounded-md px-2 py-2 text-left text-sm text-neutral-200 hover:bg-neutral-800 disabled:opacity-60"
              >
                {addingId === playlist._id
                  ? "Saving..."
                  : playlist.name}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
