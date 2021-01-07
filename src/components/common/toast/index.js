import Toast from './Toast.vue'

const obj = {}

obj.install = function (Vue) {
  //1、创建组件构造器
  const toastContrustor = Vue.extend(Toast)

  //2、根据组件构造器创建一个组件对象
  const toast = new toastContrustor()

  //3、将组件对象挂载到某一个元素上
  toast.$mount(document.createElement('div'))

  //4、toast.$el对应的就是div
  document.body.appendChild(toast.$el)

  //5、添加到原型中
  Vue.prototype.$toast = toast
}

export default obj