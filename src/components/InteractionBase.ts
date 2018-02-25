import { Input } from "@angular/core";

export class InteractionBase {
    @Input() param: any;

    protected extendParams(params: any, params2?: any): any {
        if (params instanceof Array) {
            return params;
        }
        
        let res = {};

        if (params) {
            // if (!(params instanceof Array)) {
                res = params;
            // }
        }

        if (this.param) {
            for (const key in this.param) {
                if (this.param.hasOwnProperty(key)) {
                    res[key] = this.param[key];
                }
            }
        }
        if (params2) {
            for (const key in params2) {
                if (params2.hasOwnProperty(key)) {
                    res[key] = params2[key];
                }
            }
        }

        // if (params instanceof Array) {
        //     res = this.arrayToObject(params, res);
        // }
        return res;
    }

    // protected arrayToObject(params, values) {
    //     let res = {};

    //     for (let i = 0; i < params.length; i++) {
    //         if (params[i] in values) {
    //             res[params[i]] = values[params[i]];
    //         }
    //     }

    //     return res;
    // }
}
