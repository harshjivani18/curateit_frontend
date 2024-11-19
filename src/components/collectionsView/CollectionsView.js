"use client";
import React, { useState, useEffect } from "react";
// import { FiChevronDown, FiChevronRight } from "react-icons/fi";
// import { LuSquareSlash } from "react-icons/lu";
import { useRouter } from 'next/navigation';
import slugify from 'slugify';
import session from "@utils/session";

const CollectionsView = ({ folders=[], targetId }) => {
  const [mainParentFolder, setMainParentFolder] = useState(null);
  const [currentFolder, setCurrentFolder] = useState(null);

  useEffect(() => {
    const findMainParentAndCurrentFolder = (folders, id, ancestors = []) => {
      for (const folder of folders) {
        const newAncestors = [...ancestors, folder];
        if (folder.id.toString() === id.toString()) {
          setCurrentFolder(folder);
          setMainParentFolder(ancestors[0] || null); // Set main parent to the first ancestor or null if at root
          return;
        } else if (folder.folders?.length) {
          findMainParentAndCurrentFolder(folder.folders, id, newAncestors);
        }
      }
    };

    findMainParentAndCurrentFolder(folders, targetId);
  }, [folders, targetId]);

  return (
    <div className="flex flex-row items-center">
      {mainParentFolder && (
        <div className="flex flex-row overflow-auto space-x-4 rounded-lg">
          <Folder
            key={mainParentFolder.id}
            folder={mainParentFolder}
            initiallyOpen={false}
          />
        </div>
      )}
      {/* {currentFolder && <LuSquareSlash size={20} />} */}
      {currentFolder && <>{"/"}</>}
      {currentFolder && (
        <div className="flex flex-row overflow-auto space-x-4 rounded-lg">
          <Folder
            key={currentFolder.id}
            folder={{ ...currentFolder, folders: [] }}
            initiallyOpen={false}
          />
        </div>
      )}
    </div>
  );
};

const Folder = ({ folder, initiallyOpen }) => {
  const [isOpen, setIsOpen] = useState(initiallyOpen);
  const hasSubFolders = folder.folders && folder.folders.length > 0;

  const toggleOpen = () => setIsOpen(!isOpen);
  const navigate = useRouter()

  const handleFolderClick = (id, name, slug) => {
    const slugifiedName = slug || slugify(name || "", { lower: true, remove: /[&,+()$~%.'":*?<>{}/\/]/g });
    navigate.push(`/u/${session.username}/c/${id}/${slugifiedName}`);
  };

  return (
    <div className="flex flex-col items-start">
      <div className="flex items-center cursor-pointer" onClick={toggleOpen}>
        {/* <span className="bg-gray-300 rounded-full">
          {hasSubFolders && (isOpen ? <FiChevronDown /> : <FiChevronRight />)}
        </span> */}
        <span
          onClick={() => handleFolderClick(folder.id, folder.name, folder.slug)}
          className="transition p-1 rounded-md mx-1 mt-1 hover:bg-gray-200"
        >
          {folder.name}
        </span>
      </div>
      {isOpen && hasSubFolders && (
        <div className="flex flex-col ml-4">
          {folder.folders.map((subFolder) => (
            <Folder
              key={subFolder.id}
              folder={subFolder}
              initiallyOpen={false}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CollectionsView;
