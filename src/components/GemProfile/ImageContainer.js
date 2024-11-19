'use client'
import "./ImageContainer.css"
// import dynamic from 'next/dynamic';
// const Highlighter = dynamic(async () => await import("web-highlighter"), { ssr: false });
import { useState, useEffect, useRef } from 'react';
import { ArrowDownTrayIcon, ArrowPathIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import moment from 'moment'
import { Radio, Spin, Tooltip } from 'antd'
// import Highlighter from 'web-highlighter';
import { useDispatch, useSelector } from 'react-redux';
import { addHighlight, setCurrentGem } from '@actions/gems';
import { HIGHLIGHTED_COLORS } from '@utils/constants';
import { loadHighlighter } from '@utils/load-quill';
import session from "@utils/session";
import { getAllComment } from "@actions/comment";

const VIEWS = [
  { label: "Default", value: "default" },
  // { label: "Comment", value: "comment" },
  { label: "Web", value: "web" },
  { label: "Permanent Copy", value: "permanent" }
]


let commentCounter = 1;
// Variables to store the current mouse coordinates
let mousePageX = 0;
let mousePageY = 0;

const getMouseCoordinates = () => {
  const res = {
    type: "CREATE_COMMENT",
    coords: {
      x: mousePageX,
      y: mousePageY,
      commentText: "Write Your Comment Here",
    },
  };
  return res;
};

const createHighlight = async () => {
  const now = new Date();
  // Format the date and time in a 'YYYY-MM-DD_HH-MM-SS' format
  const _id =
    "file_" +
    now.getFullYear() +
    "-" +
    (now.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    now.getDate().toString().padStart(2, "0") +
    "_" +
    now.getHours().toString().padStart(2, "0") +
    "-" +
    now.getMinutes().toString().padStart(2, "0") +
    "-" +
    now.getSeconds().toString().padStart(2, "0");
  const result = await sendCommentPayload("Comment Added", _id);
  return result;
};

const createFloatingCommentV2 = async (createOnDefaultPosition = false) => {
  const res = await createHighlight();
  let msg;
  if (createOnDefaultPosition) {
    msg = {
      type: "CREATE_COMMENT",
      coords: {
        x: 450,
        y: 110,
        commentText: "Write Your Comment Here",
      },
    };
  } else {
    msg = getMouseCoordinates();
  }

  const x = msg?.coords?.x;
  const y = msg?.coords?.y;
  if (x && y) {
    createCommentOnScreenV2(x, y, "comment-", res, false, null);
  }
};

document?.addEventListener("keydown", function (event) {
  // Check for Alt+C and either Ctrl or Meta (Cmd on Mac)
  if (event.altKey && event.key.toLowerCase() === "c") {
    event.preventDefault();
    createFloatingCommentV2(false);
  }
});

async function postHighlight(payload) {
  const sessionToken = session.token;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const unfilteredCollectionId = session.unfiltered_collection_id;

  const url = `${apiUrl}/api/collections/${unfilteredCollectionId}/highlights`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionToken}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error during the API call:", error);
  }
}

const sendCommentPayload = async (comment, _id) => {
  const covers = [];
  for (let i = 0; i < document.images.length; i++) {
    const img = document.images[i];
    covers.push(img.src);
  }
  const icon = document.querySelector('link[rel="icon"]')?.href || "";
  const heading =
    document.querySelector("h1")?.textContent || document?.title || "Heading";
  const description =
    document.querySelector('meta[name="description"]')?.content || "";
  let payload = {
    notes: "",
    color: {
      id: 4,
      border: "border-l-yellow-200",
      bg: "#FFFAB3",
      text: "text-yellow-200",
      colorCode: "#FFFAB3",
      className: "yellow-hl",
    },
    text: `<p>${comment}</p>`,
    title: document?.title?.trim() || "Title",
    heading: heading.trim(),
    description: description.trim(),
    expander: [],
    link: window.location.href,
    collections: session.unfiltered_collection_id,
    tags: [],
    type: "Highlight",
    box: null,
    _id: _id,
    details: null,
    styleClassName: "",
    is_favourite: false,
    metaData: {
      covers: covers,
      icon: {
        type: "image",
        icon: icon,
      },
      docImages:
        Array.from(document?.images)?.map((img) => {
          return img.src;
        }) || [],
      defaultThumbnail: document.querySelector('meta[property="og:image"]')
        ?.content,
      defaultIcon: icon,
    },
    showThumbnail: true,
  };
  const res = await postHighlight(payload);
  return res;
};

function modifySiteSpecificData(currentCommentObj) {
  const commentUrl = window.location.href;
  const commentSectionKey = encodeURIComponent(commentUrl);

  // Retrieve existing comments from local storage
  const allCommentsJSON = localStorage.getItem("allComments");
  let allComments = allCommentsJSON ? JSON.parse(allCommentsJSON) : {};

  // Check if there are comments for the current section
  if (allComments[commentSectionKey]) {
    // Find the index of the comment with the same gemId
    let existingCommentIndex = allComments[commentSectionKey].allData.findIndex(
      (comment) => comment.gemId === currentCommentObj.gemId
    );

    // If the comment exists, update it
    if (existingCommentIndex !== -1) {
      allComments[commentSectionKey].allData[existingCommentIndex] =
        currentCommentObj;
    } else {
      // If the comment does not exist, log an error or handle as necessary
      console.error("Comment with gemId not found.");
      return;
    }

    // Save the updated comments back to local storage
    localStorage.setItem("allComments", JSON.stringify(allComments));
  } else {
    // If no comments for the current section, log an error or handle as necessary
    console.error("No comments section found for this URL.");
  }
}

function saveSiteSpecificData(key, currentCommentObj) {
  const commentUrl = window.location.href;
  const commentSectionKey = encodeURIComponent(commentUrl);

  const allCommentsJSON = localStorage.getItem(key);
  let allComments = allCommentsJSON ? JSON.parse(allCommentsJSON) : {};

  if (!allComments[commentSectionKey]) {
    allComments[commentSectionKey] = {
      url: commentUrl,
      allData: [],
    };
  }

  let existingCommentIndex = allComments[commentSectionKey].allData.findIndex(
    (comment) => comment.gemId === currentCommentObj.gemId
  );

  if (existingCommentIndex !== -1) {
    allComments[commentSectionKey].allData[existingCommentIndex] =
      currentCommentObj;
  } else {
    allComments[commentSectionKey].allData.push(currentCommentObj);
  }

  localStorage.setItem(key, JSON.stringify(allComments));
}

function getSiteSpecificData(key) {
  const currentUrl = window.location.href;
  const allCommentsJSON = localStorage.getItem(key);
  if (allCommentsJSON) {
    const allComments = JSON.parse(allCommentsJSON);
    const encodedUrl = encodeURIComponent(currentUrl);
    const currentPageComments = allComments[encodedUrl];
    if (currentPageComments && currentPageComments.allData) {
      return currentPageComments.allData;
    }
  }
  return null;
}

// async function getBrowserData() {
//   // Return a new Promise that encapsulates the asynchronous operation
//   return new Promise((resolve, reject) => {
//     window.chrome.runtime.sendMessage(
//       { request: "search-history", query: "", results: 10 },
//       (response) => {
//         if (window.chrome.runtime.lastError) {
//           // If there's an error within the chrome API, reject the Promise
//           reject(new Error(window.chrome.runtime.lastError.message));
//         } else {
//           const pageInfo = {
//             url: window.location.href,
//             title: document.title,
//             screenWidth: window.screen.width,
//             screenHeight: window.screen.height,
//             browser: navigator.userAgent,
//             allHistory: response?.history,
//           };
//           // Otherwise, resolve the Promise with the necessary data
//           resolve(pageInfo);
//         }
//       }
//     );
//   });
// }

function prefillComments() {
  const allCommentsArr = getSiteSpecificData("allComments");
  allCommentsArr?.forEach((comment) => {
    createCommentOnScreenV2(
      comment?.coords?.x,
      comment?.coords?.y,
      comment?.commentClass,
      { parent_gem_id: { id: comment?.gemId } },
      true,
      comment
    );
  });
}

function captureConsole() {
  // Object to hold captured messages
  let capturedMessages = {
    log: [],
    error: [],
    warn: [],
  };

  // Save the original console functions
  const originalConsole = {
    log: console.log,
    error: console.error,
    warn: console.warn,
  };

  // Capture and store the console outputs
  Object.keys(originalConsole).forEach((type) => {
    console[type] = (...args) => {
      // Store the captured message
      capturedMessages[type].push(
        args
          .map((arg) => (typeof arg === "object" ? JSON.stringify(arg) : arg))
          .join(" ")
      );

      // Call the original console function (optional)
      originalConsole[type].apply(console, args);
    };
  });

  // Function to restore the original console functions and return the captured messages
  function restoreAndRetrieveConsole() {
    // Restore the original console functions
    Object.keys(originalConsole).forEach((type) => {
      console[type] = originalConsole[type];
    });

    // Return the captured messages
    return capturedMessages;
  }

  // Return the restoreAndRetrieveConsole function
  // This allows the user to restore the console and retrieve the messages at the same time
  return restoreAndRetrieveConsole;
}

const retrieveConsole = captureConsole();

// window?.addEventListener("load", function () {
//   prefillComments();
// });

// Function to format the date in dd/mm/yyyy format
function formatDate(date) {
  let day = date.getDate().toString().padStart(2, "0");
  let month = (date.getMonth() + 1).toString().padStart(2, "0"); // getMonth() is zero-based
  let year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function timeAgoText(dateString) {
  // Parse the input date string
  const [day, month, year] = dateString?.split("/");
  const inputDate = new Date(year, month - 1, day);

  // Calculate the difference in days
  const today = new Date();
  const diffTime = today - inputDate;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  // Return the appropriate string
  if (diffDays === 0) {
    return "Today";
  } else if (diffDays === 1) {
    return "Yesterday";
  } else {
    return `${diffDays} Days Ago`;
  }
}

function createUniqueFileName() {
  const now = new Date();
  // Format the date and time in a 'YYYY-MM-DD_HH-MM-SS' format
  const fileName =
    "file_" +
    now.getFullYear() +
    "-" +
    (now.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    now.getDate().toString().padStart(2, "0") +
    "_" +
    now.getHours().toString().padStart(2, "0") +
    "-" +
    now.getMinutes().toString().padStart(2, "0") +
    "-" +
    now.getSeconds().toString().padStart(2, "0");
  return fileName;
}

async function postComment(
  floatingCommentObject,
  currentText,
  authorId,
  userName
) {
  saveSiteSpecificData("allComments", floatingCommentObject);
  const sessionToken = session.token;
  const payload = {
    comment: `<p>${currentText}</p>`,
    comment_by: {
      id: authorId,
      username: userName,
    },
    comment_to: {
      id: floatingCommentObject?.mainComment.authorId || authorId,
      username: floatingCommentObject.mainComment.author || userName,
    },
    page_type: "gem",
    floatingCommentData: floatingCommentObject,
    page_id: floatingCommentObject.gemId,
  };
  const url = "https://curateit-dev-logs.curateit.com/api/comments";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionToken}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
  } catch (error) {
    console.error("There was a problem with your fetch operation:", error);
  }
}

async function fetchUsers() {
  const sessionToken = session.token;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const url = `${apiUrl}/api/public-users`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${sessionToken}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.data; // Extract usernames and return
  } catch (error) {
    console.error("Could not fetch users:", error);
    return []; // Return an empty array in case of an error
  }
}

async function fetchHighlightGem(id) {
  const sessionToken = session.token;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const url = `${apiUrl}/api/gems/${id}?populate=*`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${sessionToken}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data?.data?.attributes; // Extract usernames and return
  } catch (error) {
    console.error("Could not fetch gem:", error);
    return []; // Return an empty array in case of an error
  }
}

// Function to handle the gem update
async function updateHighlightGem(newPayload, gemId) {
  const sessionToken = session.token;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  try {
    const response = await fetch(`${apiUrl}/api/gems/${gemId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionToken}`,
      },
      body: JSON.stringify(newPayload),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.text();
    alert("Gem Updated");
    return data;
  } catch (error) {
    console.error("Gem Update error:", error);
    alert("Error Updating Gem");
    return null;
  }
}

async function fetchUserDetails() {
  const sessionToken = session.token;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const url = `${apiUrl}/api/users/me?populate=tags`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${sessionToken}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data; // Extract usernames and return
  } catch (error) {
    console.error("Could not fetch users:", error);
    return {}; // Return an empty array in case of an error
  }
}

async function fetchUserCollections() {
  const sessionToken = session.token;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  
  const url = `${apiUrl}/api/collection-wise-counts`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${sessionToken}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data; // Extract usernames and return
  } catch (error) {
    console.error("Could not fetch users:", error);
    return {}; // Return an empty array in case of an error
  }
}

