class Watcher{
    constructor(vm, expr, cb){
        this.vm = vm;
        this.expr = expr;
        this.cb = cb;
        this.value = this.get();
    }
    /*helper*/
    get() {
        Dep.target = this;
        let value = this.getVal(this.vm, this.expr);
        Dep.target = null;
        return value;
    }
    getVal(vm, expr){
        expr = expr.split('.');
        return expr.reduce((prev, next) => {
            return prev[next];
        }, vm.$data);
    }
    /*core*/
    update() {
        let newValue = this.get();
        let oldValue = this.value;
        if(oldValue !== newValue) {
            this.cb(newValue);
        }
    }
}