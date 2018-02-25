import { Component, Input, forwardRef, QueryList, ContentChild } from '@angular/core';
import { ParamAction } from './exec-parameter';

@Component({
    selector: 'callback-param',
    template: '',
    providers: [{provide: ParamAction, useExisting: forwardRef(() => CallbackParamAction) }]
})
export class CallbackParamAction extends ParamAction {
    constructor() {
        super();
    }
}
