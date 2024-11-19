"use client"

import { MainSidebarData } from "./main-sidebar";

class Session {
  get token() {
    return (
      (typeof window !== "undefined" &&
        window?.localStorage?.getItem("token")) ||
      null
    );
  }

  get isNewlyRegistered() {
    return (
      (typeof window !== "undefined" &&
        window?.localStorage?.getItem("isNewlyRegistered")) ||
      null
    );
  }

  setIsNewlyRegistered = (isNewlyRegistered) => {
    typeof window !== "undefined" &&
      window?.localStorage?.setItem("isNewlyRegistered", isNewlyRegistered);
  };

  removeNewlyRegistered = () => {
    typeof window !== "undefined" &&
      window?.localStorage?.removeItem("isNewlyRegistered");
  };

  setToken = (token) => {
    typeof window !== "undefined" &&
      window?.localStorage?.setItem("token", token);
  };

  setUserId = (id) => {
    typeof window !== "undefined" &&
      window?.localStorage?.setItem("userId", id);
  };

  setUmamiToken = (token) => {
    window?.localStorage?.setItem("umamiToken", token);
  };

  get umamiToken() {
    return window?.localStorage?.getItem("umamiToken") || null;
  }

  get userId() {
    return (
      (typeof window !== "undefined" &&
        window?.localStorage?.getItem("userId")) ||
      null
    );
  }

  get username() {
    return (
      (typeof window !== "undefined" &&
        window?.localStorage?.getItem("username")) ||
      null
    );
  }

  setUser = (username) => {
    typeof window !== "undefined" &&
      window?.localStorage?.setItem("username", username);
  };

  setIsPublicPasswordValidate = (isPublicPasswordValidate) => {
    typeof window !== "undefined" &&
      window?.localStorage?.setItem(
        "isPublicPasswordValidate",
        isPublicPasswordValidate
      );
  };

  get isPublicPasswordValidate() {
    return (
      (typeof window !== "undefined" &&
        window?.localStorage?.getItem("isPublicPasswordValidate")) ||
      false
    );
  }

  removeIsPublicPasswordValidate = () => {
    typeof window !== "undefined" &&
      window?.localStorage?.removeItem("isPublicPasswordValidate");
  };

  setLoginDetails = (credObjStr) => {
    if (credObjStr) {
      const userDetails = JSON.parse(window.atob(credObjStr));
      if (userDetails.jwt) this.setToken(userDetails.jwt);
      if (userDetails.user) {
        const uObj = userDetails.user;
        this.setUser(uObj.username);
        this.setUserId(uObj.id);
        this.setEmail(uObj.email);
        this.setUserProfileImage(uObj.profilePhoto);
        this.setCollectionId(uObj.unfiltered_collection);
        this.setBioCollectionId(uObj.bio_collection);
        this.setBioContactCollectionId(uObj.bio_contact_collection);
        this.setOpenPagesInSession(uObj.openPagesIn);
        this.setEditPagesInSession(uObj.editPagesIn);
        this.setGemOnClickEventInSession(uObj?.preferences?.gemOnClickEvent || 'gem view');
      }
    }
  };

  get email() {
    return (
      (typeof window !== "undefined" &&
        window?.localStorage?.getItem("email")) ||
      null
    );
  }

  setEmail = (email) => {
    typeof window !== "undefined" &&
      window?.localStorage?.setItem("user", email);
  };

  get password() {
    return (
      (typeof window !== "undefined" &&
        window?.localStorage?.getItem("password")) ||
      null
    );
  }

  setPassword = (password) => {
    typeof window !== "undefined" &&
      window?.localStorage?.setItem("password", password);
  };

  setUserProfileImage = (url) => {
    typeof window !== "undefined" &&
      window?.localStorage?.setItem("profileImage", url);
  };

  get userProfileImage() {
    return (
      (typeof window !== "undefined" &&
        window?.localStorage?.getItem("profileImage")) ||
      null
    );
  }

  get checkbox() {
    return (
      (typeof window !== "undefined" &&
        window?.localStorage?.getItem("checkbox")) ||
      null
    );
  }

  setCheckbox = (checkbox) => {
    typeof window !== "undefined" &&
      window?.localStorage?.setItem("checkbox", checkbox);
  };

  get unfiltered_collection_id() {
    return (
      (typeof window !== "undefined" &&
        window?.localStorage?.getItem("unfiltered_collection_id")) ||
      null
    );
  }
  setCollectionId = (unfiltered_collection_id) => {
    typeof window !== "undefined" &&
      window?.localStorage?.setItem(
        "unfiltered_collection_id",
        unfiltered_collection_id
      );
  };

  get isUserConfirmed() {
    return (
      (typeof window !== "undefined" &&
        window?.localStorage?.getItem("isUserConfirmed")) ||
      null
    );
  }

  setIsUserConfirmed = (isUserConfirmed) => {
    typeof window !== "undefined" &&
      window?.localStorage?.setItem("isUserConfirmed", isUserConfirmed);
  };

  get openPagesInSession() {
    return (
      (typeof window !== "undefined" &&
        window?.localStorage?.getItem("openPagesInSession")) ||
      null
    );
  }

  setOpenPagesInSession = (openPagesInSession) => {
    typeof window !== "undefined" &&
      window?.localStorage?.setItem("openPagesInSession", openPagesInSession);
  };

  get editPagesInSession() {
    return (
      (typeof window !== "undefined" &&
        window?.localStorage?.getItem("editPagesInSession")) ||
      null
    );
  }

  setEditPagesInSession = (editPagesInSession) => {
    typeof window !== "undefined" &&
      window?.localStorage?.setItem("editPagesInSession", editPagesInSession);
  };

