
export class ConditionEval {
    isTrue(value1, oper, value2): boolean {
        if (!oper && !value1 && value2) {
            return false;
        }
        else {
            if (oper) {
                if (this.isConditionTrue(oper, value1, value2)) {
                    return true;
                }
            }
            else {
                if (value1 || value2) {
                    return true;
                }
            }
        }

        return false;
    }

    private isConditionTrue(oper: string, val1, val2) {
        switch (oper) {
            case '>': return val1 > val2;
            case '<': return val1 < val2;
            case '>=': return val1 >= val2;
            case '<=': return val1 <= val2;
            case '!==': return val1 !== val2;
        }
        return val1 === val2;
    }
}
