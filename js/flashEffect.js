const colors = ['rgb(72, 105, 255)', 'rgb(0, 255, 242)', 'rgb(255, 208, 0)', 'rgb(9, 255, 0)', 'rgb(255, 81, 0)', 'rgb(30, 255, 0)', 'rgb(255, 153, 0)', 'rgb(50,255,100)']

/* 
  普通点击效果
  @param1: 当前点击触发的按键
  @param2: 灯光颜色，默认随机
 */
const clickLight = (key, color = colors[parseInt(Math.random() * 7)]) => {
  key.style.boxShadow = `0px 0px 3px 4px ${color}`
  let timer = setTimeout(() => {
    key.style.boxShadow = 'none'
    timer = null
  }, 300)
}

/* 
  流光效果
  @param1: 要闪灯的节点组
  @param2: 闪灯的间隙
  @param3: 熄灭的延时
*/
const Fluxay = (nodes, interval = 100, delay = 300) => {
  let len = nodes.length
  let count = 0

  for (let i = 0; i < len; i++) {
    setTimeout(() => {
      nodes[i].style.boxShadow = `0 0 3px 5px ${colors[count]}`
      if (count === colors.length - 1) count = 0
      else count++

      setTimeout(() => {
        nodes[i].style.boxShadow = 'none'
      }, delay)
    }, i * interval)
  }
}

export { colors, Fluxay, clickLight }