// Function to handle the file upload
async function uploadFile(file) {
  const formData = new FormData();
  formData.append("file", file);
  const sessionToken = session.token;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  try {
    const response = await fetch(`${apiUrl}/api/upload-all-file`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.text();
    return data;
  } catch (error) {
    console.error("File upload error:", error);
    return null;
  }
}

function generateUniqueId() {
  const now = new Date();
  const timestamp = now.getTime().toString(36);
  const randomComponent = Math.random().toString(36).substring(2, 15);
  return timestamp + randomComponent;
}

async function createCommentOnScreenV2(
  x,
  y,
  baseClass,
  highlightRes,
  renderOnLoad,
  commentObj
) {
  if (highlightRes === null) {
    highlightRes = await createHighlight();
  }
  const gemId = highlightRes?.parent_gem_id?.id;
  let mentionedUsersArray = [];
  let mentionedTagsArray = [];
  let selectedTagsArray = [];
  let reactedEmoji = "";
  let mentionedCollArray = [];
  let selectedCollectionId = null;
  let allUserTags = [];
  let allUserColls = [];
  let attachedFiles = [];
  let currentStatus = commentObj?.currentStatus || "";
  let currentPriority = commentObj?.currentPriority || "";
  let currentFeedbackType = commentObj?.currentFeedbackType || "";
  let currentAssignee = commentObj?.currentAssignee || "";
  let screenRecordUrlData = commentObj?.screenRecordUrlData;
  let audioRecordUrlData = commentObj?.audioRecordUrlData;

  // Retrieve and restore console, capturing all messages
  const captured = retrieveConsole();
  let box =
    document.querySelector(`.${baseClass}.commentBoxCard`) ||
    document.createElement("div");
  let _id = renderOnLoad ? baseClass : `${baseClass}${gemId}`;

  if (renderOnLoad) {
    allUserTags = commentObj.mentionedUsers;
    attachedFiles = commentObj.filesAttached;
  }

  let floatingCommentObject = {
    url: window.location.href,
    gemId,
    mentionedUsers: allUserTags,
    commentClass: _id,
    coords: { x: x, y: y },
    currentStatus,
    currentPriority,
    currentFeedbackType,
    currentAssignee,
    screenRecordUrl: screenRecordUrlData,
    mainComment: commentObj?.mainComment || {},
    replies: commentObj?.replies || [],
    reactedEmoji,
  };

  box.className = _id;
  box.classList.add("commentBoxCard");
  box.style.cssText = `position: absolute; left: ${x}px; top: ${y}px; border-radius: 0.375rem;display: none;flex-direction: column;transition: all 0.5s ease 0s;z-index: 9;opacity: 1; width: 420px; z-index: 999;`;
  let previewCircle;
  let tmpPreviewCircle = document.querySelector(`#commentIcon-${_id}`);
  if (tmpPreviewCircle) {
    previewCircle = tmpPreviewCircle;
  } else {
    previewCircle = document.createElement("div");
    previewCircle.id = `commentIcon-${_id}`;
    previewCircle.style.cssText = `width: 50px; height: 50px; border-radius: 50%; border: 1px solid black; background-image: url('https://drz68kkeltaek.cloudfront.net/common/base64-converted-imgs/1710539807457.png'); background-size: cover; position: absolute; left: ${x}px; top: ${y}px; cursor: grab; z-index: 9;`;
    document.body.appendChild(previewCircle);
  }

  // Function to show the full comment
  const showComment = (e) => {
    e.stopPropagation()
    // console.log("showComment clicked")
    const commentBox = document.querySelector(`.comment-${_id}`) || box
    commentBox.style.display = "flex";
    // previewCircle.style.display = "none";
  };

  // Function to hide the full comment
  const hideComment = () => {
    // console.log("hideComment clicked")
    const commentBox = document.querySelector(`.comment-${_id}`) || box
    commentBox.style.display = "none";
    // console.log("commentBox2 : ", commentBox)
    previewCircle.style.display = "block";
  };

  previewCircle?.addEventListener("click", showComment);

  // Dragging functionality for both box and previewCircle
  let isDragging = false;
  let dragStartX, dragStartY;

  const startDrag = (e) => {
    isDragging = true;
    dragStartX = e.clientX - parseInt(box.style.left, 10);
    dragStartY = e.clientY - parseInt(box.style.top, 10);
    box.style.opacity = "0.5";
    previewCircle.style.opacity = "0.5";
  };

  const doDrag = (e) => {
    if (isDragging) {
      const newX = e.clientX - dragStartX;
      const newY = e.clientY - dragStartY;
      box.style.left = `${newX}px`;
      box.style.top = `${newY}px`;
      previewCircle.style.left = `${newX}px`;
      previewCircle.style.top = `${newY}px`;
    }
  };

  const stopDrag = () => {
    if (isDragging) {
      isDragging = false;
      box.style.opacity = "1";
      previewCircle.style.opacity = "1";
    }
  };

  previewCircle?.addEventListener("mousedown", startDrag);
  document?.addEventListener("mousemove", doDrag);
  document?.addEventListener("mouseup", stopDrag);

  document?.addEventListener("mousemove", function (e) {
    if (isDragging) {
      const newX = e.clientX - dragStartX;
      const newY = e.clientY - dragStartY;
      box.style.left = `${newX}px`;
      box.style.top = `${newY}px`;
    }
  });

  document?.addEventListener("mouseup", function (e) {
    if (isDragging) {
      isDragging = false;
      box.style.opacity = "1";
    }
  });

  box.innerHTML = `
  <div class="frame-parent">
    <div class="frame-group" style="display: flex;">
      <div style="width: 100%; display: flex; flex-direction: column; gap: 5px;">
          <div class="selectWrapperDiv" style="display: flex; flex-direction: row;gap: 10px;"> </div>
          <div id="comment-custom-select" class="custom-select-container" style="display: none; border: none;position: absolute;background: white;z-index: 2;left: 100%;top: 0;padding: 10px;box-shadow: rgba(0, 0, 0, 0.1) 4px 10px 8px; width: auto;">
            <div class="tags-container"></div>
            <div class="custom-select-search" style="gap:5px;">
              <button class="arrowright-wrapper addTagBtn" title="Add Them" style="border: 1px solid black;height: auto;background: white;border-radius: 50%;">
                <svg width="15" height="15" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.25 3C5.25 3.04973 5.23025 3.09742 5.19508 3.13258C5.15992 3.16775 5.11223 3.1875 5.0625 3.1875H3.1875V5.0625C3.1875 5.11223 3.16775 5.15992 3.13258 5.19508C3.09742 5.23025 3.04973 5.25 3 5.25C2.95027 5.25 2.90258 5.23025 2.86742 5.19508C2.83225 5.15992 2.8125 5.11223 2.8125 5.0625V3.1875H0.9375C0.887772 3.1875 0.840081 3.16775 0.804918 3.13258C0.769754 3.09742 0.75 3.04973 0.75 3C0.75 2.95027 0.769754 2.90258 0.804918 2.86742C0.840081 2.83225 0.887772 2.8125 0.9375 2.8125H2.8125V0.9375C2.8125 0.887772 2.83225 0.840081 2.86742 0.804918C2.90258 0.769754 2.95027 0.75 3 0.75C3.04973 0.75 3.09742 0.769754 3.13258 0.804918C3.16775 0.840081 3.1875 0.887772 3.1875 0.9375V2.8125H5.0625C5.11223 2.8125 5.15992 2.83225 5.19508 2.86742C5.23025 2.90258 5.25 2.95027 5.25 3Z" fill="#7C829C"/>
                </svg>              
              </button>
              <input type="text" placeholder="Type to Enter Tags..." style="background: white;color: black;">
            </div>
            <div class="dropdown-container" style="display: none;"></div>
          </div>

          <div id="comment-custom-select" class="custom-collections-container" style="display: none; border: none;position: absolute;background: white;z-index: 2;left: 100%;top: 50%;padding: 10px;box-shadow: rgba(0, 0, 0, 0.1) 4px 10px 8px; width: auto;">
          <div class="tags-container"></div>
          <div class="custom-select-search" style="gap:5px;">
            <input type="text" placeholder="Type to Enter Collections..." style="background: white;color: black;">
          </div>
          <div class="dropdown-container" style="display: none;"></div>
          </div>
      </div>
      <div style="display: flex; gap: 10px;">
      <svg class="x-icon" style="cursor: pointer; scale: 1.2;" title="Browser Info" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 256 256" height="200px" width="40px" xmlns="http://www.w3.org/2000/svg"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm16-40a8,8,0,0,1-8,8,16,16,0,0,1-16-16V128a8,8,0,0,1,0-16,16,16,0,0,1,16,16v40A8,8,0,0,1,144,176ZM112,84a12,12,0,1,1,12,12A12,12,0,0,1,112,84Z"></path></svg>
        <img class="x-icon" style="cursor: pointer;" title="Close" loading="lazy" src="https://d3jrelxj5ogq5g.cloudfront.net/icons/x_xawx75.svg" alt="Close icon" />
      </div>
    </div>
    <div class="browserDataElement" style="display:none;font-family: Arial, sans-serif;border: 1px solid rgb(221, 221, 221);padding: 20px;border-radius: 8px;max-width:100%;width:100%;"></div>
    <video class="recordedVideo" src="" controls="" style="display: none; width: 100%;"></video>
    <div class="recordedAudioWrapper" id="recordedAudioWrapper" style="display: none; flex-direction: column; gap: 10px; margin: auto; align-items: center;width:100%;">
        <div id="audioIconContainer" style="display: inline-block; position: relative; width: fit-content;">
          <img id="playRecordButton" src="https://d3jrelxj5ogq5g.cloudfront.net/icons/microphone_cq1eyi.svg" style="display: block; cursor: pointer; margin: auto; padding: 10px; border: 1px solid rgb(83, 86, 255); border-radius: 50%;" alt="Mic icon">
          <img id="stopRecordButton" src="https://d3jrelxj5ogq5g.cloudfront.net/icons/stop-svgrepo-com_gyvesv.svg" style="display: none; cursor: pointer; margin: auto; padding: 10px; border: 1px solid rgb(83, 86, 255); border-radius: 50%;max-width: 42px;" alt="Stop recording icon">
          <span class="ripple" style="height: 43px; width: 43px; top: 0; left: 0; scale: 0.7; animation: auto ease 0s 1 normal none running none;"></span>
        </div>
    </div>
    <section class="frame-container">
        <div class="frame-div"> </div>
    </section>
    <div class="frame-parent4">
        <div class="at-parent" style="padding: 0;width: 100%;">
          <div title="Screen Record"><img loading="lazy" src="https://d3jrelxj5ogq5g.cloudfront.net/icons/videocamera_kqkv9n.svg" style="height: 20px; width: 20px; position: relative; min-height: 16px; padding: 2px; cursor: pointer;" alt="Video camera icon"></div>
          <div title="Record Audio"><img loading="lazy" src="https://d3jrelxj5ogq5g.cloudfront.net/icons/microphone_cq1eyi.svg" style="height: 20px;width: 20px;position: relative;min-height: 16px;padding: 2px;cursor: pointer;" alt="Mic icon"></div>
          <div title="Attach File"><img loading="lazy" src="https://d3jrelxj5ogq5g.cloudfront.net/icons/paperclip_en40r4.svg" style="height: 20px; width: 20px; position: relative; min-height: 16px; padding: 2px; cursor: pointer;" alt="Attach file icon"></div>
          <div title="Screenshot"><img loading="lazy" src="https://d3jrelxj5ogq5g.cloudfront.net/icons/screenshot_hul3xl.svg" style="height: 20px; width: 20px; position: relative; min-height: 16px; padding: 2px; cursor: pointer;" alt="Screenshot icon"></div>
          <div style="display: flex;gap: 16px;margin-left: 8.7rem;" class="optionsWrapper">
            <div title="Tags" style="cursor: pointer;">
              <svg width="16" height="16" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.4052 5.375L5.75 0.719847C5.68061 0.6499 5.59801 0.594444 5.507 0.556703C5.41598 0.518962 5.31838 0.499689 5.21985 0.500004H0.875004C0.775548 0.500004 0.680165 0.539513 0.609839 0.609839C0.539513 0.680165 0.500004 0.775548 0.500004 0.875004V5.21985C0.499689 5.31838 0.518962 5.41598 0.556703 5.507C0.594444 5.59801 0.6499 5.68061 0.719847 5.75L5.375 10.4052C5.44465 10.4748 5.52734 10.5301 5.61834 10.5678C5.70935 10.6055 5.80689 10.6249 5.90539 10.6249C6.0039 10.6249 6.10144 10.6055 6.19245 10.5678C6.28345 10.5301 6.36614 10.4748 6.43579 10.4052L10.4052 6.43579C10.4748 6.36614 10.5301 6.28345 10.5678 6.19245C10.6055 6.10144 10.6249 6.0039 10.6249 5.90539C10.6249 5.80689 10.6055 5.70935 10.5678 5.61834C10.5301 5.52734 10.4748 5.44465 10.4052 5.375ZM5.90516 9.875L1.25 5.21985V1.25H5.21985L9.875 5.90516L5.90516 9.875ZM3.5 2.9375C3.5 3.04876 3.46701 3.15751 3.40521 3.25001C3.3434 3.34251 3.25555 3.41461 3.15276 3.45719C3.04998 3.49976 2.93688 3.5109 2.82777 3.4892C2.71865 3.46749 2.61842 3.41392 2.53976 3.33525C2.46109 3.25658 2.40752 3.15636 2.38581 3.04724C2.36411 2.93813 2.37525 2.82503 2.41782 2.72224C2.4604 2.61946 2.53249 2.53161 2.625 2.4698C2.7175 2.40799 2.82625 2.375 2.9375 2.375C3.08669 2.375 3.22976 2.43427 3.33525 2.53976C3.44074 2.64525 3.5 2.78832 3.5 2.9375Z" fill="#343330"></path>
              </svg>
            </div>
            <div title="Collection" style="cursor: pointer;">
              <svg width="16" height="16" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.125 3.375H6.15516L4.875 2.09485C4.80561 2.0249 4.72301 1.96944 4.63199 1.9317C4.54098 1.89396 4.44337 1.87469 4.34484 1.875H1.875C1.67609 1.875 1.48532 1.95402 1.34467 2.09467C1.20402 2.23533 1.125 2.42609 1.125 2.625V9.40407C1.12525 9.59519 1.20128 9.77842 1.33643 9.91357C1.47158 10.0487 1.65481 10.1248 1.84594 10.125H10.1667C10.3545 10.1248 10.5345 10.0501 10.6673 9.91728C10.8 9.7845 10.8748 9.60449 10.875 9.41672V4.125C10.875 3.92609 10.796 3.73533 10.6553 3.59467C10.5147 3.45402 10.3239 3.375 10.125 3.375ZM1.875 2.625H4.34484L5.09484 3.375H1.875V2.625ZM10.125 9.375H1.875V4.125H10.125V9.375Z" fill="#4B4F5D"/>
              </svg>
            </div>
          </div>
        </div>
        <div class="reply-parent" style="display: block !important;">
          <div class="filePreview" style="width: 100%; display: flex; flex-wrap: wrap;gap:10px;"></div>
          <div style="display: flex; flex-direction: row;">
            <div class="emojiContainer" style="position: absolute; bottom: 0px; left: 50%; transform: translateX(-50%); display: none; flex-wrap: wrap; padding: 5px; background-color: white; border: 1px solid rgb(226, 226, 226); border-radius: 4px; max-height: 250px; overflow-y: auto; z-index: 99;">
            <input placeholder="Search emojis..." style="margin-bottom: 5px; padding: 4px 8px; width: calc(100% - 16px); background-color: rgb(226, 226, 226); border-radius: 10px; color: black;">
            </div>
            <textarea class="reply" id="emojionearea1" placeholder="Comment or type @ to tag Curators" style="height: 100%; box-shadow: none; width: 100%; resize: none;"></textarea>
            <div id="userSuggestions" class="dropdown" style="display: none; position: absolute; left: 0px; top: 100%; width: 100%; max-height: 200px; overflow-y: scroll; background: white; box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 8px; border-radius: 10px;"></div>
            <button class="replyBtn arrowright-wrapper"><img class="arrowright-icon" src="https://d3jrelxj5ogq5g.cloudfront.net/icons/arrowright_sa8ron.svg" alt="Right arrow icon"></button>
          </div>
        </div>
        <div class="fileUploadContainer" style="padding-top: 0.5rem; display: none; flex-direction: column; gap: 10px; align-items: center; width: 100%;">
          <div style="display: flex;align-items: center;gap: 5px;width: 100%;"><input class="fileInput" type="file" multiple="" style="color: black;">
            <button class="saveFileBtn arrowright-wrapper"><img class="arrowright-icon" src="https://d3jrelxj5ogq5g.cloudfront.net/icons/arrowright_sa8ron.svg" alt="Right arrow icon"></button>
          </div>
        </div>
    </div>
</div>
  `;

  const xWrapperButton = box.querySelector("img[title='Close']");
  const browserInfoButton = box.querySelector("svg[title='Browser Info']");
  const recordScreenButton = box.querySelector("div[title='Screen Record']");
  const tagsButton = box.querySelector("div[title='Tags']");
  const collectionButton = box.querySelector("div[title='Collection']");
  const recordAudioButton = box.querySelector("div[title='Record Audio']");
  const fileUploadButton = box.querySelector("div[title='Attach File']");
  const pickEmojiButton = box.querySelector("div[title='Pick Emoji']");
  const screenshotButton = box.querySelector("div[title='Screenshot']");
  const replyBtn = box.querySelector(".replyBtn");
  const replyInput = box.querySelector("textarea.reply");
  const frameDiv = box.querySelector(".frame-div");
  const audioIconContainer = box.querySelector("#audioIconContainer");
  const selectWrapperDiv = box.querySelector(".selectWrapperDiv");
  const fileInput = box.querySelector("input.fileInput");
  const optionsWrapper = box.querySelector("optionsWrapper");
  let userSuggestions = box.querySelector("#userSuggestions");
  let addTagBtn = box.querySelector("button.addTagBtn");

  addTagBtn?.addEventListener("click", (e) => {
    const searchInput = box.querySelector(
      ".custom-select-container .custom-select-search input"
    );
    const searchValue = searchInput.value;
    if (searchValue) {
      addTag(searchValue);
    }
  });

  tagsButton?.addEventListener("click", (e) => {
    const customSelectContainer = box.querySelector(".custom-select-container");
    customSelectContainer.style.display =
      customSelectContainer.style.display === "block" ? "none" : "block";
  });

  collectionButton?.addEventListener("click", (e) => {
    const customCollectionsContainer = box.querySelector(
      ".custom-collections-container"
    );
    customCollectionsContainer.style.display =
      customCollectionsContainer.style.display === "block" ? "none" : "block";
  });

  function createImageDropdown(type, options) {
    let currentChosenStatus;
    if (type === "status") {
      currentChosenStatus = floatingCommentObject.currentStatus;
    }
    if (type === "priority") {
      currentChosenStatus = floatingCommentObject.currentPriority;
    }
    if (type === "type") {
      currentChosenStatus = floatingCommentObject.currentFeedbackType;
    }

    // Create the dropdown container elements
    const container = document.createElement("div");
    const dropdownMenu = document.createElement("div");
    const imageWrapper = document.createElement("div");
    const imageDisplay = document.createElement("img");
    const dropdownIcon = document.createElement("div");
    dropdownIcon.style.height = "25px";
    dropdownIcon.innerHTML = `
      <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z"
            fill="#000000"></path>
        </g>
      </svg>
    `;

    // Set up the default display image based on the current status
    imageDisplay.style.cssText = "height: 15px;width: 15px;margin-right: 2px;";
    const currentOption = options.find(
      (opt) => opt.label === currentChosenStatus
    );
    imageDisplay.src = currentOption ? currentOption.image : options[0].image; // Fallback to the first option if no match
    imageDisplay.classList.add("dropdown-image");

    // Set up the image wrapper styles
    imageWrapper.style.cssText =
      "padding: 5px;border-radius: 14px; height: 25px;outline: #ABB7C9 solid 1px;display: flex;align-items: center;width: fit-content;box-shadow: rgba(0, 0, 0, 0.15) 2px 3px 6px";

    // Configure the dropdown menu styles
    dropdownMenu.className = "dropdown-menu";
    dropdownMenu.style.display = "none";
    dropdownMenu.style.maxHeight = "200px";
    dropdownMenu.style.overflowY = "scroll";
    options.forEach((opt) => {
      const optionDiv = document.createElement("div");
      const img = document.createElement("img");
      img.src = opt.image;
      img.className = "dropdown-image";
      optionDiv.appendChild(img);
      optionDiv.append(opt.label);
      optionDiv.style.width = "auto";
      optionDiv.addEventListener("click", (e) => {
        e.stopPropagation();
        imageDisplay.src = opt.image;
        if (type === "status") {
          floatingCommentObject.currentStatus = opt.label;
        }
        if (type === "priority") {
          floatingCommentObject.currentPriority = opt.label;
        }
        if (type === "type") {
          floatingCommentObject.currentFeedbackType = opt.label;
        }
        imageDisplay.classList.add("dropdown-image");
        dropdownMenu.style.display = "none";
      });
      dropdownMenu.appendChild(optionDiv);
    });

    container.onclick = () => {
      dropdownMenu.style.display =
        dropdownMenu.style.display === "none" ? "block" : "none";
    };

    container.appendChild(dropdownMenu);
    imageWrapper.appendChild(imageDisplay);
    imageWrapper.appendChild(dropdownIcon);
    container.appendChild(imageWrapper);
    return container;
  }

  function createImageDropdownUsers(options) {
    const container = document.createElement("div");
    const dropdownMenu = document.createElement("div");
    const imageWrapper = document.createElement("div");
    const imageDisplay = document.createElement("img");
    const dropdownIcon = document.createElement("div");
    const searchWrapper = document.createElement("div");
    const searchInput = document.createElement("input");
    // const searchButton = document.createElement("button");

    // Styling for the search wrapper
    searchWrapper.style.cssText =
      "display: flex; align-items: center; padding: 5px;";

    // Styling for the search input
    searchInput.placeholder = "Search...";
    searchInput.style.cssText =
      "flex-grow: 1; padding: 5px; margin-right: 5px; box-sizing: border-box;";
    searchInput.addEventListener("click", function (event) {
      event.stopPropagation(); // This stops the click event from bubbling up to the container
    });

    // Adding search button
    // searchButton.className = "arrowright-wrapper";
    // searchButton.title = "Save Tags";
    // searchButton.innerHTML = `<img class="arrowright-icon" src="https://d3jrelxj5ogq5g.cloudfront.net/icons/arrowright_sa8ron.svg">`;
    // searchButton.style.cssText = "padding: 5px; cursor: pointer;";
    // searchButton.addEventListener("click", function (event) {
    //   event.stopPropagation(); // Prevent the button click from closing the dropdown
    // });

    // Appending search input and button to the wrapper
    searchWrapper.appendChild(searchInput);
    // searchWrapper.appendChild(searchButton);

    // Dropdown menu setup
    dropdownMenu.appendChild(searchWrapper);
    dropdownIcon.style.height = "25px";
    dropdownIcon.innerHTML = `
    <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z" fill="#000000"></path> </g></svg>
    `;
    imageDisplay.style.cssText = "height: 15px;width: 15px;margin-right: 2px;";
    imageWrapper.style.cssText =
      "padding: 5px;border-radius: 14px;height: 25px;outline: #ABB7C9 solid 1px;display: flex;align-items: center;width: fit-content;box-shadow: rgba(0, 0, 0, 0.15) 2px 3px 6px";
    imageDisplay.src = options[0].image;
    imageDisplay.classList.add("dropdown-image");
    imageDisplay.style.borderRadius = "10px";
    dropdownMenu.className = "dropdown-menu";
    dropdownMenu.style.display = "none";
    dropdownMenu.style.maxHeight = "200px";
    dropdownMenu.style.overflowY = "scroll";

    // Create dropdown options
    const optionElements = options.map((opt) => {
      const optionDiv = document.createElement("div");
      const img = document.createElement("img");
      img.src = opt.image;
      img.className = "dropdown-image";
      img.style.borderRadius = "10px";
      optionDiv.appendChild(img);
      optionDiv.append(opt.label);
      optionDiv.style.width = "auto";
      optionDiv.addEventListener("click", (e) => {
        e.stopPropagation();
        imageDisplay.src = opt.image;
        imageDisplay.classList.add("dropdown-image");
        imageDisplay.style.borderRadius = "10px";
        dropdownMenu.style.display = "none";
      });
      return optionDiv;
    });

    // Append all options to the dropdown initially
    optionElements.forEach((optionElement) =>
      dropdownMenu.appendChild(optionElement)
    );

    // Filter function for the search
    searchInput.addEventListener("input", (e) => {
      const searchValue = e.target.value.toLowerCase();
      optionElements.forEach((element) => {
        const label = element.textContent.toLowerCase();
        if (label.includes(searchValue)) {
          dropdownMenu.appendChild(element);
        } else {
          if (element.parentNode === dropdownMenu) {
            dropdownMenu.removeChild(element);
          }
        }
      });
    });

    container.onclick = () => {
      dropdownMenu.style.display =
        dropdownMenu.style.display === "none" ? "block" : "none";
    };

    container.appendChild(dropdownMenu);
    imageWrapper.appendChild(imageDisplay);
    imageWrapper.appendChild(dropdownIcon);
    container.appendChild(imageWrapper);
    return container;
  }

  selectWrapperDiv.appendChild(
    createImageDropdown("status", [
      { label: "Open", image: "https://www.colorhexa.com/FF0400.png" },
      { label: "In Progress", image: "https://www.colorhexa.com/FFA500.png" },
      { label: "In Review", image: "https://www.colorhexa.com/FFF500.png" },
      { label: "Completed", image: "https://www.colorhexa.com/2AF902.png" },
    ])
  );

  fetchUsers().then((usersArray) => {
    const dropdownOptions = usersArray.map((user) => ({
      label: user.username,
      image:
        user.profilePhoto ||
        "https://d3jrelxj5ogq5g.cloudfront.net/webapp/curateit-logo.png",
    }));
    mentionedUsersArray = usersArray?.map((user) => user.username);
    selectWrapperDiv.appendChild(createImageDropdownUsers(dropdownOptions));
  });

  selectWrapperDiv.appendChild(
    createImageDropdown("priority", [
      {
        label: "Low",
        image:
          "https://d3jrelxj5ogq5g.cloudfront.net/icons/low_u5p5dw.svg",
      },
      {
        label: "Medium",
        image:
          "https://d3jrelxj5ogq5g.cloudfront.net/icons/medium_qtdgkv.svg",
      },
      {
        label: "High",
        image:
          "https://d3jrelxj5ogq5g.cloudfront.net/icons/high_mhrptj.svg",
      },
      {
        label: "Urgent",
        image:
          "https://d3jrelxj5ogq5g.cloudfront.net/icons/urgent_zb08kn.svg",
      },
    ])
  );

  selectWrapperDiv.appendChild(
    createImageDropdown("type", [
      {
        label: "Idea",
        image:
          "https://d3jrelxj5ogq5g.cloudfront.net/icons/Lightbulb_kcodnl.svg",
      },
      {
        label: "Feedback",
        image:
          "https://d3jrelxj5ogq5g.cloudfront.net/icons/Checks_hrqoeq.svg",
      },
      {
        label: "Bug",
        image:
          "https://d3jrelxj5ogq5g.cloudfront.net/icons/Bug_freot5.svg",
      },
    ])
  );

  xWrapperButton?.addEventListener("click", (e) => {
    hideComment();
  });

  // Function to change the background color
  function showBrowserDataOnScreen() {
    const browserDataElement = box.querySelector(".browserDataElement");

    function renderSection(sectionName) {
      const captured = retrieveConsole();
      // Validate section name
      if (!captured.hasOwnProperty(sectionName)) {
        console.error("Invalid section name provided.");
        return null;
      }

      // Create a section div
      const section = document.createElement("div");
      section.style.marginBottom = "20px";

      // Title for the section
      const title = document.createElement("h2");
      title.textContent = sectionName.toUpperCase();
      title.style.textTransform = "uppercase";
      const color =
        sectionName === "log"
          ? "blue"
          : sectionName === "error"
          ? "red"
          : "orange";
      title.style.color = color;
      section.appendChild(title);

      // Append each entry as a paragraph
      captured[sectionName].forEach((entry) => {
        const p = document.createElement("p");
        p.textContent = entry;
        p.style.background = "#f0f0f0";
        p.style.borderLeft = `5px solid ${color}`;
        p.style.padding = "10px";
        p.style.margin = "5px 0";
        section.appendChild(p);
      });

      // Return the section as HTML string
      return section.outerHTML;
    }

    function parseUserAgent(uaString) {
      // Define regex patterns for browser and OS detection
      const browserRegex =
        /(firefox|msie|trident|edge|edg|chrome|safari)[\/\s]?(?:(\d+)(?:\.(\d+))?)?/i;
      const osRegex = /(windows nt|mac os x|android|linux)/i;

      // Default object to hold our detected info
      const detected = {
        browserName: "Unknown",
        browserVersion: "Unknown",
        operatingSystem: "Unknown",
      };

      // Detecting Browser Name and Version
      const browserMatches = browserRegex.exec(uaString);
      if (browserMatches) {
        detected.browserName = browserMatches[1]
          .replace("edg", "edge")
          .replace("trident", "msie");
        detected.browserVersion = browserMatches[2] || "Unknown";
      }

      // Detecting Operating System
      const osMatches = osRegex.exec(uaString);
      if (osMatches) {
        detected.operatingSystem = osMatches[1]
          .replace("windows nt", "Windows")
          .replace("mac os x", "macOS")
          .replace("android", "Android")
          .replace("linux", "Linux");
      }

      return detected;
    }

    // Example usage
    const userAgentString = navigator.userAgent;
    const browserData = parseUserAgent(userAgentString);

    browserDataElement.innerHTML = `
    <!-- ERROR DIV -->
    <div
    class="ErrorDiv"
      style="
        width: 100%;
        position: relative;
        background-color: rgba(0, 0, 0, 0);
        overflow: hidden;
        display: none;
        flex-direction: row;
        align-items: flex-start;
        justify-content: flex-start;
        line-height: normal;
        letter-spacing: normal;
      "
    >
    ${renderSection("error")}
    </div>
    <!-- LOGS DIV -->
    <div
    class="LogsDiv"
    style="
        width: 100%;
        position: relative;
        background-color: rgba(0, 0, 0, 0);
        overflow: hidden;
        display: none;
        flex-direction: row;
        align-items: flex-start;
        justify-content: flex-start;
        line-height: normal;
        letter-spacing: normal;
      "
    >
    ${renderSection("log")}
    </div>
    <!-- WARNINGS DIV -->
    <div
    class="WarningsDiv"
    style="
        width: 100%;
        position: relative;
        background-color: rgba(0, 0, 0, 0);
        overflow: hidden;
        display: none;
        flex-direction: row;
        align-items: flex-start;
        justify-content: flex-start;
        line-height: normal;
        letter-spacing: normal;
      "
    >
    ${renderSection("warn")}
    </div>
    <!-- INFO DIV -->
    <div
    class="InfoDiv"
    style="
        width: 100%;
        position: relative;
        background-color: rgba(0, 0, 0, 0);
        overflow: hidden;
        display: none;
        flex-direction: row;
        align-items: flex-start;
        justify-content: flex-start;
        line-height: normal;
        letter-spacing: normal;
      "
    >
      <section
        style="
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;
          box-sizing: border-box;
          gap: 26px;
          background-image: url('542x318x-544915118');
          background-size: cover;
          background-repeat: no-repeat;
          background-position: top;
          max-width: 100%;
          text-align: left;
          font-size: 15px;
          color: black;
          font-family: Inter;
        "
      >
        <div
          style="
            width: 100%;
            display: flex;
            flex-direction: row;
            align-items: flex-start;
            justify-content: flex-start;
            padding: 0px 1px;
            box-sizing: border-box;
            max-width: 100%;
          "
        >
          <div
            style="
              flex: 1;
              display: flex;
              flex-direction: column;
              align-items: flex-start;
              justify-content: flex-start;
              gap: 8px;
              max-width: 100%;
            "
          >
            <div
              style="
                width: 100%;
                display: flex;
                flex-direction: row;
                align-items: flex-end;
                justify-content: flex-start;
                gap: 14px;
              "
            >
              <div
                style="
                  display: flex;
                  flex-direction: column;
                  align-items: flex-start;
                  justify-content: flex-end;
                  padding: 0px 0px 3px;
                "
              >
                <img
                  style="
                    width: 15px;
                    height: 10px;
                    position: relative;
                    object-fit: cover;
                    z-index: 1;
                  "
                  loading="lazy"
                  alt="Menu icon"
                  src="https://d1xzdqg8s8ggsr.cloudfront.net/6605e4c66db0794105cc1041/be50aafe-942b-4010-881f-396e9d2a965f_1712660050385109664?Expires=-62135596800&Signature=e7iZ-N8KxZNTLHi8YWVMmfs4FqQ9loG3Q2Y6m2fySFmMS~31wBwecOBbLryIGVeJPmQVQ0DNUygJpH3MUjjFRs~XRQh0bQKKVVsd0IieurxqVdhs2xUav6vf9WKCJQ5PO6dUnNypF6yTS78dIv-TO8SMd9~S8nSGgudkF-izkWHHLEiWc60Cn5zWUAkX-A-iBdJrWi1WVLHZTXJ3DfGUatBMeU9W3y-l1AtA6Lm~ECnzxgpy2Ju34-6eTKjw9~4ClhAxDcgCy~aPeehVEyEsz2lh-3tkU~cK~LAGT2qOnUkAXkyY0~29ZqmP4iBWIHHPOEC4unNJEUD5~6nVAvb~QQ__&Key-Pair-Id=K1P54FZWCHCL6J"
                />
              </div>
              <div style="flex: 1; position: relative; z-index: 1">Description</div>
            </div>
            <div
              style="
                align-self: stretch;
                display: flex;
                flex-direction: row;
                align-items: flex-start;
                justify-content: flex-start;
                padding: 0px 0px 0px 28px;
                box-sizing: border-box;
                max-width: 100%;
                color: #abacad;
              "
            >
              <div
                style="
                  flex: 1;
                  position: relative;
                  display: inline-block;
                  max-width: 100%;
                  z-index: 1;
                "
              >
                ${
                  document.querySelector("meta[name='description']")?.content ||
                  document.title
                }
              </div>
            </div>
          </div>
        </div>
        <div
          style="
            width: 327px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;
            gap: 10px;
            max-width: 100%;
            color: #72757a;
          "
        >
          <div
            style="
              width: 72px;
              display: flex;
              flex-direction: row;
              align-items: flex-start;
              justify-content: flex-start;
              gap: 13px;
            "
          >
            <img
              style="
                height: 17px;
                width: 17px;
                position: relative;
                object-fit: cover;
                min-height: 17px;
                z-index: 1;
              "
              loading="lazy"
              alt="Screen icon"
              src="https://d1xzdqg8s8ggsr.cloudfront.net/6605e4c66db0794105cc1041/ae8c5023-8bf3-42c2-8d55-b603ac2628fb_1712660061137518083?Expires=-62135596800&Signature=W3u-~UHmemTgs7Ucuz1hlv4xqaFEqFpXK9MOOYkcPQ0fIK3Xb0kcFu6L3RMJtaHwUBjh0j66sCIhC8LSyFOuz1lrJ3Za84XbiUGLeiNUT95UkblwaK2hwpGmUmi73K6TuzOPKFeUc4VFZkV0bAFNI~nZnYDbIVauGVRf6YDiIrQ7mCLf44Co4lVBqUHeU0FqiWUjiofqs4cXAQ-Y5-Ct3Ek-m0VKkzVv5yGucMa8~gd9CriL69EDXvkwZuiJpbIECCp-~ETVgRoTxqNapVcHen7GNEnUAUyMWi23PE9sA0LMBksLBw5miGj3NTEsxjPZ7qfjRn8d9uo6qbD8zmymmw__&Key-Pair-Id=K1P54FZWCHCL6J"
            />

            <div style="flex: 1; position: relative; z-index: 1">Page</div>
          </div>
          <div
            style="
              align-self: stretch;
              display: flex;
              flex-direction: row;
              align-items: flex-start;
              justify-content: flex-start;
              padding: 0px 0px 0px 30px;
              color: #abadae;
            "
          >
            <div style="flex: 1; position: relative; z-index: 1">
              ${window.location.href}
            </div>
          </div>
        </div>
        <div
          style="
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;
            gap: 11px;
            font-size: 16px;
            color: #7b7d80;
          "
        >
          <div
            style="
              width: 193px;
              display: flex;
              flex-direction: row;
              align-items: flex-start;
              justify-content: flex-start;
              gap: 13px;
            "
          >
            <div
              style="
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                justify-content: flex-start;
                padding: 2px 0px 0px;
              "
            >
              <img
                style="
                  width: 16px;
                  height: 17px;
                  position: relative;
                  object-fit: cover;
                  z-index: 1;
                "
                loading="lazy"
                alt="AI icon"
                src="https://d1xzdqg8s8ggsr.cloudfront.net/6605e4c66db0794105cc1041/4de5f4a4-612a-4879-8e1b-73b4deb722a2_1712660061137607921?Expires=-62135596800&amp;Signature=T3IeEdzcP0pa-ID770vAp6UlmU6tKUNR~sTfSo1Z0jtPhO1ThD6rFm-vTnb~BqMai8Ee0~Ag~c0ZWJKyFg5CHbj6KhLozfX8Bzav7PqI3q0Py0khlXycb5SRIefvCedYqqsbdNG7hHoFGPd52E9vt-89DAVf0htVTYO4iJ~8V6TTB8XCbuIQ2JQOJblOMVpqQyXg3Q1LBdwf5cJTULSJ~rldG-185uWbkoFAVGGWWmZ~zIko4ae0vIRiXXVZ0FkIVhidS1v7xGtyxism5Iek5ynzoL4lLM2PGSDjPrDA4ZbWHRYooi~SKJtkx9Jy7dnbQigTWB942vOxPjLVpWuZ6A__&amp;Key-Pair-Id=K1P54FZWCHCL6J"
              />
            </div>
            <div style="flex: 1; position: relative; z-index: 1">
              Session information
            </div>
          </div>
          <div
            style="
              width: 100%;
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: center;
              padding: 0px 30px;
              box-sizing: border-box;
              color: #a8a9ab;
            "
          >
            <div
              style="
                flex: 1;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
                gap: 20px;
              "
            >
              <div
                style="
                  position: relative;
                  line-height: 15px;
                  display: inline-block;
                  min-width: 60px;
                  z-index: 1;
                "
              >
                Device:
              </div>
              <div
                style="
                  display: flex;
                  flex-direction: row;
                  align-items: flex-start;
                  justify-content: flex-start;
                  gap: 7px;
                  font-size: 15px;
                  color: #abacae;
                "
              >
                <div
                  style="
                    position: relative;
                    display: inline-block;
                    min-width: 68px;
                    z-index: 1;
                  "
                >
                  Desktop
                </div>
              </div>
            </div>
          </div>

          <div
            style="
              width: 100%;
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: center;
              padding: 0px 30px;
              box-sizing: border-box;
              color: #a8a9ab;
            "
          >
            <div
              style="
                flex: 1;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
                gap: 20px;
              "
            >
              <div
                style="
                  position: relative;
                  line-height: 15px;
                  display: inline-block;
                  min-width: 60px;
                  z-index: 1;
                "
              >
                System:
              </div>
              <div
                style="
                  display: flex;
                  flex-direction: row;
                  align-items: flex-start;
                  justify-content: flex-start;
                  gap: 7px;
                  font-size: 15px;
                  color: #abacae;
                "
              >
                <div
                  style="
                    position: relative;
                    display: inline-block;
                    min-width: 68px;
                    z-index: 1;
                  "
                >
                  ${browserData.operatingSystem}
                </div>
              </div>
            </div>
          </div>
          <div
            style="
              width: 100%;
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: center;
              padding: 0px 30px;
              box-sizing: border-box;
              color: #a8a9ab;
            "
          >
            <div
              style="
                flex: 1;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
                gap: 20px;
              "
            >
              <div
                style="
                  position: relative;
                  line-height: 15px;
                  display: inline-block;
                  min-width: 60px;
                  z-index: 1;
                "
              >
                Browser:
              </div>
              <div
                style="
                  display: flex;
                  flex-direction: row;
                  align-items: flex-start;
                  justify-content: flex-start;
                  gap: 7px;
                  font-size: 15px;
                  color: #abacae;
                "
              >
                <div
                  style="
                    position: relative;
                    display: inline-block;
                    min-width: 68px;
                    z-index: 1;
                  "
                >
                  ${browserData.browserName}${browserData.browserVersion}
                </div>
              </div>
            </div>
          </div>
          <div
            style="
              width: 100%;
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: center;
              padding: 0px 30px;
              box-sizing: border-box;
              color: #a8a9ab;
            "
          >
            <div
              style="
                flex: 1;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
                gap: 20px;
              "
            >
              <div
                style="
                  position: relative;
                  line-height: 15px;
                  display: inline-block;
                  min-width: 60px;
                  z-index: 1;
                "
              >
                Resolution:
              </div>
              <div
                style="
                  display: flex;
                  flex-direction: row;
                  align-items: flex-start;
                  justify-content: flex-start;
                  gap: 7px;
                  font-size: 15px;
                  color: #abacae;
                "
              >
                <div
                  style="
                    position: relative;
                    display: inline-block;
                    min-width: 68px;
                    z-index: 1;
                  "
                >
                  ${window.screen.width}x${window.screen.height}
                </div>
              </div>
            </div>
          </div>
          <div
            style="
              width: 100%;
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: center;
              padding: 0px 30px;
              box-sizing: border-box;
              color: #a8a9ab;
            "
          >
            <div
              style="
                flex: 1;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
                gap: 20px;
              "
            >
              <div
                style="
                  position: relative;
                  line-height: 15px;
                  display: inline-block;
                  min-width: 60px;
                  z-index: 1;
                "
              >
                Other Data:
              </div>
              <div
                style="
                  display: flex;
                  flex-direction: row;
                  align-items: flex-start;
                  justify-content: flex-start;
                  gap: 7px;
                  font-size: 15px;
                  color: #abacae;
                "
              >
                <div
                  style="
                    position: relative;
                    display: inline-block;
                    min-width: 68px;
                    z-index: 1;
                  "
                >
                  ${userAgentString}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
<!--  -->
    `;
    initializeInfoDivs();
  }

  // Function to initialize the application
  function initializeInfoDivs() {
    const mainComment = floatingCommentObject.mainComment;
    const options = ["Error", "Logs", "Warnings", "Info"];
    const container = document.createElement("div");
    container.innerHTML = `
    <h2>Created By @${mainComment.author || "NA"} on ${
      mainComment.timestamp || "NA"
    }</h2>
    `;
    // Create a div to hold the radio buttons
    const radioContainer = document.createElement("div");
    radioContainer.style.cssText =
      "display: flex; justify-content: space-evenly;";
    container.appendChild(radioContainer);

    // Function to hide all content divs
    function hideAllContent() {
      options.forEach((option) => {
        const div = box.querySelector(`.${option}Div`);
        if (div) {
          div.style.display = "none";
        }
      });
    }

    // Create radio buttons and corresponding divs
    options.forEach((option) => {
      // Create the radio button
      const radioButton = document.createElement("input");
      radioButton.type = "radio";
      radioButton.name = "infoOptions";
      radioButton.value = option;
      radioButton.id = `radio-${option}`;
      radioButton.addEventListener("change", function () {
        hideAllContent();
        const contentDiv = box.querySelector(`.${option}Div`);
        if (contentDiv) {
          contentDiv.style.display = "flex";
        }
      });

      // Create a label for the radio button
      const label = document.createElement("label");
      label.htmlFor = `radio-${option}`;
      label.textContent = option;

      // Append the radio button and label to the radio container
      radioContainer.appendChild(radioButton);
      radioContainer.appendChild(label);
    });

    // Append the entire structure to the body
    const browserDataElement = box.querySelector(".browserDataElement");
    browserDataElement.prepend(container);
    // Initially hide all content divs
    hideAllContent();
  }

  function showFileUploadPreview(fileObj) {
    const { fileType, fileUrl, fileName } = fileObj;

    // Create a container div for the preview
    let container = document.createElement("div");
    container.classList.add("preview-container"); // Add class for styling or selection if needed
    container.style = "position: relative; width: 100%;"; // Ensure this container is relatively positioned

    // Create the delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.style =
      "position: absolute;top: 0px;right: 0px;z-index: 3;padding: 0;height: 25px;width: 23px;"; // Ensure it is on top of other elements

    // Attach event listener to delete button
    deleteButton.addEventListener("click", function () {
      // Remove the preview element
      container.remove();
      // Find and remove the fileObj from the attachedFiles array
      const index = attachedFiles.findIndex(
        (f) =>
          f.fileName === fileObj.fileName && f.fileType === fileObj.fileType
      );
      if (index > -1) {
        attachedFiles.splice(index, 1);
      }
    });

    // Append the delete button to the container
    container.appendChild(deleteButton);

    if (fileType === "images") {
      const img = document.createElement("img");
      img.loading = "lazy";
      img.src = fileUrl;
      img.style =
        "height: 100px; width: 100px; padding: 5px; border-radius: 15px; position: relative;";
      container.appendChild(img);

      // Enlarge image on click
      img.addEventListener("click", function () {
        // Create overlay
        const overlay = document.createElement("div");
        overlay.style = `
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background-color: rgba(0, 0, 0, 0.8);
              display: flex;
              align-items: center;
              justify-content: center;
              z-index: 1000;
          `;
        document.body.appendChild(overlay);

        // Create enlarged image
        const enlargedImg = document.createElement("img");
        enlargedImg.src = img.src;
        enlargedImg.style = `
              max-width: 80%;
              max-height: 80%;
              transition: transform 0.25s ease;
          `;
        overlay.appendChild(enlargedImg);

        // Handle zoom on scroll
        let scale = 1;
        overlay.addEventListener("wheel", function (e) {
          e.preventDefault();
          scale += e.deltaY * -0.01;
          scale = Math.min(Math.max(1, scale), 3); // Limit zoom between 1x and 3x
          enlargedImg.style.transform = `scale(${scale})`;
        });

        // Double-tap to zoom in and out
        let lastTap = 0;
        enlargedImg.addEventListener("click", function (event) {
          const currentTime = new Date().getTime();
          const tapLength = currentTime - lastTap;
          if (tapLength < 300 && tapLength > 0) {
            // Toggle zoom between 1x and 2x
            scale = scale === 1 ? 2 : 1;
            enlargedImg.style.transform = `scale(${scale})`;
          }
          lastTap = currentTime;
        });

        // Close button
        const closeButton = document.createElement("button");
        closeButton.textContent = "×";
        closeButton.style = `
              position: absolute;
              top: 20px;
              right: 20px;
              font-size: 24px;
              color: white;
              background: none;
              border: none;
              cursor: pointer;
              outline: none;
          `;
        overlay.appendChild(closeButton);

        closeButton.addEventListener("click", function () {
          overlay.remove();
        });
      });
    } else if (fileType === "audio") {
      const audioPreview = document.createElement("div");
      audioPreview.style = `width: 100%;display: flex;flex-direction: column;gap: 5px;`;
      audioPreview.innerHTML = `
      <div class="audio-controls" style="display: flex; justify-content: space-between; border-width: 1px; width: auto; background-color: white; border-color: #ABB7C9; border-radius: 0.25rem; padding: 0.25rem; align-items: center; gap: 0.5rem;">
          <button class="btn-toggle-pause" style="border-width: 1px;background-color: #1D4ED8;color: white;border-color: #1D4ED8;padding: 0.25rem;border-radius: 50%;outline: 2px solid transparent;outline-offset: 2px;width: 35px;height: 35px;">
          <svg class="playSvg" title="Play" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20.4086 9.35258C22.5305 10.5065 22.5305 13.4935 20.4086 14.6474L7.59662 21.6145C5.53435 22.736 3 21.2763 3 18.9671L3 5.0329C3 2.72368 5.53435 1.26402 7.59661 2.38548L20.4086 9.35258Z" stroke="#ffffff" stroke-width="1.5"></path> </g></svg>
          <svg class="pauseSvg" title="Pause" width="24" height="24" viewBox="-1 0 8 8" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#ffffff" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>pause [#fffffffffff]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-227.000000, -3765.000000)" fill="#ffffff"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M172,3605 C171.448,3605 171,3605.448 171,3606 L171,3612 C171,3612.552 171.448,3613 172,3613 C172.552,3613 173,3612.552 173,3612 L173,3606 C173,3605.448 172.552,3605 172,3605 M177,3606 L177,3612 C177,3612.552 176.552,3613 176,3613 C175.448,3613 175,3612.552 175,3612 L175,3606 C175,3605.448 175.448,3605 176,3605 C176.552,3605 177,3605.448 177,3606" id="pause-[#fffffffffff]"> </path> </g> </g> </g> </g></svg>
          </button>
          <div id="audiowave" style="width: 100%;"></div>
      </div>
      `;
      const audiowaveElement = audioPreview.querySelector("#audiowave");
      var wavesurfer = WaveSurfer.create({
        container: audiowaveElement,
        waveColor: "#347AE2",
        barWidth: 2,
        barHeight: 2,
        barGap: 2,
        progressColor: "rgb(100, 0, 100)",
        height: 30,
        responsive: true,
        hideScrollbar: true,
        cursorColor: "#5df9de",
        cursorWidth: 2,
        skipLength: 5,
      });

      wavesurfer.load(fileUrl);

      audioPreview
        .querySelector(".btn-toggle-pause")
        ?.addEventListener("click", (e) => {
          wavesurfer.playPause();
          // Toggle button text based on whether the audio is playing
          if (wavesurfer.isPlaying()) {
            audioPreview.querySelector(".playSvg").style.display = "none";
            audioPreview.querySelector(".pauseSvg").style.display = "block";
          } else {
            audioPreview.querySelector(".pauseSvg").style.display = "none";
            audioPreview.querySelector(".playSvg").style.display = "block";
          }
        });
      container.appendChild(audioPreview);
    } else if (fileType === "video") {
      const video = document.createElement("video");
      video.src = fileUrl;
      video.controls = true;
      video.style = "width: 100%;max-height:200px";
      container.appendChild(video);
    } else if (fileType === "file") {
      const link = document.createElement("a");
      link.href = fileUrl;
      link.textContent = fileName;
      container.appendChild(link);
      container.style =
        "display: flex; align-items: center; position: relative;";
    }

    // Return the container element
    return container;
  }

  showBrowserDataOnScreen();
  browserInfoButton?.addEventListener("click", (e) => {
    const browserDataElement = box.querySelector(".browserDataElement");
    browserDataElement.style.display =
      browserDataElement.style.display === "block" ? "none" : "block";
  });

  fileInput.addEventListener("change", async function () {
    if (fileInput.files.length > 0) {
      const file = fileInput.files[0]; // If multiple files are allowed, you might want to iterate over fileInput.files
      const resp = await uploadFile(file);
      if (resp) {
        const uploadedUrl = resp;

        // Determine the file's category
        const category = getCategoryByMimeType(file.type);
        // Update attachedFiles and refresh the displayed content
        const fileObj = {
          fileType: category,
          fileUrl: uploadedUrl,
          fileName: file.name,
        };
        const fileUploadPreview = showFileUploadPreview(fileObj);
        const filePreview = box.querySelector(".filePreview");
        filePreview.appendChild(fileUploadPreview);
        attachedFiles.push(fileObj);
      } else {
        console.log("Upload failed or no URL returned.");
      }
    } else {
      console.log("No file selected.");
    }
  });

  // Function to determine the category based on the MIME type
  function getCategoryByMimeType(mimeType) {
    if (mimeType.startsWith("image/")) return "images";
    if (mimeType.startsWith("audio/")) return "audio";
    if (mimeType.startsWith("video/")) return "video";
    return "file"; // Default category
  }

  async function handleCreateUserComment(attachedFiles) {
    const userName = session.username;
    const authorId = session.userId;
    const currentText = replyInput.value;
    const currentDate = formatDate(new Date());
    const id = generateUniqueId();
    await createUserCommentOnBoxV2(
      userName,
      currentDate,
      currentText,
      authorId,
      attachedFiles,
      id
    );
    replyInput.value = "";
  }

  replyBtn?.addEventListener("click", async (e) => {
    await handleCreateUserComment(attachedFiles);
    attachedFiles = [];
    box.querySelector(".filePreview").innerHTML = "";
  });

  replyInput?.addEventListener("keydown", async (e) => {
    if (e.key === "Enter" && e.altKey) {
      e.preventDefault();
      const startPos = replyInput.selectionStart;
      const endPos = replyInput.selectionEnd;
      replyInput.value =
        replyInput.value.substring(0, startPos) +
        "\n" +
        replyInput.value.substring(endPos);
      replyInput.selectionStart = replyInput.selectionEnd = startPos + 1;
    } else if (e.key === "Enter") {
      const active = userSuggestions.querySelector(".active");

      if (active) {
        // e.preventDefault();
        // e.stopPropagation();
        return;
      }
      e.preventDefault();
      await handleCreateUserComment(attachedFiles);
      attachedFiles = [];
      box.querySelector(".filePreview").innerHTML = "";
    }
  });

  pickEmojiButton?.addEventListener("click", (e) => {
    const emojiContainer = box.querySelector(".emojiContainer");
    emojiContainer.style.display =
      emojiContainer.style.display === "block" ? "none" : "block";
  });

  screenshotButton?.addEventListener("click", (e) => {
    // Create the main overlay without a background
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100vw";
    overlay.style.height = "100vh";
    overlay.style.cursor = "crosshair";
    document.body.appendChild(overlay);

    let startX, startY, endX, endY;
    let rect = { top: null, right: null, bottom: null, left: null };

    function createRectDiv() {
      const div = document.createElement("div");
      div.style.position = "fixed";
      div.style.backgroundColor = "rgba(0,0,0,0.5)";
      return div;
    }

    function updateRect() {
      const minX = Math.min(startX, endX);
      const maxX = Math.max(startX, endX);
      const minY = Math.min(startY, endY);
      const maxY = Math.max(startY, endY);

      // Create divs for the first time
      if (!rect.top) {
        rect.top = createRectDiv();
        rect.right = createRectDiv();
        rect.bottom = createRectDiv();
        rect.left = createRectDiv();
        document.body.appendChild(rect.top);
        document.body.appendChild(rect.right);
        document.body.appendChild(rect.bottom);
        document.body.appendChild(rect.left);
      }

      // Adjust the divs to create the "window"
      rect.top.style.width = "100vw";
      rect.top.style.height = `${minY}px`;
      rect.top.style.top = "0";
      rect.top.style.left = "0";

      rect.right.style.width = `calc(100vw - ${maxX}px)`;
      rect.right.style.height = `${maxY - minY}px`;
      rect.right.style.top = `${minY}px`;
      rect.right.style.left = `${maxX}px`;

      rect.bottom.style.width = "100vw";
      rect.bottom.style.height = `calc(100vh - ${maxY}px)`;
      rect.bottom.style.top = `${maxY}px`;
      rect.bottom.style.left = "0";

      rect.left.style.width = `${minX}px`;
      rect.left.style.height = `${maxY - minY}px`;
      rect.left.style.top = `${minY}px`;
      rect.left.style.left = "0";
    }

    function clearRect() {
      rect.top.remove();
      rect.right.remove();
      rect.bottom.remove();
      rect.left.remove();
      rect = { top: null, right: null, bottom: null, left: null };
    }

    overlay.addEventListener("mousedown", function (e) {
      startX = e.pageX - window.scrollX;
      startY = e.pageY - window.scrollY;
      let moving = false;

      function mouseMoveHandler(e) {
        moving = true;
        endX = e.pageX - window.scrollX;
        endY = e.pageY - window.scrollY;
        updateRect();
      }

      async function mouseUpHandler(e) {
        if (moving) {
          endX = e.pageX - window.scrollX;
          endY = e.pageY - window.scrollY;
          updateRect(); // Final update for the rect
          document.removeEventListener("mousemove", mouseMoveHandler);
          document.removeEventListener("mouseup", mouseUpHandler);

          clearRect(); // Clear the "window" divs
          overlay.remove(); // Remove the main overlay

          // Use html2canvas to capture the selected area
          const canvas = await html2canvas(document.body, {
            x: startX,
            y: startY,
            width: Math.abs(endX - startX),
            height: Math.abs(endY - startY),
            windowWidth: document.documentElement.offsetWidth,
            windowHeight: document.documentElement.offsetHeight,
            scrollX: window.scrollX,
            scrollY: window.scrollY,
          });

          // Convert canvas to a Blob
          const blob = await new Promise((resolve) => canvas.toBlob(resolve));

          // Create an image element to display the captured area
          const fileName = createUniqueFileName();
          const file = new File([blob], `${fileName}.png`, {
            type: blob.type,
            lastModified: new Date(),
          });
          const resp = await uploadFile(file);
          const fileObj = {
            fileType: "images",
            fileUrl: resp,
            fileName: `${fileName}.png`,
          };
          const fileUploadPreview = showFileUploadPreview(fileObj);
          const filePreview = box.querySelector(".filePreview");
          filePreview.appendChild(fileUploadPreview);
          attachedFiles.push(fileObj);
        }
      }

      document.addEventListener("mousemove", mouseMoveHandler);
      document.addEventListener("mouseup", mouseUpHandler);
    });
  });

  recordScreenButton?.addEventListener("click", (e) => {
    recordScreen();
  });

  recordAudioButton?.addEventListener("click", (e) => {
    const recordedAudioWrapper = box.querySelector(".recordedAudioWrapper");
    const stopButton = box.querySelector("#stopRecordButton");
    const playButton = box.querySelector("#playRecordButton");
    playButton.style.display = "block";
    stopButton.style.display = "none";
    recordedAudioWrapper.style.display =
      recordedAudioWrapper.style.display === "flex" ? "none" : "flex";
    recordedAudioWrapper.style.marginBottom =
      recordedAudioWrapper.style.marginBottom === "-20px" ? "0" : "-20px";
    audioIconContainer.click();
  });

  audioIconContainer?.addEventListener("click", (e) => {
    recordAudio();
  });

  fileUploadButton?.addEventListener("click", (e) => {
    fileInput.click();
  });

  const createUserCommentOnBoxV2 = async (
    parentName,
    currentDate,
    currentText,
    authorId,
    attachedFiles,
    id
  ) => {
    let uid = id;
    if (!uid) {
      uid = generateUniqueId();
    }
    // let browserData = await getBrowserData();
    let browserData = {};
    const userName = session.username;
    let renderedName;
    let renderThreeDots = false;
    if (parentName === userName) {
      renderedName = "Me";
      renderThreeDots = true;
    } else {
      renderedName = parentName;
    }

    function textToHtml(text) {
      // Split text into paragraphs by two or more newline characters
      const paragraphs = text.split(/\n{2,}/g);
      return paragraphs
        .map((paragraph) => {
          // Replace single newlines within each paragraph with <br> for line breaks
          // Trim each paragraph to remove leading/trailing whitespace
          return `<p>${paragraph.trim().replace(/\n/g, "<br>")}</p>`;
        })
        .join("");
    }

    const frameParent1 = document.createElement("div");
    frameParent1.classList.add("frame-parent1");
    frameParent1.innerHTML = `
              <div class="user-profile-and-time-parent" style="width:100%;">
                <div class="user-profile-and-time">
                    <div class="me">${renderedName}</div>
                    <div class="day-ago">${timeAgoText(currentDate)}</div>
                    <div class="picked-emoji" style="font-size: 20px;"></div>
                </div>
                <div class="this-is-a">${textToHtml(currentText)}</div>
                <div class="filePreviewComment" style="width: 100%; display: flex; flex-wrap: wrap;gap:10px">
                </div>
              </div>
              `;

    const filePreviewComment = frameParent1.querySelector(
      ".filePreviewComment"
    );

    attachedFiles?.forEach((fileObj) => {
      const fileUploadPreview = showFileUploadPreview(fileObj);
      fileUploadPreview.querySelector("button").style.display = "none";
      filePreviewComment.appendChild(fileUploadPreview);
    });

    if (renderThreeDots) {
      const dotsthreeParent = document.createElement("div");
      dotsthreeParent.classList.add("dotsthree-parent");
      dotsthreeParent.innerHTML = `<img alt="Three dot icon" class="dotsthree-icon" loading="lazy" src="https://d3jrelxj5ogq5g.cloudfront.net/icons/dotsthree_gmol45.svg" style="width: 50px; cursor: pointer; margin-left: 65%;">`;

      const optionsMenu = document.createElement("div");
      optionsMenu.style.display = "none"; // Initially hidden
      optionsMenu.innerHTML = `
        <ul style="list-style: none; padding: 0; margin: 0; background: #fff; border: 1px solid #ccc;">
          <li style="padding: 8px 12px; cursor: pointer;">Edit</li>
          <li style="padding: 8px 12px; cursor: pointer;">Delete</li>
        </ul>
      `;
      dotsthreeParent.appendChild(optionsMenu);

      const emojiReactions = document.createElement("div");
      emojiReactions.className = "emojiReactions";
      emojiReactions.innerHTML = `
          <ul style="list-style: none;display: flex;margin: 0;cursor: pointer;padding: 0;">
            <li style="padding: 0 5px 0 0;">👍</li>
            <li style="padding: 0 5px 0 0;">👎</li>
            <li style="padding: 0 5px 0 0;">😍</li>
            <li style="padding: 0 5px 0 0;">😀</li>
            <li style="padding: 0 5px 0 0;">😔</li>
            <li style="padding: 0 5px 0 0;">🎉</li>
          </ul>
      `;
      dotsthreeParent.appendChild(emojiReactions);

      // Toggle visibility of the options menu
      dotsthreeParent
        .querySelector("img.dotsthree-icon")
        ?.addEventListener("click", () => {
          optionsMenu.style.display =
            optionsMenu.style.display === "none" ? "block" : "none";
        });

      // Function to handle emoji clicks
      function handleEmojiClick(event) {
        const clickedEmoji = event.target.textContent;
        const pickedEmoji = box.querySelector(".picked-emoji"); // Ensure this element exists in your HTML
        if (pickedEmoji) {
          pickedEmoji.textContent = clickedEmoji;
          floatingCommentObject.reactedEmoji = clickedEmoji;
        }
      }

      // Add event listener to each emoji
      const emojis = emojiReactions.querySelectorAll("li");
      emojis.forEach((emoji) => {
        emoji.addEventListener("click", handleEmojiClick);
      });

      // Append dotsthreeParent to frameParent1
      frameParent1.appendChild(dotsthreeParent);

      // Get edit and delete options
      const editOption = optionsMenu.querySelector("li:nth-child(1)");
      const deleteOption = optionsMenu.querySelector("li:nth-child(2)");

      // Edit functionality
      editOption.addEventListener("click", () => {
        let allCommentsArr = getSiteSpecificData("allComments");
        const textDiv = frameParent1.querySelector(".this-is-a");
        textDiv.contentEditable = "true";
        textDiv.style.border = "1px solid #ccc";
        textDiv.focus();

        const saveButton = document.createElement("button");
        saveButton.textContent = "Save";
        saveButton.style.display = "block";
        saveButton.style.marginTop = "10px";
        textDiv.parentNode.appendChild(saveButton);

        saveButton.addEventListener("click", () => {
          textDiv.contentEditable = "false";
          textDiv.style.border = "none";
          const editedText = textDiv.innerText;

          // Update the allCommentsArr with the new text where the uid matches
          allCommentsArr.forEach((comment) => {
            if (comment.mainComment.id === uid) {
              comment.mainComment.text = editedText;
            }
            comment.replies.forEach((reply) => {
              if (reply.id === uid) {
                reply.text = editedText;
              }
            });
          });
          allCommentsArr.forEach((comment) => {
            modifySiteSpecificData(comment);
          });
          saveButton.remove();
        });
      });

      // Delete functionality
      deleteOption.addEventListener("click", () => {
        let allCommentsArr = getSiteSpecificData("allComments");

        // Clear the mainComment or any replies with the matching id
        allCommentsArr.forEach((comment) => {
          if (comment.mainComment.id === uid) {
            Object.keys(comment.mainComment).forEach((key) => {
              delete comment.mainComment[key];
            });
          }
          comment.replies.forEach((reply) => {
            if (reply.id === uid) {
              Object.keys(reply).forEach((key) => {
                delete reply[key];
              });
            }
          });
        });

        // Save the modified data back to the site specific storage
        allCommentsArr.forEach((comment) => {
          modifySiteSpecificData(comment);
        });

        // Assuming frameParent1 is a reference to an element that needs to be removed
        frameParent1.remove();
      });
    }

    const newReply = {
      text: currentText,
      author: parentName,
      authorId: authorId,
      timestamp: currentDate,
      id: uid,
      filesAttached: attachedFiles,
      browserData,
    };

    // Check if newReply is a duplicate of mainComment
    const isDuplicateMainComment =
      floatingCommentObject.mainComment?.text === newReply?.text &&
      floatingCommentObject.mainComment?.authorId === newReply?.authorId &&
      floatingCommentObject.mainComment?.timestamp === newReply?.timestamp;

    // Check if there's already a reply with the same text, authorId, and timestamp
    const isDuplicateReply = floatingCommentObject.replies?.some(
      (reply) =>
        reply?.text === newReply?.text &&
        reply?.authorId === newReply?.authorId &&
        reply?.timestamp === newReply?.timestamp
    );

    if (
      floatingCommentObject.mainComment &&
      floatingCommentObject.mainComment.text !== null &&
      floatingCommentObject.mainComment.text !== undefined &&
      floatingCommentObject.mainComment.text.trim() !== ""
    ) {
      if (!isDuplicateMainComment && !isDuplicateReply) {
        floatingCommentObject.replies.push(newReply);
      } else {
      }
    } else {
      floatingCommentObject.mainComment = newReply;
    }
    if (!isDuplicateMainComment && !isDuplicateReply) {
      await postComment(
        floatingCommentObject,
        currentText,
        authorId,
        parentName
      );
    } else {
    }
    frameDiv.appendChild(frameParent1);
  };

  floatingCommentObject?.replies?.forEach((reply) => {
    createUserCommentOnBoxV2(
      reply.author,
      reply.timestamp,
      reply.text,
      reply.authorId,
      reply.filesAttached,
      reply?.id
    )
      .then(() => console.log("Reply Added successfully"))
      .catch((error) => console.error("Error adding reply:", error));
  });

  if (
    floatingCommentObject.mainComment &&
    floatingCommentObject.mainComment.text !== null &&
    floatingCommentObject.mainComment.text !== undefined &&
    floatingCommentObject.mainComment.text.trim() !== ""
  ) {
    createUserCommentOnBoxV2(
      floatingCommentObject.mainComment.author,
      floatingCommentObject.mainComment.timestamp,
      floatingCommentObject.mainComment.text,
      floatingCommentObject.mainComment.authorId,
      floatingCommentObject.mainComment.filesAttached,
      floatingCommentObject.mainComment.id
    )
      .then(() => console.log("mainComment Added successfully"))
      .catch((error) => console.error("Error adding mainComment:", error));
  }

  const searchInput = box.querySelector(
    ".custom-select-container .custom-select-search input"
  );
  const dropdownContainer = box.querySelector(
    ".custom-select-container .dropdown-container"
  );
  const tagsContainer = box.querySelector(
    ".custom-select-container .tags-container"
  );

  // Function to modify mentionedTagsArray
  function modifyTagsArray(newUserTags) {
    mentionedTagsArray = newUserTags;
    // Call updateDropdownItems to reflect changes in the UI
    updateDropdownItems();
  }

  // Your existing function to update dropdown items based on search input
  function updateDropdownItems() {
    const searchValue = searchInput.value.toLowerCase();
    dropdownContainer.style.display = "none";
    dropdownContainer.innerHTML = ""; // Clear existing items

    if (searchValue) {
      mentionedTagsArray.forEach((user) => {
        if (user.toLowerCase().includes(searchValue)) {
          dropdownContainer.style.display = "block";
          const item = document.createElement("div");
          item.textContent = user;
          item.className = "dropdown-item";
          item.onclick = function () {
            addTag(user);
            dropdownContainer.style.display = "none";
          };
          dropdownContainer.appendChild(item);
        }
      });
    }
  }

  // Example usage of modifyTagsArray
  // This could be called whenever you need to add new users to mentionedTagsArray
  fetchUserDetails().then((userInfo) => {
    const tagsArray = userInfo?.tags?.map((item) => item?.tag);
    modifyTagsArray(tagsArray);
  });

  // Ensure the rest of your component setup remains as is

  searchInput.oninput = updateDropdownItems; // Use oninput for immediate response

  // Function to add tag

  function addTag(user) {
    if (!tagsContainer.textContent.includes(user)) {
      // Prevent duplicate tags
      const tag = document.createElement("span");
      tag.className = "tag";
      tag.textContent = user;
      const removeBtn = document.createElement("span");
      removeBtn.textContent = "×";
      removeBtn.className = "remove-tag";
      removeBtn.onclick = function () {
        tagsContainer.removeChild(tag);
        const index = allUserTags.indexOf(user);
        if (index > -1) {
          allUserTags.splice(index, 1);
        }
      };
      tag.appendChild(removeBtn);
      tagsContainer.appendChild(tag);
      allUserTags.push(user);
    }
    searchInput.value = "";
    updateDropdownItems();
  }

  allUserTags.forEach((tag) => addTag(tag));

  searchInput.onkeyup = updateDropdownItems;
  updateDropdownItems();

  const searchInputCollections = box.querySelector(
    ".custom-collections-container .custom-select-search input"
  );
  const dropdownContainerCollections = box.querySelector(
    ".custom-collections-container .dropdown-container"
  );
  const tagsContainerCollections = box.querySelector(
    ".custom-collections-container .tags-container"
  );

  // Function to modify mentionedTagsArray
  function modifyCollArray(newUserColls) {
    const tmpArray = newUserColls?.map((coll) => ({
      name: coll.name,
      id: coll.id,
    })); // Store both name and ID
    mentionedCollArray = tmpArray;
    updateDropdownItemsColl();
  }

  // Your existing function to update dropdown items based on search input
  function updateDropdownItemsColl() {
    const searchValue = searchInputCollections.value.toLowerCase();
    dropdownContainerCollections.innerHTML = ""; // Clear existing items
    dropdownContainerCollections.style.display = "none";
    dropdownContainerCollections.style.border = "none";
    dropdownContainerCollections.style.width = "max-content";

    const createCollElem = document.createElement("div");
    createCollElem.className = "dropdown-item";
    if (searchValue) {
      dropdownContainerCollections.style.display = "block";
      createCollElem.innerHTML = `<div class="flex items-center" style="color: rgb(59 130 246/1);"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" class="h-4 w-4 text-blue-500" style="width: 16px;"><path stroke-linecap="round" stroke-linejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"></path></svg><span class="ml-3 truncate text-sm text-blue-500">Create '${searchValue}' Collection</span></div>`;
      createCollElem.onclick = async function () {
        await createNewCollection(searchValue);
      };
    } else {
      createCollElem.innerHTML = `<div class="flex items-center" style="color: rgb(59 130 246/1);"><span class="ml-3 truncate text-sm text-blue-500">Type to create new collection</span></div>`;
    }
    dropdownContainerCollections.appendChild(createCollElem);

    if (searchValue) {
      mentionedCollArray.forEach((collection) => {
        if (collection.name.toLowerCase().includes(searchValue)) {
          dropdownContainerCollections.style.display = "block";
          const item = document.createElement("div");
          item.className = "dropdown-item";
          item.innerHTML = `<div class="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" class="h-4 w-4 text-gray-500" style="width: 16px;"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"></path></svg><span class="ml-3 truncate text-sm">${collection.name}</span></div>`;
          item.onclick = async function () {
            await addColl(collection);
            selectedCollectionId = collection.id; // Store the ID in the global variable when clicked
            dropdownContainerCollections.style.display = "none";
          };
          dropdownContainerCollections.appendChild(item);
        }
      });
    }
  }

  async function createNewCollection(name) {
    const authorId = session.userId;
    const sessionToken = session.token;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const url = `${apiUrl}/api/collections`;
    const payload = {
      data: {
        name: name,
        author: authorId,
      },
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionToken}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      fetch(`${apiUrl}/api/gamification-score?module=gem`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionToken}`,
        },
      });

      selectedCollectionId = data?.data?.id;
      const orgGemData = await fetchHighlightGem(gemId);
      const updatedPayload = {
        data: {
          title: orgGemData?.title,
          description: orgGemData?.description,
          media_type: orgGemData?.media_type,
          author: orgGemData?.author?.data?.id,
          url: orgGemData?.url,
          metaData: {
            icon: orgGemData?.metaData?.icon,
            covers: orgGemData?.metaData?.covers,
            docImages: orgGemData?.metaData?.docImages,
            defaultIcon: orgGemData?.metaData?.defaultIcon,
            defaultThumbnail: orgGemData?.metaData?.defaultThumbnail,
            type: orgGemData?.media_type,
            title: orgGemData?.title,
            url: orgGemData?.url,
          },
          collection_gems: selectedCollectionId,
          remarks: orgGemData?.remarks,
          tags: orgGemData?.tags?.data,
          is_favourite: orgGemData?.is_favourite,
          custom_fields_obj: orgGemData?.custom_fields_obj || [],
          media: {
            _id: orgGemData?.media?._id,
            box: orgGemData?.media?.box || "",
            link: orgGemData?.media?.link,
            tags: orgGemData?.media?.tags,
            text: orgGemData?.media?.text,
            type: orgGemData?.media?.type,
            color: orgGemData?.media?.color,
            notes: orgGemData?.media?.notes,
            details: orgGemData?.media?.details || "",
            heading: orgGemData?.media?.heading,
            expander: orgGemData?.media?.expander,
            collections: selectedCollectionId,
            showThumbnail: orgGemData?.media?.showThumbnail,
            styleClassName: orgGemData?.media?.styleClassName,
          },
          isPublicPrompt: orgGemData?.isPublicPrompt,
          expander: orgGemData?.expander,
        },
      };
      const updatedGemData = await updateHighlightGem(updatedPayload, gemId);
      const customCollectionsContainer = box.querySelector(
        ".custom-collections-container"
      );
      customCollectionsContainer.style.display = "none";
    } catch (error) {
      console.error("Error during the API call:", error);
    }
  }

  // Example usage of modifyCollArray
  // This could be called whenever you need to add new users to mentionedTagsArray
  fetchUserCollections().then((collInfo) => {
    const collArray = collInfo?.map((coll) => ({
      name: coll.name,
      id: coll.id,
    }));
    modifyCollArray(collArray);
  });

  // Ensure the rest of your component setup remains as is

  searchInputCollections.oninput = updateDropdownItemsColl; // Use oninput for immediate response

  // Function to add tag

  async function addColl(collection) {
    const authorId = session.userId;
    const sessionToken = session.token;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const url = `${apiUrl}/api/collections`;
    const payload = {
      data: {
        name: collection.name,
        author: authorId,
      },
    };
    selectedCollectionId = collection.id;
    const orgGemData = await fetchHighlightGem(gemId);
    const updatedPayload = {
      data: {
        title: orgGemData?.title,
        description: orgGemData?.description,
        media_type: orgGemData?.media_type,
        author: orgGemData?.author?.data?.id,
        url: orgGemData?.url,
        metaData: {
          icon: orgGemData?.metaData?.icon,
          covers: orgGemData?.metaData?.covers,
          docImages: orgGemData?.metaData?.docImages,
          defaultIcon: orgGemData?.metaData?.defaultIcon,
          defaultThumbnail: orgGemData?.metaData?.defaultThumbnail,
          type: orgGemData?.media_type,
          title: orgGemData?.title,
          url: orgGemData?.url,
        },
        collection_gems: selectedCollectionId,
        remarks: orgGemData?.remarks,
        tags: orgGemData?.tags?.data,
        is_favourite: orgGemData?.is_favourite,
        custom_fields_obj: orgGemData?.custom_fields_obj || [],
        media: {
          _id: orgGemData?.media?._id,
          box: orgGemData?.media?.box || "",
          link: orgGemData?.media?.link,
          tags: orgGemData?.media?.tags,
          text: orgGemData?.media?.text,
          type: orgGemData?.media?.type,
          color: orgGemData?.media?.color,
          notes: orgGemData?.media?.notes,
          details: orgGemData?.media?.details || "",
          heading: orgGemData?.media?.heading,
          expander: orgGemData?.media?.expander,
          collections: selectedCollectionId,
          showThumbnail: orgGemData?.media?.showThumbnail,
          styleClassName: orgGemData?.media?.styleClassName,
        },
        isPublicPrompt: orgGemData?.isPublicPrompt,
        expander: orgGemData?.expander,
      },
    };
    const updatedGemData = await updateHighlightGem(updatedPayload, gemId);
    const customCollectionsContainer = box.querySelector(
      ".custom-collections-container"
    );
    customCollectionsContainer.style.display = "none";
    searchInput.value = "";
    updateDropdownItemsColl();
  }

  allUserColls.forEach((collection) => addColl(collection));

  searchInputCollections.onkeyup = updateDropdownItemsColl;
  updateDropdownItemsColl();

  async function recordScreen() {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          mediaSource: "screen",
        },
      });

      const audioStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      const tracks = [
        ...screenStream.getVideoTracks(),
        ...audioStream.getAudioTracks(),
      ];
      const combinedStream = new MediaStream(tracks);

      const data = [];
      const mediaRecorder = new MediaRecorder(combinedStream);

      mediaRecorder.ondataavailable = (e) => {
        data.push(e.data);
      };

      mediaRecorder.start();

      // When the screen sharing is stopped by the user
      screenStream.getVideoTracks()[0].onended = () => {
        // Stop the media recorder
        mediaRecorder.stop();
        // Stop all audio tracks
        audioStream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.onstop = async () => {
        const recordedVideo = box.querySelector("video.recordedVideo");
        const blobData = new Blob(data, { type: data[0].type });
        const fileName = createUniqueFileName();
        const file = new File([blobData], `${fileName}.mp4`, {
          type: blobData.type,
          lastModified: new Date(),
        });
        const resp = await uploadFile(file);
        screenRecordUrlData = resp;
        recordedVideo.src = screenRecordUrlData;
        recordedVideo.style.display = "block";
      };
    } catch (error) {
      console.error("Error capturing screen and audio", error);
    }
  }

  const recordAudio = async () => {
    let tmpPlayerWrap = box.querySelector(".player-wrap");
    const ripple = box.querySelector("span.ripple");
    ripple.style.animation = "ripple-animation 600ms linear infinite";
    let playerWrap;
    if (tmpPlayerWrap) {
      playerWrap = tmpPlayerWrap;
    } else {
      playerWrap = document.createElement("div");
    }
    playerWrap.style.cssText =
      "width: 100%;display: flex;flex-direction: column;gap: 10px;";
    playerWrap.className = "player-wrap";
    playerWrap.innerHTML = `
    <div class="audio-controls" style="display: none; justify-content: space-between; border-width: 1px; width: auto; background-color: white; border-color: #ABB7C9; border-radius: 0.25rem; padding: 0.25rem; align-items: center; gap: 0.5rem;">
        <button class="btn-toggle-pause" style="border-width: 1px;background-color: #1D4ED8;color: white;border-color: #1D4ED8;padding: 0.25rem;border-radius: 50%;outline: 2px solid transparent;outline-offset: 2px;width: 35px;height: 35px;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.25 4C3.25 3.58579 3.58579 3.25 4 3.25H20C20.4142 3.25 20.75 3.58579 20.75 4V20C20.75 20.4142 20.4142 20.75 20 20.75H4C3.58579 20.75 3.25 20.4142 3.25 20V4Z" fill="#FFFFFF"></path>
            </svg>
        </button>
        <div id="audiowave" style="width: 100%;"></div>
    </div>
    `;
    if (!tmpPlayerWrap) {
      box.querySelector(".recordedAudioWrapper").appendChild(playerWrap);
    }
    // Request microphone access
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true, // Specify audio to capture microphone input
    });

    const data = [];
    const mediaRecorder = new MediaRecorder(stream);

    // Collect audio data chunks
    mediaRecorder.ondataavailable = (e) => {
      data.push(e.data);
    };

    mediaRecorder.start();

    const stopButton = box.querySelector("#stopRecordButton");
    const playButton = box.querySelector("#playRecordButton");
    if (stopButton) {
      playButton.style.display = "none";
      stopButton.style.display = "block";
    }

    // const stopButton = box.querySelector("#audioIconContainer");
    // if (stopButton) {
    //   stopButton.querySelector("img").src = "https://d3jrelxj5ogq5g.cloudfront.net/icons/stop-svgrepo-com_gyvesv.svg";
    //   stopButton.querySelector("img").style.maxWidth = "42px";
    // }

    // Stop recording when the button is clicked
    stopButton.onclick = () => {
      mediaRecorder.stop(); // Stop recording
      // Stop all tracks on the stream to stop the recording indicator
      stream.getTracks().forEach((track) => track.stop());
      stopButton.style.display = "none"; // Hide the stop button
      const ripple = box.querySelector("span.ripple");
      ripple.style.animation = "none";
      const recordedAudioWrapper = box.querySelector(".recordedAudioWrapper");
      recordedAudioWrapper.style.display = "none";
    };

    // Handle the stop event
    mediaRecorder.onstop = async (e) => {
      const blobData = new Blob(data, { type: data[0].type });
      // const blobDataUrl = URL.createObjectURL(blobData);
      const fileName = createUniqueFileName();
      const file = new File([blobData], `${fileName}.mp3`, {
        type: blobData.type,
        lastModified: new Date(),
      });
      const resp = await uploadFile(file);
      audioRecordUrlData = resp;
      const fileObj = {
        fileType: "audio",
        fileUrl: audioRecordUrlData,
        fileName: fileName,
      };
      const fileUploadPreview = showFileUploadPreview(fileObj);
      const filePreview = box.querySelector(".filePreview");
      filePreview.appendChild(fileUploadPreview);
      attachedFiles.push(fileObj);
    };
  };

  replyInput.addEventListener("keyup", (e) => {
    e.stopPropagation()
    // Do not execute this logic if one of the navigation keys is pressed
    if (!["ArrowDown", "ArrowUp", "Enter"].includes(e.key)) {
      let inputText = replyInput.value;
      let lastAtPos = inputText.lastIndexOf("@");

      if (lastAtPos === -1 || inputText.charAt(lastAtPos + 1) === " ") {
        userSuggestions.style.display = "none";
        userSuggestions.innerHTML = "";
        return;
      }

      let postAtString = inputText.substring(lastAtPos + 1);

      if (!postAtString.includes(" ")) {
        let currentToken = postAtString.split(" ")[0];
        let filteredUsers = mentionedUsersArray.filter((user) =>
          user.toLowerCase().startsWith(currentToken.toLowerCase())
        );

        userSuggestions.innerHTML = ""; // Clear current suggestions

        if (filteredUsers.length) {
          filteredUsers.forEach((user, index) => {
            let div = document.createElement("div");
            div.textContent = user;
            div.onclick = function () {
              replyInput.value =
                inputText.substring(0, lastAtPos + 1) + user + " ";
              userSuggestions.style.display = "none";
              userSuggestions.innerHTML = "";
            };

            // Highlight the first suggestion as active
            if (index === 0) {
              div.classList.add("active");
            }

            userSuggestions.appendChild(div);
          });
          userSuggestions.style.display = "block";
        } else {
          userSuggestions.style.display = "none";
        }
      } else {
        userSuggestions.style.display = "none";
        userSuggestions.innerHTML = "";
      }
    }
  });

  replyInput.addEventListener("keydown", (e) => {
    let active = userSuggestions.querySelector(".active");
    let divs = [...userSuggestions.getElementsByTagName("div")];

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (active && active.nextElementSibling) {
          active.classList.remove("active");
          active.nextElementSibling.classList.add("active");
          scrollToActiveItem(active.nextElementSibling);
        } else if (!active && divs.length > 0) {
          divs[0].classList.add("active");
          scrollToActiveItem(divs[0]);
        }
        break;

      case "ArrowUp":
        e.preventDefault();
        if (active && active.previousElementSibling) {
          active.classList.remove("active");
          active.previousElementSibling.classList.add("active");
          scrollToActiveItem(active.previousElementSibling);
        }
        break;

      case "Enter":
        e.preventDefault();
        if (active) {
          active.click();
        }
        break;
    }
  });

  function scrollToActiveItem(activeItem) {
    // Check if the active item is fully visible in the dropdown
    const isVisible =
      activeItem.offsetTop >= userSuggestions.scrollTop &&
      activeItem.offsetTop + activeItem.offsetHeight <=
        userSuggestions.scrollTop + userSuggestions.offsetHeight;

    if (!isVisible) {
      // Scrolls the active item into view with smooth scrolling
      activeItem.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }

  document.body.appendChild(box);
  commentCounter++;
}


const ImageContainer = ({ pageId, bookmark, openPreview, onEditImage, loading, html, onOfflineView, urlFile, downloadLink, onRefreshedClick=null, onFetchURL=null,isFeedBackGem=false }) => {
  // const highlighter = new Highlighter();
  let highlighter = null;
  let timer       = null
  const singleFileRef = useRef();
  const offlineGemRef = useRef()
  const dispatch = useDispatch()
  const currentGem = useSelector(state => state.gems.currentGem);
  const allHighlights = useSelector(state => state.gems.highlights);
  const mediaType = bookmark?.attributes?.media_type;
  const image     = bookmark?.attributes?.metaData?.covers && Array.isArray(bookmark?.attributes?.metaData?.covers) && bookmark?.attributes?.metaData?.covers?.length > 0 ? bookmark?.attributes?.metaData?.covers[0] : null;
  const imgSrc    = mediaType === "Image" || mediaType === "Screenshot" ? bookmark?.attributes?.S3_link && bookmark?.attributes?.S3_link?.length > 0 ?  bookmark?.attributes?.S3_link[0] : bookmark?.attributes?.media?.imageLink : image;
  const [highlightText, setHighlightText] = useState("");
  const [highlighterStyle, setHighlighterStyle] = useState({ display: "none" });
  const [boxDetails, setBoxDetails] = useState({});
  const [currentView, setCurrentView] = useState("default")
  const [enableComments, setEnableComments] = useState(false)
  const [allComments, setAllComments] = useState();
  const [activeTab, setActiveTab] = useState('comment');
  
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
          setAllComments(res.payload.data.data.replies);
          setEnableComments(true)
        } else {
          console.log("Expected replies data not found");
        }
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
      });
  }, []);

  useEffect(() => {
    function hideMenu() {
      if (window.getSelection().toString() === "") {
        setHighlighterStyle({ display: "none" });
      }
    }
    document.addEventListener('click', hideMenu);
    return () => {
      document.removeEventListener('click', hideMenu);
      if (timer) {
        clearInterval(timer)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!urlFile && bookmark?.attributes?.media_type === "Link" && onFetchURL) {
      onFetchURL()
    }
    if (urlFile && offlineGemRef?.current) {
      const iframe     = offlineGemRef?.current
      const dom        = new DOMParser().parseFromString(urlFile, "text/html")
      const newDom     = prepareForIframe(dom)
      const newHTML    = newDom?.documentElement?.outerHTML
      const frameDoc   = iframe?.contentWindow?.document;
      frameDoc.open()
      frameDoc.write(newHTML)
      frameDoc.close()
      timer = setInterval(() => {
        const newFrameDoc = iframe?.contentWindow?.document;
        prepareForIframe(newFrameDoc)
      }, 10)
    }
  }, [urlFile, offlineGemRef?.current])

  useEffect(() => {
    const getCall = async () => {
      if (!highlighter) {
        highlighter = await loadHighlighter();
      }
      if (allHighlights.length > 0) {
        allHighlights.forEach(s => {
          if (s?.media?.details?.id) {
            highlighter.fromStore(s?.media?.details.startMeta, s?.media?.details.endMeta, s?.media?.details.id, s?.media?.details.text)
            if (s?.media?.color?.className) {
              highlighter.addClass(s?.media?.color?.className, s?.media?.details.id)
            }
          }
        })
      }
    }
    getCall();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allHighlights]);

  const onDownloadHtmlFile = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const blob      = new Blob([urlFile], { type: "text/html" });
    const fileUrl   = URL.createObjectURL(blob);
    const aElem     = document.createElement("a")
    aElem.href      = fileUrl
    aElem.download  = `${bookmark?.attributes?.slug}.html`
    document.body.appendChild(aElem)
    aElem.click()
    document.body.removeChild(aElem)
    return false
  }

  const onViewChange = (e) => {
    const view = e.target.value
    setCurrentView(view)
  }

  const onOpenSite = () => {
    window.open(bookmark?.attributes?.url, "_blank")
  }

  const onRefreshPermanentCopy = async () => {
    onRefreshedClick && onRefreshedClick(bookmark?.attributes?.url)
  }

  const prepareForIframe = (dom) => {
    const srces                     = dom?.querySelectorAll("[src]")
    const hrefs                     = dom?.querySelectorAll("[href]")
    const links                     = dom?.querySelectorAll("[link]")
    const sources                   = dom?.querySelectorAll("[source]")
    const srcSets                   = dom?.querySelectorAll("[srcset]")
    const aElems                    = dom?.querySelectorAll("a")
    const NEXT_PUBLIC_BASE_URL      = process.env.NEXT_PUBLIC_BASE_URL
    const baseURL                   = `${NEXT_PUBLIC_BASE_URL}/u/${session.username || "default"}/g/${bookmark?.id}`
    if (aElems?.length !== 0) {
      Array.from(aElems).forEach((el) => {
        el.target = "_blank"
      })
    }
    if (srcSets?.length !== 0) {
      Array.from(srcSets).forEach((el) => {
        if (el.srcset.includes(baseURL)){
          el.srcset = `${el.srcset.replace(baseURL, bookmark?.attributes?.url)}`
          if (el.srcset.includes(bookmark?.attributes?.slug)) {
            el.srcset = `${el.srcset.replace(bookmark?.attributes?.slug, "")}`
          }
        }
        else if (el.srcset.startsWith(NEXT_PUBLIC_BASE_URL)) {
          el.srcset = `${el.srcset.replace(NEXT_PUBLIC_BASE_URL, bookmark?.attributes?.url)}`
        }
      })
    }
    if (srces?.length !== 0) {
      Array.from(srces).forEach((el) => {
        if (el.src.includes(baseURL)){
          el.src = `${el.src.replace(baseURL, bookmark?.attributes?.url)}`
          if (el.src.includes(bookmark?.attributes?.slug)) {
            el.src = `${el.src.replace(bookmark?.attributes?.slug, "")}`
          }
        }
        else if (el.src.startsWith(NEXT_PUBLIC_BASE_URL)) {
          el.src = `${el.src.replace(NEXT_PUBLIC_BASE_URL, bookmark?.attributes?.url)}`
        }
      })
    }
    if (hrefs?.length !== 0) {
      Array.from(hrefs).forEach((el) => {
        if (el.href.includes(baseURL)){
          el.href = `${el.href.replace(baseURL, bookmark?.attributes?.url)}`
          if (el.href.includes(bookmark?.attributes?.slug)) {
            el.href = `${el.href.replace(bookmark?.attributes?.slug, "")}`
          }
        }
        else if (el.href.startsWith(NEXT_PUBLIC_BASE_URL)) {
          el.href = `${el.href.replace(NEXT_PUBLIC_BASE_URL, bookmark?.attributes?.url)}`
        }
      })
    }
    if (links?.length !== 0) {
      Array.from(links).forEach((el) => {
        if (el.link.includes(baseURL)){
          el.link = `${el.link.replace(baseURL, bookmark?.attributes?.url)}`
          if (el.link.includes(bookmark?.attributes?.slug)) {
            el.link = `${el.link.replace(bookmark?.attributes?.slug, "")}`
          }
        }
        else if (el.link.startsWith(NEXT_PUBLIC_BASE_URL)) {
          el.link = `${el.link.replace(NEXT_PUBLIC_BASE_URL, bookmark?.attributes?.url)}`
        }
      })
    }
    if (sources?.length !== 0) {
      Array.from(sources).forEach((el) => {
        if (el.source.includes(baseURL)){
          el.source = `${el.source.replace(baseURL, bookmark?.attributes?.url)}`
          if (el.source.includes(bookmark?.attributes?.slug)) {
            el.source = `${el.source.replace(bookmark?.attributes?.slug, "")}`
          }
        }
        else if (el.source.startsWith(NEXT_PUBLIC_BASE_URL)) {
          el.source = `${el.source.replace(NEXT_PUBLIC_BASE_URL, bookmark?.attributes?.url)}`
        }
      })
    }
    return dom
  }

  const handleHighlight = () => {
    const selectedArea = window.getSelection();
    if (selectedArea.toString()) {
      const bound = selectedArea.getRangeAt(0).getBoundingClientRect();
      const conatinerBound = singleFileRef.current.getBoundingClientRect();

      setHighlightText(selectedArea.toString());
      setBoxDetails(bound);
      const styles = {
        display: "flex",
        top: bound.top + singleFileRef.current.scrollTop - conatinerBound.top - 40,
        left: bound.left - conatinerBound.left
      }
      setHighlighterStyle(styles);
    }
  }

  const handleAddHighlight = (color) => {
    if (!highlightText) {
      setHighlighterStyle({ display: "none" });
      window.getSelection()?.removeAllRanges();
      return
    }

    // highlighter.run();
    const s = window.getSelection()
    const tRange = s.getRangeAt(0)



    const details = highlighter.fromRange(tRange)
    highlighter.addClass(color?.className, details.id)

    const payload = {
      color: color,
      text: highlightText,
      title: highlightText.toString().substr(0, 50),
      description: highlightText,
      link: bookmark?.attributes?.url,
      collections: bookmark?.attributes?.collection_gems?.data?.id,
      type: "Highlight",
      box: boxDetails,
      _id: details?.id,
      styleClassName: color?.className,
      details,
    }

    dispatch(addHighlight(bookmark?.attributes?.collection_gems?.data?.id, payload)).then(res => {
      if (res.payload?.data?.id) {
        const newArr = currentGem?.attributes?.child_gem_id?.data || []
        const payload = {
          id: res.payload?.data?.id,
          attributes: { ...res.payload?.data }
        }
        newArr.push(payload);
        const childGems = {
          data: newArr
        }
        const newObj = { ...currentGem?.attributes, child_gem_id: childGems }

        dispatch(setCurrentGem({ ...currentGem, attributes: newObj }))
      }
    })

    setHighlighterStyle({ display: "none" });
    setHighlightText("");
    setBoxDetails({});
    window.getSelection()?.removeAllRanges();
  }


  const renderMovie = (image, title) => {
    const { NEXT_PUBLIC_STATIC_S3_BASE_URL } = process.env
    return (
      <div className='flex flex-col'>
        <img src={image ? image.replace("_SY160", "_SY800")?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/250x250_min`) : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`} className='object-contain h-[25rem] max-h-[25rem] max-w-full rounded-lg'
          alt={bookmark?.attributes?.altInfo || title || "Curateit"} />
        {
          bookmark?.attributes?.media_type === 'Movie' && bookmark?.attributes?.entityObj?.ratings &&
          <div className='flex item-center justify-end mt-2'>
            <img className='h-5 w-5 mr-1' src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/icons/yellow-star.png`} alt="Rating star" />
            <span className='text-gray-500 mr-1 font-bold'>{`${bookmark?.attributes?.entityObj?.ratings}/10`}</span>
            {bookmark?.attributes?.entityObj?.entityObj?.year && <><span className='text-gray-500 ml-1 font-bold'>&middot;{` ${bookmark?.attributes?.entityObj?.entityObj?.year}`}</span></>}
          </div>
        }
        {
          bookmark?.attributes?.media_type === 'Book' && (bookmark?.attributes?.media?.myRating || bookmark?.attributes?.entityObj?.averageRating) &&
          <div className='flex item-center justify-end mt-2'>
            <img className='h-5 w-5 mr-1' src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/icons/yellow-star.png`} alt="Rating star" />
            <span className='text-gray-500 mr-1 font-bold'>{`${bookmark?.attributes?.media?.myRating || bookmark?.attributes?.entityObj?.averageRating}/5`}</span>
            {bookmark?.attributes?.entityObj?.publishedDate && <><span className='text-gray-500 ml-1 font-bold'>&middot;{` ${!bookmark?.attributes?.entityObj?.publishedDate?.includes("-") ? bookmark?.attributes?.entityObj?.publishedDate : moment(bookmark?.attributes?.entityObj?.publishedDate).year()}`}</span></>}
          </div>
        }
      </div>
    )
  }
  
  const renderPermanentCopy = () => {
    return (
      <div ref={singleFileRef}>
        <iframe ref={offlineGemRef} className='ct-offline-previewer' onMouseUp={handleHighlight}>
        </iframe>
        <div style={highlighterStyle} className='absolute justify-start items-center z-50 px-1 gap-1 h-8 bg-white'>
          {HIGHLIGHTED_COLORS.map(color => (
            <button key={color?.id} onClick={() => handleAddHighlight(color)} className={`h-5 w-5 rounded-full bg-[${color.bg}] `}></button>
          ))}
        </div>
      </div>
    )
  }

  const renderWebCopy = () => {
    return (
      <div>
        <iframe className='ct-offline-previewer' src={bookmark?.attributes?.url}>
        </iframe>
      </div>
    )
  }

  // Function to create the inner div with content
  const createContentDiv = (commentObj) => {
    const contentStyles = {
      width: "50px",
      height: "50px",
      borderRadius: "50%",
      border: "1px solid black",
      backgroundImage: "url('https://drz68kkeltaek.cloudfront.net/common/base64-converted-imgs/1710539807457.png')",
      backgroundSize: "cover",
      position: "absolute",
      left: `${commentObj?.floatingCommentData?.coords?.x}px`,
      top: `${commentObj?.floatingCommentData?.coords?.y}px`,
      cursor: "grab",
      zIndex: "9",
      opacity: "1",
      display: "block",
    };
    const commentIconId = `commentIcon-comment-${commentObj?.floatingCommentData?.gemId}`

    return (
      <div style={contentStyles} id={commentIconId}></div>
    );
  };

  // Function that renders the comments view with the overlay
  const renderCommentsView = () => {
    
    allComments?.forEach((comment) => {
      if(comment?.floatingCommentData?.coords?.x){
        createCommentOnScreenV2(
          comment?.floatingCommentData?.coords?.x,
          comment?.floatingCommentData?.coords?.y,
          comment?.floatingCommentData?.commentClass,
          { parent_gem_id: { id: comment?.floatingCommentData?.gemId } },
          true,
          comment?.floatingCommentData
      );
    }
    });

    // Map through allComments and pass each comment object to createContentDiv
    const contentDivs = allComments.map((commentObj, index) => {
      return <div key={index}>{createContentDiv(commentObj)}</div>;
    });

    return (
      <div>
        <iframe
          className="ct-offline-previewer commentsViewIframe"
          src={bookmark?.attributes?.url}
        ></iframe>
      </div>
    );
  };
  
  const TabSwitcher = () => {
  
    const handleCommentClick = () => {
      setActiveTab("comment");
      setCurrentView("comment");
    };

    const handleBrowseClick = () => {
      setActiveTab("web");
      setCurrentView("web");
    };

    return (
      <div className="flex border border-gray-400 rounded-lg shadow-sm">
        <div
          onClick={handleCommentClick}
          className={`px-6 py-2 cursor-pointer rounded-lg m-1 transition-all ${
            activeTab === 'comment'
              ? 'bg-white border-2 border-blue-500 text-blue-600'
              : 'bg-transparent text-gray-500'
          }`}
        >
          Comment
        </div>

        <div
          onClick={handleBrowseClick}
          className={`px-6 py-2 cursor-pointer rounded-lg m-1 transition-all ${
            activeTab === 'web'
              ? 'bg-white border-2 border-blue-500 text-blue-600'
              : 'bg-transparent text-gray-500'
          }`}
        >
          Browse
        </div>
      </div>
    );
  };

  const renderDefaultView = () => {
    const { NEXT_PUBLIC_STATIC_S3_BASE_URL } = process.env
    return (
      <div className='w-full flex justify-center items-center my-4 rounded-lg relative'>
        {
          loading ?
            <div className="spinDiv">
              <Spin size='middle' tip='Loading...' />
            </div>
          :
          // html
          (html && bookmark?.attributes?.media_type === 'SocialFeed')
            ? <div dangerouslySetInnerHTML={{ __html: html }}
              style={{ width: '100%', overflowY: 'auto', height: 'auto' }}
            />
            :
            (bookmark?.attributes?.media_type === 'Movie' || bookmark?.attributes?.media_type === 'Book')
              ? renderMovie(imgSrc, bookmark?.attributes?.title)
              : <img src={imgSrc ? imgSrc.replace("_SY160", "_SY800")?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/250x250_min`) : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`} className='object-contain max-h-[25rem] max-w-full rounded-lg'
                alt={bookmark?.attributes?.altInfo || bookmark?.attributes?.title || "Curateit"} />
        }
        {/* <div className='absolute right-2 top-2 h-7 flex justify-end items-center gap-4'>
          {(bookmark?.attributes?.media_type === 'Image' || bookmark?.attributes?.media_type === 'Screenshot') && <button onClick={onEditImage} className='rounded-md bg-white shadow flex justify-center items-center'>
            <PencilSquareIcon className="h-5 w-5" />
          </button>}
          {(bookmark?.attributes?.media_type === 'Link' || bookmark?.attributes?.media_type === 'Product') && <button onClick={onOfflineView} className='rounded-md bg-white shadow flex justify-center items-center'>
            <CloudArrowDownIcon className="h-5 w-5" />
          </button>}
          <button onClick={openPreview} className='rounded-md bg-white shadow flex justify-center items-center'>
            <ArrowTopRightOnSquareIcon className="h-5 w-5" />
          </button>
        </div> */}
      </div>
    )
  }

  return (
    <>
    {enableComments && 
        <div className="absolute -top-[9%] left-1/2 -translate-x-1/2 w-fit flex justify-center items-center">
          <TabSwitcher/>
        </div>}
      {(!enableComments && bookmark?.attributes?.media_type === "Link") && 
        <div className="w-full flex justify-end items-center">
          {/* <Radio.Group value={currentView} 
                       options={VIEWS} 
                       optionType="button" 
                       onChange={onViewChange}
                       buttonStyle="solid"
                       className="mr-2" /> */}
          {downloadLink && 
            <Tooltip title="Download html copy">
              <button onClick={onDownloadHtmlFile} className='h-6 w-6 mr-2 rounded-md bg-white shadow flex justify-center items-center'>
                <ArrowDownTrayIcon className="h-5 w-5" />
              </button>
            </Tooltip>
          }
          {/* <Tooltip title="Generate new permanent copy">
            <button onClick={onRefreshPermanentCopy} className='h-6 w-6 mr-2 rounded-md bg-white shadow flex justify-center items-center'>
              <ArrowPathIcon className="h-5 w-5" />
            </button>
          </Tooltip> */}
          <Tooltip title="Open website">
            <button onClick={onOpenSite} className='h-6 w-6 rounded-md mr-2 bg-white shadow flex justify-center items-center'>
              <ArrowTopRightOnSquareIcon className="h-5 w-5" />
            </button>
          </Tooltip>
        </div>}
      {bookmark?.attributes?.media_type === "Link" && urlFile && currentView === "permanent" && renderPermanentCopy()}
      {bookmark?.attributes?.media_type === "Link" && currentView === "web" && renderWebCopy()}
      {bookmark?.attributes?.media_type === "Link" && currentView === "comment" && renderCommentsView()}
      {currentView === "default" && (enableComments ? renderCommentsView() : renderDefaultView())}
    </>
  )
}

export default ImageContainer