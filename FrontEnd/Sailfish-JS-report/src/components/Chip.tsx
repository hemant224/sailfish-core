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
import { StatusType, } from '../models/Status';
import { getStatusChipDescription } from '../helpers/action';
import '../styles/chip.scss';
import { createSelector } from '../helpers/styleCreators';

interface ChipProps {
    count: number;
    status?: StatusType;
    isSelected?: boolean;
    clickHandler?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => any;
}

export const Chip = ({ status, count, isSelected, clickHandler }: ChipProps) => {

    const rootClass = createSelector(
        "chip",
        status,
        isSelected ? "selected" : null,
        clickHandler ? "clickable" : null
    );

    const description = status ? getStatusChipDescription(status) : "";

    return (
        <div className={rootClass} 
            title={description}
            onClick={e => clickHandler && clickHandler(e)}>
            <div className="chip__title">
                <p>{count}</p>
            </div>
        </div>
    )
}