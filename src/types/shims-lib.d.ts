interface Document {
  mozFullScreenElement: Element | null;

  msFullscreenElement: Element | null;

  mozCancelFullScreen(): void;

  msExitFullscreen(): void;
}

interface HTMLElement {
  mozRequestFullScreen(): void;

  msRequestFullscreen(): void;
}
