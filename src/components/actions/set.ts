import { Component, forwardRef, Input, ContentChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/empty';
import { ActionBase } from './action-base';

@Component({
    selector: 'set',
    template: '',
    providers: [{provide: ActionBase, useExisting: forwardRef(() => SetAction) }]
})
export class SetAction extends ActionBase {
    constructor() {
        super();
    }

    @Input() target: any;
    @Input() property: string;
    @Input() value: any;

    // @ContentChild(ValueGetterAction) sourceContainer: any;
    // @ContentChild(ValueGetterAction) propertyContainer: any;
    // @ContentChild(ValueGetterAction) valueContainer: any;

    protected executeInternal(params: any): Observable<any> {
        let target = this.tryExecuteCode(params, this.target);
        let property = this.tryExecuteCode(params, this.property);
        let value = this.tryExecuteCode(params, this.value);

        if (target) {
            if (property) {
                target[property] = value;
            }
            // todo
            // else if (this.properties && this.properties.length) {
            // }
        }

        return Observable.empty();
    }
}
