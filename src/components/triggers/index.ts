import { TriggerBase } from './trigger-base';
import { EventTrigger } from './event-trigger';
import { StateTrigger } from './state-trigger';

export {TriggerBase} from './trigger-base';
export {EventTrigger} from './event-trigger';
export { StateTrigger } from './state-trigger';

export const triggers: any[] = [
    TriggerBase,
    EventTrigger,
    StateTrigger
];
