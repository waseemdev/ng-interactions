import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/delay';
import { LiteCompiler } from '../helpers';
import { InteractionBase } from '../InteractionBase';

@Component({
    selector: 'action-base',
    template: ''
})
export abstract class ActionBase extends InteractionBase {
    constructor() {
        super();
    }

    @Input() delay: number = 0;

    protected abstract executeInternal(params: any): Observable<any>;

    execute(params: any): Observable<any> {
        params = this.extendParams(params);
        
        if (this.delay) {
            return this.executeInternal(params).delay(this.delay);
        }
        else {
            return this.executeInternal(params);
        }
    }

    protected tryExecuteCode(params: any, code: string|any, context?: any): any {
        let res = LiteCompiler.tryExecuteCode(params, code, context || this);
        return res;
    }
}
