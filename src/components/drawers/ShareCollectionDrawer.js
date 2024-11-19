import "./ShareCollectionDrawer.css"
import {
  ArrowLeftIcon,
  CheckIcon,
  DocumentDuplicateIcon,
  EnvelopeOpenIcon,
  GlobeAltIcon,
  InformationCircleIcon,
  LinkIcon,
  LockClosedIcon,
  LockOpenIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  TrashIcon,
  XMarkIcon,
}                                             from "@heroicons/react/24/outline";
import {
  Button,
  Drawer,
  Select,
  Tabs,
  Input,
  Radio,
  Divider,
  Avatar,
  message,
  Switch,
  DatePicker,
  Collapse,
  Tag,
  Modal,
  List,
}                                           from "antd";
import { useEffect, useState, useRef }      from "react";
import { useDispatch, useSelector }         from "react-redux";
import moment                               from "moment";
import { RiDeleteBinLine, RiFileCopyLine }  from "react-icons/ri";
import { useRouter }                        from "next/navigation";
import slugify                              from "slugify";
import { MdGroups }                         from "react-icons/md";
import { 
  PiCaretRight,
  PiCopy,
  PiCopyright,
  PiLinkSimple, 
  PiRocketLaunch, 
  PiSidebar, 
  PiTextIndent, 
  PiUserPlus 
}                                           from "react-icons/pi";

import SEOModal                             from "@components/modal/SEOModal";
import SocialShare                          from "@components/socialShare/SocialShare";

import { TextMessage, copyText }            from "@utils/constants";
import session                              from "@utils/session";
import { getAllLevelCollectionPermissions } from "@utils/find-collection-id";
import { Validator }                        from "@utils/validations";

import { addTeam, getAllTeams }             from "@actions/team";
import { emailVerification }                from "@actions/membership";
import {
  findMemberExist,
  getAllGroup,
  getAllPublicUsers,
  getGroup,
  updateGroup,
}                                           from "@actions/group";
import {
  changeSecurityEmail,
  changeSecurityLink,
  disablePublicLink,
  getSingleCollection,
  removeAccessEmail,
  removeAccessLink,
  removeSharedCollection,
  setPasswordPublicLink,
  shareCollectionViaEmail,
  shareCollectionViaLink,
  updateCollectionSEODetails,
  shareCollectionViaPublic,
  updateCollection,
  shareCollectionViaEmailGroup,
  updateGroupAccess,
  checkIsPublicCollection,
}                                          from "@actions/collection";
import HeaderCustomizationModal from "@components/modal/HeaderCustomizationModal";
import HeaderTitle from "@components/common/siteCustomization/HeaderTitle";
import { BiCollection, BiLogIn, BiLogInCircle, BiSend } from "react-icons/bi";
import { TbSocial } from "react-icons/tb";

const Option = Select;

const ACCESS_TYPES = {
  viewer: "Viewer",
  editor: "Editor",
  owner: "Owner",
};

