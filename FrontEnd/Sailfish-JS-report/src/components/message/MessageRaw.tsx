/******************************************************************************
 * Copyright 2009-2019 Exactpro (Exactpro Systems Limited)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 ******************************************************************************/

import * as React from 'react';
import { splitRawContent, getUnformattedContent } from '../../helpers/rawFormatter';
import '../../styles/messages.scss';
import { copyTextToClipboard } from '../../helpers/copyHandler';
import { showNotification } from '../../helpers/showNotification';

const COPY_NOTIFICATION_TEXT = 'Text copied to the clipboard!';

export interface MessageRawProps {
    rawContent: string;
}

export function MessageRaw({ rawContent }: MessageRawProps) {

    const [offset, hexadecimal, humanReadable] = splitRawContent(rawContent);

    return (
        <div className="mc-raw">
            <div className="mc-raw">
                <div className="mc-raw__title">Raw message</div>
                <div className="mc-raw__copy-all"
                    onClick={() => copyHandler(rawContent)}
                    title="Copy all raw content to clipboard">
                    <div className="mc-raw__copy-icon" />
                    <div className="mc-raw__copy-title">
                        <span>Copy All</span>
                    </div>
                </div>
            </div>
            <div className="mc-raw__content">
                <div className="mc-raw__column secondary">
                    <pre>{offset}</pre>
                </div>
                <div className="mc-raw__column primary">
                    <pre>{hexadecimal}</pre>
                    <div className="mc-raw__copy-btn   mc-raw__copy-icon"
                        onClick={() => copyHandler(hexadecimal)}
                        title="Copy to clipboard" />
                </div>
                <div className="mc-raw__column primary">
                    <pre>{humanReadable}</pre>
                    <div className="mc-raw__copy-btn   mc-raw__copy-icon"
                        onClick={() => copyHandler(getUnformattedContent(humanReadable))}
                        title="Copy to clipboard" />
                </div>
            </div>
        </div>
    )
}

function copyHandler(content: string) {
    copyTextToClipboard(content);
    showNotification(COPY_NOTIFICATION_TEXT);
}
