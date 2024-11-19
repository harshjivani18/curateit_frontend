import React from "react";
import { cookies } from "next/headers";
import FeedBack from "@containers/feedback-preview/FeedBack";

const getBk = async (gemId) => {
  const cookieStore = cookies();
  const cookie = cookieStore.get("curateit-jwt");
  const headers = !cookie ? {} : { Authorization: `Bearer ${cookie.value}` };
  try {
    const res = await fetch(
      `${process.env.API_URL}/api/gems/${gemId}?populate=*`,
      {
        headers,
        next: {
          revalidate: 0,
        },
      }
    );
    const data = await res.json();

    if (!data) {
      return [];
    }
    return data?.data;
  } catch (error) {
    return null;
  }
};

const GemViewPage = async ({ params }) => {
  const gemId = params?.pageId;
  const items = await getBk(gemId);

  return <FeedBack gemId={gemId} items={items} />;
};

export default GemViewPage;
