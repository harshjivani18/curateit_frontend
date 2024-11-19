import "./folder.css"
import Tree                 from 'antd/lib/tree/Tree';
import { useDispatch, useSelector } from "react-redux";
import { getExpandedKeys } from "@actions/app";
import {
    DownOutlined,
  } from '@ant-design/icons';

const FolderList = ({ list, onDrop, onDragLeave,selectedKeys='' }) => {
    const dispatch = useDispatch()
    const {expandKeys} = useSelector(state => state.app)
    const onExpandKeys = (keys) => {
        dispatch(getExpandedKeys(keys))
    }

    return (
        <Tree treeData={list} 
              showIcon
              className="w-full folder-tree-structure pb-1 pt-2" 
              switcherIcon={
                <DownOutlined />
              }
              expandedKeys={expandKeys} 
              onDrop={onDrop} 
              onDragEnd={onDragLeave}
              onExpand={onExpandKeys}
              draggable 
              blockNode 
              selectedKeys={selectedKeys ? [selectedKeys] : null}
              />
    )
}

export default FolderList