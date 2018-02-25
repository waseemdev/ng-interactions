import { actions } from './actions';
import { triggers } from './triggers';

export * from './actions';
export * from './triggers';
export * from './helpers';


export const components: any[] = [
    ...actions,
    ...triggers
];
