
export class LiteCompiler {

    static tryExecuteCode(params: any, code: string|any, context?: any): any {
        if (!code || typeof code !== 'string' || !code.startsWith(':')) {
            return code;
        }

        // ignore ::
        if (code.startsWith('::')) {
            return code.substring(1);
        }

        let res = this.compileAndExecuteCode(params, code, context);
        return res;

        // or simple use
        // return params && code in params ? params[code] : code;
    }

    private static compileAndExecuteCode(params, code, context) {
        // see: https://github.com/JoshuaWise/expression-sandbox/blob/master/index.js
        // and: https://github.com/nx-js/compiler-util

        let names = Object.keys(params);
        let values = names.map(n => params[n]);

        try {
            let fn = new Function(...names, 'return ' + code.substring(1));
            
            try {
                let res = fn.apply(context, values);
                return res;
            }
            catch (ex) {
                console.error('Error while executing dynamic code:', code);
                return code;
            }
        }
        catch(ex) {
            console.error('Syntax error:', code);
            throw ex;
        }
    }
}
