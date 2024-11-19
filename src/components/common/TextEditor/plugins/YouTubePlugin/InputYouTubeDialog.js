/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import React, {useState}            from 'react';

import Button                       from '../../ui/Button';
import {INSERT_YOUTUBE_COMMAND}     from './index';
import { DialogActions } from '../../ui/Dialog';

export default function InsertYouTubeDialog({
  activeEditor,
  onClose,
}) {
    const [youtubeLink, setYoutubeLink] = useState("");
    const [parsedURL, setParsedURL]     = useState(null)

    const onClick = () => {
        if (parsedURL) {
            activeEditor.dispatchCommand(INSERT_YOUTUBE_COMMAND, parsedURL.id);
        }
        onClose();
    };

    const parseUrl = (url) => {
        const match =
        /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/.exec(url);

        const id = match ? (match?.[2].length === 11 ? match[2] : null) : null;

        if (id != null) {
            return {
                id,
                url,
            };
        }

        return null;
    }

    const onURLChange = (e) => {
        const { value } = e.target
        setYoutubeLink(value)
        setParsedURL(parseUrl(value))
    }

  return (
    <div style={{width: '600px'}}>
        <div className="Input__wrapper">
            <input
                type="text"
                className="Input__input"
                placeholder={"Please enter youtube url"}
                value={youtubeLink}
                data-test-id={`youtube-embed-modal-url`}
                onChange={onURLChange}
            />
        </div>
        <DialogActions>
            <Button
            disabled={youtubeLink === ""}
            onClick={onClick}
            data-test-id={`youtube-embed-modal-submit-btn`}>
            Embed
            </Button>
        </DialogActions>
    </div>
  );
}