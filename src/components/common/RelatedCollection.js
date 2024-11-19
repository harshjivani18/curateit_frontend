import { getRelatedCollection } from "@actions/collection";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import SingleSubItem from "./SingleSubItem";
import { sidebarSelected } from "@actions/app";
import { useRouter } from "next/navigation";
import slugify from "slugify";

const RelatedCollection = ({ gemId, gemPublicView }) => {
  const navigate = useRouter()
  const dispatch = useDispatch();
  const [relatedCollections, setRelatedCollections] = useState([]);

  useEffect(() => {
    const getCall = async () => {
      const res = await dispatch(getRelatedCollection(gemId));
      setRelatedCollections(res?.payload?.data?.related_collections || []);
    };

    getCall();
  }, [gemId]);

  const handleOpenCollection = (item) => {
    dispatch(sidebarSelected(`Folder-${item.id}`));
    if (gemPublicView) {
      navigate.push(
        `/u/${item?.author?.username}/c/${item.id}/${
          item?.slug ||
          slugify(item.name || "", {
            lower: true,
            remove: /[&,+()$~%.'":*?<>{}/\/]/g,
          })
        }?public=true`
      );
    } else {
      navigate.push(
        `/u/${item?.author?.username}/c/${item.id}/${
          item?.slug ||
          slugify(item.name || "", {
            lower: true,
            remove: /[&,+()$~%.'":*?<>{}/\/]/g,
          })
        }`
      );
    }
  };

  return (
    <>
      {relatedCollections?.length > 0 && (
        <div className="px-4 my-4">
          <h2 className="text-lg font-semibold text-center">
            Related Collections
          </h2>
          <div className="grid-container-sub-collection-view px-3 pb-4">
            {relatedCollections?.map((item) => {
              return (
                <SingleSubItem
                  handleOpenCollection={handleOpenCollection}
                  item={item}
                  fromPage={"related-collection"}
                  isSharedAndAllowEdit={false}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default RelatedCollection;