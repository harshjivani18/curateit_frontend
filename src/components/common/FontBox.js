import "./FontBox.css"
import { useState }               from "react";
import { message, 
         Checkbox }               from "antd";
import { LINE_WIDTH_INDEX, 
         SANS_SERIF_FONT_FAMILY, 
         SERIF_FONT_FAMILY }      from "@utils/constants";

const FontBox = (props) => {

  const [showFontBox, setShowFontBox] = useState(true)

  const { 
    activeTheme, 
    onThemeChange,
    fontSize,
    onSetFontSize,
    lineHeight,
    onSetLineHeight,
    lineWidth,
    onSetLineWidth,
    fontFamily,
    setFontFamily,
    fontClasses,
    isMobile } = props
  
  const renderFontFamily = () => {
    return (
      <div className="ct-font-box-container">
        <div className="ct-font-family-content">
          <div className="ct-font-family-top">
            <div className="ct-font-family-back" onClick={() => setShowFontBox(true)}>
              <svg fill="none" height="12" width="8" viewBox="0 0 8 12" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M1 1L6 6L1 11" stroke="#717273" stroke-width="1.5"></path>
              </svg>
            </div>
            <h4 className="ct-font-family-title">Typeface</h4>
          </div>
          <div className="ct-serif-fonts-container">
            <h5 className="ct-font-heading">Serif</h5>
            <div className="ct-serif-fonts-content">
              {Object.keys(SERIF_FONT_FAMILY).map((k) => {
                return (
                  <div className="ct-font-line">
                    <span className="ct-font-text" style={{ fontFamily: fontClasses[k] }}>{SERIF_FONT_FAMILY[k]}</span>
                    <Checkbox className="ct-font-check" checked={fontFamily === k} onChange={() => { setFontFamily(k) }} />
                  </div>
                )
              })}
            </div>
            <h5 className="ct-font-heading">Sans Serif</h5>
            <div className="ct-serif-fonts-content">
              {Object.keys(SANS_SERIF_FONT_FAMILY).map((k) => {
                return (
                  <div className="ct-font-line">
                    <span className="ct-font-text" style={{ fontFamily: fontClasses[k] }}>{SANS_SERIF_FONT_FAMILY[k]}</span>
                    <Checkbox className="ct-font-check" checked={fontFamily === k} onChange={() => { setFontFamily(k) }} />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderFontBox = () => {
    return (
      <div className="ct-font-box-container">
        <div className="mb-4">
          <h5 className="ct-font-box-title">System theme</h5>
          <div className="flex justify-between">
            <div className="ct-font-box-mode" onClick={() => onThemeChange("light")}>
              <div className={activeTheme === "light" ? "ct-font-box-mode-light ct-font-box-active-mode" : "ct-font-box-mode-light"}>
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M16 3.75C16.4142 3.75 16.75 4.08579 16.75 4.5V8.5C16.75 8.91421 16.4142 9.25 16 9.25C15.5858 9.25 15.25 8.91421 15.25 8.5V4.5C15.25 4.08579 15.5858 3.75 16 3.75Z"></path>
                  <path d="M12 16C12 17.0609 12.4214 18.0783 13.1716 18.8284C13.9217 19.5786 14.9391 20 16 20C17.0609 20 18.0783 19.5786 18.8284 18.8284C19.5786 18.0783 20 17.0609 20 16C20 14.9391 19.5786 13.9217 18.8284 13.1716C18.0783 12.4214 17.0609 12 16 12C14.9391 12 13.9217 12.4214 13.1716 13.1716C12.4214 13.9217 12 14.9391 12 16Z"></path>
                  <path d="M16.75 23.5C16.75 23.0858 16.4142 22.75 16 22.75C15.5858 22.75 15.25 23.0858 15.25 23.5V27.5C15.25 27.9142 15.5858 28.25 16 28.25C16.4142 28.25 16.75 27.9142 16.75 27.5V23.5Z"></path>
                  <path d="M7.33774 7.33695C7.63058 7.04401 8.10546 7.04392 8.3984 7.33676L11.2274 10.1648C11.5203 10.4576 11.5204 10.9325 11.2276 11.2254C10.9347 11.5184 10.4599 11.5185 10.1669 11.2256L7.33793 8.39761C7.04498 8.10477 7.0449 7.6299 7.33774 7.33695Z"></path>
                  <path d="M21.8331 20.7744C21.5402 20.4815 21.0653 20.4815 20.7724 20.7744C20.4795 21.0673 20.4795 21.5421 20.7724 21.835L23.6014 24.664C23.8943 24.9569 24.3692 24.9569 24.6621 24.664C24.955 24.3711 24.955 23.8962 24.6621 23.6034L21.8331 20.7744Z"></path>
                  <path d="M3.75 16C3.75 15.5858 4.08579 15.25 4.5 15.25H8.5C8.91421 15.25 9.25 15.5858 9.25 16C9.25 16.4142 8.91421 16.75 8.5 16.75H4.5C4.08579 16.75 3.75 16.4142 3.75 16Z"></path>
                  <path d="M23.5 15.25C23.0858 15.25 22.75 15.5858 22.75 16C22.75 16.4142 23.0858 16.75 23.5 16.75H27.5C27.9142 16.75 28.25 16.4142 28.25 16C28.25 15.5858 27.9142 15.25 27.5 15.25H23.5Z"></path>
                  <path d="M11.2275 20.7744C11.5204 21.0673 11.5204 21.5421 11.2275 21.835L8.39849 24.664C8.1056 24.9569 7.63073 24.9569 7.33783 24.664C7.04494 24.3711 7.04494 23.8962 7.33783 23.6034L10.1668 20.7744C10.4597 20.4815 10.9346 20.4815 11.2275 20.7744Z"></path>
                  <path d="M24.662 8.39761C24.9549 8.10477 24.955 7.6299 24.6622 7.33695C24.3693 7.04401 23.8944 7.04392 23.6015 7.33676L20.7725 10.1648C20.4796 10.4576 20.4795 10.9325 20.7723 11.2254C21.0652 11.5184 21.54 11.5185 21.833 11.2256L24.662 8.39761Z"></path>
                </svg>
              </div>
              Light
            </div>
            <div className="ct-font-box-mode" onClick={() => onThemeChange("dark")}>
              <div className={activeTheme === "dark" ? "ct-font-box-mode-dark ct-font-box-active-mode" : "ct-font-box-mode-dark"}>
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M23.4884 22.2366C23.6204 22.0993 23.4932 21.8783 23.3046 21.9057C22.8787 21.9675 22.4431 21.9995 22 21.9995C17.0294 21.9995 13 17.9701 13 12.9995C13 10.9978 13.6535 9.1486 14.7589 7.65382C14.8722 7.50063 14.7373 7.28425 14.554 7.33592C10.7721 8.40154 8 11.8768 8 15.9995C8 20.9701 12.0294 24.9995 17 24.9995C19.5492 24.9995 21.8509 23.9397 23.4884 22.2366Z"></path>
                </svg>
              </div>
              Dark
            </div>
          </div>
        </div>
        <div>
          <h5 className="ct-font-box-title">Text styles</h5>
          <div className="ct-font-box-fonts-container">
            <div className="ct-font-box-font-family">
              <div className="ct-font-box-fonts" onClick={() => setShowFontBox(false)}>
                <div className="ct-font-box-fonts-insider">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M7.20001 5.25C7.50669 5.25 7.78247 5.43671 7.89637 5.72146L12.6964 17.7215C12.8502 18.106 12.6631 18.5425 12.2786 18.6964C11.894 18.8502 11.4575 18.6631 11.3037 18.2785L9.81224 14.55H4.58779L3.09637 18.2785C2.94253 18.6631 2.50605 18.8502 2.12147 18.6964C1.73688 18.5425 1.54982 18.106 1.70365 17.7215L6.50365 5.72146C6.61755 5.43671 6.89333 5.25 7.20001 5.25ZM5.18779 13.05H9.21224L7.20001 8.01944L5.18779 13.05Z"
                      fill="black"
                    ></path>
                    <path
                      d="M15.7694 9.8631C15.4356 10.2525 15.3499 10.6795 15.3499 10.8C15.3499 11.2142 15.0142 11.55 14.5999 11.55C14.1857 11.55 13.8499 11.2142 13.8499 10.8C13.8499 10.3206 14.0643 9.54753 14.6305 8.88692C15.2274 8.19049 16.1879 7.65001 17.5999 7.65001C19.012 7.65001 19.9725 8.19049 20.5694 8.88692C21.1356 9.54753 21.3499 10.3206 21.3499 10.8V18C21.3499 18.4142 21.0142 18.75 20.5999 18.75C20.1857 18.75 19.8499 18.4142 19.8499 18V10.8C19.8499 10.6795 19.7643 10.2525 19.4305 9.8631C19.1274 9.50953 18.5879 9.15001 17.5999 9.15001C16.612 9.15001 16.0725 9.50953 15.7694 9.8631Z"
                      fill="black"
                    ></path>
                    <path
                      d="M20.5999 10.05C21.0142 10.05 21.3499 10.3858 21.3499 10.8C21.3499 11.3569 21.2329 11.8467 20.9927 12.2654C20.7525 12.6841 20.4158 12.9851 20.0483 13.2056C19.3729 13.6109 18.5134 13.7824 17.8121 13.9224C17.7903 13.9268 17.7686 13.9311 17.747 13.9354C16.9596 14.0929 16.3519 14.2235 15.9233 14.4806C15.7283 14.5976 15.5962 14.7278 15.5083 14.8811C15.4204 15.0342 15.3499 15.2569 15.3499 15.6C15.3499 16.1675 15.5582 16.5514 15.8866 16.8079C16.2364 17.0811 16.7996 17.2671 17.5838 17.2502C18.2231 17.2364 18.8096 16.9705 19.2359 16.6019C19.6848 16.2138 19.8499 15.8122 19.8499 15.6C19.8499 15.1858 20.1857 14.85 20.5999 14.85C21.0142 14.85 21.3499 15.1858 21.3499 15.6C21.3499 16.4085 20.8504 17.1889 20.217 17.7366C19.5609 18.3039 18.6473 18.7276 17.6161 18.7498C16.6003 18.7717 15.6635 18.537 14.9633 17.9901C14.2417 17.4265 13.8499 16.591 13.8499 15.6C13.8499 15.0431 13.967 14.5533 14.2072 14.1346C14.4474 13.7159 14.7841 13.4149 15.1516 13.1944C15.827 12.7891 16.6865 12.6175 17.3878 12.4776C17.4096 12.4732 17.4313 12.4689 17.4529 12.4646C18.2403 12.3071 18.848 12.1765 19.2766 11.9194C19.4716 11.8024 19.6037 11.6722 19.6916 11.5189C19.7795 11.3658 19.8499 11.1431 19.8499 10.8C19.8499 10.3858 20.1857 10.05 20.5999 10.05Z"
                      fill="black"
                    ></path>
                  </svg>
                  <span className="ct-font-label">Typeface</span>
                </div>
                <div className="ct-font-name">
                  <span className="ct-font-desc">{SERIF_FONT_FAMILY[fontFamily] || SANS_SERIF_FONT_FAMILY[fontFamily]}</span>
                  <svg
                    height="12"
                    width="8"
                    viewBox="0 0 8 12"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M1 1L6 6L1 11"
                      stroke="#717273"
                      stroke-width="1.5"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
            <div className="ct-font-box-font-family">
              <div className="ct-font-size-container">
                <div className="ct-font-size-logo">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M16.02 5.2463L16.0022 5.24609L15.9844 5.2463H11C10.5858 5.2463 10.25 5.58209 10.25 5.9963C10.25 6.41051 10.5858 6.7463 11 6.7463H15.2522V18.0011C15.2522 18.4153 15.588 18.7511 16.0022 18.7511C16.4164 18.7511 16.7522 18.4153 16.7522 18.0011V6.7463H21.0042C21.4184 6.7463 21.7542 6.41051 21.7542 5.9963C21.7542 5.58209 21.4184 5.2463 21.0042 5.2463H16.02Z"
                      fill="black"
                    ></path>
                    <path
                      d="M6.177 10.7483V18.0014C6.177 18.4156 6.51279 18.7514 6.927 18.7514C7.34122 18.7514 7.677 18.4156 7.677 18.0014V10.7483H10.499C10.9132 10.7483 11.249 10.4125 11.249 9.99825C11.249 9.58404 10.9132 9.24825 10.499 9.24825H6.94476C6.93885 9.24812 6.93294 9.24805 6.927 9.24805C6.92107 9.24805 6.91515 9.24812 6.90925 9.24825H3.49609C3.08188 9.24825 2.74609 9.58404 2.74609 9.99825C2.74609 10.4125 3.08188 10.7483 3.49609 10.7483H6.177Z"
                      fill="black"
                    ></path>
                  </svg>
                  <span className="ct-font-desc">Font size</span>
                </div>
                <div className="ct-font-name">
                  <span className="ct-font-common-display">{`${fontSize}px`}</span>
                  <div className="ct-font-btns-container">
                    <button
                      className="ct-font-btns"
                      type="button"
                      onClick={() => {
                        const newFonts = Number(fontSize) - 1
                        if (newFonts < 12) {
                          message.error("Font size can't be too small")
                          return
                        }
                        onSetFontSize(newFonts)
                      }}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path d="M5.75 10C5.75 9.58579 6.08579 9.25 6.5 9.25L13.5 9.25C13.9142 9.25 14.25 9.58579 14.25 10C14.25 10.4142 13.9142 10.75 13.5 10.75L6.5 10.75C6.08579 10.75 5.75 10.4142 5.75 10Z"></path>
                      </svg>
                    </button>
                    <button
                      className="ct-font-btns"
                      type="button"
                      onClick={() => {
                        const newFonts = Number(fontSize) + 1
                        if (newFonts > 48) {
                          message.error("Font size can't exceed the size")
                          return
                        }
                        onSetFontSize(newFonts)
                      }}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path d="M10.75 6.5C10.75 6.08579 10.4142 5.75 10 5.75C9.58579 5.75 9.25 6.08579 9.25 6.5V9.25L6.5 9.25C6.08579 9.25 5.75 9.58579 5.75 10C5.75 10.4142 6.08579 10.75 6.5 10.75H9.25V13.5C9.25 13.9142 9.58579 14.25 10 14.25C10.4142 14.25 10.75 13.9142 10.75 13.5V10.75H13.5C13.9142 10.75 14.25 10.4142 14.25 10C14.25 9.58579 13.9142 9.25 13.5 9.25L10.75 9.25V6.5Z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="ct-font-box-font-family">
              <div className="ct-font-size-container">
                <div className="ct-font-size-logo">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M3.99707 3.2463C3.58286 3.2463 3.24707 3.58209 3.24707 3.9963C3.24707 4.41051 3.58286 4.7463 3.99707 4.7463H20.0037C20.4179 4.7463 20.7537 4.41051 20.7537 3.9963C20.7537 3.58209 20.4179 3.2463 20.0037 3.2463H3.99707Z"
                      fill="black"
                    ></path>
                    <path
                      d="M3.99707 19.2522C3.58286 19.2522 3.24707 19.5879 3.24707 20.0022C3.24707 20.4164 3.58286 20.7522 3.99707 20.7522H20.0037C20.4179 20.7522 20.7537 20.4164 20.7537 20.0022C20.7537 19.5879 20.4179 19.2522 20.0037 19.2522H3.99707Z"
                      fill="black"
                    ></path>
                    <path
                      d="M12.0005 7.24609C12.2914 7.24609 12.5561 7.41434 12.6796 7.67777L16.4312 15.6811C16.607 16.0562 16.4455 16.5027 16.0704 16.6785C15.6954 16.8543 15.2488 16.6928 15.073 16.3178L14.5259 15.1506H9.47516L8.92805 16.3178C8.75224 16.6928 8.30569 16.8543 7.93063 16.6785C7.55558 16.5027 7.39406 16.0562 7.56986 15.6811L11.3214 7.67777C11.4449 7.41434 11.7096 7.24609 12.0005 7.24609ZM10.1783 13.6506H13.8228L12.0005 9.76315L10.1783 13.6506Z"
                      fill="black"
                    ></path>
                  </svg>
                  <span className="ct-font-desc">Line spacing</span>
                </div>
                <div className="ct-font-name">
                  <span className="ct-font-common-display">{lineHeight}</span>
                  <div className="ct-font-btns-container">
                    <button
                      className="ct-font-btns"
                      type="button"
                      onClick={() => {
                        const newFonts = (parseFloat(lineHeight) - 0.1).toFixed(1)
                        if (newFonts < 1.2) {
                          message.error("Line height can't be too small")
                          return
                        }
                        onSetLineHeight(newFonts)
                      }}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path d="M5.75 10C5.75 9.58579 6.08579 9.25 6.5 9.25L13.5 9.25C13.9142 9.25 14.25 9.58579 14.25 10C14.25 10.4142 13.9142 10.75 13.5 10.75L6.5 10.75C6.08579 10.75 5.75 10.4142 5.75 10Z"></path>
                      </svg>
                    </button>
                    <button
                      className="ct-font-btns"
                      type="button"
                      onClick={() => {
                        const newFonts = (parseFloat(lineHeight) + 0.1).toFixed(1)
                        if (newFonts > 2.2) {
                          message.error("Line height can't exceed the limit")
                          return
                        }
                        onSetLineHeight(newFonts)
                      }}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path d="M10.75 6.5C10.75 6.08579 10.4142 5.75 10 5.75C9.58579 5.75 9.25 6.08579 9.25 6.5V9.25L6.5 9.25C6.08579 9.25 5.75 9.58579 5.75 10C5.75 10.4142 6.08579 10.75 6.5 10.75H9.25V13.5C9.25 13.9142 9.58579 14.25 10 14.25C10.4142 14.25 10.75 13.9142 10.75 13.5V10.75H13.5C13.9142 10.75 14.25 10.4142 14.25 10C14.25 9.58579 13.9142 9.25 13.5 9.25L10.75 9.25V6.5Z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {!isMobile && <div className="ct-font-box-font-family">
              <div className="ct-font-size-container">
                <div className="ct-font-size-logo">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M3.25 4C3.25 3.58579 3.58579 3.25 4 3.25H20C20.4142 3.25 20.75 3.58579 20.75 4C20.75 4.41421 20.4142 4.75 20 4.75H4C3.58579 4.75 3.25 4.41421 3.25 4Z"
                      fill="black"
                    ></path>
                    <path
                      d="M4 7.24609C3.58579 7.24609 3.25 7.58188 3.25 7.99609C3.25 8.41031 3.58579 8.74609 4 8.74609H16C16.4142 8.74609 16.75 8.41031 16.75 7.99609C16.75 7.58188 16.4142 7.24609 16 7.24609H4Z"
                      fill="black"
                    ></path>
                    <path
                      d="M4 11.25C3.58579 11.25 3.25 11.5858 3.25 12C3.25 12.4142 3.58579 12.75 4 12.75H12C12.4142 12.75 12.75 12.4142 12.75 12C12.75 11.5858 12.4142 11.25 12 11.25H4Z"
                      fill="black"
                    ></path>
                    <path
                      d="M20.5415 17.4811C20.5378 17.4772 20.5341 17.4734 20.5303 17.4697L18.0303 14.9697C17.7374 14.6768 17.2626 14.6768 16.9697 14.9697C16.6768 15.2626 16.6768 15.7374 16.9697 16.0303L18.1893 17.25H5.81066L7.03033 16.0303C7.32322 15.7374 7.32322 15.2626 7.03033 14.9697C6.73744 14.6768 6.26256 14.6768 5.96967 14.9697L3.46967 17.4697C3.3238 17.6155 3.25057 17.8066 3.25 17.9978L3.25 18L3.25001 18.0046C3.25061 18.1046 3.27079 18.2 3.30691 18.2871C3.34351 18.3755 3.39776 18.4584 3.46967 18.5303L5.96967 21.0303C6.26256 21.3232 6.73744 21.3232 7.03033 21.0303C7.32322 20.7374 7.32322 20.2626 7.03033 19.9697L5.81066 18.75H18.1893L16.9697 19.9697C16.6768 20.2626 16.6768 20.7374 16.9697 21.0303C17.2626 21.3232 17.7374 21.3232 18.0303 21.0303L20.5303 18.5303C20.671 18.3897 20.75 18.1989 20.75 18"
                      fill="black"
                    ></path>
                  </svg>
                  <span className="ct-font-desc">Line width</span>
                </div>
                <div className="ct-font-name">
                  <span className="ct-font-common-display">{LINE_WIDTH_INDEX[lineWidth]}</span>
                  <div className="ct-font-btns-container">
                    <button
                      className="ct-font-btns"
                      type="button"
                      onClick={() => {
                        const newFonts = parseInt(lineWidth) - 1
                        if (newFonts < 1) {
                          message.error("Line width can't be too small")
                          return
                        }
                        onSetLineWidth(newFonts)
                      }}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path d="M5.75 10C5.75 9.58579 6.08579 9.25 6.5 9.25L13.5 9.25C13.9142 9.25 14.25 9.58579 14.25 10C14.25 10.4142 13.9142 10.75 13.5 10.75L6.5 10.75C6.08579 10.75 5.75 10.4142 5.75 10Z"></path>
                      </svg>
                    </button>
                    <button
                      className="ct-font-btns"
                      type="button"
                      onClick={() => {
                        const newFonts = parseInt(lineWidth) + 1
                        if (newFonts > 5) {
                          message.error("Line width can't be too large")
                          return
                        }
                        onSetLineWidth(newFonts)
                      }}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path d="M10.75 6.5C10.75 6.08579 10.4142 5.75 10 5.75C9.58579 5.75 9.25 6.08579 9.25 6.5V9.25L6.5 9.25C6.08579 9.25 5.75 9.58579 5.75 10C5.75 10.4142 6.08579 10.75 6.5 10.75H9.25V13.5C9.25 13.9142 9.58579 14.25 10 14.25C10.4142 14.25 10.75 13.9142 10.75 13.5V10.75H13.5C13.9142 10.75 14.25 10.4142 14.25 10C14.25 9.58579 13.9142 9.25 13.5 9.25L10.75 9.25V6.5Z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>}
          </div>
        </div>
      </div>
    );
  }

  return showFontBox ? renderFontBox() : renderFontFamily()
};

export default FontBox
