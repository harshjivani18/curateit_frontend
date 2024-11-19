"use client";
import { getAllComment } from "@actions/comment";
import SingleGem from "@containers/gem/SingleGem";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const FeedBack = ({ gemId, items }) => {
  const [pageId, setPageId] = useState(gemId);
  const [allComments, setAllComments] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    setPageId(gemId);
  }, [gemId]);

  useEffect(() => {
    const payload = {
      page_id: pageId,
      type: "gem",
      per_page: 20,
      pageNo: 0,
      skip: 0,
    };

    dispatch(getAllComment(payload))
      .then((res) => {
        if (
          res?.payload?.data?.data?.replies &&
          res.payload.data.data.replies.length > 0
        ) {
          setAllComments(res.payload.data.data.replies[0]);
        } else {
          console.log("Expected replies data not found");
        }
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
      });
  }, [pageId]);

  return (
    <div>
      <div id="lbth_main" style={{ zIndex: "999999", display: "none" }}>
        <div id="lbthmydiv" className="lbthmodal">
          <div>
            <div id="full-width" className="lbthmodal" tabIndex="">
              <div
                id="lbthmydivheader"
                className="lbthmodal-header"
                style={{ position: "relative" }}
              >
                <span style={{ fontSize: "40px" }} id="myTextModalLabel"></span>
                <span
                  id="removePopup"
                  title="close"
                  style={{
                    position: "absolute",
                    top: "4px",
                    right: "9px",
                    zIndex: "99999",
                  }}
                >
                  X
                </span>
                <img
                  id="closePopup"
                  alt="Close icon"
                  title="minimize"
                  style={{
                    position: "absolute",
                    top: "4px",
                    right: "80px",
                    zIndex: "99999",
                  }}
                />
              </div>
              <div className="lbthmodal-body">
                <div className="lbth-flex">
                  <img
                    id="undoImg"
                    alt="Undo image icon"
                    style={{
                      maxWidth: "30px",
                      cursor: "pointer",
                      marginRight: "8px",
                    }}
                    src="#"
                  />
                  <span
                    id="lbthchange"
                    style={{ fontSize: "17px", cursor: "pointer" }}
                  >
                    Start
                  </span>
                  <img
                    id="redoImg"
                    alt="Redo image icon"
                    style={{
                      maxWidth: "30px",
                      cursor: "pointer",
                      marginLeft: "8px",
                    }}
                    src="#"
                  />
                </div>
                <div className="lbth-flex" style={{ fontSize: "17px" }}>
                  WPM : &nbsp;
                  <select name="selectorId" id="lbthSelectorId"></select>
                </div>
                <div className="lbth-flex" style={{ fontSize: "17px" }}>
                  Font Size : &nbsp;
                  <select name="fontSize" id="fontSize"></select>
                </div>
                <div className="lbth-flex" style={{ fontSize: "17px" }}>
                  Words at a time : &nbsp;
                  <select name="no_words" id="no_words"></select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SingleGem
        gemId={gemId}
        isFeedBackGem={true}
        allComments={allComments}
        items={items}
      />
    </div>
  );
};

export default FeedBack;
