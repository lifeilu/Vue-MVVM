CompileUtil = {
    getVal(vm, expr){
        expr = expr.split('.');
        return expr.reduce((prev, next) => {
            return prev[next];
        }, vm.$data);
    },
    setValue(vm, expr, newValue) {
        expr = expr.split('.');
        expr.reduce((prev, next, currentIndex) => {
            if(currentIndex === expr.length - 1) {
                return prev[next] = newValue;
            }
            return prev[next];
        }, vm.$data)
    },
    getTextVal(vm, expr) {
        return expr.replace(/\{\{([^\}]+)\}\}/g, (...arguments)=> {
            return this.getVal(vm, arguments[1]);
        });
    },
    text(node, vm, expr) {
        let updateFn = this.updater['textUpdater'];
        expr.replace(/\{\{([^\}]+)\}\}/g, (...arguments)=> {
            new Watcher(vm, arguments[1], () => {
                updateFn && updateFn(node, this.getTextVal(vm, expr));
            });
        });
        let value =  this.getTextVal(vm, expr);
        updateFn && updateFn(node, value);
    },
    model(node, vm, expr) {
        let updateFn = this.updater['modelUpdater'];
        new Watcher(vm, expr, () => {
            updateFn && updateFn(node, this.getVal(vm, expr));
        });
        node.addEventListener('input', (e) => {
            let newValue = e.target.value;
            this.setValue(vm, expr, newValue);
        })
        let value = this.getVal(vm, expr);
        updateFn && updateFn(node, value);
    },
    updater: {
        textUpdater(node, value) {
            node.textContent = value;
        },
        modelUpdater(node, value) {
            node.value = value;
        }
    }
}