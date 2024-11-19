import "./tag.css"
import Tree                 from 'antd/lib/tree/Tree';
import { useDispatch, useSelector } from "react-redux";
import { getExpandedTagKeys } from "@actions/app";
import {
    DownOutlined,
  } from '@ant-design/icons';

const TagList = ({ list, onDrop, onDragLeave,selectedKeys='' }) => {
    const dispatch = useDispatch()
    const {expandTagKeys} = useSelector(state => state.app)

    const onExpandKeys = (keys) => {
        dispatch(getExpandedTagKeys(keys))
    }

    return (
        <Tree treeData={list} 
              className="w-full folder-tree-structure pb-5 pt-2" 
              expandedKeys={expandTagKeys} 
              onDrop={onDrop} 
              onDragEnd={onDragLeave}
              onExpand={onExpandKeys}
              draggable 
              blockNode 
              selectedKeys={selectedKeys ? [selectedKeys] : null}
              switcherIcon={
                <DownOutlined />
              }
              />
    )
}

export default TagList