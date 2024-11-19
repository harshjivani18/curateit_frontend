import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Comment from "./Comment";
import Editor from "./Editor";
import { addComment } from "@actions/comment";
import session from "@utils/session";
import { useParams, usePathname, useRouter } from "next/navigation";
import { openAuthModal } from "@actions/app";

export const CommentContainer = ({ selectedGem, user, onResponded = null }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const getAllComments = useSelector((state) => state.comments.comments);
  const [allComments, setAllComments] = useState(getAllComments || []);
  const [extractedCommentData, setExtractedCommentData] = useState(null);
  const [commentVal, setCommentVal] = useState("");
  const [loading, setLoading] = useState(false);

  const searchParams = useParams();
  const searchPathname = usePathname();
  const uname = searchParams?.username;
  const module = searchPathname?.includes("/g/") ? "gems" : searchPathname?.includes("/tags/") ? "tags" : searchPathname?.includes("/c/") ? "collections" : null;
  const sourceId = searchParams?.gemId || searchParams?.colllectionId || searchParams?.tagId || searchParams?.id;
  const slug = searchParams?.name;

  // const searchParams = window.location.pathname.split("/");
  // const uname = searchParams[2];
  // const module = searchParams[3] === "tags" ? "tags" : searchParams[3] === "c" ? "collections" : null;
  // const tagId = searchParams[4];
  // const slug = searchParams[5];

  function extractCommentData(comments) {
    return comments.map((comment) => {
      // Ensure that `floatingCommentData` exists before trying to access its properties
      if (comment.floatingCommentData) {
        const { url, gemId, mainComment } = comment.floatingCommentData;
        return {
          url,
          gemId,
          text: mainComment ? mainComment.text : "", // Provide a fallback if `mainComment` is undefined
        };
      } else {
        // Return a default or empty object if `floatingCommentData` is missing
        return {
          url: "",
          gemId: null,
          text: "",
        };
      }
    });
  }

  useEffect(() => {
    setAllComments(getAllComments);
  }, [getAllComments]);

  const cancelComment = () => {
    setCommentVal("");
  };

  useEffect(() => {
    const extractedData = extractCommentData(allComments);
    setExtractedCommentData(extractedData);
  }, [allComments]);

  const respondComment = () => {
    if (session && session?.userId && selectedGem && commentVal && user?.id) {
      setLoading(true);
      const data = {
        comment: commentVal,
        comment_by: {
          id: session.userId,
          username: session.username,
        },
        comment_to: {
          id: user?.id,
          username: user?.username,
        },
        page_type: "gem",
        page_id: selectedGem,
      };
      try {
        dispatch(addComment(data)).then((res) => {
          setCommentVal("");
          setLoading(false);
          onResponded && onResponded();
        });
      } catch (error) {
        // message.error(TextMessage.ERROR_TEXT)
      }
    } else {
      dispatch(
        openAuthModal({
          open: true,
          action: "login",
          extraInfo: {
            trigger: 'comment',
            username: uname,
            id: sourceId,
            module: module,
            slug: slug
          }
        })
      );
    }
  };

  const FeedbackComment = ({ comment }) => {
    const { url, gemId, text } = comment;
    // Function to open the URL in a new tab
    const openUrl = () => {
      window.open(url, "_blank", "noopener,noreferrer");
    };

    // Function to copy the URL to the clipboard
    const copyUrl = () => {
      // Create a temporary input to copy the URL
      const tempInput = document.createElement("input");
      document.body.appendChild(tempInput);
      tempInput.value = url;
      tempInput.select();
      document.execCommand("copy");
      document.body.removeChild(tempInput);

      // Display the alert
      // alert("Copied");
    };
    return (
      <div className="flex items-center space-x-2 justify-between">
        <span className="text-blue-500 font-semibold hover:underline">
          {text}
        </span>
        <div className="flex flex-row gap-1">
          <svg
            width="23"
            height="23"
            onClick={openUrl}
            style={{ cursor: "pointer" }}
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14 6.5C14 6.63261 13.9473 6.75979 13.8536 6.85355C13.7598 6.94732 13.6326 7 13.5 7C13.3674 7 13.2402 6.94732 13.1464 6.85355C13.0527 6.75979 13 6.63261 13 6.5V3.7075L8.85437 7.85375C8.76055 7.94757 8.63331 8.00028 8.50062 8.00028C8.36794 8.00028 8.2407 7.94757 8.14688 7.85375C8.05305 7.75993 8.00035 7.63268 8.00035 7.5C8.00035 7.36732 8.05305 7.24007 8.14688 7.14625L12.2925 3H9.5C9.36739 3 9.24021 2.94732 9.14645 2.85355C9.05268 2.75979 9 2.63261 9 2.5C9 2.36739 9.05268 2.24021 9.14645 2.14645C9.24021 2.05268 9.36739 2 9.5 2H13.5C13.6326 2 13.7598 2.05268 13.8536 2.14645C13.9473 2.24021 14 2.36739 14 2.5V6.5ZM11.5 8C11.3674 8 11.2402 8.05268 11.1464 8.14645C11.0527 8.24021 11 8.36739 11 8.5V13H3V5H7.5C7.63261 5 7.75979 4.94732 7.85355 4.85355C7.94732 4.75979 8 4.63261 8 4.5C8 4.36739 7.94732 4.24021 7.85355 4.14645C7.75979 4.05268 7.63261 4 7.5 4H3C2.73478 4 2.48043 4.10536 2.29289 4.29289C2.10536 4.48043 2 4.73478 2 5V13C2 13.2652 2.10536 13.5196 2.29289 13.7071C2.48043 13.8946 2.73478 14 3 14H11C11.2652 14 11.5196 13.8946 11.7071 13.7071C11.8946 13.5196 12 13.2652 12 13V8.5C12 8.36739 11.9473 8.24021 11.8536 8.14645C11.7598 8.05268 11.6326 8 11.5 8Z"
              fill="#347AE2"
            />
          </svg>
          <svg
            width="23"
            height="23"
            onClick={copyUrl}
            style={{ cursor: "pointer" }}
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.3538 6.85403L11.3538 9.85403C11.2599 9.94785 11.1327 10.0006 11 10.0006C10.8673 10.0006 10.7401 9.94785 10.6462 9.85403C10.5524 9.76021 10.4997 9.63296 10.4997 9.50028C10.4997 9.3676 10.5524 9.24035 10.6462 9.14653L12.7931 7.00028H10.3125C9.09291 6.99994 7.9078 7.40497 6.94353 8.15168C5.97926 8.89839 5.29052 9.94442 4.98562 11.1253C4.95247 11.2537 4.86965 11.3638 4.75537 11.4312C4.64109 11.4986 4.50471 11.5178 4.37625 11.4847C4.24779 11.4515 4.13775 11.3687 4.07036 11.2544C4.00296 11.1401 3.98372 11.0037 4.01687 10.8753C4.37663 9.47936 5.19047 8.24275 6.33024 7.36017C7.47001 6.47759 8.87097 5.99918 10.3125 6.00028H12.7944L10.6462 3.85403C10.5998 3.80757 10.5629 3.75242 10.5378 3.69173C10.5127 3.63103 10.4997 3.56598 10.4997 3.50028C10.4997 3.43458 10.5127 3.36953 10.5378 3.30883C10.5629 3.24813 10.5998 3.19298 10.6462 3.14653C10.7401 3.05271 10.8673 3 11 3C11.0657 3 11.1308 3.01294 11.1914 3.03808C11.2521 3.06322 11.3073 3.10007 11.3538 3.14653L14.3538 6.14653C14.4002 6.19296 14.4371 6.24811 14.4623 6.30881C14.4874 6.36951 14.5004 6.43457 14.5004 6.50028C14.5004 6.56599 14.4874 6.63105 14.4623 6.69175C14.4371 6.75245 14.4002 6.80759 14.3538 6.85403ZM12 13.0003H2.5V5.50028C2.5 5.36767 2.44732 5.24049 2.35355 5.14672C2.25979 5.05296 2.13261 5.00028 2 5.00028C1.86739 5.00028 1.74021 5.05296 1.64645 5.14672C1.55268 5.24049 1.5 5.36767 1.5 5.50028V13.0003C1.5 13.2655 1.60536 13.5198 1.79289 13.7074C1.98043 13.8949 2.23478 14.0003 2.5 14.0003H12C12.1326 14.0003 12.2598 13.9476 12.3536 13.8538C12.4473 13.7601 12.5 13.6329 12.5 13.5003C12.5 13.3677 12.4473 13.2405 12.3536 13.1467C12.2598 13.053 12.1326 13.0003 12 13.0003Z"
              fill="#347AE2"
            />
          </svg>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Editor
        commentVal={commentVal}
        setCommentVal={setCommentVal}
        cancelComment={cancelComment}
        respondComment={respondComment}
        loading={loading}
      />
      {allComments.map((comment, index) => (
            <div key={index}>
              <Comment comment={comment} onResponded={onResponded} />
            </div>
      ))}
      {/* {extractedCommentData
        ? extractedCommentData.map((comment, idx) => (
            <div key={idx} className="mt-2">
              <FeedbackComment comment={comment} />
            </div>
          ))
        : allComments.map((comment, index) => (
            <div key={index}>
              <Comment comment={comment} />
            </div>
          ))} */}
    </div>
  );
};
