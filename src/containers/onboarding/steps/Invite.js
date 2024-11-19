import TextareaAutosize                     from "react-textarea-autosize";
import OnboardNextButton from "@components/onboarding/common/OnboardNextButton";
import OnboardProgress from "@components/onboarding/common/OnboardProgress";
import OnboardingRightImage from "@components/onboarding/common/OnboardingRightImage";
import TitleComponent from "@components/onboarding/common/TitleComponents";
import { EnvelopeOpenIcon } from "@heroicons/react/24/outline";
import { inviteViaEmail } from "@actions/referral";
import { message } from "antd";
import { useEffect, useState } from "react";
import { getAllRegisteredUsers } from "@actions/group";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { enableTourSteps, fromWelcomeModal } from "@actions/app";
import session from "@utils/session";
import { TextMessage } from "@utils/constants";
import { updateUser } from "@actions/user";

const Invite = () => {
  const dispatch = useDispatch()
  const navigate = useRouter()
  const onboardingUserPreference = useSelector(
    (state) => state.app.onboardingUserPreference
  );
  const [invitedUsers,setInvitedUsers] = useState('')
  const [allRegisteredUsers, setAllRegisteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(getAllRegisteredUsers()).then((res) => {
      setAllRegisteredUsers(res?.payload?.data?.data);
    });
  },[])

  const onEmailInvite = async (e) => {
    if (invitedUsers) {
      setLoading(true);
      const email = invitedUsers.split(",");
      const cleanedEmails = email?.map((mail) => mail.trim());
      await dispatch(inviteViaEmail(cleanedEmails));
      cleanedEmails.forEach((email) => {
        const registerdUserIdx = allRegisteredUsers.findIndex(
          (user) => user.email === email
        );
        if (registerdUserIdx !== -1) {
          message.error(`${email} is already registered`);
          setLoading(false);
          return;
        }
      });

      const payload = {
        preferences: {
          ...onboardingUserPreference?.preferences,
          completed_steps: 10,
          current_step: 10,
        },
      };
      dispatch(updateUser(payload));
      message.success("Email sent");
      dispatch(enableTourSteps(true));
      dispatch(fromWelcomeModal(true));
      navigate.push(`/u/${session.username}/all-bookmarks`);
      setLoading(false);
    } else {
      const payload = {
        preferences: {
          ...onboardingUserPreference?.preferences,
          completed_steps: 10,
          current_step: 10,
        },
      };
      dispatch(updateUser(payload));
      dispatch(enableTourSteps(true));
      dispatch(fromWelcomeModal(true));
      navigate.push(`/u/${session.username}/all-bookmarks`);
      setLoading(false);
    }
  };

  return (
    <div className="h-full grid grid-cols-1 md:grid-cols-5">
      <div className="p-8 col-span-1 md:col-span-3">
        <TitleComponent
          title={"Invite friends to collaborate"}
          subTitle={`Let your friends discover your curated gems and collections`}
        />

        <OnboardProgress />

        <div className="flex my-4">
          <EnvelopeOpenIcon className="h-6 w-6 text-[#347AE2] mr-4" />

          <TextareaAutosize
            value={invitedUsers}
            onChange={(e) => setInvitedUsers(e.target.value)}
            placeholder="Enter email addresses, separated by coma"
            minRows={4}
            className="w-full rounded-md resize-none !outline-none !focus:outline-none textarea-border h-auto"
          />
        </div>

        <OnboardNextButton onEmailInvite={onEmailInvite} loading={loading} />
      </div>

      <OnboardingRightImage
        imgSrc={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_cover/onboarding-images/invite-new.png`}
        alt={
          "Share your gems, collections, blogs with colleagues, teams or publish on web | Curateit"
        }
        title={
          "Share your gems, collections, blogs with colleagues, teams or publish on web"
        }
        subTitle={
          "Discover how to share collections with friends, make your content public, and publish your site, blogs, collections on Google."
        }
        divCls="px-9"
        titleCls="pb-2"
      />
    </div>
  );
};

export default Invite;
