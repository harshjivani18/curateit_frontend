export const loadQuill = async (isEnableEmoji, callback) => {
    return new Promise(async (resolve, reject) => {
      const Quill = await require("react-quill").Quill;
      const QuillEmoji = (await import("quill-emoji")).default;
      resolve({ Quill, QuillEmoji });
    })
      .then(({ Quill, QuillEmoji }) => {
        if (isEnableEmoji) Quill.register("modules/emoji", QuillEmoji);
        return;
      })
      .then((value) => {
        callback(true);
      });
};

export const loadHighlighter = async () => {
  return new Promise(async (resolve, reject) => {
    const Highlighter = await require("web-highlighter")
    resolve(new Highlighter())
  })
}