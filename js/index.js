let colors = ['rgb(72, 105, 255)', 'rgb(0, 255, 242)', 'rgb(255, 208, 0)', 'rgb(9, 255, 0)', 'rgb(255, 81, 0)', 'rgb(30, 255, 0)', 'rgb(255, 153, 0)', 'rgb(50,255,100)']
let len = document.querySelectorAll('span').length
let count = 0
function Fluxay() {
  for (let i = 0; i < len; i++) {
    setTimeout(() => {
      document.querySelectorAll('span')[i].style.boxShadow = `0 0 3px 5px ${colors[count]}`
      if (count === colors.length - 1) count = 0
      else count++

      setTimeout(() => {
        document.querySelectorAll('span')[i].style.boxShadow = 'none'
      }, 500)
    }, i * 200)
  }
}

// 键盘事件
window.addEventListener('keyup', (e) => {
  const ev = e || window.event
  ev.preventDefault()
})
window.addEventListener('keydown', (ev) => {
  console.log(ev.keyCode)
  // 阻止默认事件，对组合键无效
  ev.preventDefault()
  // 初始化对应键位
  let key
  // 区分左右键位
  if (ev.location === KeyboardEvent.DOM_KEY_LOCATION_RIGHT) {
    key = document.querySelectorAll(`[data-keycode="${ev.keyCode}"]`)[1]
  } else key = document.querySelector(`[data-keycode="${ev.keyCode}"]`)
  
  // console.log(document.querySelector(`[data-keycode="${ev.keyCode}"]`));
  key.style.boxShadow = `0px 0px 3px 4px ${colors[parseInt(Math.random() * 7)]}`
  let timer = setTimeout(() => {
    key.style.boxShadow = 'none'
    timer = null
  }, 300)
  // 流光效果，组合键shift+1
  if (ev.keyCode === 49 && ev.shiftKey) Fluxay()
})
