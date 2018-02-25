import { Component, Input, forwardRef, QueryList, ContentChild } from '@angular/core';
import { ActionBase } from './action-base';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/empty';
import { ElseAction } from './if-else';
import { ThenAction } from './if-then';
import { ConditionEval } from '../helpers/ConditionEval';

@Component({
    selector: 'if',
    template: '',
    providers: [{provide: ActionBase, useExisting: forwardRef(() => IfAction) }]
})
export class IfAction extends ActionBase {
    constructor() {
        super();
    }

    @Input() oper: any;
    @Input() value1: any;
    @Input() value2: any;

    @ContentChild(ElseAction) elseAction: ElseAction;
    @ContentChild(ThenAction) thenAction: ThenAction;

    private conditionEval: ConditionEval = new ConditionEval();


    protected executeInternal(params: any): Observable<any> {
        let oper = this.tryExecuteCode(params, this.oper);
        let value1 = this.tryExecuteCode(params, this.value1);
        let value2 = this.tryExecuteCode(params, this.value2);

        if (!this.conditionEval.isTrue(value1, oper, value2)) {
            if (this.elseAction) {
                return this.elseAction.execute(params);
            }
        }
        else {
            if (this.thenAction) {
                return this.thenAction.execute(params);
            }
        }

        return Observable.empty();
    }
}
