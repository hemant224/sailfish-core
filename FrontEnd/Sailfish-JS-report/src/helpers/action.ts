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

import { ActionNode, isAction } from "../models/Action";
import Action from '../models/Action';
import { StatusType } from "../models/Status";
import { intersection } from "./array";

const ACTION_CHECKPOINT_NAME = "Checkpoint";

export function getActions(actionNodes: ActionNode[]) : Action[] {
    return actionNodes.filter(isAction);
}

export function isCheckpointAction(action: Action): boolean {
    return action.parameters?.some(param => param.name === ACTION_CHECKPOINT_NAME);
}

export function getStatusChipDescription(status: StatusType): string {
    const statusFormatted = status.toLowerCase().replace('_', ' '),
        statusCapitalized = statusFormatted.charAt(0).toUpperCase() + statusFormatted.slice(1);

    return `${statusCapitalized} actions count. Click to select related ${statusFormatted} actions.`;
}

export function removeNonexistingRelatedMessages(action: ActionNode, messagesIds: number[]): ActionNode {
    if (!isAction(action)) {
        return action;
    }

    return {
        ...action,
        relatedMessages: intersection(action.relatedMessages, messagesIds),
        subNodes: action.subNodes.map(action => removeNonexistingRelatedMessages(action, messagesIds))
    }
}

export function getActionCheckpointName(action: Action): string {
    if (action.parameters == null) {
        return '';
    }

    const checkpointParam = action.parameters.find(param => param.name == 'Checkpoint'),
        nameParam = checkpointParam && checkpointParam.subParameters.find(param => param.name == 'Name'),
        name = nameParam != null ? nameParam.value : '';

    return name;
}
