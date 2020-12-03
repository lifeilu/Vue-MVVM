# MVVM的实现
Vue的双向绑定手写实现，主要包括：
## MVVM
## Compile 
## Observer
## Watcher
其中，Compile负责将模版编译成真正的dom节点，Observer劫持了数据的get和set，在数据更新时，利用发布订阅方式，触发Watcher的更新。对于视图的变化，addEventListener监听到后触发数据的更新。