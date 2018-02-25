import { Component, Input, forwardRef, QueryList, ContentChildren } from '@angular/core';
import { ActionBase } from './action-base';
import { ActionList } from './action-list';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/empty';
import { CallbackParamAction } from './exec-callback';
import { ParamAction } from './exec-parameter';

@Component({
    selector: 'exec',
    template: '',
    providers: [{provide: ActionBase, useExisting: forwardRef(() => ExecAction) }]
})
export class ExecAction extends ActionBase {
    constructor() {
        super();
    }

    @Input() source: any;
    @Input('function') functionName: string;
    @Input() params: any[];
    @Input() cache: boolean = true;
    // /** @internal */
    @ContentChildren(ParamAction) paramsActions: QueryList<ParamAction>;

    private static readonly caches: Map<any, CachedFunction> = new Map();


    protected executeInternal(params: any): Observable<any> {
        let cachedFunc = this.getFunction(params);

        if (!cachedFunc || !cachedFunc.func || typeof cachedFunc.func !== 'function') {
            return Observable.empty();
        }

        let res = cachedFunc.func.apply(cachedFunc.context, [...(cachedFunc.params || [])]);

        if (res instanceof Observable) {
            return res;
        }
        else {
            return new Observable(observer => {
                observer.next(res);
                observer.complete();
            });
        }
    }

    private getFunction(params): CachedFunction {
        let res: CachedFunction;

        if (this.cache && (res = ExecAction.caches.get(this))) {
            return res;
        }

        res = {} as any;
        // let functionName = this.tryExecuteCode(params, this.functionName);
        res.context = this.tryExecuteCode(params, this.source);
        // let funcParams = this.tryExecuteCode(params, this.params);
        let functionName: any = this.functionName;
        res.params = this.params;

        if (!res.context && !(functionName instanceof Function)) {
            return null;
        }

        if (functionName instanceof Function) {
            res.func = functionName;
        }
        else {
            res.func = res.context[functionName];
        }

        if (this.paramsActions && this.paramsActions.length) {
            if (!res.params) {
                res.params = [];
            }
            this.paramsActions.forEach(pa => {
                if (pa instanceof CallbackParamAction) {
                    // callback parameter
                    res.params[pa.index || 0] = () => {
                        pa.execute(params).subscribe();
                    };
                }
                else {
                    // todo: 
                }
            });
        }

        if (this.cache) {
            ExecAction.caches.set(this, res);
        }
        return res;
    }
}

export interface CachedFunction {
    func: Function;
    context: any;
    params: any
}
