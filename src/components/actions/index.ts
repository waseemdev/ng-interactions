import { ActionBase } from './action-base';
import { ActionList } from './action-list';
import { CssClassAction } from './css-class';
import { SetAction } from './set';
import { ExecAction } from './exec';
import { FuncAction } from './func';
import { ElseAction } from './if-else';
import { IfAction } from './if';
import { CounterAction } from './loop-counter';
import { ForeachAction } from './loop-foreach';
import { SwitchCaseAction } from './switch-case';
import { SwitchAction } from './switch';
import { CssAction } from './css';
import { CssRotateAction } from './css-rotate';
import { CssTranslateAction } from './css-translate';
import { CssScaleAction } from './css-scale';
import { ThenAction } from './if-then';
import { CssSkewAction } from './css-skew';
import { CssMatrixAction } from './css-matrix';
import { ParamAction } from './exec-parameter';
import { CallbackParamAction } from './exec-callback';
import { LoopBase } from './loop-base';
import { WhileAction } from './loop-while';

export {ActionBase} from './action-base';
export {ActionList} from './action-list';
export {CssClassAction} from './css-class';
export {SetAction} from './set';
export {ExecAction} from './exec';
export {FuncAction} from './func';
export { ElseAction } from './if-else';
export { IfAction } from './if';
export { CounterAction } from './loop-counter';
export { ForeachAction } from './loop-foreach';
export { SwitchCaseAction } from './switch-case';
export { SwitchAction } from './switch';
export { CssAction } from './css';
export { CssRotateAction } from './css-rotate';
export { CssTranslateAction } from './css-translate';
export { CssScaleAction } from './css-scale';
export { CssSkewAction } from './css-skew';
export { ThenAction } from './if-then';
export { CssMatrixAction } from './css-matrix';
export { ParamAction } from './exec-parameter';
export { CallbackParamAction } from './exec-callback';
export { LoopBase } from './loop-base';
export { WhileAction } from './loop-while';

export const actions: any[] = [
    ActionBase,
    ActionList,
    FuncAction,
    CssAction,
    CssClassAction,
    CssRotateAction,
    CssTranslateAction,
    CssScaleAction,
    CssSkewAction,
    CssMatrixAction,
    SetAction,
    ParamAction,
    CallbackParamAction,
    ExecAction,
    ThenAction,
    ElseAction,
    IfAction,
    LoopBase,
    WhileAction,
    CounterAction,
    ForeachAction,
    SwitchCaseAction,
    SwitchAction
];