const ShareCollectionDrawer = ({
  setOpenDrawer,
  openDrawer,
  singleCollectionDetails,
  collectionId,
  openShareCollWithDrawer,
  existingThumbnails,
  collectionName = "",
  showShareMobileView=false,setShowShareMobileView=()=>{},collectionUrl=''
}) => {
  const dispatch = useDispatch();
  const navigate = useRouter();
  const elm = useRef();
  const memberElm = useRef();
  const { sharedCollections } = useSelector((state) => state.collections);
  const { isMobileView } = useSelector((state) => state.app);
  const [tabKey, setTabKey] = useState("Email Invite");

  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [seoDetail, setSeoDetail] = useState(
    singleCollectionDetails?.seo || null
  );
  const [loadingSEO, setLoadingSEO] = useState(false);
  const [showMemberBox, setShowMemberBox] = useState(false);
  const [currentGroupId, setCurrentGroupId] = useState(null);
  const [allPublicUsers, setAllPublicUsers] = useState([]);
  const [allFilteredUsers, setAllFilteredUsers] = useState([]);
  const [allNewUsers, setAllNewUsers] = useState([]);
  const [isPublicCollection, setIsPublicCollection] = useState(false);
  //via email states
  const [emailAddress, setEmailAddress] = useState("");
  const [description, setDescription] = useState("");
  const [accessTypeEmailInvite, setAccessTypeEmailInvite] = useState("viewer");
  const [isEditEmail, setIsEditEmail] = useState({ item: "", value: false });
  const [editEmailData, setEditEmailData] = useState({
    accessType: "",
    allowViews: "",
    allowsDownload: "",
    expiryDate: "",
    members: [],
  });

  //via link states
  const [accessTypeLinkInvite, setAccessTypeLinkInvite] = useState("viewer");
  const [allOrSpecificRadio, setAllOrSpecificRadio] = useState("all");
  const [specificEmailAddressLink, setSpecificEmailAddressLink] = useState("");
  const [isEditLink, setIsEditLink] = useState({ item: "", value: false });
  const [editLinkData, setEditLinkData] = useState({
    accessType: "",
    allowViews: "",
    allowsDownload: "",
    expiryDate: "",
  });

  //public states
  const [publicSwitch, setPublicSwitch] = useState(
    singleCollectionDetails?.isPublicLink
  );
  const [publicLinkUrl, setPublicLinkUrl] = useState(
    singleCollectionDetails?.sharable_links
  );
  const [publicSidebar, setPublicSidebar] = useState(
    singleCollectionDetails?.showSidebar
  );
  const [loadingSidebar, setLoadingSidebar] = useState(false);
  // const [viewSettings, setViewSettings] = useState(
  //     singleCollectionDetails?.viewSettingObj
  // );
  const [loadingSwitch, setLoadingSwitch] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState(
    singleCollectionDetails?.collectionPassword || ""
  );

  const [showPublicSubCollections, setShowPublicSubCollections] = useState(
    singleCollectionDetails?.publicSubCollection
  );

  //embed
  const [tabEmbedCodeKey, setTabEmbedCodeKey] = useState("HTML");
  // const [embedSort, setEmbedSort] = useState("title (A-Z)");
  // const [embedView, setEmbedView] = useState("moodboard");
  // const [embedUrl, setEmbedurl] = useState(
  //     `${process.env.BASE_URL}/u/${session.username}/embed/${collectionId}?view=moodboard&sort=$title (A-Z)`
  // );
  const [allSharedGroups, setAllSharedGroups] = useState([]);


  const embedUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/u/${session.username
    }/c/${collectionId}/${singleCollectionDetails?.slug ||
    slugify(singleCollectionDetails?.name || "", {
      lower: true,
      remove: /[&,+()$~%.'":*?<>{}]/g,
    })
    }?embeded=true`;

  const [isOwnerAccess, setIsOwnerAccess] = useState(null);
  const [isOwnerAccessLink, setIsOwnerAccessLink] = useState(null);
  const [currentCollectionAccessType, setCurrentCollectionAccessType] =
    useState(null);
  const [renderLinkDetailsInEmail, setRenderLinkDetailsInEmail] = useState([]);

  const [showAllowCopyCollection, setShowAllowCopyCollection] = useState(
    singleCollectionDetails?.allowCopy
  );
  //  group sharing
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [newUsers, setNewUsers] = useState([]);

  const [allRegisterUsersList, setAllRegisterUsersList] = useState([]);


  const [allowUserSubmission, setAllowUserSubmission] = useState(
    singleCollectionDetails?.allowUserSubmission
  );

  const [showSocialIcons, setShowSocialIcons] = useState(
    singleCollectionDetails?.showSocialIcons
  );

  const [inviteOptionSelected,setInviteOptionSelected] = useState('private')
  const [privateInviteOption,setPrivateInviteOption] = useState('email')
  const [showSeo,setShowSeo] = useState(singleCollectionDetails?.showSeo)
  const [mobileShareOptionSelected,setMobileShareOptionSelected] = useState('share')

  const [selectedSitePageOption,setSelectedSitePageOption] = useState('')
  const [openHeaderModal,setOpenHeaderModal] = useState(false)

  // todo : add api values
  const [headerCustomizeOption,setHeaderCustomizeOption] = useState(singleCollectionDetails?.siteConfig?.headerType || 'default')
  const [headerPosition, setHeaderPosition] = useState(
    singleCollectionDetails?.siteConfig?.headerPosition || "center"
  );
  const [fixedHeader, setFixedHeader] = useState(
    singleCollectionDetails?.siteConfig?.isHeaderSticky === true ? true : false
  );
  const [pagesItems, setPagesItems] = useState(
    singleCollectionDetails?.siteConfig?.pagesItems || []
  );
  const [showBreadcrumbs, setShowBreadcrumbs] = useState(
    singleCollectionDetails?.siteConfig?.showBreadcrumbs === false ? false : true 
  );
  const [showSearchButton, setShowSearchButton] = useState(
    singleCollectionDetails?.siteConfig?.showSearchButton === false ? false : true 
  );
  const [showCurateitWatermark, setShowCurateitWatermark] = useState(
    singleCollectionDetails?.siteConfig?.showCurateitWatermark === false
      ? false
      : true
  );
  const [showLoginButton, setShowLoginButton] = useState(
    singleCollectionDetails?.siteConfig?.showLoginButton === false
      ? false
      : true
  );
  const [showSignUpButton, setShowSignUpButton] = useState(
    singleCollectionDetails?.siteConfig?.showSignUpButton === false
      ? false
      : true
  );

  useEffect(() => {
    if (
      singleCollectionDetails &&
      singleCollectionDetails?.invitedUsersViaMail &&
      singleCollectionDetails?.invitedUsersViaMail?.length > 0
    ) {
      const filter = singleCollectionDetails?.invitedUsersViaMail?.filter(
        (item) =>
          item?.accessType === "owner" && Number(session?.userId) === item?.id
      );

      setIsOwnerAccess(filter && filter?.length > 0 ? true : false);
    }
    if (
      singleCollectionDetails &&
      singleCollectionDetails?.invitedUsersViaLinks &&
      singleCollectionDetails?.invitedUsersViaLinks?.length > 0
    ) {
      const filter = singleCollectionDetails?.invitedUsersViaLinks?.filter(
        (item) =>
          item?.accessType === "owner" &&
          session?.emailAddress === (item?.emailArr && item?.emailArr[0])
      );

      setIsOwnerAccessLink(filter && filter?.length > 0 ? true : false);
    }
    if (
      singleCollectionDetails &&
      singleCollectionDetails?.invitedUsersViaMail &&
      singleCollectionDetails?.invitedUsersViaMail?.length > 0
    ) {
      const filter = singleCollectionDetails?.invitedUsersViaMail?.filter(
        (item) => item?.isViaLink
      );
      setRenderLinkDetailsInEmail(filter && filter?.length > 0 ? filter : []);
    }
  }, [singleCollectionDetails]);

  useEffect(() => {
    const data = getAllLevelCollectionPermissions(
      sharedCollections,
      Number(collectionId)
    );
    setCurrentCollectionAccessType(data);
  }, [collectionId, sharedCollections]);

  useEffect(() => {
    dispatch(getAllPublicUsers()).then((res) => {
      if (res?.payload?.data?.data) {
        const pUsersArr = [];
        res?.payload?.data?.data?.forEach((u) => {
          if (u.firstname !== null && u.lastname !== null) {
            pUsersArr.push({
              id: u.id,
              username: u.username,
              name: `${u.firstname} ${u.lastname}`,
              email: u.email,
              avatar: u.profilePhoto,
            });
          }
        });
        setAllRegisterUsersList([...pUsersArr]);
      }
    })
  }, [])
  // group sharig
  useEffect(() => {
    let arr = [];
    dispatch(checkIsPublicCollection(collectionId)).then((res) => {
      if (res.error === undefined) {
        setIsPublicCollection(res.payload.data);
      }
    });

    dispatch(getAllTeams())
      .then((res) => {
        setLoading(false)
        const pUsersArr = []
        if (res?.payload?.data?.members) {
          res?.payload?.data?.members?.forEach((u) => {
            if (u?.username) {
              pUsersArr.push({
                id: u?.username?.id,
                username: u?.username?.username,
                name: `${u?.username?.firstname} ${u?.username?.lastname}`,
                email: u?.username?.email,
                avatar: u?.username?.profilePhoto
              })
            }
          })
        }
        if (res?.payload?.data?.guests) {
          res?.payload?.data?.guests?.forEach((u) => {
            if (u?.username) {
              pUsersArr.push({
                id: u?.username?.id,
                username: u?.username?.username,
                name: `${u?.username?.firstname} ${u?.username?.lastname}`,
                email: u?.username?.email,
                avatar: u?.username?.profilePhoto
              })
            }
          })
        }
        arr = [...pUsersArr];
        setAllPublicUsers([...pUsersArr]);
        setAllFilteredUsers([...pUsersArr]);

        dispatch(getAllGroup()).then((gRes) => {
          if (gRes?.payload?.data?.data) {
            arr = [
              ...gRes?.payload?.data?.data?.map((g) => {
                return {
                  id: g?.id,
                  username: g?.name,
                  name: g?.name,
                  email: g?.name,
                  membersCount: g?.members?.length,
                  membersEmail: g?.members?.map((m) => m.email),
                  members: g.members,
                  isGroup: true,
                };
              }),
              ...arr,
            ];
            setFilteredUsers([...arr]);
            setAllSharedGroups([...gRes?.payload?.data?.data]);
          }
        });
      });
  }, []);

  const onMemberEmailKeyDown = async (e) => {
    if ((e.code === "Enter" || e.code === "NumpadEnter") && e.target.value.trim() !== "") {
      // setCurrentGroupId(groupId)
      const inputValue = e.target.value.trim();
      let msg = "";
      const uIdx = filteredUsers.findIndex((u) => (u?.email?.includes(inputValue) || u?.name?.includes(inputValue) || u?.username?.includes(inputValue)));

      if (uIdx !== -1) {
        msg = Validator.validate("email", inputValue, 6, 50, true);
        return
      }
      if (memberElm.current) {
        memberElm.current.blur();
      }
      if (msg !== "") {
        message.error(msg);
        return;
      }

      const member = await dispatch(findMemberExist(inputValue));
      if (member?.payload?.data === "") {
        message.error("This email is not exist in our system.");
        return;
      }

      const m = member?.payload?.data;
      setAllFilteredUsers([...allFilteredUsers, m]);
      setAllNewUsers([...allNewUsers, m.id]);
      setAllPublicUsers([
        ...allPublicUsers,
        {
          id: m.id,
          email: m.email,
          username: m.username,
          name: m.name,
          avatar: m.avatar,
        },
      ]);
      // onMembersAdd()
      // const newUser = {
      //   id: inputValue,
      //   email: inputValue,
      //   avatar: null,
      //   username: null,
      //   name: inputValue
      // };
      // setFilteredUsers([...filteredUsers, newUser]);
      // setNewUsers([...newUsers, newUser.id]);
    }
  };

  //email flow
  const resetEmailInviteStates = () => {
    setEmailAddress("");
    setDescription("");
    setAccessTypeEmailInvite("viewer");
  };

  const resetLinkInviteStates = () => {
    setAccessTypeLinkInvite("viewer");
    setAllOrSpecificRadio("all");
    setSpecificEmailAddressLink("");
  };

  const handleEmailInvite = async () => {
    const invitedUserGroup = filteredUsers?.filter((user) => {
      return newUsers.indexOf(user.id) !== -1;
    });

    // invitedUserGroup?.map((data) => {
    setLoading(true);
    for (const data of invitedUserGroup) {
      if (data?.isGroup !== true) {
        if (!data.email) {
          message.error("Email Address is required");
          return;
        }
        if (accessTypeEmailInvite === null) {
          message.error("Access type is required");
          return;
        }

        if (data.email === session.emailAddress) {
          message.error("Email address entered is your own email");
          return;
        }

        if (
          singleCollectionDetails?.invitedUsersViaMail &&
          singleCollectionDetails?.invitedUsersViaMail?.length > 0 &&
          singleCollectionDetails?.invitedUsersViaMail.some(
            (obj) => obj.emailId === data.email
          )
        ) {
          message.error("Email already added");
          return;
        }

        const payload = {
          email: data.email,
          accessType: accessTypeEmailInvite,
          description: description,
        };
        setLoading(true);

        const res = await dispatch(
          shareCollectionViaEmail(collectionId, payload)
        );

        if (res.error === undefined) {
          // await dispatch(getSingleCollection(collectionId));
          message.success("Email sent successfully");
          // setOpenDrawer(false)
          // resetEmailInviteStates();
        } else {
          // message.error(TextMessage.ERROR_TEXT);
          // setOpenDrawer(false)
          // resetEmailInviteStates();
        }
      } else {
        let mArr = [...data.membersEmail];
        const memberIdx = mArr.indexOf(session.emailAddress);

        if (memberIdx !== -1) {
          mArr.splice(memberIdx, 1);
          mArr = [...mArr];
        }

        const payload = {
          emails: mArr,
          accessType: accessTypeEmailInvite,
          description: description,
          groupId: data.id,
          groupName: data.name,
        };

        const res = await dispatch(
          shareCollectionViaEmailGroup(collectionId, payload)
        );
        if (res.error === undefined) {
          message.success("Email sent successfully");
          // setOpenDrawer(false)
          // resetEmailInviteStates();
        } else {
          // message.error(TextMessage.ERROR_TEXT);
          // setOpenDrawer(false)
          // resetEmailInviteStates();
        }
      }
      // })
    }
    await dispatch(getSingleCollection(collectionId));
    setOpenDrawer(false);
    resetEmailInviteStates();
    setLoading(false);
  };

  const handleRemoveAccessEmail = async (token) => {
    setLoadingDelete(true);
    const res = await dispatch(removeAccessEmail(token, collectionId));

    if (res.error === undefined) {
      if (currentCollectionAccessType) {
        dispatch(removeSharedCollection(collectionId));
        setLoadingDelete(false);
        message.success("Access removed successfully");
        return navigate.push(`/u/${session.username}/all-bookmarks`);
      }
      await dispatch(getSingleCollection(collectionId));
      setLoadingDelete(false);
      message.success("Access removed successfully");
    } else {
      setLoadingDelete(false);
      // message.error(TextMessage.ERROR_TEXT);
    }
  };

  const handleEditEmail = (item) => {
    setIsEditEmail({
      item: item,
      value: true,
    });
    setEditEmailData({
      accessType: item.accessType,
      allowViews: item.allowViews,
      allowsDownload: item.allowsDownload,
      expiryDate: item.expiryDate,
      members: item.members,
    });
  };

  const handleCancelEmail = () => {
    setIsEditEmail({ item: "", value: false });
    setEditEmailData({
      accessType: "",
      allowViews: "",
      allowsDownload: "",
      expiryDate: "",
      members: [],
    });
  };

  const handleChangeEditEmailData = (type, value, isMemberUpdate = false) => {
    if (isMemberUpdate && type === "acessType") {
      const membersArr = editEmailData.members.map((member) => {
        return { ...member, accessType: value };
      });
      setEditEmailData({
        ...editEmailData,
        members: [...membersArr],
        [type]: value,
      });
    } else {
      setEditEmailData({
        ...editEmailData,
        [type]: value,
      });
    }
  };

  const handleSecurityChangeEmail = async () => {
    setLoading(true);
    const token = isEditEmail?.item?.token;

    const formData = new FormData();

    formData.append("accessType", editEmailData.accessType);
    formData.append("expiryDate", editEmailData.expiryDate);
    formData.append("allowViews", editEmailData.allowViews);
    formData.append("allowsDownload", editEmailData.allowsDownload);

    if (isEditEmail?.item?.isGroupShare) {
      formData.append("members", JSON.stringify(editEmailData.members));
    }

    const res = await dispatch(
      changeSecurityEmail(collectionId, token, formData)
    );

    if (res.error === undefined) {
      await dispatch(getSingleCollection(collectionId));
      message.success("Changes Updated Successfully");
      setLoading(false);
      setIsEditEmail({ item: "", value: false });
      setEditEmailData({
        accessType: "",
        allowViews: "",
        allowsDownload: "",
        expiryDate: "",
        members: [],
      });
    } else {
      setLoading(false);
      setIsEditEmail({ item: "", value: false });
      setEditEmailData({
        accessType: "",
        allowViews: "",
        allowsDownload: "",
        expiryDate: "",
        members: [],
      });
      // message.success(TextMessage.ERROR_TEXT);
    }
  };

  //link flow

  const handleCopyLink = (link) => {
    copyText(link, "Link copied to clipboard");
  };

  const handleInviteLink = async () => {
    if (accessTypeLinkInvite === null || !allOrSpecificRadio) {
      message.error("All fields are required");
      return;
    }

    if (allOrSpecificRadio === "specific" && !specificEmailAddressLink) {
      message.error("Enter specific domain email address");
      return;
    }

    let regex = new RegExp(
      "^(?!-)[A-Za-z0-9-]+([\\-\\.]{1}[a-z0-9]+)*\\.[A-Za-z]{2,6}$"
    );

    if (
      allOrSpecificRadio === "specific" &&
      specificEmailAddressLink &&
      !regex.test(specificEmailAddressLink)
    ) {
      message.error("Enter valid domain name for specific email");
      return;
    }

    setLoading(true);
    const allowEmail =
      allOrSpecificRadio === "specific" ? specificEmailAddressLink : "all";

    const res = await dispatch(
      shareCollectionViaLink(collectionId, allowEmail, accessTypeLinkInvite)
    );

    if (res.error === undefined) {
      await dispatch(getSingleCollection(collectionId));
      message.success("Link created successfully");
      setLoading(false);
      resetLinkInviteStates();
    } else {
      // message.error(TextMessage.ERROR_TEXT);
      setLoading(false);
      resetLinkInviteStates();
    }
  };

  const handleRemoveAccessLink = async (id) => {
    setLoadingDelete(true);
    const res = await dispatch(removeAccessLink(id, collectionId));

    if (res.error === undefined) {
      await dispatch(getSingleCollection(collectionId));
      setLoadingDelete(false);
      message.success("Access removed successfully");
    } else {
      setLoadingDelete(false);
      // message.error(TextMessage.ERROR_TEXT);
    }
  };

  const handleEditLink = (item) => {
    setIsEditLink({
      item: item,
      value: true,
    });
    setEditLinkData({
      accessType: item.accessType,
      allowViews: item.allowViews,
      allowsDownload: item.allowsDownload,
      expiryDate: item.expiryDate,
      members: item.members || [],
    });
  };

  const handleCancelLink = () => {
    setIsEditLink({ item: "", value: false });
    setEditLinkData({
      accessType: "",
      allowViews: "",
      allowsDownload: "",
      expiryDate: "",
      members: [],
    });
  };

  const handleChangeEditLinkData = (type, value) => {
    setEditLinkData({
      ...editLinkData,
      [type]: value,
    });
  };

  const handleSecurityChangeLink = async () => {
    setLoading(true);
    const token = isEditLink?.item?.id;

    const formData = new FormData();

    formData.append("accessType", editLinkData.accessType);
    formData.append("expiryDate", editLinkData.expiryDate);
    formData.append("allowViews", editLinkData.allowViews);
    formData.append("allowsDownload", editLinkData.allowsDownload);

    if (isEditLink?.item?.isGroupShare) {
      formData.append("members", JSON.stringify(editLinkData.members));
    }
    const res = await dispatch(
      changeSecurityLink(collectionId, token, formData)
    );

    if (res.error === undefined) {
      await dispatch(getSingleCollection(collectionId));
      message.success("Changes Updated Successfully");
      setLoading(false);
      setIsEditLink({ item: "", value: false });
      setEditLinkData({
        accessType: "",
        allowViews: "",
        allowsDownload: "",
        expiryDate: "",
        members: [],
      });
    } else {
      setLoading(false);
      setIsEditLink({ item: "", value: false });
      setEditLinkData({
        accessType: "",
        allowViews: "",
        allowsDownload: "",
        expiryDate: "",
        members: [],
      });
      // message.success(TextMessage.ERROR_TEXT);
    }
  };

  //public flow
  // const handleViewSettings = (type, value, viewType = "") => {
  //     if (type === "view" && value === false) {
  //         const filtered = viewSettings?.view?.filter((item) => item !== viewType);

  //         const data = {
  //             ...viewSettings,
  //             view: filtered,
  //             [viewType]: value,
  //         };
  //         setViewSettings(data);
  //         return;
  //     }
  //     if (type === "view" && value === true) {
  //         const filtered = [...viewSettings.view, viewType];

  //         const data = {
  //             ...viewSettings,
  //             view: filtered,
  //             [viewType]: value,
  //         };
  //         setViewSettings(data);
  //         return;
  //     }

  //     setViewSettings({ ...viewSettings, [type]: value });
  // };

  const handlePublicSwitch = async (checked) => {
    if (checked === true) {
      setLoadingSwitch(true);
      const payload = {
        viewSettings: singleCollectionDetails?.viewSettingObj,
        // collectionName: collectionName,
        slug: singleCollectionDetails?.slug,
      };
      const res = await dispatch(
        shareCollectionViaPublic(collectionId, payload)
      );

      if (res.error === undefined) {
        setLoadingSwitch(false);
        setPublicSwitch(checked);
        setPublicLinkUrl(res.payload.data.link);
        if (!isPublicCollection) {
          setIsPublicCollection(true);
        }
        setLoading(false);
        await dispatch(getSingleCollection(collectionId));
        message.success("Link created for public access successfully");
      } else {
        setLoadingSwitch(false);
        // message.error(TextMessage.ERROR_TEXT);
        setLoading(false);
      }

      return;
    }

    if (checked === false) {
      setLoadingSwitch(true);
      const res = await dispatch(disablePublicLink(collectionId));
      if (res.error === undefined) {
        setShowSeo(false)
        setLoadingSwitch(false);
        setPublicSwitch(checked);
        setPassword("");
        await dispatch(getSingleCollection(collectionId));
        message.success("Link disabled successfully");
      } else {
        setLoadingSwitch(false);
        // message.error(TextMessage.ERROR_TEXT);
      }
    }
  };

  // const handleUpdateSettings = async () => {
  //     setLoading(true);
  //     const payload = {
  //         viewSettingObj: viewSettings,
  //     };
  //     const res = await dispatch(updateCollection(collectionId, payload));

  //     if (res.error === undefined) {
  //         await dispatch(getSingleCollection(collectionId));
  //         message.success("View Settings Updated Successfully");
  //         setLoading(false);
  //     } else {
  //         await dispatch(getSingleCollection(collectionId));
  //         setLoading(false);
  //         message.success(TextMessage.ERROR_TEXT);
  //     }
  // };

  const handleSetPasswordPublic = async (action) => {
    if (action === "delete") {
      setLoading(true);
      // const formData = new FormData();

      // formData.append("password", null);

      const res = await dispatch(
        setPasswordPublicLink({ password: null }, collectionId)
      );

      if (res.error === undefined) {
        setPassword("");
        await dispatch(getSingleCollection(collectionId));
        setShowPassword(false);
        message.success("Password removed Successfully");
        setLoading(false);
      } else {
        setPassword(password);
        await dispatch(getSingleCollection(collectionId));
        setShowPassword(false);
        setLoading(false);
        // message.success(TextMessage.ERROR_TEXT);
      }
      return;
    }

    if (action === "update") {
      setLoading(true);
      // const formData = new FormData();

      // formData.append("password", password ? password : null);

      const res = await dispatch(
        setPasswordPublicLink(
          { password: password ? password : null },
          collectionId
        )
      );

      if (res.error === undefined) {
        await dispatch(getSingleCollection(collectionId));
        setShowPassword(false);
        message.success("Password Updated Successfully");
        setLoading(false);
      } else {
        await dispatch(getSingleCollection(collectionId));
        setShowPassword(false);
        setLoading(false);
        // message.success(TextMessage.ERROR_TEXT);
      }
    }
  };

  //embed
  const handleTabEmbedCodeChange = (key) => {
    setTabEmbedCodeKey(key);
  };

  const copyEmbedCode = () => {
    if (tabEmbedCodeKey === "HTML") {
      window.navigator.clipboard
        .writeText(
          `<iframe style="border: 0; width: 100%; height: 100vh;" allowfullscreen frameborder="0" src="${embedUrl}" />`
        )
        .then(() => message.success("Code copied"))
        .catch(() => message.error("Not have permission"));
    } else {
      window.navigator.clipboard
        .writeText(
          `<iframe title='embed' style={{border: 0, width: '100%', height: '450px',overflow:'auto'}} allowFullScreen frameBorder="0" src={"${embedUrl}"}>`
        )
        .then(() => message.success("Code copied"))
        .catch(() => message.error("Not have permission"));
    }
  };

  // const handleEmbedSort = (value) => {
  //     setEmbedSort(value);
  //     setEmbedurl(
  //         `${process.env.BASE_URL}/u/${session.username}/embed/${collectionId}?view=${embedView}&sort=${value}`
  //     );
  // };

  // const handleEmbedView = (value) => {
  //     setEmbedView(value);
  //     setEmbedurl(
  //         `${process.env.BASE_URL}/u/${session.username}/embed/${collectionId}?view=${value}`
  //     );
  // };

  const handlePublicSidebar = async (isToggled) => {
    if (isToggled === true) {
      setPublicSidebar(isToggled);
      const payload = {
        showSidebar: isToggled,
      };
      const res = await dispatch(updateCollection(collectionId, payload));

      if (res.error === undefined) {
        message.success("Sidebar enabled successfully");
      } else {
        message.error("Unable to enable Sidebar");
      }
    }

    if (isToggled === false) {
      setPublicSidebar(isToggled);
      const payload = {
        showSidebar: isToggled,
      };
      const res = await dispatch(updateCollection(collectionId, payload));

      if (res.error === undefined) {
        message.success("Sidebar disabled successfully");
      } else {
        message.error("Unable to enable Sidebar");
      }
    }
  };

  const handleShowPublicSubCollections = async (isToggled) => {
    setShowPublicSubCollections(isToggled);

    const payload = {
      publicSubCollection: isToggled,
    };
    const res = await dispatch(updateCollection(collectionId, payload));

    if (res.error === undefined) {
      message.success("Settings updated successfully");
    } else {
      // message.error(TextMessage.ERROR_TEXT);
    }
  };

  // update payload for copy collection
  const handleShowCopyCollections = async (isToggled) => {
    setShowAllowCopyCollection(isToggled);

    const payload = {
      allowCopy: isToggled,
    };
    const res = await dispatch(updateCollection(collectionId, payload));
    if (res.error === undefined) {
      message.success("Settings updated successfully");
    } else {
      // message.error(TextMessage.ERROR_TEXT);
    }
  };

  const handleShowSeo = async (isToggled) => {
    setShowSeo(isToggled);

    const payload = {
      showSeo: isToggled,
    };
    const res = await dispatch(updateCollection(collectionId, payload));
    if (res.error === undefined) {
      message.success("Settings updated successfully");
    } else {
      message.error(TextMessage.ERROR_TEXT);
    }
  };

  const handleAllowUserSubmission = async (isToggled) => {
    if (isToggled === true) {
      setAllowUserSubmission(isToggled);
      const payload = {
        allowUserSubmission: isToggled,
      };
      const res = await dispatch(updateCollection(collectionId, payload));

      if (res.error === undefined) {
        message.success("User submission enabled successfully");
      } else {
        message.error("Unable to enable Sidebar");
      }
    }

    if (isToggled === false) {
      setAllowUserSubmission(isToggled);
      const payload = {
        allowUserSubmission: isToggled,
      };
      const res = await dispatch(updateCollection(collectionId, payload));

      if (res.error === undefined) {
        message.success("User submission disabled successfully");
      } else {
        message.error("Unable to enable Sidebar");
      }
    }
  };

  const handleShowSocialIcons = async (isToggled) => {
    if (isToggled === true) {
      setShowSocialIcons(isToggled);
      const payload = {
        showSocialIcons: isToggled,
      };
      const res = await dispatch(updateCollection(collectionId, payload));

      if (res.error === undefined) {
        message.success("Settings updated successfully");
      } else {
        message.error("Unable to enable Sidebar");
      }
    }

    if (isToggled === false) {
      setShowSocialIcons(isToggled);
      const payload = {
        showSocialIcons: isToggled,
      };
      const res = await dispatch(updateCollection(collectionId, payload));

      if (res.error === undefined) {
        message.success("Settings updated successfully");
      } else {
        message.error("Unable to enable Sidebar");
      }
    }
  };

  const onMembersAdd = async () => {
    const idx = filteredUsers.findIndex((g) => g.id === currentGroupId);
    if (idx !== -1) {
      const userArr = [];
      allNewUsers.forEach((id) => {
        const existingIdx = filteredUsers[idx].members.findIndex(
          (m) => m.id === id
        );
        if (existingIdx === -1) {
          const uIdx = allPublicUsers.findIndex((u) => u.id === id);
          if (uIdx !== -1) {
            userArr.push({ ...allPublicUsers[uIdx], role: "user" });
          }
        }
      });
      filteredUsers[idx] = {
        ...filteredUsers[idx],
        members: [...filteredUsers[idx].members, ...userArr],
        membersCount: userArr.length + filteredUsers[idx].membersCount,
      };
      const res = await dispatch(
        updateGroup(
          {
            ...filteredUsers[idx],
          },
          currentGroupId
        )
      );
      setAllNewUsers([]);
      if (res.error === undefined) {
        setFilteredUsers([...filteredUsers]);
        setLoading(true);
        const gIdx = singleCollectionDetails?.invitedUsersViaMail?.findIndex(
          (u) => {
            return u.id === parseInt(currentGroupId);
          }
        );
        if (gIdx !== -1) {
          let g = singleCollectionDetails?.invitedUsersViaMail[gIdx];
          const mArr = [];
          userArr.forEach((u) => {
            mArr.push({
              id: u.id,
              name: u.name,
              role: "user",
              email: u.email,
              avatar: u.avatar,
              username: u.username,
              accessType: g.accessType,
            });
          });
          const formData = new FormData();

          formData.append("accessType", g.accessType);
          formData.append("expiryDate", g.expiryDate);
          formData.append("allowViews", g.allowViews);
          formData.append("allowsDownload", g.allowsDownload);
          formData.append("members", JSON.stringify([...g.members, ...mArr]));

          const gRes = await dispatch(
            updateGroupAccess(collectionId, g.token, formData)
          );

          if (gRes.error === undefined) {
            await dispatch(getSingleCollection(collectionId));
            message.success("Changes Updated Successfully");
            setLoading(false);
          } else {
            setLoading(false);
            // message.success(TextMessage.ERROR_TEXT);
          }
        }
        setCurrentGroupId(null);
        setShowMemberBox(false);
        message.success("Group updated successfully");
      } else {
        message.error("An error occurred while updating");
      }
    }
  };

  const onAddMemberClick = (groupId) => {
    setShowMemberBox(true);
    setCurrentGroupId(groupId);
    const gIdx = filteredUsers.findIndex((g) => g.id === groupId);
    if (gIdx !== -1) {
      const group = filteredUsers[gIdx];
      const fUsers = [];
      allPublicUsers.forEach((user) => {
        const idx = group.members.findIndex((m) => m.id === user.id);
        if (idx === -1) {
          fUsers.push(user);
        }
      });
      setAllFilteredUsers([...fUsers]);
    } else {
      setAllFilteredUsers([...allPublicUsers]);
    }
  };

  const onMemberRemove = async (group, member) => {
    let newArr = [...group.members];

    const idx = newArr.findIndex((m) => m.id === member.id);
    if (idx === -1) return;
    newArr.splice(idx, 1);
    newArr = [...newArr];
    setLoading(true);

    const formData = new FormData();

    formData.append("accessType", group.accessType);
    formData.append("expiryDate", group.expiryDate);
    formData.append("allowViews", group.allowViews);
    formData.append("allowsDownload", group.allowsDownload);
    formData.append("members", JSON.stringify(newArr));

    const res = await dispatch(
      updateGroupAccess(collectionId, group.token, formData)
    );

    if (res.error === undefined) {
      await dispatch(getSingleCollection(collectionId));
      message.success("Changes Updated Successfully");
      setLoading(false);
    } else {
      setLoading(false);
      // message.success(TextMessage.ERROR_TEXT);
    }

    const groupData = await dispatch(getGroup(group?.id));
    let members = groupData?.payload?.data?.data?.attributes?.members;
    const memberIdx = members?.findIndex((m) => m.id === member.id);

    if (memberIdx === -1) return;
    members.splice(memberIdx, 1);
    members = [...members];

    // dispatch(
    //   updateGroup(
    //     {
    //       members: members,
    //     },
    //     group.id, true
    //   )
    
  };

  const onGroupItemUpdated = async () => {
    setLoading(true);
    const token = isEditEmail?.item?.token;

    const formData = new FormData();

    formData.append("accessType", editEmailData.accessType);
    formData.append("expiryDate", editEmailData.expiryDate);
    formData.append("allowViews", editEmailData.allowViews);
    formData.append("allowsDownload", editEmailData.allowsDownload);
    formData.append("members", JSON.stringify(editEmailData.members));

    const res = await dispatch(
      updateGroupAccess(collectionId, token, formData)
    );

    if (res.error === undefined) {
      await dispatch(getSingleCollection(collectionId));
      message.success("Changes Updated Successfully");
      setLoading(false);
      setIsEditEmail({ item: "", value: false });
      setEditEmailData({
        accessType: "",
        allowViews: "",
        allowsDownload: "",
        expiryDate: "",
        members: [],
      });
    } else {
      setLoading(false);
      setIsEditEmail({ item: "", value: false });
      setEditEmailData({
        accessType: "",
        allowViews: "",
        allowsDownload: "",
        expiryDate: "",
        members: [],
      });
      // message.success(TextMessage.ERROR_TEXT);
    }
  };

  const onGroupMemberUpdate = async (value, group, userId) => {
    const token = group.token;
    const data = {
      accessType: value
    }
    const res = await dispatch(
      updateGroupAccess(collectionId, token, data, userId)
    );

    if (res.error === undefined) {
      await dispatch(getSingleCollection(collectionId));
      message.success("Changes Updated Successfully");
      setLoading(false);
      setIsEditEmail({ item: "", value: false });
      setEditEmailData({
        accessType: "",
        allowViews: "",
        allowsDownload: "",
        expiryDate: "",
        members: [],
      });
    } else {
      setLoading(false);
      setIsEditEmail({ item: "", value: false });
      setEditEmailData({
        accessType: "",
        allowViews: "",
        allowsDownload: "",
        expiryDate: "",
        members: [],
      });
      // message.success(TextMessage.ERROR_TEXT);
    }
  }

  const onTagRemove = (userId) => {
    const idx = allNewUsers.findIndex((user) => user.id === userId);
    if (idx !== -1) {
      allNewUsers.splice(idx, 1);
      setAllNewUsers([...newUsers]);
    }
  };

  const onUserRemove = (userId) => {
    const idx = filteredUsers.findIndex((user) => user.id === userId);
    if (idx !== -1) {
      filteredUsers.splice(idx, 1);
      setFilteredUsers([...filteredUsers]);
    }
  };

  // const onChangeMemberAccessType = (field, value, member, group) => {
  //   if (field === "accessType") {
  //     const newArr     = [ ...editEmailData.members ]
  //     const memberIdx  = newArr.findIndex(m => m.id === member.id);
  //     if (memberIdx === -1) return false
  //     newArr[memberIdx] = {
  //       ...newArr[memberIdx],
  //       [field]: value
  //     }
  //     setEditEmailData({
  //       ...editEmailData,
  //       members: [ ...newArr ],
  //     })
  //     setIsEditEmail({
  //       ...isEditEmail,
  //       item: {
  //         ...isEditEmail.item,
  //         members: [ ...newArr ]
  //       }
  //     })
  //   }
  // }

  // all tabs
  const renderGroupPanelHeader = (header) => {
    return (
      <div className="flex flex-row justify-between w-full">
        <div className="flex flex-row items-center justify-between w-full">
          <div className="flex items-center">
            {header?.group && (
              <Avatar>{header?.group?.charAt(0).toUpperCase()}</Avatar>
            )}

            <div className="mx-3">
              <span className="text-[#101828] block text-sm font-medium">
                {header?.group || "New Group"}
              </span>
            </div>
          </div>
          {isEditEmail && isEditEmail.item.token === header.token ? (
            <Select
              className=""
              placeholder="Select"
              value={editEmailData?.accessType || null}
              onChange={(value) =>
                handleChangeEditEmailData("accessType", value)
              }
            >
              <Option value={"viewer"}>Viewer</Option>
              <Option value={"editor"}>Editor</Option>
            </Select>
          ) : (
            <label>{ACCESS_TYPES[header?.accessType]}</label>
          )}
        </div>
      </div>
    );
  };
  const renderGroupDetails = (item) => {
    // const currentMember = item.findIndex((m) => { m.id === item })
    const isOwner =
      singleCollectionDetails?.author?.data?.id === Number(session.userId);
    const gIdx = allSharedGroups?.findIndex((g) => g.id === item.id);
    const group = (gIdx === -1) ? null : allSharedGroups[gIdx];
    const mIdx = group?.members?.findIndex((m) => {
      return m.id === Number(session.userId);
    });
    const cMember = mIdx !== -1 ? group?.members[mIdx] : null;
    const isRoleOwner = !cMember && currentCollectionAccessType?.accessType === "owner";

    // const isViewerAllowedDelete =
    //   item?.accessType === "viewer" &&
    //   ((item?.members?.findIndex((m) => m.id === Number(session.userId)) !== -1) || isOwner);

    // const isEditorAllowedDelete =
    //   item?.accessType === "editor" &&
    //   ((item?.members?.findIndex((m) => m.id === Number(session.userId)) !== -1) || isOwner);
    return (
      <div key={item.id}>
        <Collapse bordered={false}>
          <Collapse.Panel key={"members"} header={renderGroupPanelHeader(item)}>
            <div className="">
              <List
                className="demo-loadmore-list"
                // loading={initLoading}
                itemLayout="horizontal"
                dataSource={item.members || []}
                // loadMore={loadMore}
                renderItem={(member) => {
                  return (
                    <List.Item
                      actions={
                          [
                            <div className="flex items-center">
                              {(isRoleOwner || isOwner || (cMember?.accessType !== "viewer" &&
                                cMember?.role === "admin")) ||
                                (member?.id === parseInt(session.userId) && cMember?.accessType !== "viewer" && cMember?.role === "admin") 
                                ? <Select
                                className="mr-2"
                                placeholder="Select"
                                value={member?.accessType || null}
                                onChange={(value) =>
                                  onGroupMemberUpdate(value, item, member?.id)
                                }
                                >
                                <Option value={"viewer"}>Viewer</Option>
                                <Option value={"editor"}>Editor</Option>
                                  </Select> 
                                : <label className="mr-2">{ACCESS_TYPES[member?.accessType]}</label> 
                              }
                              {(isRoleOwner || member?.id === parseInt(session.userId) || (cMember?.role === "admin" && cMember?.accessType !== "viewer")) &&
                                <RiDeleteBinLine
                                  style={{ color: "red" }}
                                  onClick={() => onMemberRemove(item, member)}
                                />
                              }
                            </div>
                          ]
                      }
                    >
                      <List.Item.Meta
                        avatar={
                          <Avatar src={member.avatar}>
                            {member.name.charAt(0).toUpperCase()}
                          </Avatar>
                        }
                        title={member.name}
                        description={member.username}
                      />
                    </List.Item>
                  );
                }}
              />
            </div>
            {(isOwner ||
              (cMember?.accessType !== "viewer" && cMember?.role === "admin")) && (
                <div className="flex flex-row items-center">
                  <button
                    className="p-2"
                    onClick={() => onAddMemberClick(item.id)}
                  >
                    + Add Members
                  </button>
                </div>
              )}
          </Collapse.Panel>
        </Collapse>
        <div className="flex justify-between">
          {/* <div className="border-r border-[#D0D5DD] px-2">
                    <h6 className="text-[#505050] block text-xs font-medium mb-2">Password</h6>
                    <Button><LockClosedIcon className="h-5 w-5 m-0"/></Button>
                </div> */}

          <div className="border-r border-[#D0D5DD] pr-1 w-[28%]">
            <h6 className="text-[#505050] block text-xs font-medium mb-2">
              Expire on
            </h6>
            {isEditEmail?.item?.token === item.token &&
              isEditEmail?.item?.expiryDate &&
              editEmailData?.expiryDate ? (
              <DatePicker
                onChange={(date, dateStirng) =>
                  handleChangeEditEmailData("expiryDate", dateStirng)
                }
                format={"DD/MM/YYYY"}
                value={moment(editEmailData.expiryDate, "DD/MM/YYYY")}
                showToday={false}
                allowClear={false}
                style={{
                  width: isMobileView ? "fit-content" : "120px",
                }}
              />
            ) : (
              <label className={`${isMobileView ? "text-xs" : "text-sm"}`}>
                {item?.expiryDate || ""}
              </label>
            )}
          </div>

          <div
            className={`border-r border-[#D0D5DD] ${isMobileView ? "w-[45%] pr-2" : "w-[40%] px-1"
              }`}
          >
            <h6 className="text-[#505050] block text-xs font-medium mb-2">
              Expire after
            </h6>

            <div className="flex justify-between">
              <div className="flex flex-col mr-2">
                {isEditEmail?.item?.token === item.token &&
                  isEditEmail?.item?.allowViews &&
                  editEmailData?.allowViews ? (
                  <Input
                    placeholder=""
                    value={editEmailData?.allowViews || ""}
                    onChange={(e) =>
                      handleChangeEditEmailData("allowViews", e.target.value)
                    }
                    className="custom-ant-input"
                  />
                ) : (
                  <label className={`${isMobileView ? "text-xs" : "text-sm"}`}>
                    {item?.allowViews || ""}
                  </label>
                )}

                <span className="text-xs text-[#667085]">Views</span>
              </div>
              <div className="flex flex-col">
                {isEditEmail?.item?.token === item.token &&
                  isEditEmail?.item?.allowsDownload &&
                  editEmailData?.allowsDownload ? (
                  <Input
                    placeholder=""
                    value={editEmailData?.allowsDownload || ""}
                    onChange={(e) =>
                      handleChangeEditEmailData(
                        "allowsDownload",
                        e.target.value
                      )
                    }
                    className="custom-ant-input"
                  />
                ) : (
                  <label className={`${isMobileView ? "text-xs" : "text-sm"}`}>
                    {item?.allowsDownload || ""}
                  </label>
                )}
                <span className="text-xs text-[#667085]">Downloads</span>
              </div>
            </div>
          </div>

          {isEditEmail && isEditEmail.item.id === item.id ? (
            <div className={`${isMobileView ? "w-[20%]" : "w-[28%]"} pl-1`}>
              <h6 className="text-[#505050] block text-xs font-medium mb-2">
                Actions
              </h6>
              <div
                className={`flex items-center ${isMobileView ? "flex-col" : "flex-row"
                  }`}
              >
                <Button
                  disabled={loading}
                  onClick={() => handleCancelEmail(item.token)}
                  className={`${isMobileView ? "mb-2" : "mr-1"}`}
                >
                  <XMarkIcon className="h-5 w-5 m-0" />
                </Button>

                <Button disabled={loading} onClick={() => onGroupItemUpdated()}>
                  <CheckIcon className="h-5 w-5 m-0" />
                </Button>
              </div>
            </div>
          ) : (
            <div className={`${isMobileView ? "w-[20%]" : "w-[28%]"} `}>
              {(isRoleOwner || isOwner ||
                cMember?.role === "admin" || cMember?.accessType === "editor")
                && <h6 className="text-[#505050] block text-xs font-medium mb-2">
                  Remove access
                </h6>}
              {/* <div className="flex items-center">
                        <TrashIcon className="h-5 w-5 m-0 cursor-pointer" onClick={() => handleRemoveAccessEmail(item.token)} disabled={loadingDelete}/>
                        <PencilSquareIcon disabled={loadingDelete} 
                        onClick={() => handleEditEmail(item)} className="h-5 w-5 m-0 cursor-pointer"/>
                    </div> */}

              <div
                className={`flex items-center ${isMobileView ? "flex-col" : "flex-row"
                  }`}
              >
                {(isRoleOwner || isOwner ||
                  (cMember?.accessType !== "viewer" && cMember?.role === "admin"))
                  && <Button
                    disabled={loadingDelete}
                    onClick={() => handleRemoveAccessEmail(item.token)}
                    className={`${isMobileView ? "mb-2" : "mr-1"}`}
                  >
                    <TrashIcon className="h-5 w-5 m-0" />
                  </Button>}
                {(isRoleOwner || isOwner || cMember?.accessType === "editor") && (
                  <Button
                    disabled={loadingDelete}
                    onClick={() => handleEditEmail(item)}
                  >
                    <PencilSquareIcon className="h-5 w-5 m-0" />
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* <div className="flex justify-between">
          <div
            className={`border-r border-[#D0D5DD] pr-1 ${
              isMobileView ? "w-[45%]" : "w-[30%]"
            }`}
          >
            <h6 className="text-[#505050] block text-xs font-medium mb-2">
              Expire on
            </h6>
            <DatePicker
              onChange={(date, dateStirng) =>
                handleChangeEditEmailData(
                  "expiryDate",
                  dateStirng
                )
              }
              format={"DD/MM/YYYY"}
              value={moment(
                editEmailData.expiryDate,
                "DD/MM/YYYY"
              )}
              showToday={false}
              allowClear={false}
              style={{
                width: isMobileView ? "fit-content" : "120px",
              }}
            />
          </div>

          <div
            className={`border-r border-[#D0D5DD] px-1 ${
              isMobileView ? "w-[30%]" : "w-[40%]"
            }`}
          >
            <h6 className="text-[#505050] block text-xs font-medium mb-2">
              Expire after
            </h6>

            <div
              className={`flex ${
                isMobileView ? "flex-col" : "flex-row"
              }`}
            >
              <div
                className={`flex ${
                  isMobileView
                    ? "mb-1 flex-col-reverse"
                    : "mr-1 flex-col"
                }`}
              >
                <Input
                  placeholder=""
                  value={editEmailData?.allowViews || ""}
                  onChange={(e) =>
                    handleChangeEditEmailData(
                      "allowViews",
                      e.target.value
                    )
                  }
                  className="custom-ant-input"
                />
                <span className="text-xs text-[#667085]">
                  Views
                </span>
              </div>
              <div
                className={`flex ${
                  isMobileView
                    ? "mb-1 flex-col-reverse"
                    : "mr-1 flex-col"
                }`}
              >
                <Input
                  placeholder=""
                  value={editEmailData?.allowsDownload || ""}
                  onChange={(e) =>
                    handleChangeEditEmailData(
                      "allowsDownload",
                      e.target.value
                    )
                  }
                  className="custom-ant-input"
                />
                <span className="text-xs text-[#667085]">
                  Downloads
                </span>
              </div>
            </div>
          </div>

          <div
            className={`${
              isMobileView ? "w-[20%]" : "w-[28%]"
            } pl-1`}
          >
            <h6 className="text-[#505050] block text-xs font-medium mb-2">
              Actions
            </h6>
            <div
              className={`flex items-center ${
                isMobileView ? "flex-col" : "flex-row"
              }`}
            >
              <Button
                disabled={loading}
                onClick={() => handleCancelEmail(item.token)}
                className={`${isMobileView ? "mb-2" : "mr-1"}`}
              >
                <XMarkIcon className="h-5 w-5 m-0" />
              </Button>

              <Button
                disabled={loading}
                onClick={() => handleSecurityChangeEmail()}
              >
                <CheckIcon className="h-5 w-5 m-0" />
              </Button>
            </div>
          </div>
        </div> */}
        <Divider className="m-0 my-4" />
      </div>
    );
  };

  const handleKeyUp = async (e) => {
    if ((e.code === "Enter" || e.code === "NumpadEnter") && e.target.value.trim() !== "") {
      const inputValue = e.target.value.trim();
      const uIdx = allFilteredUsers.findIndex((u) => (u?.email === inputValue || u?.username === inputValue))
      if (uIdx !== -1 ) {
          const user = allFilteredUsers[uIdx]
          setNewUsers([...newUsers, user.id])
          return
      }

      const filteredArr = allFilteredUsers.filter((u) => `${u.username}-${u.email}`.toLowerCase().includes(inputValue.toLowerCase()))
      if (filteredArr.length > 0) {
          setNewUsers([...newUsers, filteredArr[0].id])
          return
      }
      const msg = Validator.validate("email", inputValue, 6, 50, true)

      if (elm.current) {
        elm.current.blur();
      }
      if (msg !== "") {
        message.error(msg);
        return;
      }
      const idx = allRegisterUsersList.findIndex((u) => u.email === inputValue);
      const guestObj = {
        email: idx === -1 ? inputValue.toLowerCase() : inputValue,
        isGuest: true,
        author: session.userId,
        username: idx !== -1 ? allRegisterUsersList[idx].id : null,
        collections: parseInt(collectionId)
      }
      const teamRes = await dispatch(addTeam(guestObj))
      if (teamRes?.error) {
        return
      }
      const ENV = process.env.NEXT_PUBLIC_ENV;
      if (ENV === "production") {
        const emailVerificationResult = await dispatch(
          emailVerification(inputValue)
        );
        const invalidStatuses = ["invalid", "disposable", "disabled"];
        const status = emailVerificationResult?.payload?.data?.status;

        if (invalidStatuses.includes(status)) {
          message.error("Please enter a valid email address");
          return;
        }
      }
      const newUser = {
        id: inputValue.toLowerCase(),
        email: inputValue.toLowerCase(),
        avatar: null,
        username: null,
        name: inputValue.toLowerCase(),
      };
      setFilteredUsers([...filteredUsers, newUser]);
      setNewUsers([...newUsers, newUser.id]);
    }
  };

  const renderEmailInviteTab = () => {
    return (
      <>
        <div className="bg-[#FAFCFF] rounded-[6px] border border-solid border-[#DADEE8] p-3 mb-3">
          <div>
            {/* <h6 className="block text-sm font-medium text-[#344054] mb-1">
              Invite by email
            </h6> */}

            <div className="flex">
              <Select
                mode="multiple"
                ref={elm}
                placeholder='Enter email'
                // options={filteredUsers.map((user) => { return { ...user, label: user.email, value: user.email } })}
                // className="w-full"
                style={{
                  width: 286
                }}
                className="ct-share-invite-select"
                tagRender={(props) => {
                  const { value } = props;
                  const idx = filteredUsers.findIndex(
                    (user) => user.id === value
                  );
                  if (idx !== -1) {
                    const user = filteredUsers[idx];
                    return (
                      <Tag
                        key={user.id}
                        className="flex p-2"
                        closable={true}
                        onClose={() => onUserRemove(user.id)}
                      >
                        <div className="flex flex-row items-center">
                          <Avatar src={user.avatar} className="mr-2">
                            {user?.name?.charAt(0).toUpperCase()}
                          </Avatar>
                          <span>{user.name}</span>
                        </div>
                      </Tag>
                    );
                  }
                  return null;
                }}
                value={newUsers}
                onInputKeyDown={handleKeyUp}
                onChange={(e, users) => {
                  setNewUsers(e);
                }}
                optionFilterProp="title"
                filterOption={(inputVal, option) => {
                  return option.title
                    .toLowerCase()
                    .includes(inputVal.toLowerCase());
                }}
                allowClear
                autoFocus
              >
                {filteredUsers.map((user) => {
                  return (
                    <Option
                      key={user.id}
                      value={user.id}
                      title={`${user.name}-${user.email}`}
                    >
                      <div className="flex flex-row items-center">
                        <Avatar src={user.avatar} className="mr-2">
                          {user?.name?.charAt(0).toUpperCase()}
                        </Avatar>
                        <span>{user.name}</span>
                        <span>
                          {user?.isGroup ? (
                            <MdGroups className="ml-2" />
                          ) : (
                            <></>
                          )}
                        </span>
                      </div>
                    </Option>
                  );
                })}
              </Select>

              {/* <Input
                placeholder="you@company.com"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                className="custom-ant-input"
              /> */}
              <Select
                className="ml-3 h-[max-content]"
                placeholder="Select"
                value={accessTypeEmailInvite}
                onChange={(value) => setAccessTypeEmailInvite(value)}
              >
                <Option value={"viewer"}>Viewer</Option>
                <Option value={"editor"}>Editor</Option>
                <Option value={"owner"}>Owner</Option>
              </Select>
            </div>
          </div>

          <div className="mt-2">
            {/* <h6 className="block text-sm font-medium text-[#344054] mb-1">
              Description
            </h6> */}

            <div className="flex">
              <Input
                placeholder="Add a message...(recommended)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="custom-ant-input"
              />

              {(!currentCollectionAccessType ||
                (currentCollectionAccessType &&
                  (currentCollectionAccessType?.accessType === "editor" ||
                    currentCollectionAccessType?.accessType === "owner"))) && (
                  <Button
                    type="primary"
                    className="rounded-full ml-3 bg-[#347AE2] hover:bg-[#347AE2]"
                    onClick={handleEmailInvite}
                    disabled={loading}
                  >
                    Invite
                  </Button>
                )}
            </div>
          </div>
        </div>

        {singleCollectionDetails?.invitedUsersViaMail &&
          singleCollectionDetails?.invitedUsersViaMail.length > 0 && (
            <div className="bg-[#FAFCFF] rounded-[6px] border border-solid border-[#DADEE8] p-3">
              {parseInt(session.userId) !== parseInt(singleCollectionDetails?.author?.data?.id) &&
                <div className="flex w-full justify-between items-center">
                  <div>
                    <span className="text-[#101828] font-bold block text-md mr-2">Owner</span>
                  </div>
                  <div className="flex flex-row justify-between items-center" onClick={() => window.open(`${process.env.NEXT_PUBLIC_BASE_URL}/${singleCollectionDetails?.author?.data?.attributes?.username}`, "_blank")}>
                    <Avatar className="mr-2" src={singleCollectionDetails?.author?.data?.attributes?.profilePhoto}>{singleCollectionDetails?.author?.data?.attributes?.firstname ? singleCollectionDetails?.author?.data?.attributes?.firstname?.charAt(0).toUpperCase() : singleCollectionDetails?.author?.data?.attributes?.username?.charAt(0).toUpperCase()}</Avatar>
                    <span className="text-[#667085] block text-md mr-2">{singleCollectionDetails?.author?.data?.attributes?.firstname && singleCollectionDetails?.author?.data?.attributes?.lastname ? `${singleCollectionDetails?.author?.data?.attributes?.firstname} ${singleCollectionDetails?.author?.data?.attributes?.lastname}` : singleCollectionDetails?.author?.data?.attributes?.username}</span>
                  </div>
                </div>
              }
              <div className="flex items-center mb-3">
                <h6 className="text-[#347AE2] block text-xs">
                  Workspace collaborators
                </h6>
                {/* <InformationCircleIcon className="h-4 w-4 text-[#97A0B5]" /> */}
              </div>
              {singleCollectionDetails?.invitedUsersViaMail &&
                singleCollectionDetails.invitedUsersViaMail?.map((item, i) => {
                  if (item.isViaLink) return null;
                  if (item.isGroupShare) return renderGroupDetails(item);
                  if (isEditEmail && isEditEmail?.item.id === item.id) {
                    return (
                      <div key={i}>
                        <div className="flex my-4 items-center">
                          {item?.userName ? (
                            <Avatar>
                              {item?.userName?.charAt(0).toUpperCase()}
                            </Avatar>
                          ) : (
                            <Avatar>
                              {item?.emailId
                                ?.split("@")[0]
                                ?.charAt(0)
                                .toUpperCase()}
                            </Avatar>
                          )}

                          <div className={`${isMobileView ? "mx-2" : "mx-3"}`}>
                            <span
                              className={`text-[#101828] block ${isMobileView ? "text-xs" : "text-sm"
                                } font-medium`}
                            >
                              {item?.userName || "UnRegister User"}
                            </span>
                            <span
                              className={`text-[#667085] block ${isMobileView ? "text-xs" : "text-sm"
                                }`}
                            >
                              {item?.emailId || ""}
                            </span>
                          </div>

                          <Select
                            className=""
                            placeholder="Select"
                            value={editEmailData?.accessType || null}
                            onChange={(value) =>
                              handleChangeEditEmailData("accessType", value)
                            }
                          >
                            <Option value={"viewer"}>Viewer</Option>
                            <Option value={"editor"}>Editor</Option>
                            <Option value={"owner"}>Owner</Option>
                          </Select>
                        </div>

                        <div className="flex justify-between">
                          <div
                            className={`border-r border-[#D0D5DD] pr-1 ${isMobileView ? "w-[45%]" : "w-[30%]"
                              }`}
                          >
                            <h6 className="text-[#505050] block text-xs font-medium mb-2">
                              Expire on
                            </h6>
                            <DatePicker
                              onChange={(date, dateStirng) =>
                                handleChangeEditEmailData(
                                  "expiryDate",
                                  dateStirng
                                )
                              }
                              format={"DD/MM/YYYY"}
                              value={moment(
                                editEmailData.expiryDate,
                                "DD/MM/YYYY"
                              )}
                              showToday={false}
                              allowClear={false}
                              style={{
                                width: isMobileView ? "fit-content" : "120px",
                              }}
                            />
                          </div>

                          <div
                            className={`border-r border-[#D0D5DD] px-1 ${isMobileView ? "w-[30%]" : "w-[40%]"
                              }`}
                          >
                            <h6 className="text-[#505050] block text-xs font-medium mb-2">
                              Expire after
                            </h6>

                            <div
                              className={`flex ${isMobileView ? "flex-col" : "flex-row"
                                }`}
                            >
                              <div
                                className={`flex ${isMobileView
                                    ? "mb-1 flex-col-reverse"
                                    : "mr-1 flex-col"
                                  }`}
                              >
                                <Input
                                  placeholder=""
                                  value={editEmailData?.allowViews || ""}
                                  onChange={(e) =>
                                    handleChangeEditEmailData(
                                      "allowViews",
                                      e.target.value
                                    )
                                  }
                                  className="custom-ant-input"
                                />
                                <span className="text-xs text-[#667085]">
                                  Views
                                </span>
                              </div>
                              <div
                                className={`flex ${isMobileView
                                    ? "mb-1 flex-col-reverse"
                                    : "mr-1 flex-col"
                                  }`}
                              >
                                <Input
                                  placeholder=""
                                  value={editEmailData?.allowsDownload || ""}
                                  onChange={(e) =>
                                    handleChangeEditEmailData(
                                      "allowsDownload",
                                      e.target.value
                                    )
                                  }
                                  className="custom-ant-input"
                                />
                                <span className="text-xs text-[#667085]">
                                  Downloads
                                </span>
                              </div>
                            </div>
                          </div>

                          <div
                            className={`${isMobileView ? "w-[20%]" : "w-[28%]"
                              } pl-1`}
                          >
                            <h6 className="text-[#505050] block text-xs font-medium mb-2">
                              Actions
                            </h6>
                            <div
                              className={`flex items-center ${isMobileView ? "flex-col" : "flex-row"
                                }`}
                            >
                              <Button
                                disabled={loading}
                                onClick={() => handleCancelEmail(item.token)}
                                className={`${isMobileView ? "mb-2" : "mr-1"}`}
                              >
                                <XMarkIcon className="h-5 w-5 m-0" />
                              </Button>

                              <Button
                                disabled={loading}
                                onClick={() => handleSecurityChangeEmail()}
                              >
                                <CheckIcon className="h-5 w-5 m-0" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  const isViewerAllowedDelete =
                    item?.accessType === "viewer" &&
                    item?.id === Number(session.userId);

                  const isEditorAllowedDelete =
                    item?.accessType === "editor" &&
                    item?.id === Number(session.userId);

                  return (
                    <>
                      <div key={i}>
                        <div className="flex my-4 items-center justify-between">
                          <div className="flex items-center">
                            {item?.userName ? (
                              <Avatar>
                                {item?.userName?.charAt(0).toUpperCase()}
                              </Avatar>
                            ) : (
                              <Avatar>
                                {item?.emailId
                                  ?.split("@")[0]
                                  ?.charAt(0)
                                  .toUpperCase()}
                              </Avatar>
                            )}

                            <div className="mx-2">
                              <span
                                className={`text-[#101828] block ${isMobileView ? "text-xs" : "text-sm"
                                  } font-medium`}
                              >
                                {item?.userName || "UnRegister User"}
                              </span>
                              <span
                                className={`"text-[#667085] block ${isMobileView ? "text-xs" : "text-sm"
                                  }"`}
                              >
                                {item?.emailId || ""}
                              </span>
                            </div>
                          </div>

                          <label
                            className={`${isMobileView ? "text-xs" : "text-sm"
                              }`}
                          >
                            {ACCESS_TYPES[item?.accessType] || ""}
                          </label>

                          {/* <Select
                                                        className=""
                                                        placeholder="Select"
                                                        value={item?.accessType || null}
                                                        disabled
                                                    >
                                                        <Option value={"viewer"}>Viewer</Option>
                                                        <Option value={"editor"}>Editor</Option>
                                                        <Option value={"owner"}>Owner</Option>
                                                    </Select> */}
                        </div>

                        <div className="flex justify-between">
                          {/* <div className="border-r border-[#D0D5DD] px-2">
                                    <h6 className="text-[#505050] block text-xs font-medium mb-2">Password</h6>
                                    <Button><LockClosedIcon className="h-5 w-5 m-0"/></Button>
                                </div> */}

                          <div className="border-r border-[#D0D5DD] pr-1 w-[28%]">
                            <h6 className="text-[#505050] block text-xs font-medium mb-2">
                              Expire on
                            </h6>
                            <label
                              className={`${isMobileView ? "text-xs" : "text-sm"
                                }`}
                            >
                              {item?.expiryDate || ""}
                            </label>
                            {/* <Input
                                                            placeholder=""
                                                            value={item?.expiryDate || ""}
                                                            disabled
                                                            style={{ width: "94px" }}
                                                            className="custom-ant-input"
                                                        /> */}
                          </div>

                          <div
                            className={`border-r border-[#D0D5DD] ${isMobileView ? "w-[45%] pr-2" : "w-[40%] px-1"
                              }`}
                          >
                            <h6 className="text-[#505050] block text-xs font-medium mb-2">
                              Expire after
                            </h6>

                            <div className="flex justify-between">
                              <div className="flex flex-col mr-2">
                                {/* <Input
                                                                    placeholder=""
                                                                    disabled
                                                                    value={item?.allowViews || ""}
                                                                    className="custom-ant-input"
                                                                /> */}
                                <label
                                  className={`${isMobileView ? "text-xs" : "text-sm"
                                    }`}
                                >
                                  {item?.allowViews || ""}
                                </label>
                                <span className="text-xs text-[#667085]">
                                  Views
                                </span>
                              </div>
                              <div className="flex flex-col">
                                {/* <Input
                                                                    placeholder=""
                                                                    disabled
                                                                    value={item?.allowsDownload || ""}
                                                                    className="custom-ant-input"
                                                                /> */}
                                <label
                                  className={`${isMobileView ? "text-xs" : "text-sm"
                                    }`}
                                >
                                  {item?.allowsDownload || ""}
                                </label>
                                <span className="text-xs text-[#667085]">
                                  Downloads
                                </span>
                              </div>
                            </div>
                          </div>

                          {singleCollectionDetails?.author?.data?.id ===
                            Number(session.userId) ||
                            isOwnerAccess ||
                            isViewerAllowedDelete ||
                            isEditorAllowedDelete ? (
                            <div
                              className={`${isMobileView ? "w-[20%]" : "w-[28%]"
                                } `}
                            >
                              <h6 className="text-[#505050] block text-xs font-medium mb-2">
                                Remove access
                              </h6>
                              {/* <div className="flex items-center">
                                        <TrashIcon className="h-5 w-5 m-0 cursor-pointer" onClick={() => handleRemoveAccessEmail(item.token)} disabled={loadingDelete}/>
                                        <PencilSquareIcon disabled={loadingDelete} 
                                        onClick={() => handleEditEmail(item)} className="h-5 w-5 m-0 cursor-pointer"/>
                                    </div> */}
                              <div
                                className={`flex items-center ${isMobileView ? "flex-col" : "flex-row"
                                  }`}
                              >
                                <Button
                                  disabled={loadingDelete}
                                  onClick={() =>
                                    handleRemoveAccessEmail(item.token)
                                  }
                                  className={`${isMobileView ? "mb-2" : "mr-1"
                                    }`}
                                >
                                  <TrashIcon className="h-5 w-5 m-0" />
                                </Button>
                                {isViewerAllowedDelete ||
                                  isEditorAllowedDelete ? (
                                  ""
                                ) : (
                                  <Button
                                    disabled={loadingDelete}
                                    onClick={() => handleEditEmail(item)}
                                  >
                                    <PencilSquareIcon className="h-5 w-5 m-0" />
                                  </Button>
                                )}
                              </div>
                            </div>
                          ) : (
                            <div className="w-[28%]"></div>
                          )}
                        </div>
                      </div>

                      <Divider className="m-0 my-4" />
                    </>
                  );
                })}
            </div>
          )}

        {/* render link details  */}

        {renderLinkDetailsInEmail && renderLinkDetailsInEmail.length > 0 && (
          <div className="bg-[#FAFCFF] rounded-[6px] border border-solid border-[#DADEE8] p-3 mt-4">
            <div className="flex items-center mb-3">
              <h6 className="text-[#667085] block text-xs mr-2">
                Invite links
              </h6>
              <InformationCircleIcon className="h-4 w-4 text-[#97A0B5]" />
            </div>
            {renderLinkDetailsInEmail &&
              renderLinkDetailsInEmail?.map((item, i) => {
                if (isEditEmail && isEditEmail?.item.id === item.id) {
                  return (
                    <div key={i}>
                      <div className="flex my-4 items-center">
                        {item?.userName ? (
                          <Avatar>
                            {item?.userName?.charAt(0).toUpperCase()}
                          </Avatar>
                        ) : (
                          <Avatar>
                            {item?.emailId
                              ?.split("@")[0]
                              ?.charAt(0)
                              .toUpperCase()}
                          </Avatar>
                        )}

                        <div className="mx-3">
                          <span className="text-[#101828] block text-sm font-medium">
                            {item?.userName || "UnRegister User"}
                          </span>
                          <span className="text-[#667085] block text-sm">
                            {item?.emailId || ""}
                          </span>
                        </div>

                        <Select
                          className=""
                          placeholder="Select"
                          value={editEmailData?.accessType || null}
                          onChange={(value) =>
                            handleChangeEditEmailData("accessType", value)
                          }
                        >
                          <Option value={"viewer"}>Viewer</Option>
                          <Option value={"editor"}>Editor</Option>
                          <Option value={"owner"}>Owner</Option>
                        </Select>
                      </div>

                      <div className="flex justify-between">
                        <div className="border-r border-[#D0D5DD] pr-1 w-[35%]">
                          <h6 className="text-[#505050] block text-xs font-medium mb-2">
                            Expire on
                          </h6>
                          <DatePicker
                            onChange={(date, dateStirng) =>
                              handleChangeEditEmailData(
                                "expiryDate",
                                dateStirng
                              )
                            }
                            format={"DD/MM/YYYY"}
                            value={moment(
                              editEmailData.expiryDate,
                              "DD/MM/YYYY"
                            )}
                            showToday={false}
                            allowClear={false}
                            style={{ width: "120px" }}
                          />
                        </div>

                        <div className="border-r border-[#D0D5DD] px-1 w-[40%]">
                          <h6 className="text-[#505050] block text-xs font-medium mb-2">
                            Expire after
                          </h6>

                          <div className="flex">
                            <div className="flex flex-col mr-1">
                              <Input
                                placeholder=""
                                value={editEmailData?.allowViews || ""}
                                onChange={(e) =>
                                  handleChangeEditEmailData(
                                    "allowViews",
                                    e.target.value
                                  )
                                }
                                className="custom-ant-input"
                              />
                              <span className="text-xs text-[#667085]">
                                Views
                              </span>
                            </div>
                            <div className="flex flex-col">
                              <Input
                                placeholder=""
                                value={editEmailData?.allowsDownload || ""}
                                onChange={(e) =>
                                  handleChangeEditEmailData(
                                    "allowsDownload",
                                    e.target.value
                                  )
                                }
                                className="custom-ant-input"
                              />
                              <span className="text-xs text-[#667085]">
                                Downloads
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="w-[28%] pl-1">
                          <h6 className="text-[#505050] block text-xs font-medium mb-2">
                            Actions
                          </h6>
                          <div className="flex items-center">
                            <Button
                              disabled={loading}
                              onClick={() => handleCancelEmail(item.token)}
                              className="mr-1"
                            >
                              <XMarkIcon className="h-5 w-5 m-0" />
                            </Button>

                            <Button
                              disabled={loading}
                              onClick={() => handleSecurityChangeEmail()}
                            >
                              <CheckIcon className="h-5 w-5 m-0" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }

                const isViewerAllowedDelete =
                  item?.accessType === "viewer" &&
                  item?.id === Number(session.userId);

                const isEditorAllowedDelete =
                  item?.accessType === "editor" &&
                  item?.id === Number(session.userId);

                return (
                  <>
                    <div key={i}>
                      <div className="flex my-4 items-center justify-between">
                        <div className="flex items-center">
                          {item?.userName ? (
                            <Avatar>
                              {item?.userName?.charAt(0).toUpperCase()}
                            </Avatar>
                          ) : (
                            <Avatar>
                              {item?.emailId
                                ?.split("@")[0]
                                ?.charAt(0)
                                .toUpperCase()}
                            </Avatar>
                          )}

                          <div className="mx-3">
                            <span className="text-[#101828] block text-sm font-medium">
                              {item?.userName || "UnRegister User"}
                            </span>
                            <span className="text-[#667085] block text-sm">
                              {item?.emailId || ""}
                            </span>
                          </div>
                        </div>
                        <label>{ACCESS_TYPES[item?.accessType]}</label>
                        {/* <Select
                                                        className=""
                                                        placeholder="Select"
                                                        value={item?.accessType || null}
                                                        disabled
                                                    >
                                                        <Option value={"viewer"}>Viewer</Option>
                                                        <Option value={"editor"}>Editor</Option>
                                                        <Option value={"owner"}>Owner</Option>
                                                    </Select> */}
                      </div>

                      <div className="flex justify-between">
                        <div className="border-r border-[#D0D5DD] pr-1 w-[28%]">
                          <h6 className="text-[#505050] block text-xs font-medium mb-2">
                            Expire on
                          </h6>
                          <label>{item?.expiryDate || ""}</label>
                          {/* <Input
                                                            placeholder=""
                                                            value={item?.expiryDate || ""}
                                                            disabled
                                                            style={{ width: "94px" }}
                                                            className="custom-ant-input"
                                                        /> */}
                        </div>

                        <div className="border-r border-[#D0D5DD] px-1 w-[40%]">
                          <h6 className="text-[#505050] block text-xs font-medium mb-2">
                            Expire after
                          </h6>

                          <div className="flex justify-between">
                            <div className="flex flex-col mr-1">
                              {/* <Input
                                                                    placeholder=""
                                                                    disabled
                                                                    value={item?.allowViews || ""}
                                                                    className="custom-ant-input"
                                                                /> */}
                              <label>{item?.allowViews || ""}</label>
                              <span className="text-xs text-[#667085]">
                                Views
                              </span>
                            </div>
                            <div className="flex flex-col">
                              {/* <Input
                                                                    placeholder=""
                                                                    disabled
                                                                    value={item?.allowsDownload || ""}
                                                                    className="custom-ant-input"
                                                                /> */}
                              <label>{item?.allowsDownload || ""}</label>
                              <span className="text-xs text-[#667085]">
                                Downloads
                              </span>
                            </div>
                          </div>
                        </div>

                        {singleCollectionDetails?.author?.data?.id ===
                          Number(session.userId) || isOwnerAccessLink ? (
                          <div className="w-[28%]">
                            <h6 className="text-[#505050] block text-xs font-medium mb-2">
                              Remove access
                            </h6>
                            <div className="flex items-center">
                              <Button
                                className="mr-1"
                                disabled={loadingDelete}
                                onClick={() =>
                                  handleRemoveAccessEmail(item.token)
                                }
                              >
                                <TrashIcon className="h-5 w-5 m-0" />
                              </Button>
                              {isViewerAllowedDelete ||
                                isEditorAllowedDelete ? (
                                ""
                              ) : (
                                <Button
                                  disabled={loadingDelete}
                                  onClick={() => handleEditEmail(item)}
                                >
                                  <PencilSquareIcon className="h-5 w-5 m-0" />
                                </Button>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div className="w-[28%]"></div>
                        )}
                      </div>
                    </div>

                    <Divider className="m-0 my-4" />
                  </>
                );
              })}
          </div>
        )}
      </>
    );
  };

  const renderLinkInviteTab = () => {
    return (
      <>
        <div className="bg-[#FAFCFF] rounded-[6px] border border-solid border-[#DADEE8] p-3 mb-3">
          <h6 className="text-[#667085] block text-xs mb-2">
            These links are great for group emails or chat to get your team
            on-board.
          </h6>

          <h6 className="text-[#505050] block text-sm mb-3 font-medium">
            Create an invite link that grants
            <Select
              className={`${isMobileView ? "mx-0" : "mx-3"}`}
              placeholder="Select"
              value={accessTypeLinkInvite}
              onChange={(value) => setAccessTypeLinkInvite(value)}
            >
              <Option value={"viewer"}>Viewer</Option>
              <Option value={"editor"}>Editor</Option>
              <Option value={"owner"}>Owner</Option>
            </Select>
            access to anyone who opens it.
          </h6>

          <Radio.Group
            onChange={(e) => setAllOrSpecificRadio(e.target.value)}
            value={allOrSpecificRadio}
            style={{
              color: "#505050",
            }}
          >
            <Radio value={"all"} style={{ color: "#505050" }}>
              Allow any email address
            </Radio>
            <Radio value={"specific"}>
              <div
                className="flex items-center justify-center"
                style={{ width: "100%" }}
              >
                <span
                  className="block mr-1"
                  style={{ width: "20%", textWrap: "no-wrap" }}
                >
                  Only allow
                </span>
                <Input
                  placeholder="company.com"
                  style={{ width: "50%" }}
                  value={specificEmailAddressLink}
                  onChange={(e) => setSpecificEmailAddressLink(e.target.value)}
                  className="custom-ant-input"
                />
                <span className="block ml-1" style={{ width: "30%" }}>
                  email address
                </span>
              </div>
            </Radio>
          </Radio.Group>

          {(!currentCollectionAccessType ||
            (currentCollectionAccessType &&
              (currentCollectionAccessType?.accessType === "editor" ||
                currentCollectionAccessType?.accessType === "owner"))) && (
              <Button
                className="bg-[#347AE2] border-[#347AE2] text-white hover:bg-[#347AE2] hover:border-[#347AE2] hover:text-white mt-4"
                onClick={handleInviteLink}
                disabled={loading}
              >
                Create Link
              </Button>
            )}
        </div>

        {singleCollectionDetails?.invitedUsersViaLinks &&
          singleCollectionDetails?.invitedUsersViaLinks.length > 0 && (
            <div className="bg-[#FAFCFF] rounded-[6px] border border-solid border-[#DADEE8] p-3">
              <div className="flex items-center mb-2">
                <h6 className="text-[#667085] block text-xs mr-2">
                  Invite links
                </h6>
                <InformationCircleIcon className="h-4 w-4 text-[#97A0B5]" />
              </div>

              {singleCollectionDetails?.invitedUsersViaLinks &&
                singleCollectionDetails?.invitedUsersViaLinks?.map(
                  (item, i) => {
                    if (isEditLink && isEditLink?.item.id === item.id) {
                      return (
                        <div key={i}>
                          <div className="flex my-4">
                            <Input
                              placeholder="you@company.com"
                              disabled
                              suffix={
                                <DocumentDuplicateIcon
                                  className="h-5 w-5 text-[#515151] cursor-pointer"
                                  onClick={() => handleCopyLink(item?.url)}
                                />
                              }
                              value={item?.url || ""}
                            // className="custom-ant-input"
                            />
                            <Select
                              className="ml-3"
                              placeholder="Select"
                              value={editLinkData?.accessType || null}
                              onChange={(value) =>
                                handleChangeEditLinkData("accessType", value)
                              }
                            >
                              <Option value={"viewer"}>Viewer</Option>
                              <Option value={"editor"}>Editor</Option>
                              <Option value={"owner"}>Owner</Option>
                            </Select>
                          </div>

                          <div className="flex justify-between">
                            <div
                              className={`border-r border-[#D0D5DD] pr-1 ${isMobileView ? "w-[45%]" : "w-[35%]"
                                }`}
                            >
                              <h6 className="text-[#505050] block text-xs font-medium mb-2">
                                Expire on
                              </h6>
                              <DatePicker
                                onChange={(date, dateStirng) =>
                                  handleChangeEditLinkData(
                                    "expiryDate",
                                    dateStirng
                                  )
                                }
                                format={"DD/MM/YYYY"}
                                value={moment(
                                  editLinkData.expiryDate,
                                  "DD/MM/YYYY"
                                )}
                                showToday={false}
                                allowClear={false}
                                style={{
                                  width: isMobileView ? "fit-content" : "120px",
                                }}
                              />
                            </div>

                            <div
                              className={`border-r border-[#D0D5DD] px-1 ${isMobileView ? "w-[30%]" : "w-[40%]"
                                }`}
                            >
                              <h6 className="text-[#505050] block text-xs font-medium mb-2">
                                Expire after
                              </h6>

                              <div
                                className={`flex ${isMobileView ? "flex-col" : "flex-row"
                                  }`}
                              >
                                <div
                                  className={`flex ${isMobileView
                                      ? "flex-col-reverse mb-1"
                                      : "flex-col mr-1"
                                    }`}
                                >
                                  <Input
                                    placeholder=""
                                    value={editLinkData?.allowViews || ""}
                                    onChange={(e) =>
                                      handleChangeEditLinkData(
                                        "allowViews",
                                        e.target.value
                                      )
                                    }
                                    className="custom-ant-input"
                                  />
                                  <span className="text-xs text-[#667085]">
                                    Views
                                  </span>
                                </div>
                                <div
                                  className={`flex ${isMobileView
                                      ? "flex-col-reverse"
                                      : "flex-col"
                                    }`}
                                >
                                  <Input
                                    placeholder=""
                                    value={editLinkData?.allowsDownload || ""}
                                    onChange={(e) =>
                                      handleChangeEditLinkData(
                                        "allowsDownload",
                                        e.target.value
                                      )
                                    }
                                    className="custom-ant-input"
                                  />
                                  <span className="text-xs text-[#667085]">
                                    Downloads
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div
                              className={`${isMobileView ? "w-[20%]" : "w-[28%]"
                                } pl-1`}
                            >
                              <h6 className="text-[#505050] block text-xs font-medium mb-2">
                                Actions
                              </h6>
                              <div
                                className={`flex items-center ${isMobileView ? "flex-col" : "flex-row"
                                  }`}
                              >
                                <Button
                                  disabled={loading}
                                  onClick={() => handleCancelLink(item.token)}
                                  className={`${isMobileView ? "mb-1" : "mr-1"
                                    }`}
                                >
                                  <XMarkIcon className="h-5 w-5 m-0" />
                                </Button>

                                <Button
                                  disabled={loading}
                                  onClick={() => handleSecurityChangeLink()}
                                >
                                  <CheckIcon className="h-5 w-5 m-0" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return (
                      <>
                        <div key={i}>
                          <div className="flex items-center mb-2 justify-end font-bold">
                            {item.allowAllMail !== ""
                              ? `Allowed Domain: ${item.allowAllMail}`
                              : "Allowed all domains"}
                          </div>
                          <div className="flex items-center my-4">
                            <Input
                              placeholder="you@company.com"
                              disabled
                              suffix={
                                <DocumentDuplicateIcon
                                  className="h-5 w-5 text-[#515151] cursor-pointer"
                                  onClick={() => handleCopyLink(item?.url)}
                                />
                              }
                              value={item?.url || ""}
                            />
                            <label className="ml-10">
                              {ACCESS_TYPES[item?.accessType] || ""}
                            </label>
                            {/* <Select
                                                            className="ml-3"
                                                            placeholder="Select"
                                                            value={item?.accessType || null}
                                                            disabled
                                                        >
                                                            <Option value={"viewer"}>Viewer</Option>
                                                            <Option value={"editor"}>Editor</Option>
                                                            <Option value={"owner"}>Owner</Option>
                                                        </Select> */}
                          </div>

                          <div className="flex justify-between">
                            <div className="border-r border-[#D0D5DD] pr-1 w-[28%]">
                              <h6 className="text-[#505050] block text-xs font-medium mb-2">
                                Expire on
                              </h6>
                              <label
                                className={`${isMobileView ? "text-xs" : "text-sm"
                                  }`}
                              >
                                {item?.expiryDate || ""}
                              </label>
                              {/* <Input
                                                                placeholder=""
                                                                disabled
                                                                style={{ width: "94px" }}
                                                                value={item?.expiryDate || ""}
                                                                className="custom-ant-input"
                                                            /> */}
                            </div>

                            <div
                              className={`border-r border-[#D0D5DD] px-1 ${isMobileView ? "w-[45%]" : "w-[40%]"
                                }`}
                            >
                              <h6 className="text-[#505050] block text-xs font-medium mb-2">
                                Expire after
                              </h6>

                              <div className="flex justify-between">
                                <div className="flex flex-col mr-1">
                                  {/* <Input
                                                                        placeholder=""
                                                                        disabled
                                                                        value={item?.allowViews || ""}
                                                                        className="custom-ant-input"
                                                                    /> */}
                                  <label
                                    className={`${isMobileView ? "text-xs" : "text-sm"
                                      }`}
                                  >
                                    {item?.allowViews || ""}
                                  </label>
                                  <span className="text-xs text-[#667085]">
                                    Views
                                  </span>
                                </div>
                                <div className="flex flex-col">
                                  {/* <Input
                                                                        placeholder=""
                                                                        disabled
                                                                        value={item?.allowsDownload || ""}
                                                                        className="custom-ant-input"
                                                                    /> */}
                                  <label
                                    className={`${isMobileView ? "text-xs" : "text-sm"
                                      }`}
                                  >
                                    {item?.allowsDownload || ""}
                                  </label>
                                  <span className="text-xs text-[#667085]">
                                    Downloads
                                  </span>
                                </div>
                              </div>
                            </div>

                            {singleCollectionDetails?.author?.data?.id ===
                              Number(session.userId) || isOwnerAccessLink ? (
                              <div
                                className={`${isMobileView ? "w-[20%]" : "w-[28%]"
                                  }`}
                              >
                                <h6 className="text-[#505050] block text-xs font-medium mb-2">
                                  Remove access
                                </h6>
                                <div
                                  className={`flex items-center ${isMobileView ? "flex-col" : "flex-row"
                                    }`}
                                >
                                  <Button
                                    className={`${isMobileView ? "mb-1" : "mr-1"
                                      }`}
                                    disabled={loadingDelete}
                                    onClick={() =>
                                      handleRemoveAccessLink(item.id)
                                    }
                                  >
                                    <TrashIcon className="h-5 w-5 m-0" />
                                  </Button>
                                  <Button
                                    disabled={loadingDelete}
                                    onClick={() => handleEditLink(item)}
                                  >
                                    <PencilSquareIcon className="h-5 w-5 m-0" />
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <div className="w-[28%]"></div>
                            )}
                          </div>
                        </div>

                        <Divider className="m-0 my-4" />
                      </>
                    );
                  }
                )}
            </div>
          )}
      </>
    );
  };

  const renderSharePubliclyTab = () => {
    return (
      <>
        <div className="bg-[#FAFCFF] rounded-[6px] border border-solid border-[#DADEE8] p-3">
          <div className="flex items-center">
            <Switch
              checked={publicSwitch}
              onChange={handlePublicSwitch}
              style={{ background: publicSwitch ? "#1890ff" : "#00000040" }}
              size="small"
              loading={loadingSwitch}
            />
            <h6 className="text-[#505050] block text-sm font-medium ml-2">
              Enable shared base link (Public)
            </h6>
          </div>

          <Divider className="text-[#D0D5DD] m-0 w-full my-3" />

          {singleCollectionDetails?.isPublicLink && (
            <>
              <div className="flex items-center ">
                <Input
                  placeholder=""
                  disabled
                  suffix={
                    <DocumentDuplicateIcon
                      className="h-5 w-5 text-[#515151] cursor-pointer"
                      onClick={() => {
                        // if (!password) {
                        //     message.error("Set Password for this link");
                        //     return;
                        // }
                        handleCopyLink(publicLinkUrl);
                      }}
                    />
                  }
                  value={publicLinkUrl || ""}
                />
                <Button
                  className="ml-2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {password ? (
                    <LockClosedIcon className="h-5 w-5 m-0" />
                  ) : (
                    <LockOpenIcon className="h-5 w-5 m-0" />
                  )}
                </Button>
              </div>

              {/* {singleCollectionDetails &&
                                singleCollectionDetails?.isPublicLink &&
                                !singleCollectionDetails?.collectionPassword && (
                                    <small className="block my-2 text-red-500 text-xs- font-medium">
                                        Add Password for this link before sharing
                                    </small>
                                )} */}

              {showPassword && (
                <div className="my-2 flex items-center">
                  <Input
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="false"
                    className="custom-ant-input"
                  />
                  <Button
                    className="mx-1"
                    onClick={() => handleSetPasswordPublic("update")}
                    disabled={loading}
                  >
                    Update
                  </Button>
                  {password && (
                    <Button
                      onClick={() => handleSetPasswordPublic("delete")}
                      disabled={loading}
                    >
                      <TrashIcon className="h-4 w-4 text-[#EB5757]" />
                    </Button>
                  )}
                </div>
              )}

              {/* <div className="mt-2 flex justify-between">
                                <div className="w-[50%] mr-3">
                                    <h6 className="text-[#505050] block text-sm font-medium">
                                        View Settings
                                    </h6>

                                    <div className="flex items-center justify-between py-[5px] px-[12px] hover:bg-[#f5f5f5]">
                                        <span className="text-[#344054]">Upvote</span>
                                        {viewSettings?.upvote ? (
                                            <EyeIcon
                                                className="h-5 w-5 text-[#347AE2] cursor-pointer"
                                                onClick={() => handleViewSettings("upvote", false)}
                                            />
                                        ) : (
                                            <EyeSlashIcon
                                                className="h-5 w-5 text-[#97A0B5] cursor-pointer"
                                                onClick={() => handleViewSettings("upvote", true)}
                                            />
                                        )}
                                    </div>
                                    <div className="flex items-center justify-between py-[5px] px-[12px] hover:bg-[#f5f5f5]">
                                        <span className="text-[#344054]">Downvote</span>
                                        {viewSettings?.downvote ? (
                                            <EyeIcon
                                                className="h-5 w-5 text-[#347AE2] cursor-pointer"
                                                onClick={() => handleViewSettings("downvote", false)}
                                            />
                                        ) : (
                                            <EyeSlashIcon
                                                className="h-5 w-5 text-[#97A0B5] cursor-pointer"
                                                onClick={() => handleViewSettings("downvote", true)}
                                            />
                                        )}
                                    </div>
                                    <div className="flex items-center justify-between py-[5px] px-[12px] hover:bg-[#f5f5f5]">
                                        <span className="text-[#344054]">Likes</span>
                                        {viewSettings?.likes ? (
                                            <EyeIcon
                                                className="h-5 w-5 text-[#347AE2] cursor-pointer"
                                                onClick={() => handleViewSettings("likes", false)}
                                            />
                                        ) : (
                                            <EyeSlashIcon
                                                className="h-5 w-5 text-[#97A0B5] cursor-pointer"
                                                onClick={() => handleViewSettings("likes", true)}
                                            />
                                        )}
                                    </div>
                                    <div className="flex items-center justify-between py-[5px] px-[12px] hover:bg-[#f5f5f5]">
                                        <span className="text-[#344054]">Comment</span>
                                        {viewSettings?.comment ? (
                                            <EyeIcon
                                                className="h-5 w-5 text-[#347AE2] cursor-pointer"
                                                onClick={() => handleViewSettings("comment", false)}
                                            />
                                        ) : (
                                            <EyeSlashIcon
                                                className="h-5 w-5 text-[#97A0B5] cursor-pointer"
                                                onClick={() => handleViewSettings("comment", true)}
                                            />
                                        )}
                                    </div>
                                    <div className="flex items-center justify-between py-[5px] px-[12px] hover:bg-[#f5f5f5]">
                                        <span className="text-[#344054]">Public Search</span>
                                        {viewSettings?.publicSearch ? (
                                            <EyeIcon
                                                className="h-5 w-5 text-[#347AE2] cursor-pointer"
                                                onClick={() =>
                                                    handleViewSettings("publicSearch", false)
                                                }
                                            />
                                        ) : (
                                            <EyeSlashIcon
                                                className="h-5 w-5 text-[#97A0B5] cursor-pointer"
                                                onClick={() => handleViewSettings("publicSearch", true)}
                                            />
                                        )}
                                    </div>
                                    <div className="flex items-center justify-between py-[5px] px-[12px] hover:bg-[#f5f5f5]">
                                        <span className="text-[#344054]">Filter by tags</span>
                                        {viewSettings?.filterByTags ? (
                                            <EyeIcon
                                                className="h-5 w-5 text-[#347AE2] cursor-pointer"
                                                onClick={() =>
                                                    handleViewSettings("filterByTags", false)
                                                }
                                            />
                                        ) : (
                                            <EyeSlashIcon
                                                className="h-5 w-5 text-[#97A0B5] cursor-pointer"
                                                onClick={() => handleViewSettings("filterByTags", true)}
                                            />
                                        )}
                                    </div>
                                    <div className="flex items-center justify-between py-[5px] px-[12px] hover:bg-[#f5f5f5]">
                                        <span className="text-[#344054]">Filter by collection</span>
                                        {viewSettings?.filterByCollection ? (
                                            <EyeIcon
                                                className="h-5 w-5 text-[#347AE2] cursor-pointer"
                                                onClick={() =>
                                                    handleViewSettings("filterByCollection", false)
                                                }
                                            />
                                        ) : (
                                            <EyeSlashIcon
                                                className="h-5 w-5 text-[#97A0B5] cursor-pointer"
                                                onClick={() =>
                                                    handleViewSettings("filterByCollection", true)
                                                }
                                            />
                                        )}
                                    </div>
                                    <div className="flex items-center justify-between py-[5px] px-[12px] hover:bg-[#f5f5f5]">
                                        <span className="text-[#344054]">Filter type</span>
                                        {viewSettings?.filterType ? (
                                            <EyeIcon
                                                className="h-5 w-5 text-[#347AE2] cursor-pointer"
                                                onClick={() => handleViewSettings("filterType", false)}
                                            />
                                        ) : (
                                            <EyeSlashIcon
                                                className="h-5 w-5 text-[#97A0B5] cursor-pointer"
                                                onClick={() => handleViewSettings("filterType", true)}
                                            />
                                        )}
                                    </div>

                                    <div className='flex items-center justify-between py-[5px] px-[12px] hover:bg-[#f5f5f5]'>
                            <span className='text-[#344054]'>Views</span>
                            <ChevronRightIcon className='h-5 w-5 text-[#97A0B5] cursor-pointer' />
                        </div>

                                    <div className="flex items-center justify-between py-[5px] px-[12px]">
                                        <span className="text-[#344054]">Side Panel</span>
                                        <Select
                                            placeholder="Select"
                                            value={viewSettings?.sidePanel}
                                            onChange={(value) =>
                                                handleViewSettings("sidePanel", value)
                                            }
                                        >
                                            <Option value={"left"}>Left</Option>
                                            <Option value={"right"}>Right</Option>
                                        </Select>
                                    </div>
                                </div>

                                <div className="w-[50%] border-l border-[#D0D5DD] pl-1">
                                    <h6 className="text-[#505050] block text-sm font-medium">
                                        Layout (Public)
                                    </h6>

                                    <div className="flex items-center justify-between py-[5px] px-[12px] hover:bg-[#f5f5f5]">
                                        <div className="flex items-center justify-center">
                                            <RectangleGroupIcon className="h-5 w-5 text-[#97A0B5] mr-1" />
                                            <span className="text-[#344054]">List View</span>
                                        </div>
                                        {viewSettings?.listView ? (
                                            <EyeIcon
                                                className="h-5 w-5 text-[#347AE2] cursor-pointer"
                                                onClick={() =>
                                                    handleViewSettings("view", false, "listView")
                                                }
                                            />
                                        ) : (
                                            <EyeSlashIcon
                                                className="h-5 w-5 text-[#97A0B5] cursor-pointer"
                                                onClick={() =>
                                                    handleViewSettings("view", true, "listView")
                                                }
                                            />
                                        )}
                                    </div>
                                    <div className="flex items-center justify-between py-[5px] px-[12px] hover:bg-[#f5f5f5]">
                                        <div className="flex items-center justify-center">
                                            <Squares2X2Icon className="h-5 w-5 text-[#97A0B5] mr-1" />
                                            <span className="text-[#344054]">Card View</span>
                                        </div>
                                        {viewSettings?.cardView ? (
                                            <EyeIcon
                                                className="h-5 w-5 text-[#347AE2] cursor-pointer"
                                                onClick={() =>
                                                    handleViewSettings("view", false, "cardView")
                                                }
                                            />
                                        ) : (
                                            <EyeSlashIcon
                                                className="h-5 w-5 text-[#97A0B5] cursor-pointer"
                                                onClick={() =>
                                                    handleViewSettings("view", true, "cardView")
                                                }
                                            />
                                        )}
                                    </div>
                                    <div className="flex items-center justify-between py-[5px] px-[12px] hover:bg-[#f5f5f5]">
                                        <div className="flex items-center justify-center">
                                            <QueueListIcon className="h-5 w-5 text-[#97A0B5] mr-1" />
                                            <span className="text-[#344054]">Moodboard View</span>
                                        </div>
                                        {viewSettings?.moodboardView ? (
                                            <EyeIcon
                                                className="h-5 w-5 text-[#347AE2] cursor-pointer"
                                                onClick={() =>
                                                    handleViewSettings("view", false, "moodboardView")
                                                }
                                            />
                                        ) : (
                                            <EyeSlashIcon
                                                className="h-5 w-5 text-[#97A0B5] cursor-pointer"
                                                onClick={() =>
                                                    handleViewSettings("view", true, "moodboardView")
                                                }
                                            />
                                        )}
                                    </div>
                                    <div className="flex items-center justify-between py-[5px] px-[12px] hover:bg-[#f5f5f5]">
                                        <div className="flex items-center justify-center">
                                            <ViewColumnsIcon className="h-5 w-5 text-[#97A0B5] mr-1" />
                                            <span className="text-[#344054]">Board View</span>
                                        </div>
                                        {viewSettings?.boardView ? (
                                            <EyeIcon
                                                className="h-5 w-5 text-[#347AE2] cursor-pointer"
                                                onClick={() =>
                                                    handleViewSettings("view", false, "boardView")
                                                }
                                            />
                                        ) : (
                                            <EyeSlashIcon
                                                className="h-5 w-5 text-[#97A0B5] cursor-pointer"
                                                onClick={() =>
                                                    handleViewSettings("view", true, "boardView")
                                                }
                                            />
                                        )}
                                    </div>
                                    <div className="flex items-center justify-between py-[5px] px-[12px] hover:bg-[#f5f5f5]">
                                        <div className="flex items-center justify-center">
                                            <TableCellsIcon className="h-5 w-5 text-[#97A0B5] mr-1" />
                                            <span className="text-[#344054]">Table View</span>
                                        </div>
                                        {viewSettings?.tableView ? (
                                            <EyeIcon
                                                className="h-5 w-5 text-[#347AE2] cursor-pointer"
                                                onClick={() =>
                                                    handleViewSettings("view", false, "tableView")
                                                }
                                            />
                                        ) : (
                                            <EyeSlashIcon
                                                className="h-5 w-5 text-[#97A0B5] cursor-pointer"
                                                onClick={() =>
                                                    handleViewSettings("view", true, "tableView")
                                                }
                                            />
                                        )}
                                    </div>
                                </div>
                            </div> */}

              {/* <div className="mt-2 text-right">
                                <Button
                                    type="primary"
                                    className="bg-[#347AE2] border-[#347AE2] hover:bg-[#347AE2]"
                                    onClick={handleUpdateSettings}
                                    disabled={loading}
                                >
                                    Update Settings
                                </Button>
                            </div> */}
            </>
          )}

          {/* switch for public sidebar */}
          {singleCollectionDetails?.isPublicLink && (
            <div className="flex items-center my-3">
              <Switch
                checked={allowUserSubmission}
                onChange={(checked) => handleAllowUserSubmission(checked)}
                style={{ background: allowUserSubmission ? "#1890ff" : "#00000040" }}
                size="small"
              />
              <h6 className="text-[#505050] block text-sm font-medium ml-2">
                Allow user submission
              </h6>
            </div>
          )}

          {singleCollectionDetails?.isPublicLink && (
            <div className="flex items-center my-3">
              <Switch
                checked={showSocialIcons}
                onChange={(checked) => handleShowSocialIcons(checked)}
                style={{ background: showSocialIcons ? "#1890ff" : "#00000040" }}
                size="small"
              />
              <h6 className="text-[#505050] block text-sm font-medium ml-2">
                Always show social icons
              </h6>
            </div>
          )}

          {singleCollectionDetails?.isPublicLink && (
            <div className="flex items-center my-3">
              <Switch
                checked={publicSidebar}
                onChange={(checked) => handlePublicSidebar(checked)}
                style={{ background: publicSidebar ? "#1890ff" : "#00000040" }}
                size="small"
              />
              <h6 className="text-[#505050] block text-sm font-medium ml-2">
                Enable sidebar
              </h6>
            </div>
          )}

          {singleCollectionDetails?.isPublicLink && (
            <div className="flex items-center my-3">
              <Switch
                checked={showPublicSubCollections}
                onChange={(checked) => handleShowPublicSubCollections(checked)}
                style={{
                  background: showPublicSubCollections
                    ? "#1890ff"
                    : "#00000040",
                }}
                size="small"
              />
              <h6 className="text-[#505050] block text-sm font-medium ml-2">
                Show sub collections
              </h6>
            </div>
          )}

          {/* allow copy */}
          {singleCollectionDetails?.isPublicLink && (
            <div className="flex items-center my-3">
              <Switch
                checked={showAllowCopyCollection}
                onChange={(checked) => handleShowCopyCollections(checked)}
                style={{
                  background: showAllowCopyCollection ? "#1890ff" : "#00000040",
                }}
                size="small"
              />
              <h6 className="text-[#505050] block text-sm font-medium ml-2">
                Allow copy collection
              </h6>
            </div>
          )}
        </div>
      </>
    );
  };

  const renderEmbedTab = () => {
    return (
      <>
        <div className="flex items-center">
          <Switch
            checked={publicSwitch}
            onChange={handlePublicSwitch}
            style={{ background: publicSwitch ? "#1890ff" : "#00000040" }}
            size="small"
            loading={loadingSwitch}
          />
          <h6 className="text-[#505050] block text-sm font-medium ml-2">
            {publicSwitch
              ? "Disable (If you disbale it will make your collection private)"
              : "Enable (If you enable it will make your collection public)"}
          </h6>
        </div>
        {publicSwitch && (
          <div className="bg-[#FAFCFF] rounded-[6px] border border-solid border-[#DADEE8] p-3 mt-4">
            <div className="flex items-center justify-between">
              <h6 className="text-[#505050] block text-sm font-medium ml-2">
                Embed
              </h6>

              <Button
                className="bookmark-addBtn"
                icon={<RiFileCopyLine />}
                onClick={copyEmbedCode}
              >
                Copy Code
              </Button>
            </div>

            <div className="my-3">
              <div className="flex items-center justify-between">
                <span className="block mr-4 text-[#70767A]">Code</span>

                <Tabs
                  style={{ overflowX: "auto" }}
                  defaultActiveKey={tabEmbedCodeKey}
                  onChange={handleTabEmbedCodeChange}
                  items={[
                    {
                      label: `HTML`,
                      key: "HTML",
                      children: (
                        <div
                          name=""
                          id=""
                          className="p-2 w-full border-none outline-[#3169FF] bg-[#F3F5F6] h-fit text-[#1E1E1E] break-words"
                        >
                          {`<iframe style="border: 0; width: 100%; height: 100vh;" allowfullscreen frameborder="0" src=${embedUrl} />`}
                        </div>
                      ),
                    },
                    {
                      label: `React`,
                      key: "React",
                      children: (
                        <div
                          name=""
                          id=""
                          className="p-2 w-full border-none outline-[#3169FF] bg-[#F3F5F6] h-fit text-[#1E1E1E] break-words"
                        >
                          {`<iframe title='embed' style={{border: 0, width: '100%', height: '450px',overflow:'auto'}} allowFullScreen frameBorder="0" src=${embedUrl}>`}
                        </div>
                      ),
                    },
                  ]}
                />
              </div>
            </div>

            <div className="flex flex-col items-center justify-between mt-4">
              <span className="block text-center mb-2 font-medium text-[#505050]">
                Preview
              </span>
              <div className="group relative w-full">
                <iframe
                  title="embed"
                  style={{
                    border: 0,
                    width: "100%",
                    height: "450px",
                    overflow: "auto",
                    zIndex: 9999998,
                  }}
                  allowFullScreen
                  frameBorder="0"
                  src={`${embedUrl}`}
                ></iframe>
                <div className="hidden group-hover:flex absolute top-0 left-0 w-full h-full justify-center items-center z-[9999999] bg-gray-800 bg-opacity-10">
                  <button
                    className="px-4 py-2 bg-gray-500 hover:bg-blue-600 text-white rounded-md"
                    onClick={() => window.open(embedUrl, "_blank")}
                  >
                    Preview
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

  // const renderHistoryTab = () => {
  //     return <>history</>;
  // };

  const onSEOUpdate = async (data) => {
    setLoadingSEO(true);
    let obj = {
      seo: data,
      slug: data?.seo?.slug
    }
    if (singleCollectionDetails?.background?.type === "upload" || singleCollectionDetails?.background?.type === "unsplash") {
      obj = {
        ...obj,
        background: {
          ...singleCollectionDetails?.background,
          altInfo: data?.seo?.altInfo
        }
      }
    }
    const seoRes = await dispatch(
      updateCollectionSEODetails(
        obj,
        collectionId
      )
    );
    setLoadingSEO(false);
    if (seoRes?.payload?.status === 200) {
      setSeoDetail({ ...seoDetail, ...data });
      // setUser({ ...user, seo: data });
      message.success(`Collection ${TextMessage.SEO_UPDATE}`);
      navigate.push(
        `/u/${session?.username}/c/${collectionId}/${data?.seo?.slug}`
      );
    }
  };

  const renderSEODetails = () => {
    return (
      <SEOModal
        onSubmit={onSEOUpdate}
        seoObj={seoDetail || null}
        baseDetails={{ id: collectionId, type: "c" }}
        defaultImg={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/logo192.png`}
        isMobile={isMobileView}
        loading={loadingSEO}
        existingThumbnails={existingThumbnails}
        typeId={collectionId}
        showAltInfo={singleCollectionDetails?.background?.type === "upload" || singleCollectionDetails?.background?.type === "unsplash"}
        altInfo={singleCollectionDetails?.background?.altInfo || singleCollectionDetails?.name || singleCollectionDetails?.description}
        type="collection"
      />
    );
  };

  const handleTabChange = (key) => {
    setTabKey(key);
  };

  const viewerTabs = [
    {
      label: `Email Invite`,
      key: "Email Invite",
      children: renderEmailInviteTab(),
    },
    {
      label: `Link Invite`,
      key: "Link Invite",
      children: renderLinkInviteTab(),
    },
  ];
  const editorTabs = [
    {
      label: `Email Invite`,
      key: "Email Invite",
      children: renderEmailInviteTab(),
    },
    {
      label: `Link Invite`,
      key: "Link Invite",
      children: renderLinkInviteTab(),
    },
    {
      label: `Share Publicly`,
      key: "Share Publicly",
      children: renderSharePubliclyTab(),
    },
    {
      label: `Embed`,
      key: "Embed",
      children: renderEmbedTab(),
    },
    // ,
    // {
    //     label: `History`,
    //     key: 'History',
    //     children: renderHistoryTab(),
    // },
  ];
  if (isPublicCollection) {
    editorTabs.push({
      label: `SEO`,
      key: "SEO",
      children: renderSEODetails(),
    });
  }

  const renderSitePageSettings = () => {
    return (
      <div className="flex flex-col gap-2 items-start">
        <div className="flex items-center w-full p-2 justify-between">
          <div className="flex items-center gap-2">
            <PiTextIndent className="h-5 w-5 text-[#347AE2]" />
            <div className="font-bold text-base text-[#4B4F5D]">
              Breadcrumbs
            </div>
          </div>
          <Switch
            checked={showBreadcrumbs}
            onChange={(checked) => handleShowBreadcrumbs(checked)}
            style={{
              background: showBreadcrumbs ? "#1890ff" : "#00000040",
            }}
            size="small"
          />
        </div>

        <div className="flex items-center w-full p-2 justify-between">
          <div className="flex items-center gap-2">
            <MagnifyingGlassIcon className="h-5 w-5 text-[#347AE2]" />
            <div className="font-bold text-base text-[#4B4F5D]">Search</div>
          </div>
          <Switch
            checked={showSearchButton}
            onChange={(checked) => handleShowSearchButton(checked)}
            style={{
              background: showSearchButton ? "#1890ff" : "#00000040",
            }}
            size="small"
          />
        </div>

        <div className="flex items-center w-full p-2 justify-between">
          <div className="flex items-center gap-2">
            <PiCopyright className="h-5 w-5 text-[#347AE2]" />
            <div className="font-bold text-base text-[#4B4F5D]">
              CurateIt watermark
            </div>
          </div>
          <Switch
            checked={showCurateitWatermark}
            onChange={(checked) => handleShowCurateitWatermark(checked)}
            style={{
              background: showCurateitWatermark ? "#1890ff" : "#00000040",
            }}
            size="small"
          />
        </div>

        <div className="flex items-center w-full p-2 justify-between">
          <div className="flex items-center gap-2">
            <BiLogIn className="h-5 w-5 text-[#347AE2]" />
            <div className="font-bold text-base text-[#4B4F5D]">
              Show Login Button
            </div>
          </div>
          <Switch
            checked={showLoginButton}
            onChange={(checked) => handleShowLoginButton(checked)}
            style={{
              background: showLoginButton ? "#1890ff" : "#00000040",
            }}
            size="small"
          />
        </div>

        <div className="flex items-center w-full p-2 justify-between">
          <div className="flex items-center gap-2">
            <BiLogInCircle className="h-5 w-5 text-[#347AE2]" />
            <div className="font-bold text-base text-[#4B4F5D]">
              Show SignUp Button
            </div>
          </div>
          <Switch
            checked={showSignUpButton}
            onChange={(checked) => handleShowSignUpButton(checked)}
            style={{
              background: showSignUpButton ? "#1890ff" : "#00000040",
            }}
            size="small"
          />
        </div>

        <div className="flex items-center w-full p-2 justify-between">
          <div className="flex items-center gap-2">
            <BiSend className="h-5 w-5 text-[#347AE2]" />
            <div className="font-bold text-base text-[#4B4F5D]">
              Allow user submission
            </div>
          </div>
          <Switch
            checked={allowUserSubmission}
            onChange={(checked) => handleAllowUserSubmission(checked)}
            style={{
              background: allowUserSubmission ? "#1890ff" : "#00000040",
            }}
            size="small"
          />
        </div>

        <div className="flex items-center w-full p-2 justify-between">
          <div className="flex items-center gap-2">
            <PiSidebar className="h-5 w-5 text-[#347AE2]" />
            <div className="font-bold text-base text-[#4B4F5D]">
              Enable sidebar
            </div>
          </div>
          <Switch
            checked={publicSidebar}
            onChange={(checked) => handlePublicSidebar(checked)}
            style={{
              background: publicSidebar ? "#1890ff" : "#00000040",
            }}
            size="small"
          />
        </div>

        <div className="flex items-center w-full p-2 justify-between">
          <div className="flex items-center gap-2">
            <TbSocial className="h-5 w-5 text-[#347AE2]" />
            <div className="font-bold text-base text-[#4B4F5D]">
              Always show social icon
            </div>
          </div>
          <Switch
            checked={showSocialIcons}
            onChange={(checked) => handleShowSocialIcons(checked)}
            style={{
              background: showSocialIcons ? "#1890ff" : "#00000040",
            }}
            size="small"
          />
        </div>

        <div className="flex items-center w-full p-2 justify-between">
          <div className="flex items-center gap-2">
            <BiCollection className="h-5 w-5 text-[#347AE2]" />
            <div className="font-bold text-base text-[#4B4F5D]">
              Show sub collections
            </div>
          </div>
          <Switch
            checked={showPublicSubCollections}
            onChange={(checked) => handleShowPublicSubCollections(checked)}
            style={{
              background: showPublicSubCollections ? "#1890ff" : "#00000040",
            }}
            size="small"
          />
        </div>

        <div className="flex items-center w-full p-2 justify-between">
          <div className="flex items-center gap-2">
            <PiCopy className="h-5 w-5 text-[#347AE2]" />
            <div className="font-bold text-base text-[#4B4F5D]">
              Allow copy collection
            </div>
          </div>
          <Switch
            checked={showAllowCopyCollection}
            onChange={(checked) => handleShowCopyCollections(checked)}
            style={{
              background: showAllowCopyCollection ? "#1890ff" : "#00000040",
            }}
            size="small"
          />
        </div>
      </div>
    );
  }

  const renderSiteDetails = () => {
    return (
      <div>
        {/* option listing */}
        {!selectedSitePageOption && (
          <div className="flex flex-col items-start gap-1">
            <div
              className="flex items-center justify-between p-2 w-full cursor-pointer"
              onClick={() => {
                setSelectedSitePageOption("");
                setOpenHeaderModal(true);
              }}
            >
              <div className="font-medium text-[#292B38]">Header</div>
              <div className="flex items-center gap-1 cursor-pointer">
                <div className="text-[#74778B] capitalize">{headerCustomizeOption}</div>
                <PiCaretRight className="h-4 w-4 text-[#4B4F5D]" />
              </div>
            </div>

            <div
              className="flex items-center justify-between p-2 w-full cursor-pointer"
              onClick={() => setSelectedSitePageOption("")}
            >
              <div className="font-medium text-[#292B38]">Footer</div>
              <div className="flex items-center gap-1 cursor-pointer">
                <div className="text-[#74778B]">Custom</div>
                <PiCaretRight className="h-4 w-4 text-[#4B4F5D]" />
              </div>
            </div>

            <div
              className="flex items-center justify-between p-2 w-full cursor-pointer"
              onClick={() => setSelectedSitePageOption("seo")}
            >
              <div className="font-medium text-[#292B38]">SEO</div>
              <PiCaretRight className="h-4 w-4 cursor-pointer text-[#4B4F5D]" />
            </div>

            <div
              className="flex items-center justify-between p-2 w-full cursor-pointer"
              onClick={() => setSelectedSitePageOption("settings")}
            >
              <div className="font-medium text-[#292B38]">Settings</div>
              <PiCaretRight className="h-4 w-4 cursor-pointer text-[#4B4F5D]" />
            </div>
          </div>
        )}

        {selectedSitePageOption === "seo" && (
          <div>
            <HeaderTitle handleClose={() => setSelectedSitePageOption("")} title={'SEO'} showRightIcon={false} showLeftIcon={true}/>
            {renderSEODetails()}
          </div>
        )}

        {selectedSitePageOption === "settings" && (
          <div>
            <HeaderTitle handleClose={() => setSelectedSitePageOption("")} title={'Settings'} showRightIcon={false} showLeftIcon={true}/>
            {renderSitePageSettings()}
          </div>
        )}
      </div>
    );
  }

  const renderInviteUI = () => {
    return (
      <>
        {currentCollectionAccessType &&
        (currentCollectionAccessType?.accessType === "editor" ||
          currentCollectionAccessType?.accessType === "viewer") ? (
          <>
            <div className="flex p-1 rounded-md bg-[#F8FAFB] cursor-pointer items-center justify-between mb-6">
              <div
                className={`shareInviteBtn ${
                  inviteOptionSelected === "private"
                    ? "rounded shadow border-[0.4px] border-solid border-[#78A6EC] bg-white"
                    : ""
                }  ${isMobileView ? "w-fit" : "w-[120px]"}`}
                onClick={() => {
                  setInviteOptionSelected("private");
                  setPrivateInviteOption("email");
                }}
              >
                <PiUserPlus
                  className={`h-5 w-5 ${
                    inviteOptionSelected === "private"
                      ? "text-[#347AE2]"
                      : "text-[#74778B]"
                  }`}
                />
                <div
                  className={`${
                    inviteOptionSelected === "private"
                      ? "text-[#347AE2]"
                      : "text-[#74778B]"
                  } font-medium text-sm`}
                >
                  Private
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="w-fit flex p-1 rounded-md bg-[#F8FAFB] cursor-pointer items-center justify-between mb-6">
            <div
              className={`shareInviteBtn ${
                inviteOptionSelected === "private"
                  ? "rounded shadow border-[0.4px] border-solid border-[#78A6EC] bg-white"
                  : ""
              } ${isMobileView ? "w-fit" : "w-[120px]"}`}
              onClick={() => {
                setInviteOptionSelected("private");
                setPrivateInviteOption("email");
                setSelectedSitePageOption("");
              }}
            >
              <PiUserPlus
                className={`h-5 w-5 ${
                  inviteOptionSelected === "private"
                    ? "text-[#347AE2]"
                    : "text-[#74778B]"
                }`}
              />
              <div
                className={`${
                  inviteOptionSelected === "private"
                    ? "text-[#347AE2]"
                    : "text-[#74778B]"
                } font-medium text-sm`}
              >
                Private
              </div>
            </div>

            <div
              className={`shareInviteBtn ${
                inviteOptionSelected === "public"
                  ? "rounded shadow border-[0.4px] border-solid border-[#78A6EC] bg-white"
                  : ""
              } ${isMobileView ? "w-fit" : "w-[120px]"}`}
              onClick={() => {
                setInviteOptionSelected("public")
                setSelectedSitePageOption("");
              }}
            >
              <GlobeAltIcon
                className={`h-5 w-5 ${
                  inviteOptionSelected === "public"
                    ? "text-[#347AE2]"
                    : "text-[#74778B]"
                }`}
              />
              <div
                className={`font-medium text-sm ${
                  inviteOptionSelected === "public"
                    ? "text-[#347AE2]"
                    : "text-[#74778B]"
                }`}
              >
                Public
              </div>
            </div>

            {showSeo && (
              <div
                disabled={!showSeo}
                className={`${
                  !showSeo ? "cursor-not-allowed" : ""
                } shareInviteBtn ${
                  inviteOptionSelected === "seo"
                    ? "rounded shadow border-[0.4px] border-solid border-[#78A6EC] bg-white"
                    : ""
                } ${isMobileView ? "w-fit" : "w-[120px]"}`}
                onClick={() => {
                  if (!showSeo) return;
                  if (showSeo) {
                    setInviteOptionSelected("seo");
                  }
                }}
              >
                <PiRocketLaunch
                  className={`h-5 w-5 ${
                    inviteOptionSelected === "seo"
                      ? "text-[#347AE2]"
                      : "text-[#74778B]"
                  }`}
                />
                <div
                  className={`${
                    inviteOptionSelected === "seo"
                      ? "text-[#347AE2]"
                      : "text-[#74778B]"
                  } font-medium text-sm`}
                >
                  Site
                </div>
              </div>
            )}
          </div>
        )}

        {inviteOptionSelected === "private" && (
          <div>
            <div className="w-full flex items-center justify-between mb-2">
              <div className="text-[#347AE2] text-sm font-medium">
                {privateInviteOption === "email"
                  ? "Invite by email"
                  : "Universal Link"}
              </div>

              <div className="flex p-[2px] items-center bg-white rounded border-[0.6px] border-solid border-[#ABB7C9]">
                <div
                  className={`cursor-pointer inviteOptionDiv ${
                    privateInviteOption === "email"
                      ? "bg-[#347AE2]"
                      : "bg-white"
                  }`}
                  onClick={() => setPrivateInviteOption("email")}
                >
                  <EnvelopeOpenIcon
                    className={`h-4 w-4 ${
                      privateInviteOption === "email"
                        ? "text-white"
                        : "text-black"
                    }`}
                  />
                </div>
                <div
                  className={`cursor-pointer inviteOptionDiv ${
                    privateInviteOption === "link" ? "bg-[#347AE2]" : "bg-white"
                  }`}
                  onClick={() => setPrivateInviteOption("link")}
                >
                  <PiLinkSimple
                    className={`h-4 w-4 ${
                      privateInviteOption === "link"
                        ? "text-white"
                        : "text-black"
                    }`}
                  />
                </div>
              </div>
            </div>

            {privateInviteOption === "email" && (
              <div>{renderEmailInviteTab()}</div>
            )}

            {privateInviteOption === "link" && (
              <div>{renderLinkInviteTab()}</div>
            )}
          </div>
        )}

        {inviteOptionSelected === "public" && (
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="items-start gap-[10px] flex p-[7px] bg-[#ECEDEE] rounded-[52px]">
                  <LinkIcon className="h-5 w-5" />
                </div>

                <div className="flex flex-col items-start gap-[2px]">
                  <div className="font-medium text-sm text-[#292B38]">
                    Public Access & Embed
                  </div>
                  <div className="text-[#74778B] text-xs">
                    Anyone with a link can view or embed
                  </div>
                </div>
              </div>

              <div>
                <Switch
                  checked={publicSwitch}
                  onChange={handlePublicSwitch}
                  style={{ background: publicSwitch ? "#1890ff" : "#00000040" }}
                  size="small"
                  loading={loadingSwitch}
                />
              </div>
            </div>

            <div className="mt-4">
              {singleCollectionDetails?.isPublicLink && (
                <>
                  <div className="flex items-center ">
                    <Input
                      placeholder=""
                      disabled
                      suffix={
                        <DocumentDuplicateIcon
                          className="h-5 w-5 text-[#515151] cursor-pointer"
                          onClick={() => {
                            handleCopyLink(publicLinkUrl);
                          }}
                        />
                      }
                      value={publicLinkUrl || ""}
                    />
                    <Button
                      className="ml-2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {password ? (
                        <LockClosedIcon className="h-5 w-5 m-0" />
                      ) : (
                        <LockOpenIcon className="h-5 w-5 m-0" />
                      )}
                    </Button>
                  </div>

                  {showPassword && (
                    <div className="my-2 flex items-center">
                      <Input
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="false"
                        className="custom-ant-input"
                      />
                      <Button
                        className="mx-1"
                        onClick={() => handleSetPasswordPublic("update")}
                        disabled={loading}
                      >
                        Update
                      </Button>
                      {password && (
                        <Button
                          onClick={() => handleSetPasswordPublic("delete")}
                          disabled={loading}
                        >
                          <TrashIcon className="h-4 w-4 text-[#EB5757]" />
                        </Button>
                      )}
                    </div>
                  )}
                </>
              )}

              <div className="flex w-full items-center justify-between mt-2">
                <div>
                  {singleCollectionDetails?.isPublicLink && (
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={allowUserSubmission}
                        onChange={(checked) =>
                          handleAllowUserSubmission(checked)
                        }
                        style={{
                          background: allowUserSubmission
                            ? "#1890ff"
                            : "#00000040",
                        }}
                        size="small"
                      />
                      <h6 className="text-[#505050] block text-sm font-medium">
                        Allow user submission
                      </h6>
                    </div>
                  )}

                  {singleCollectionDetails?.isPublicLink && (
                    <div className="flex items-center gap-2 my-2">
                      <Switch
                        checked={publicSidebar}
                        onChange={(checked) => handlePublicSidebar(checked)}
                        style={{
                          background: publicSidebar ? "#1890ff" : "#00000040",
                        }}
                        size="small"
                      />
                      <h6 className="text-[#505050] block text-sm font-medium">
                        Enable sidebar
                      </h6>
                    </div>
                  )}

                  {singleCollectionDetails?.isPublicLink && (
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={showSocialIcons}
                        onChange={(checked) => handleShowSocialIcons(checked)}
                        style={{
                          background: showSocialIcons ? "#1890ff" : "#00000040",
                        }}
                        size="small"
                      />
                      <h6 className="text-[#505050] block text-sm font-medium">
                        Always show social icon
                      </h6>
                    </div>
                  )}
                </div>

                <div>
                  {singleCollectionDetails?.isPublicLink && (
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={showPublicSubCollections}
                        onChange={(checked) =>
                          handleShowPublicSubCollections(checked)
                        }
                        style={{
                          background: showPublicSubCollections
                            ? "#1890ff"
                            : "#00000040",
                        }}
                        size="small"
                      />
                      <h6 className="text-[#505050] block text-sm font-medium">
                        Show sub collections
                      </h6>
                    </div>
                  )}

                  {singleCollectionDetails?.isPublicLink && (
                    <div className="flex items-center gap-2 my-2">
                      <Switch
                        checked={showAllowCopyCollection}
                        onChange={(checked) =>
                          handleShowCopyCollections(checked)
                        }
                        style={{
                          background: showAllowCopyCollection
                            ? "#1890ff"
                            : "#00000040",
                        }}
                        size="small"
                      />
                      <h6 className="text-[#505050] block text-sm font-medium ">
                        Allow copy collection
                      </h6>
                    </div>
                  )}

                  {singleCollectionDetails?.isPublicLink && (
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={showSeo}
                        onChange={(checked) => handleShowSeo(checked)}
                        style={{
                          background: showSeo ? "#1890ff" : "#00000040",
                        }}
                        size="small"
                      />
                      <h6 className="text-[#505050] block text-sm font-medium ">
                        Search Engine Indexing
                      </h6>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <Divider className="block text-[#ABB7C9] m-0 w-full my-5" />

            {/* <div className="font-medium text-[#347AE2] mb-2">Embed</div> */}
            {/* <div className="flex items-center justify-between">
             
              <div className="flex items-center gap-2">
                <div className="items-start gap-[10px] flex p-[7px] bg-[#ECEDEE] rounded-[52px]">
                  <LinkIcon className="h-5 w-5"/>
                </div>

                <div className="flex flex-col items-start gap-[2px]">
                    <div className="font-medium text-sm text-[#292B38]">Embed access</div>
                    <div className="text-[#74778B] text-xs">Anyone with the link can view</div>
                </div>
              </div>

               
              <div className="flex items-center">
                <Switch
                  checked={publicSwitch}
                  onChange={handlePublicSwitch}
                  style={{ background: publicSwitch ? "#1890ff" : "#00000040" }}
                  size="small"
                  loading={loadingSwitch}
                />
                
              </div>
            </div> */}

            {publicSwitch && (
              <div className="bg-[#FAFCFF] rounded-[6px] border border-solid border-[#DADEE8] p-3 mt-4">
                <div className="flex items-center justify-between">
                  <h6 className="text-[#347AE2] block text-sm font-medium ml-2">
                    Embed
                  </h6>

                  <Button
                    className="bookmark-addBtn"
                    icon={<RiFileCopyLine />}
                    onClick={copyEmbedCode}
                  >
                    Copy Code
                  </Button>
                </div>

                <div className="my-3">
                  <div className="flex items-center justify-between">
                    <span className="block mr-4 text-[#70767A]">Code</span>

                    <Tabs
                      style={{ overflowX: "auto" }}
                      defaultActiveKey={tabEmbedCodeKey}
                      onChange={handleTabEmbedCodeChange}
                      items={[
                        {
                          label: `HTML`,
                          key: "HTML",
                          children: (
                            <div
                              name=""
                              id=""
                              className="p-2 w-full border-none outline-[#3169FF] bg-[#F3F5F6] h-fit text-[#1E1E1E] break-words"
                            >
                              {`<iframe style="border: 0; width: 100%; height: 100vh;" allowfullscreen frameborder="0" src=${embedUrl} />`}
                            </div>
                          ),
                        },
                        {
                          label: `React`,
                          key: "React",
                          children: (
                            <div
                              name=""
                              id=""
                              className="p-2 w-full border-none outline-[#3169FF] bg-[#F3F5F6] h-fit text-[#1E1E1E] break-words"
                            >
                              {`<iframe title='embed' style={{border: 0, width: '100%', height: '450px',overflow:'auto'}} allowFullScreen frameBorder="0" src=${embedUrl}>`}
                            </div>
                          ),
                        },
                      ]}
                    />
                  </div>
                </div>

                <div className="flex flex-col items-center justify-between mt-4">
                  <span className="block text-center mb-2 font-medium text-[#505050]">
                    Preview
                  </span>
                  <div className="group relative w-full">
                    <iframe
                      title="embed"
                      style={{
                        border: 0,
                        width: "100%",
                        height: "450px",
                        overflow: "auto",
                        zIndex: 9999998,
                      }}
                      allowFullScreen
                      frameBorder="0"
                      src={`${embedUrl}`}
                    ></iframe>
                    <div className="hidden group-hover:flex absolute top-0 left-0 w-full h-full justify-center items-center z-[9999999] bg-gray-800 bg-opacity-10">
                      <button
                        className="px-4 py-2 bg-gray-500 hover:bg-blue-600 text-white rounded-md"
                        onClick={() => window.open(embedUrl, "_blank")}
                      >
                        Preview
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {inviteOptionSelected === "seo" && <div>{renderSiteDetails()}</div>}
      </>
    );
  }

  // header site config apis
  const handleChangeHeaderType = async (value) => {
    setHeaderCustomizeOption(value)

    const payload = {
      siteConfig: {
        headerPosition: headerPosition,
        headerType: value,
        isHeaderSticky: fixedHeader,
        pagesItems: pagesItems,
        showBreadcrumbs: showBreadcrumbs,
        showSearchButton: showSearchButton,
        showCurateitWatermark: showCurateitWatermark,
        showLoginButton: showLoginButton,
        showSignUpButton: showSignUpButton,
      },
    };

    await dispatch(updateCollection(collectionId, payload));
  }

  const handleHeaderPosition = async (value) => {
    setHeaderPosition(value);

    const payload = {
      siteConfig: {
        headerPosition: value,
        headerType: headerCustomizeOption,
        isHeaderSticky: fixedHeader,
        pagesItems: pagesItems,
        showBreadcrumbs: showBreadcrumbs,
        showSearchButton: showSearchButton,
        showCurateitWatermark: showCurateitWatermark,
        showLoginButton: showLoginButton,
        showSignUpButton: showSignUpButton,
      },
    };
    await dispatch(updateCollection(collectionId, payload));
  };

  const handleHeaderFixedPosition = async (value) => {
    setFixedHeader(value);

    const payload = {
      siteConfig: {
        headerPosition: headerPosition,
        headerType: headerCustomizeOption,
        isHeaderSticky: value,
        pagesItems: pagesItems,
        showBreadcrumbs: showBreadcrumbs,
        showSearchButton: showSearchButton,
        showCurateitWatermark: showCurateitWatermark,
        showLoginButton: showLoginButton,
        showSignUpButton: showSignUpButton,
      },
    };
    await dispatch(updateCollection(collectionId, payload));
  };

  const getSortedItems = async (data) => {
    setPagesItems(data);

    const payload = {
      siteConfig: {
        headerPosition: headerPosition,
        headerType: headerCustomizeOption,
        isHeaderSticky: fixedHeader,
        pagesItems: data,
        showBreadcrumbs: showBreadcrumbs,
        showSearchButton: showSearchButton,
        showCurateitWatermark: showCurateitWatermark,
        showLoginButton: showLoginButton,
        showSignUpButton: showSignUpButton,
      },
    };
    await dispatch(updateCollection(collectionId, payload));
  };

  const handleShowBreadcrumbs = async (isToggled) => {
    setShowBreadcrumbs(isToggled)
    
    const payload = {
      siteConfig: {
        headerPosition: headerPosition,
        headerType: headerCustomizeOption,
        isHeaderSticky: fixedHeader,
        pagesItems: pagesItems,
        showBreadcrumbs: isToggled,
        showSearchButton: showSearchButton,
        showCurateitWatermark: showCurateitWatermark,
        showLoginButton: showLoginButton,
        showSignUpButton: showSignUpButton,
      },
    };
    await dispatch(updateCollection(collectionId, payload));
  };

  const handleShowSearchButton = async (isToggled) => {
    setShowSearchButton(isToggled)
    
    const payload = {
      siteConfig: {
        headerPosition: headerPosition,
        headerType: headerCustomizeOption,
        isHeaderSticky: fixedHeader,
        pagesItems: pagesItems,
        showBreadcrumbs: showBreadcrumbs,
        showSearchButton: isToggled,
        showCurateitWatermark: showCurateitWatermark,
        showLoginButton: showLoginButton,
        showSignUpButton: showSignUpButton,
      },
    };
    await dispatch(updateCollection(collectionId, payload));
  };

  const handleShowCurateitWatermark = async (isToggled) => {
    setShowCurateitWatermark(isToggled)
    
    const payload = {
      siteConfig: {
        headerPosition: headerPosition,
        headerType: headerCustomizeOption,
        isHeaderSticky: fixedHeader,
        pagesItems: pagesItems,
        showBreadcrumbs: showBreadcrumbs,
        showSearchButton: showSearchButton,
        showCurateitWatermark: isToggled,
        showLoginButton: showLoginButton,
        showSignUpButton: showSignUpButton,
      },
    };
    await dispatch(updateCollection(collectionId, payload));
  };

  const handleShowLoginButton = async (isToggled) => {
    setShowLoginButton(isToggled)
    
    const payload = {
      siteConfig: {
        headerPosition: headerPosition,
        headerType: headerCustomizeOption,
        isHeaderSticky: fixedHeader,
        pagesItems: pagesItems,
        showBreadcrumbs: showBreadcrumbs,
        showSearchButton: showSearchButton,
        showCurateitWatermark: showCurateitWatermark,
        showLoginButton: isToggled,
        showSignUpButton: showSignUpButton,
      },
    };
    await dispatch(updateCollection(collectionId, payload));
  };

  const handleShowSignUpButton = async (isToggled) => {
    setShowSignUpButton(isToggled)
    
    const payload = {
      siteConfig: {
        headerPosition: headerPosition,
        headerType: headerCustomizeOption,
        isHeaderSticky: fixedHeader,
        pagesItems: pagesItems,
        showBreadcrumbs: showBreadcrumbs,
        showSearchButton: showSearchButton,
        showCurateitWatermark: showCurateitWatermark,
        showLoginButton: showLoginButton,
        showSignUpButton: isToggled,
      },
    };
    await dispatch(updateCollection(collectionId, payload));
  };

  return (
    <>
      {!showShareMobileView && (
        <>
          {openShareCollWithDrawer ? (
            <Drawer
              placement={isMobileView ? "bottom" : "right"}
              height={isMobileView ? "90%" : "inherit"}
              width={isMobileView ? "90%" : "460px"}
              title={"Invite Collection"}
              onClose={() => {
                setOpenDrawer(false);
                // resetValues()
              }}
              open={openDrawer}
              maskClosable={isMobileView ? true : false}
              footer={null}
              bodyStyle={{
                padding: isMobileView ? "24px 8px" : "24px",
                backgroundColor: "#fff",
              }}
            >
              <>{renderInviteUI()}</>
            </Drawer>
          ) : (
            <>{renderInviteUI()}</>
          )}
        </>
      )}

      {showShareMobileView && (
        <>
          <Drawer
            placement={"bottom"}
            height={"90%"}
            width={"90%"}
            onClose={() => {
              setShowShareMobileView(false);
            }}
            title={null}
            open={showShareMobileView}
            maskClosable={true}
            footer={null}
            bodyStyle={{ padding: "24px 8px", backgroundColor: "#fff" }}
            closable={false}
          >
            <div className="flex w-full items-center justify-between mb-4">
              <div className="font-medium text-[#347AE2] text-xl"></div>

              <div className="p-[2px] flex items-end rounded border-[0.6px] border-solid border-[#ABB7C9] bg-white">
                <div
                  onClick={() => setMobileShareOptionSelected("share")}
                  className={`flex py-2 px-3 gap-[10px] items-center justify-center ${
                    mobileShareOptionSelected === "share"
                      ? "rounded bg-[#347AE2] text-white"
                      : "bg-white"
                  } `}
                >
                  Share
                </div>

                <div
                  onClick={() => setMobileShareOptionSelected("invite")}
                  className={`flex py-2 px-3 gap-[10px] items-center justify-center ${
                    mobileShareOptionSelected === "invite"
                      ? "rounded bg-[#347AE2] text-white"
                      : "bg-white"
                  }`}
                >
                  Invite
                </div>
              </div>
            </div>

            {mobileShareOptionSelected === "share" && (
              <>
                <SocialShare
                  collectionUrl={collectionUrl}
                  setShowShare={() => {}}
                  fromShareCollDrawer={true}
                />
              </>
            )}

            {mobileShareOptionSelected === "invite" && <>{renderInviteUI()}</>}
          </Drawer>
        </>
      )}
      {showMemberBox && (
        <Modal
          open={showMemberBox}
          onCancel={() => {
            setShowMemberBox(false);
            setCurrentGroupId(null);
            setAllNewUsers([]);
          }}
          onOk={onMembersAdd}
          okText="Add"
          title={"Add new members"}
          okButtonProps={{
            className: "bg-[#40a9ff] border-[#40a9ff]",
          }}
        >
          <Select
            mode="multiple"
            ref={memberElm}
            // options={filteredUsers.map((user) => { return { ...user, label: user.email, value: user.email } })}
            className="ct-share-member-select"
            placeholder="Select members or type email to add new member"
            tagRender={(props) => {
              const { value } = props;
              const idx = allFilteredUsers.findIndex((user) =>
                user.id ? user.id === value : user.email === value
              );
              if (idx !== -1) {
                const user = allFilteredUsers[idx];
                return (
                  <Tag
                    className="flex p-1"
                    key={user.id ? user.id : user.email}
                    closable={true}
                    onClose={() => onTagRemove(user.id ? user.id : user.email)}
                  >
                    <div className="flex flex-row items-center">
                      <Avatar src={user.avatar} className="mr-2">
                        {user.name.charAt(0).toUpperCase()}
                      </Avatar>
                      <span>{user.name}</span>
                    </div>
                  </Tag>
                );
              }
              return null;
            }}
            // onInputKeyDown={(e) => onMemberEmailKeyDown(e)}
            value={allNewUsers}
            onChange={(users) => {
              setAllNewUsers(users);
            }}
            optionFilterProp="title"
            filterOption={(inputVal, option) => {
              return option.title
                .toLowerCase()
                .includes(inputVal.toLowerCase());
            }}
            allowClear
            autoFocus
          >
            {allFilteredUsers.map((user) => {
              return (
                <Option
                  key={user.id ? user.id : user.email}
                  value={user.id ? user.id : user.email}
                  title={`${user.name}-${user.email}`}
                >
                  <div className="flex flex-row items-center">
                    <Avatar src={user.avatar} className="mr-2">
                      {user.name.charAt(0).toUpperCase()}
                    </Avatar>
                    <span>{user.name}</span>
                  </div>
                </Option>
              );
            })}
          </Select>
        </Modal>
      )}

      {openHeaderModal && (
        <HeaderCustomizationModal
          openModal={openHeaderModal}
          setOpenModal={setOpenHeaderModal}
          headerCustomizeOption={headerCustomizeOption}
          headerPosition={headerPosition}
          fixedHeader={fixedHeader}
          handleHeaderFixedPosition={handleHeaderFixedPosition}
          handleHeaderPosition={handleHeaderPosition}
          handleChangeHeaderType={handleChangeHeaderType}
          collectionId={collectionId}
          singleCollectionDetails={singleCollectionDetails}
          pagesItems={pagesItems}
          setPagesItems={setPagesItems}
          getSortedItems={getSortedItems}
          showLoginButton={showLoginButton}
          showSignUpButton={showSignUpButton}
          showSearchButton={showSearchButton}
          showAllowCopyCollection={showAllowCopyCollection}
        />
      )}
    </>
  );
};

export default ShareCollectionDrawer;
