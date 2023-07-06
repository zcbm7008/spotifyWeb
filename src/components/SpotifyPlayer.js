import classes from "./SpotifyPlayer.module.css";

export default function SpotifyPlayer(props) {
  const { playListUrl } = props;
  return playListUrl ? (
    <div className={classes.player}>
      <iframe
        title="Spotify Embed: Recommendation Playlist "
        src={`https://open.spotify.com/embed/playlist/${playListUrl}?utm_source=generator&theme=0`}
        width="100%"
        height="100%"
        style={{ minHeight: "160px", minWidth: "500px" }}
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      />
    </div>
  ) : (
    <div className={classes.skeleton}>
      <div className={classes.title}>Make a playlist to play it here!</div>
    </div>
  );
}
