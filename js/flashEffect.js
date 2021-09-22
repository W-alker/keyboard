const colors = [
  'rgb(72, 105, 255)',
  'rgb(0, 255, 242)',
  'rgb(255, 208, 0)',
  'rgb(9, 255, 0)',
  'rgb(255, 81, 0)',
  'rgb(30, 255, 0)',
  'rgb(255, 153, 0)',
  'rgb(50,255,100)',
  'rgb(255, 41, 41)'
]
// 记录当前键亮灯状态
const lightingKey = new Map()

/* 
  普通点击效果
  @param1: 当前点击触发的按键
  @param2: 灯光颜色，默认随机
  @param3: 延时，默认300ms
  @param4: 是否开启留存效果，默认不开启
 */
const clickLight = (
  key,
  color = colors[parseInt(Math.random() * 8)],
  delay = 300,
  remain = false
) => {
  // 如果已亮直接关闭
  if (lightingKey.get(key)) return closeLight(key)

  if (!lightingKey.has(key) || !lightingKey.get(key)) openLight(key, color)
   
  // 开启留存效果则不执行关闭
  if (remain) return

  let timer = setTimeout(() => {
    closeLight(key)
    clearTimeout(timer)
    timer = null
  }, delay)
}

const openLight = (key, color) => {
  key.style.color = color
  key.style.boxShadow = `0px 0px 4px 4px ${color}`
  lightingKey.set(key, true)
}
const closeLight = (key) => {
  key.style.boxShadow = '4px 4px 6px #2b2b2b,-4px -4px 6px #3b3b3b'
  key.style.color = 'whitesmoke'
  lightingKey.set(key, false)
}
const clearAllLight = () => {
  let nodes = document.querySelectorAll('span')
  for (let item of nodes) {
    item.style.color = 'whitesmoke'
    item.style.boxShadow = '4px 4px 6px #2b2b2b,-4px -4px 6px #3b3b3b'
  }
}

/* 
  流光效果
  @param1: 要闪灯的节点组
  @param2： 灯光颜色
  @param3: 闪灯的间隙
  @param4: 熄灭的延时
*/
const Fluxay = (nodes, color, interval = 200, delay = 300) => {
  let len = nodes.length
  // let count = 0

  for (let i = 0; i < len; i++) {
    setTimeout(() => {
      openLight(nodes[i], color)
      /*       if (count === colors.length - 1) count = 0
      else count++ */

      setTimeout(() => {
        closeLight(nodes[i])
      }, delay)
    }, i * interval)
  }
}

export { colors, Fluxay, clickLight, openLight, closeLight, clearAllLight }
