export {};

declare global {
  interface Window {
    YT: typeof YT;
    onYouTubeIframeAPIReady?: () => void;
  }

  namespace YT {
    class Player {
      constructor(elementId: string | HTMLElement, options: PlayerOptions);
      playVideo(): void;
      pauseVideo(): void;
      nextVideo(): void;
      previousVideo(): void;
      seekTo(seconds: number, allowSeekAhead: boolean): void;
      setShuffle(shuffle: boolean): void;
      setVolume(volume: number): void;
      getVolume(): number;
      getCurrentTime(): number;
      getDuration(): number;
      getPlayerState(): number;
      getVideoData(): { title?: string; author?: string; video_id?: string };
      getPlaylist(): string[] | undefined;
      getPlaylistIndex(): number;
      playVideoAt(index: number): void;
      destroy(): void;
    }

    interface PlayerOptions {
      height?: string | number;
      width?: string | number;
      playerVars?: {
        listType?: string;
        list?: string;
        autoplay?: 0 | 1;
        controls?: 0 | 1;
        playsinline?: 0 | 1;
        modestbranding?: 0 | 1;
        rel?: 0 | 1;
        [key: string]: unknown;
      };
      events?: {
        onReady?: (event: PlayerEvent) => void;
        onStateChange?: (event: OnStateChangeEvent) => void;
        onError?: (event: OnErrorEvent) => void;
      };
    }

    interface PlayerEvent {
      target: Player;
    }

    interface OnStateChangeEvent {
      target: Player;
      data: number;
    }

    interface OnErrorEvent {
      target: Player;
      data: number;
    }

    const PlayerState: {
      UNSTARTED: -1;
      ENDED: 0;
      PLAYING: 1;
      PAUSED: 2;
      BUFFERING: 3;
      CUED: 5;
    };
  }
}
