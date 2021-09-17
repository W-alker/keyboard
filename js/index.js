import { colors, Fluxay, clickLight } from './flashEffect.js'

let colorNum = 0 // 灯光颜色
let remain = false // 是否留存
let openclickLight = false

// 按压效果
function pressEffect(key, isUp = false) {
  key.style.background = isUp
    ? 'linear-gradient(145deg, #373737, #2e2e2e)'
    : 'linear-gradient(145deg, #2e2e2e, #373737)'
}

function getKey(ev) {
  // 区分左右键位
  if (ev.location === KeyboardEvent.DOM_KEY_LOCATION_RIGHT) {
    return document.querySelectorAll(`.${ev.key}`)[1]
  } else return document.querySelector(`.${ev.key}`) || document.querySelector(`[data-keycode="${ev.keyCode}"]`)
}

// 键盘事件
window.addEventListener('keydown', (ev) => {
  console.log(ev.key, ev.keyCode, ev.location, KeyboardEvent.DOM_KEY_LOCATION_RIGHT)
  // 阻止默认事件，对组合键无效
  // ev.preventDefault()

  // 初始化对应键位
  let key = getKey(ev)

  // 闪烁颜色切换
  if (ev.keyCode === 32 && ev.ctrlKey) {
    if (colorNum === colors.length - 1) colorNum = 0
    else colorNum++
  }

  pressEffect(key)

  // 点击灯光
  if (openclickLight) clickLight(key, colors[colorNum], 300, remain)

  // 开启灯光小姑
  if ((ev.keyCode === 48 || ev.key == 1) && ev.shiftKey) openclickLight = true
  // 流光效果，组合键shift+1
  if ((ev.keyCode === 49 || ev.key == 1) && ev.shiftKey)
    Fluxay(document.querySelectorAll('span'), 100, 200)
  // 留存效果，组合键shift+2
  if ((ev.keyCode === 50 || ev.key == 2) && ev.shiftKey) {
    remain = !remain
    // 如果该模式关闭，则关闭所有留存的灯光
    if (!remain) {
      let nodes = document.querySelectorAll('span')
      for (let item of nodes) item.style.boxShadow = 'none'
    }
  }
})
window.addEventListener('keyup', (ev) => {
  let key = getKey(ev)
  // 按压效果解除
  pressEffect(key, true)
})