  get gemOnClickEventInSession() {
    return (
      (typeof window !== "undefined" &&
        window?.localStorage?.getItem("gemOnClickEventInSession")) ||
      null
    );
  }

  setGemOnClickEventInSession = (gemOnClickEventInSession) => {
    typeof window !== "undefined" &&
      window?.localStorage?.setItem(
        "gemOnClickEventInSession",
        gemOnClickEventInSession
      );
  };

  //Func for UMAMI
  getUmamiClientAuthToken() {
    return (
      (typeof window !== "undefined" &&
        window?.localStorage?.getItem("umami_token")) ||
      null
    );
  }

  setUmamiClientAuthToken(token) {
    typeof window !== "undefined" &&
      window?.localStorage?.setItem("umami_token", token);
  }

  getUmamiClientUser() {
    return (
      (typeof window !== "undefined" &&
        window?.localStorage?.getItem("umami_user")) ||
      null
    );
  }

  setUmamiClientUser(user) {
    typeof window !== "undefined" &&
      window?.localStorage?.setItem("umami_user", user);
  }

  getDateRangeConfig() {
    return (
      (typeof window !== "undefined" &&
        window?.localStorage?.getItem("umami_date_range_config")) ||
      null
    );
  }

  setDateRangeConfig(date) {
    typeof window !== "undefined" &&
      window?.localStorage?.setItem("umami_date_range_config", date);
  }

  removeUmamiClientAuthToken() {
    typeof window !== "undefined" &&
      window?.localStorage?.removeItem("umami_token");
    typeof window !== "undefined" &&
      window?.localStorage?.removeItem("umami_user");
  }

  get emailAddress() {
    return (
      (typeof window !== "undefined" &&
        window?.localStorage?.getItem("emailAddress")) ||
      null
    );
  }

  setEmailAddress = (emailAddress) => {
    typeof window !== "undefined" &&
      window?.localStorage?.setItem("emailAddress", emailAddress);
  };

  setIsTagPublicPasswordValidate = (isTagPublicPasswordValidate) => {
    typeof window !== "undefined" &&
      window?.localStorage?.setItem(
        "isTagPublicPasswordValidate",
        isTagPublicPasswordValidate
      );
  };

  get isTagPublicPasswordValidate() {
    return (
      (typeof window !== "undefined" &&
        window?.localStorage?.getItem("isTagPublicPasswordValidate")) ||
      false
    );
  }

  removeIsTagPublicPasswordValidate = () => {
    typeof window !== "undefined" &&
      window?.localStorage?.removeItem("isTagPublicPasswordValidate");
  };

  get bio_collection_id() {
    return (
      (typeof window !== "undefined" &&
        window?.localStorage?.getItem("bio_collection_id")) ||
      null
    );
  }

  setBioCollectionId = (bio_collection_id) => {
    typeof window !== "undefined" &&
      window?.localStorage?.setItem("bio_collection_id", bio_collection_id);
  };

  get bio_contact_collection_id() {
    return (
      (typeof window !== "undefined" &&
        window?.localStorage?.getItem("bio_contact_collection_id")) ||
      null
    );
  }

  setBioContactCollectionId = (bio_contact_collection_id) => {
    typeof window !== "undefined" &&
      window?.localStorage?.setItem(
        "bio_contact_collection_id",
        bio_contact_collection_id
      );
  };

  get firstname() {
    return (
      (typeof window !== "undefined" &&
        window?.localStorage?.getItem("firstname")) ||
      null
    );
  }

  setFirstname = (firstname) => {
    typeof window !== "undefined" &&
      window?.localStorage?.setItem("firstname", firstname);
  };

  get lastname() {
    return (
      (typeof window !== "undefined" &&
        window?.localStorage?.getItem("lastname")) ||
      null
    );
  }

  setLastname = (lastname) => {
    typeof window !== "undefined" &&
      window?.localStorage?.setItem("lastname", lastname);
  };

  get aiPromptLibraryId() {
    return (
      (typeof window !== "undefined" &&
        window?.localStorage?.getItem("aiPromptLibraryId")) ||
      null
    );
  }

  setAiPromptLibraryId = (aiPromptLibraryId) => {
    typeof window !== "undefined" &&
      window?.localStorage?.setItem("aiPromptLibraryId", aiPromptLibraryId);
  };

  get textExpanderLibraryId() {
    return (
      (typeof window !== "undefined" &&
        window?.localStorage?.getItem("textExpanderLibraryId")) ||
      null
    );
  }

  setTextExpanderLibraryId = (textExpanderLibraryId) => {
    typeof window !== "undefined" &&
      window?.localStorage?.setItem(
        "textExpanderLibraryId",
        textExpanderLibraryId
      );
  };

  get isInternalUser() {
    return (
      (typeof window !== "undefined" &&
        window?.localStorage?.getItem("isInternalUser")) ||
      null
    );
  }

  setIsInternalUser = (isInternalUser) => {
    typeof window !== "undefined" &&
      window?.localStorage?.setItem("isInternalUser", isInternalUser);
  };

  setWebappSidebar = (data) => {
    typeof window !== "undefined" &&
      window?.localStorage?.setItem(
        "webappSidebar",
        JSON.stringify(data || MainSidebarData)
      );
  };

  get webappSidebar() {
    const items =
      (typeof window !== "undefined" &&
        window?.localStorage?.getItem("webappSidebar")) ||
      null;
    return items ? JSON.parse(items) : items;
  }
  clear = () => {
    typeof window !== "undefined" && window?.localStorage?.clear();
  };
}

export default new Session();
