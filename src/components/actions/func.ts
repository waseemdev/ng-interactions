import { Component, OnInit, Input, ContentChildren, QueryList, forwardRef, ForwardRefFn } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActionBase } from './action-base';
import { ActionList } from './action-list';

@Component({
    selector: 'func',
    template: '',
    providers: [{provide: ActionBase, useExisting: forwardRef(() => FuncAction) }]
})
export class FuncAction extends ActionList {
    constructor() {
        super();
    }

    @Input() sync: boolean = false;
    /** completeOnError if the execution of actions is sync. */
    @Input() completeOnError: boolean = false;

    @Input() params: string[];
    // @Input() values: any[];

    protected executeInternal(params: any): Observable<any> {
        if (!this.actions.length) {
            return Observable.empty();
        }

        let scopeParams = params;
        if (params instanceof Array) {
            scopeParams = this.createParamsFromArray(params);
        }

        return this.executeActions(scopeParams);
    }

    private createParamsFromArray(params: any[]): any {
        let res = {};

        if (!this.params || !this.params.length) {
            return res;
        }

        for (let i = 0; i < params.length; i++) {
            if (i < this.params.length) {
                let paramName = this.params[i];
                res[paramName] = params[i];
            }
        }

        return res;
    }
}
