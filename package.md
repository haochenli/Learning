## webpack plugins vs loaders
- loader主要是对单个文件作处理的,其作用是在bundle生成之前对文件做预处理，比方说css-loaders啦， babel-loader啦
- plugins则是绑定了webpack生成bundle的各个生命周期，webpack本身就是由许多内置的plugins组成的，常见例子比如uglifyjsPlugin这样的东东，HotModuleReplacementPlugin等



## babel-loaders配置
- presets，一般来说设置成env，pesets：env可以理解成是一个plugins的combo，这个combo中有许多条plugins的规则，每一个plugins可以理解成一个新语言的特性，比方说：“...”, ”箭头函数“ 等等