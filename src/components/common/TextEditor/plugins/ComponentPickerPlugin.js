import "./ComponentPicker.css"

// import {$createCodeNode} from '@lexical/code';
import {
  INSERT_CHECK_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
} from '@lexical/list';
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import {INSERT_HORIZONTAL_RULE_COMMAND} from '@lexical/react/LexicalHorizontalRuleNode';
import {
  LexicalTypeaheadMenuPlugin,
  TypeaheadOption,
  useBasicTypeaheadTriggerMatch,
} from '@lexical/react/LexicalTypeaheadMenuPlugin';
import {$createHeadingNode, $createQuoteNode} from '@lexical/rich-text';
import {$setBlocksType} from '@lexical/selection';
import {INSERT_TABLE_COMMAND} from '@lexical/table';
import { List } from 'antd';
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  FORMAT_ELEMENT_COMMAND,
} from 'lexical';
import {useCallback, useMemo, useState} from 'react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { INSERT_COLLAPSIBLE_COMMAND } from "./CollapsiblePlugin";
import InsertYouTubeDialog from "./YouTubePlugin/InputYouTubeDialog";
import useModal from "../hooks/useModal";
import { InsertImageDialog } from "./ImagesPlugin";
import { BiColumns } from "react-icons/bi";
import InsertLayoutDialog from "./LayoutPlugin/InsertLayoutDialog";
import { FaFreeCodeCamp } from "react-icons/fa";
import { InsertIframeDialogBox } from "./IframePlugin";

class ComponentPickerOption extends TypeaheadOption {
  title
  icon
  keywords
  keyboardShortcut
  onSelect

  constructor(
    title,
    options,
  ) {
    super(title);
    this.title = title;
    this.keywords = options.keywords || [];
    this.icon = options.icon;
    this.keyboardShortcut = options.keyboardShortcut;
    this.onSelect = options.onSelect.bind(this);
  }
}

function ComponentPickerMenuItem({
  index,
  isSelected,
  onClick,
  onMouseEnter,
  option,
}) {
  let className = 'item';
  if (isSelected) {
    className += ' selected';
  }
  return (
    <List.Item onClick={onClick} key={index} onMouseEnter={onMouseEnter}>
      <List.Item.Meta className="items-center" avatar={<div className='ct-list-icon flex items-center'>{option.icon}</div>} title={option.title} description={option.description} />
    </List.Item>
  )
  // return (
  //   <li
  //     key={option.key}
  //     tabIndex={-1}
  //     className={className}
  //     ref={option.setRefElement}
  //     role="option"
  //     aria-selected={isSelected}
  //     id={'typeahead-item-' + index}
  //     onMouseEnter={onMouseEnter}
  //     onClick={onClick}>
  //     {option.icon}
  //     <span className="text">{option.title}</span>
  //   </li>
  // );
}

