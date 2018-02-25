import { Component, Input, forwardRef, QueryList, ContentChildren } from '@angular/core';
import { ActionBase } from './action-base';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/empty';
import { SwitchCaseAction } from './switch-case';

@Component({
    selector: 'switch',
    template: '',
    providers: [{provide: ActionBase, useExisting: forwardRef(() => SwitchAction) }]
})
export class SwitchAction extends ActionBase {
    constructor() {
        super();
    }

    @Input() value: any;
    @ContentChildren(SwitchCaseAction) cases: QueryList<SwitchCaseAction>;


    protected executeInternal(params: any): Observable<any> {
        let value = this.tryExecuteCode(params, this.value);
        let caseFound = false;

        return new Observable(observer => {
            if (this.cases && this.cases.length) {
                this.cases.forEach($case => {
                    if (!caseFound && $case.getCaseValue(params) === value) {
                        caseFound = true;
                        $case.execute(params).subscribe();
                    }
                });


                if (!caseFound) {
                    // todo: 
                    // this.defaultCase.execute(params).subscribe();
                }
            }

            observer.next();
            observer.complete();
        });
    }
}
