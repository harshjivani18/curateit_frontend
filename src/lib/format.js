export function parseTime(val) {
  const days = ~~(val / 86400);
  const hours = ~~(val / 3600) - days * 24;
  const minutes = ~~(val / 60) - days * 1440 - hours * 60;
  const seconds = ~~val - days * 86400 - hours * 3600 - minutes * 60;
  const ms = (val - ~~val) * 1000;

  return {
    days,
    hours,
    minutes,
    seconds,
    ms,
  };
}

export function formatTime(val) {
  const { hour, minutes, seconds } = parseTime(val);
  const h = hour > 0 ? `${hour}:` : '';
  const m = hour > 0 ? minutes.toString().padStart(2, '0') : minutes;
  const s = seconds.toString().padStart(2, '0');

  return `${h}${m}:${s}`;
}

export function formatShortTime(val, formats = ['m', 's'], space = '') {
  const { days, hours, minutes, seconds, ms } = parseTime(val);
  let t = '';

  if (days > 0 && formats.indexOf('d') !== -1) t += `${days}d${space}`;
  if (hours > 0 && formats.indexOf('h') !== -1) t += `${hours}h${space}`;
  if (minutes > 0 && formats.indexOf('m') !== -1) t += `${minutes}m${space}`;
  if (seconds > 0 && formats.indexOf('s') !== -1) t += `${seconds}s${space}`;
  if (ms > 0 && formats.indexOf('ms') !== -1) t += `${ms}ms`;

  if (!t) {
    return `0${formats[formats.length - 1]}`;
  }

  return t;
}

export function formatNumber(n) {
  return Number(n).toFixed(0);
}

export function formatLongNumber(value) {
  const n = Number(value);

  if (n >= 1000000) {
    return `${(n / 1000000).toFixed(1)}m`;
  }
  if (n >= 100000) {
    return `${(n / 1000).toFixed(0)}k`;
  }
  if (n >= 10000) {
    return `${(n / 1000).toFixed(1)}k`;
  }
  if (n >= 1000) {
    return `${(n / 1000).toFixed(2)}k`;
  }

  return formatNumber(n);
}

export function stringToColor(str) {
  if (!str) {
    return '#ffffff';
  }
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 0xff;
    color += ('00' + value.toString(16)).slice(-2);
  }
  return color;
}

export function getRelativeURL() {
  if (typeof window === 'undefined') {
    console.error('getRelativeURL can only be run on the client-side.');
    return '';
  }

  // Get the base URL
  const baseUrl = window.location.origin;

  // Get the current URL
  const currentUrl = window.location.href;

  // Remove the base URL from the current URL
  const relativeUrl = currentUrl.replace(baseUrl, '');

  // Remove the locale from the relative URL
  const localeRegex = /^\/[a-z]{2}-[a-z]{2}\//;
  const cleanUrl = relativeUrl.replace(localeRegex, '');

  return cleanUrl;
};

