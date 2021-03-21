# Lofter-Project
对Lofter的复刻

## 3月20日
### 完成情况
* 上午下午都在工训，中午一小会和晚上在做实习任务，晚上中间穿插了一次3km跑步
* 复刻了Lofter首页的顶部导航条和Header，并做了导航条的弹出框，右侧的Sidebar没做完，在本次提交后会继续做1小时左右（估计仍做不完）
* 在做弹出框的时候，如果设置dispaly:none，没还原出hover时弹框往下移动的过渡效果，遂选择用visibility:hidden，效果还不错；
* 复习了光标移入的伪类:focus，input的默认内容placeholder，学习如何修改其样式
### 问题&解决
* 在做Sidebar时，由于Lofter的图标字体不能被选中，想到用伪类::before来做，但是遇到了未知的问题，伪类不能生效，暂时没解决

解决：
>nth-of-type 选择元素的过程：1.在当前平级DOM结点中所有div标签的第n个； 2.类名是"xxx"。不要忽略第一条！
### 计划
* Flag：计划明天做完首页，并做一部分“发现”
### 学姐建议
* 初学者写完整项目能实现就已不错，代码质量需要长期对基础知识的积累，看了高级语法不代表会用
* 写JS时不要全篇let，要适时用const
* 了解事件委托
* 静态资源（如img）的文件夹不用很多，一个就足够，图片文件命名语义化一些
* script标签的位置问题
* 伪类nth的用法，css选择器的匹配规则
* 响应式布局没有实现，如何多栏自适应
* 在2021年可以多尝试用Flex和Grid布局，之后学习用一下
