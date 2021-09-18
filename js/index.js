import { colors, Fluxay, clickLight } from './flashEffect.js'

let colorNum = 0 // 灯光颜色
let remain = false // 是否留存
let openclickLight = false

// 按压效果
function pressEffect(key, isUp = false) {
  key.style.boxShadow = isUp
    ? '4px 4px 8px #2b2b2b, -4px -4px 8px #3b3b3b'
    : 'inset 4px 4px 8px #2b2b2b, inset -4px -4px 8px #3b3b3b'
}

function getKey(ev) {
  // 区分左右键位
  if (ev.location === KeyboardEvent.DOM_KEY_LOCATION_RIGHT) {
    return document.querySelectorAll(`[data-key="${ev.key}"]`)[1]
  } else
    return (
      document.querySelector(`[data-keyCode="${ev.keyCode}"]`) ||
      document.querySelector(`[data-key="${ev.key}"]`) ||
      document.querySelector(`[data-key2="${ev.key}"]`) ||
      document.querySelector(`[data-key3="${ev.key}"]`) 
    )
}
function clearAllLight() {
  let nodes = document.querySelectorAll('span')
  for (let item of nodes) item.style.boxShadow = 'none'
}

// 键盘事件
window.addEventListener('keydown', (ev) => {
  console.log(ev.key, ev.keyCode, ev.location, KeyboardEvent.DOM_KEY_LOCATION_RIGHT)
  // 阻止默认事件，对组合键无效
  // ev.preventDefault()

  // 初始化对应键位
  let key = getKey(ev)
  console.log(remain);

  // 闪烁颜色切换
  if (ev.keyCode === 32 && ev.ctrlKey) {
    if (colorNum === colors.length - 1) colorNum = 0
    else colorNum++
  }

  // 点击灯光
  if (openclickLight) clickLight(key, colors[colorNum], 300, remain)
  else pressEffect(key)

  // 开启/关闭灯光，组合键ctrl+上箭头
  if (
    (ev.key == 'ArrowUp' || ev.keyCode == 38) &&
    ev.ctrlKey
    //&& (ev.key == '' || ev.keyCode == 32)
  ) {
    ev.preventDefault()
    openclickLight = !openclickLight
  }

  // 流光效果，组合键ctrl+左箭头
  if (ev.ctrlKey && ev.key === 'ArrowLeft') {
    ev.preventDefault()
    clearAllLight()
    Fluxay(document.querySelectorAll('span'), 50, 100)
  }

  // 留存效果，组合键ctrl+右箭头
  if ((ev.key === 'ArrowRight' || ev.keyCode === 39) && ev.ctrlKey) {
    ev.preventDefault()
    remain = !remain
    // 如果该模式关闭，则关闭所有留存的灯光
    if (!remain) clearAllLight()
  }
})
window.addEventListener('keyup', (ev) => {
  let key = getKey(ev)
  // 按压效果解除
  if(!openclickLight) pressEffect(key, true)
})