export default function ComponentPickerMenuPlugin() {
  const [editor] = useLexicalComposerContext();
  const [queryString, setQueryString] = useState(null);
  const [modal, showModal] = useModal();

  const checkForTriggerMatch = useBasicTypeaheadTriggerMatch('/', {
    minLength: 0,
  });

  const getDynamicOptions = useCallback(() => {
    const options = [];

    if (queryString == null) {
      return options;
    }

    const fullTableRegex = new RegExp(/^([1-9]|10)x([1-9]|10)$/);
    const partialTableRegex = new RegExp(/^([1-9]|10)x?$/);

    const fullTableMatch = fullTableRegex.exec(queryString);
    const partialTableMatch = partialTableRegex.exec(queryString);

    if (fullTableMatch) {
      const [rows, columns] = fullTableMatch[0]
        .split('x')
        .map((n) => parseInt(n, 10));

      options.push(
        new ComponentPickerOption(`${rows}x${columns} Table`, {
          icon: <i className="icon table" />,
          keywords: ['table'],
          onSelect: () =>
            // @ts-ignore Correct types, but since they're dynamic TS doesn't like it.
            editor.dispatchCommand(INSERT_TABLE_COMMAND, {columns, rows}),
        }),
      );
    } else if (partialTableMatch) {
      const rows = parseInt(partialTableMatch[0], 10);

      options.push(
        ...Array.from({length: 5}, (_, i) => i + 1).map(
          (columns) =>
            new ComponentPickerOption(`${rows}x${columns} Table`, {
              icon: <i className="icon table" />,
              keywords: ['table'],
              onSelect: () =>
                // @ts-ignore Correct types, but since they're dynamic TS doesn't like it.
                editor.dispatchCommand(INSERT_TABLE_COMMAND, {columns, rows}),
            }),
        ),
      );
    }

    return options;
  }, [editor, queryString]);

  const alignmentsOpts = useMemo(() => {
    const baseOptions = [    
      ...['left', 'center', 'right', 'justify'].map(
        (alignment) =>
          new ComponentPickerOption(`Align ${alignment}`, {
            icon: <i className={`icon ${alignment}-align ct-mr-0`} />,
            keywords: ['align', 'justify', alignment],
            onSelect: () =>
              // @ts-ignore Correct types, but since they're dynamic TS doesn't like it.
              editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, alignment),
          }),
      ),
    ];

    const dynamicOptions = getDynamicOptions();

    return queryString
      ? [
          ...dynamicOptions,
          ...baseOptions.filter((option) => {
            return new RegExp(queryString, 'gi').exec(option.title) ||
              option.keywords != null
              ? option.keywords.some((keyword) =>
                  new RegExp(queryString, 'gi').exec(keyword),
                )
              : false;
          }),
        ]
      : baseOptions;
  }, [editor, getDynamicOptions, queryString, ]);

  const generalOptions = useMemo(() => {
    const baseOptions = [
      new ComponentPickerOption('Table', {
        icon: <i className="icon table ct-mr-0" />,
        keywords: ['table'],
        description: "Start adding tabular data",
        onSelect: () =>
          editor.dispatchCommand(INSERT_TABLE_COMMAND, { columns: 2, rows: 2 }),
      }),
      new ComponentPickerOption('Columns Layout', {
        icon: <BiColumns className='w-[16px] h-[16px] ct-mr-0' />,
        keywords: ['table'],
        description: "Start adding columns layout",
        onSelect: () =>{
          showModal('Insert Columns Layout', (onClose) => (
            <InsertLayoutDialog
              activeEditor={editor}
              onClose={onClose}
            />
          ));
        }
      }),
      new ComponentPickerOption('Collapsible container', {
        icon: <i className="icon caret-right ct-mr-0" />,
        keywords: ['collapsible', 'container', 'accordion'],
        description: "Start adding tabular data",
        onSelect: () =>
          editor.dispatchCommand(INSERT_COLLAPSIBLE_COMMAND, undefined),
      }),
      new ComponentPickerOption('Numbered List', {
        icon: <i className="icon number ct-mr-0" />,
        keywords: ['numbered list', 'ordered list', 'ol'],
        description: "Start adding your ordered list",
        onSelect: () =>
          editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined),
      }),
      new ComponentPickerOption('Bulleted List', {
        icon: <i className="icon bullet ct-mr-0" />,
        keywords: ['bulleted list', 'unordered list', 'ul'],
        description: "Start adding your unordered list",
        onSelect: () =>
          editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined),
      }),
      new ComponentPickerOption('Check List', {
        icon: <i className="icon check ct-mr-0" />,
        keywords: ['check list', 'todo list'],
        description: "Start adding your check list",
        onSelect: () =>
          editor.dispatchCommand(INSERT_CHECK_LIST_COMMAND, undefined),
      }),
      new ComponentPickerOption('Divider', {
        icon: <i className="icon horizontal-rule ct-mr-0" />,
        keywords: ['horizontal rule', 'divider', 'hr'],
        description: "Start adding your divider",
        onSelect: () =>
          editor.dispatchCommand(INSERT_HORIZONTAL_RULE_COMMAND, undefined),
      })
    ];

    const dynamicOptions = getDynamicOptions();

    return queryString
      ? [
          ...dynamicOptions,
          ...baseOptions.filter((option) => {
            return new RegExp(queryString, 'gi').exec(option.title) ||
              option.keywords != null
              ? option.keywords.some((keyword) =>
                  new RegExp(queryString, 'gi').exec(keyword),
                )
              : false;
          }),
        ]
      : baseOptions;
  }, [editor, getDynamicOptions, queryString, ]);

  const textStyles = useMemo(() => {
    const baseOptions = [
      new ComponentPickerOption('Paragraph', {
        icon: <i className="icon paragraph ct-mr-0" />,
        keywords: ['normal', 'paragraph', 'p', 'text'],
        description: "Start writing your content here",
        onSelect: () =>
          editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
              $setBlocksType(selection, () => $createParagraphNode());
            }
          }),
      }),
      ...Array.from({length: 3}, (_, i) => i + 1).map(
        (n) =>
          new ComponentPickerOption(`Heading ${n}`, {
            icon: <i className={`icon h${n} ct-mr-0`} />,
            keywords: ['heading', 'header', `h${n}`],
            description: `Start adding your Heading ${n}`,
            onSelect: () =>
              editor.update(() => {
                const selection = $getSelection();
                if ($isRangeSelection(selection)) {
                  $setBlocksType(selection, () =>
                    // @ts-ignore Correct types, but since they're dynamic TS doesn't like it.
                    $createHeadingNode(`h${n}`),
                  );
                }
              }),
          }),
      ),
      new ComponentPickerOption('Quote', {
        icon: <i className="icon quote ct-mr-0" />,
        keywords: ['block quote'],
        description: "Start adding your quote",
        onSelect: () =>
          editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
              $setBlocksType(selection, () => $createQuoteNode());
            }
          }),
      })
    ];

    const dynamicOptions = getDynamicOptions();

    return queryString
      ? [
          ...dynamicOptions,
          ...baseOptions.filter((option) => {
            return new RegExp(queryString, 'gi').exec(option.title) ||
              option.keywords != null
              ? option.keywords.some((keyword) =>
                  new RegExp(queryString, 'gi').exec(keyword),
                )
              : false;
          }),
        ]
      : baseOptions;
  }, [editor, getDynamicOptions, queryString, ]);

  const mediaOptions = useMemo(() => {
    const baseOptions = [
      new ComponentPickerOption('YouTube', {
        icon: <i className="icon youtube ct-mr-0" />,
        keywords: ["youtube", "video"],
        description: "Start embedding your YouTube video",
        onSelect: () => {
          showModal('Insert YouTube Video', (onClose) => (
            <InsertYouTubeDialog
              activeEditor={editor}
              onClose={onClose}
            />
          ));
        },
      }),
      new ComponentPickerOption('Embed using link', {
        icon: <FaFreeCodeCamp className='icon ct-mr-0' />,
        keywords: ["embed", "link"],
        description: "Start embedding your site link",
        onSelect: () => {
          showModal('Embed link', (onClose) => (
            <InsertIframeDialogBox
              activeEditor={editor}
              onClick={onClose}
            />
          ));
        },
      }),
      new ComponentPickerOption('Image', {
        icon: <i className="icon image ct-mr-0" />,
        keywords: ["image", "photo"],
        description: "Start embedding your image",
        onSelect: () => {
          showModal('Insert Image', (onClose) => (
            <InsertImageDialog
              activeEditor={editor}
              onClose={onClose}
            />
          ));
        },
      }),
    ];

    const dynamicOptions = getDynamicOptions();

    return queryString
      ? [
          ...dynamicOptions,
          ...baseOptions.filter((option) => {
            return new RegExp(queryString, 'gi').exec(option.title) ||
              option.keywords != null
              ? option.keywords.some((keyword) =>
                  new RegExp(queryString, 'gi').exec(keyword),
                )
              : false;
          }),
        ]
      : baseOptions;
  }, [editor, getDynamicOptions, queryString, ]);

  const onSelectOption = useCallback(
    (
      selectedOption,
      nodeToRemove,
      closeMenu,
      matchingString,
    ) => {
      editor.update(() => {
        if (nodeToRemove) {
          nodeToRemove.remove();
        }
        selectedOption.onSelect(matchingString);
        closeMenu();
      });
    },
    [editor],
  );

  const onMenuOpen = (e) => {
    // scroll window to popup bottom
    if (e.getRect) {
      // Window should scroll to the bottom of the popup
      const bb = e.getRect();
      window.scrollTo(0, bb.top);
    }
  }
  
  const newArr = [...generalOptions, ...alignmentsOpts, ...textStyles, ...mediaOptions];
  return (
    <>
      <LexicalTypeaheadMenuPlugin
        onQueryChange={setQueryString}
        onSelectOption={onSelectOption}
        triggerFn={checkForTriggerMatch}
        onOpen={onMenuOpen}
        options={newArr}
        menuRenderFn={(
          anchorElementRef,
          {selectedIndex, selectOptionAndCleanUp, setHighlightedIndex},
        ) =>
          anchorElementRef.current && newArr.length
            ? ReactDOM.createPortal(
                <div className="typeahead-popover component-picker-menu">
                  <div className='basic-block-list'>
                    <span className='text-xs ct-picker-inner-title'>Text Styles</span>
                    {textStyles.map((option, i) => (
                      <ComponentPickerMenuItem
                        index={i}
                        isSelected={selectedIndex === i}
                        onClick={() => {
                          setHighlightedIndex(i);
                          selectOptionAndCleanUp(option);
                        }}
                        onMouseEnter={() => {
                          setHighlightedIndex(i);
                        }}
                        key={option.key}
                        option={option}
                      />
                    ))}
                    <hr />
                    <span className='text-xs ct-picker-inner-title'>General</span>
                    {generalOptions.map((option, i) => (
                      <ComponentPickerMenuItem
                        index={i}
                        isSelected={selectedIndex === i}
                        onClick={() => {
                          setHighlightedIndex(i);
                          selectOptionAndCleanUp(option);
                        }}
                        onMouseEnter={() => {
                          setHighlightedIndex(i);
                        }}
                        key={option.key}
                        option={option}
                      />
                    ))}
                    <hr />
                    <span className='text-xs ct-picker-inner-title'>Media</span>
                    {mediaOptions.map((option, i) => (
                      <ComponentPickerMenuItem
                        index={i}
                        isSelected={selectedIndex === i}
                        onClick={() => {
                          setHighlightedIndex(i);
                          selectOptionAndCleanUp(option);
                        }}
                        onMouseEnter={() => {
                          setHighlightedIndex(i);
                        }}
                        key={option.key}
                        option={option}
                      />
                    ))}
                    <hr />
                    <span className='text-xs ct-picker-inner-title'>Alignments</span>
                    {/* <ul className='basic-blocks'> */}
                    {alignmentsOpts.map((option, i) => (
                      <ComponentPickerMenuItem
                        index={i}
                        isSelected={selectedIndex === i}
                        onClick={() => {
                          setHighlightedIndex(i);
                          selectOptionAndCleanUp(option);
                        }}
                        onMouseEnter={() => {
                          setHighlightedIndex(i);
                        }}
                        key={option.key}
                        option={option}
                      />
                    ))}
                    {/* </ul> */}
                  </div>
                </div>,
                anchorElementRef.current,
              )
            : null
        }
      />
      {modal}
    </>
  );
}
