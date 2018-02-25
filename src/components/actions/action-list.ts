import { Component, OnInit, Input, ContentChildren, QueryList, forwardRef, ForwardRefFn } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActionBase } from './action-base';
import { ActionListHelper } from '../helpers/ActionListHelper';

@Component({
    selector: 'action-list',
    template: '',
    providers: [{provide: ActionBase, useExisting: forwardRef(() => ActionList) }]
})
export abstract class ActionList extends ActionBase {
    constructor() {
        super();
    }

    /** @internal */
    @ContentChildren(ActionBase) actions: QueryList<ActionBase>;


    protected executeInternal(params: any): Observable<any> {
        if (!this.actions.length) {
            return Observable.empty();
        }

        return this.executeActions(params);
    }

    protected executeActions(params: {}): Observable<any> {
        return new Observable(observer => {
            let helper: ActionListHelper = new ActionListHelper(this.actions.filter(a => a != this), false, false);
            helper.executeActions(params, () => {
                observer.next();
                observer.complete();
            }, () => {
                observer.error();
            });
        });
    }
}
