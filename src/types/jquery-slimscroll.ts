interface SlimScrollSetting {
  destroy?: boolean;
  alwaysVisible?: boolean;
  height?: string;
  color?: string;
  size?: string;
}

interface SlimScroll {
  settings: SlimScrollSetting;

  (settings?: SlimScrollSetting): JQuery;
}

interface JQuery {
  slimScroll: SlimScroll;
}
