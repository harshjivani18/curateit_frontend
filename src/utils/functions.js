import { message }          from "antd"
export const copyText = async (text, content) => {
    try {
        await navigator.clipboard.writeText(text);
        if (content) message.success(content);
    } catch (err) {
        message.error("Failed to copy text");
    }
};

export function debounceFunction(func, wait) {
    let timeout;
    return function (...args) {
      const context = this;
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        timeout = null;
        func.apply(context, args);
      }, wait);
    };
  }

export const isBrowser = () => typeof window !== "undefined";