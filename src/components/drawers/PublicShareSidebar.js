import CollectionSharedSidebar from "@containers/shareCollections/CollectionSharedSidebar";
import { Drawer } from "antd";
import { setIsMobileSidebar } from "@actions/app";
import { useDispatch, useSelector } from "react-redux";

const PublicShareSidebar = ({ authorName, subFolder }) => {
  const dispatch = useDispatch();
  const { isMobileSidebar } = useSelector((state) => state.app);

  const closeDrawer = () => {
    dispatch(setIsMobileSidebar(false));
  }

  return (
    <>
      <>
        <Drawer
          width={"90%"}
          closable={false}
          // title={title}
          placement="left"
          onClose={() => dispatch(setIsMobileSidebar(false))}
          open={isMobileSidebar}
          footer={null}
        >
          <CollectionSharedSidebar
            isFooter={true}
            authorName={authorName}
            subFolder={subFolder}
            onCloseDrawer={closeDrawer}
          />
        </Drawer>
      </>
    </>
  );
};

export default PublicShareSidebar;
