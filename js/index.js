import { colors, Fluxay, clickLight } from './flashEffect.js'

// 键盘事件
window.addEventListener('keydown', (ev) => {
  console.log(ev.key, ev.keyCode, ev.location, KeyboardEvent.DOM_KEY_LOCATION_RIGHT)
  // 阻止默认事件，对组合键无效
  // ev.preventDefault()

  // 初始化对应键位
  let key
  // 区分左右键位
  if (ev.location === KeyboardEvent.DOM_KEY_LOCATION_RIGHT) {
    key = document.querySelectorAll(`.${ev.key}`)[1]
  } else key = document.querySelector(`[data-keycode="${ev.keyCode}"]`)

  // 点击灯光
  clickLight(key)

  // 单击闪烁颜色
  if ((ev.keyCode === 49 || ev.key == 1) && ev.ctrlKey) clickLight(key, colors[49 - ev.key])

  // 流光效果，组合键shift+1
  if ((ev.keyCode === 49 || ev.key == 1) && ev.shiftKey) Fluxay(document.querySelectorAll('span'), 100, 200)
})
