'use client'

import slugify from "slugify";
import ImageHighlight from "./ImageHighlight";
import CodeHighlight from "./CodeHighlight";
import session from "@utils/session";
import { useRouter } from "next/navigation";
import TextHighlight from "./TextHighlight";

const AllHighlights = ({ allHighlights, user, isSidebar, width }) => {
  const navigate = useRouter();

  const onGemOpen = (obj) => {
    navigate.push(`/u/${user?.username ? user.username : session.username}/g/${obj.id}/${obj?.slug || slugify(obj.title || "", { lower: true, remove: /[&,+()$~%.'":*?<>{}/\/]/g })}`)
  }

  const openHighlight = (obj) => {
    window.open(obj.url, "_blank");
  }

  const renderHighlightDetails = (obj) => {
    switch (obj.media_type || obj?.media?.type) {
      case "Code":
        return <CodeHighlight obj={obj} onViewGem={() => onGemOpen(obj)} user={user} openHighlight={() => openHighlight(obj)} isSidebar={isSidebar} width={width}/>;
      case "Image":
      case "Screenshot":
        return <ImageHighlight obj={obj} onViewGem={() => onGemOpen(obj)} user={user} openHighlight={() => openHighlight(obj)} />;
      case "Highlight":
      case "Note":
      case "Ai Prompt":
      case "Quote":
        return <TextHighlight key={obj?.id} obj={obj} media={obj?.media} user={user} isProfile={true} onViewGem={() => onGemOpen(obj)} />;
      default:
        return null;
    }
  };

  const renderHighlights = () => {
    return (
      <div className="flex flex-col gap-4">
        {allHighlights.length === 0 ? (
          <h4 className="text-center mt-4">
            There are no highlights for this page.
          </h4>
        ) : (
          allHighlights.map((o) => {
            return renderHighlightDetails({ id: o?.id, ...o?.attributes });
          })
        )}
      </div>
    );
  };

  return renderHighlights();
};

export default AllHighlights;
