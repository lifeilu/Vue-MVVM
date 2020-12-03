class Compile{
    constructor(el, vm){
        this.el = this.isElementNode(el) ? el : document.querySelector(el);
        this.vm = vm;
        if(this.el) {
            //将元素节点移到fragment
            let fragement = this.node2fragment(this.el);
            //编译
            this.compile(fragement);
            //将fragment移到el
            this.el.appendChild(fragement);
            fragement = null;
        }
    }

    /*helper*/
    isElementNode(node) {
        return node.nodeType === 1;
    }
    isDirective(name) {
        return name.includes('v-');
    }

    /*core*/
    compileElement(node) {
        let attrs = node.attributes;
        Array.from(attrs).forEach(attr => {
            let attrName = attr.name;
            if(this.isDirective(attrName)) {
                let expr = attr.value;
                let [,type] = attrName.split('-');
                CompileUtil[type](node, this.vm, expr);
            }
        })
    }
    compileText(node) {
        let expr = node.textContent;
        let reg = /\{\{([^\}]+)\}\}/g;
        if(reg.test(expr)) {
            CompileUtil['text'](node, this.vm, expr);
        }
    }
    compile(fragment){
        let childNodes = fragment.childNodes;
        Array.from(childNodes).forEach(node => {
            if(this.isElementNode(node)) {
                this.compileElement(node);
                this.compile(node);
            } else {
                this.compileText(node);
            }
        })
    }
    node2fragment(el){
        let fragment = document.createDocumentFragment();
        let firstChild;
        while(firstChild = el.firstChild){
            fragment.appendChild(firstChild);
        }
        return fragment;
    }
}