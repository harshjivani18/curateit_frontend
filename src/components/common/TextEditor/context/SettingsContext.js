import * as React from 'react';
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

const hostName = window.location.hostname;
const isDevPlayground =
  hostName !== 'playground.lexical.dev' &&
  hostName !== 'lexical-playground.vercel.app';

 const DEFAULT_SETTINGS= {
  disableBeforeInput: false,
  emptyEditor: isDevPlayground,
  isAutocomplete: false,
  isCharLimit: false,
  isCharLimitUtf8: false,
  isCollab: false,
  isMaxLength: false,
  isRichText: true,
  measureTypingPerf: false,
  showNestedEditorTreeView: false,
  showTableOfContents: false,
  showTreeView: true,
};


const Context= createContext({
  setOption: (name, value) => {
    return;
  },
  settings: DEFAULT_SETTINGS,
});

export const SettingsContext = ({
  children,
}) => {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);

  const setOption = useCallback((setting, value) => {
    setSettings((options) => ({
      ...options,
      [setting]: value,
    }));
    if (DEFAULT_SETTINGS[setting] === value) {
      setURLParam(setting, null);
    } else {
      setURLParam(setting, value);
    }
  }, []);

  const contextValue = useMemo(() => {
    return {setOption, settings};
  }, [setOption, settings]);

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export const useSettings = () => {
  return useContext(Context);
};

function setURLParam(param, value) {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  if (value !== null) {
    if (params.has(param)) {
      params.set(param, String(value));
    } else {
      params.append(param, String(value));
    }
  } else {
    if (params.has(param)) {
      params.delete(param);
    }
  }
  url.search = params.toString();
  window.history.pushState(null, '', url.toString());
}
