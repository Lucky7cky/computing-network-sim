<template>
  <!-- <div></div> -->
  <canvas
    width="1010"
    height="600"
    id="c"
    style="margin-top: 10px; border: 1px solid gray"
  ></canvas>
</template>

<script setup>
import { fabric } from 'fabric'
import { onMounted } from 'vue'
import routerUrl from '../image/router.png'
import {
  CountryNetworkNode,
  CountryNetworkTopo,
  CountryNetworkHighLightTopo,
  PowerAggregationNetworkNode,
  PowerAggregationNetworkTopo
} from '../common/data/canvasSetting'

const props = defineProps({
  scene: {
    type: String,
    default: 'loadbalance'
  }
})
let nodeList, topoList, highlightTopoList
if (props.scene === 'poweraggregation') {
  nodeList = PowerAggregationNetworkNode
  topoList = PowerAggregationNetworkTopo
  highlightTopoList = []
} else {
  nodeList = CountryNetworkNode
  topoList = CountryNetworkTopo
  highlightTopoList = CountryNetworkHighLightTopo
}
// let nodeList = CountryNetworkNode
// let topoList = CountryNetworkTopo
// let highlightTopoList = CountryNetworkHighLightTopo
let canvas
let size = 30
function init() {
  canvas = new fabric.Canvas('c')
  // canvas = new fabric.StaticCanvas('c')
  canvas.on('mouse:down', function (event) {
    console.log(event.e.offsetX, event.e.offsetY)
    if (event.target) {
      // console.log(event.target.type)
      if (event.target.type === 'image') {
      } else if (event.target.type === 'line') {
      } else if (event.target.type === 'i-text') {
      }
    }
    // console.log(canvas.getActiveObject().get('type'))
    if (event.target && event.target.type === 'circle') {
      if (canvas.isTargetTransparent(event.e.offsetX, event.e.offsetY, event.target)) {
        console.log('点击的是圆形元素的子元素')
      } else {
        console.log('点击的是圆形元素')
      }
    }
  })
}
function drawImg(x, y, imgUrl, w = 30, h = 30) {
  let img = imgUrl
  fabric.Image.fromURL(img, (img, err) => {
    if (!err) {
      img.set({
        left: x, // 左上角位置
        top: y, // 左上角位置
        scaleX: w / img.width,
        scaleY: h / img.height,
        crossOrigin: 'anonymous'
      })
      canvas.add(img)
    }
  })
}

function drawImgWithText(x, y, imgUrl, content, w = 30, h = 30) {
  let img = imgUrl
  fabric.Image.fromURL(img, (img, err) => {
    if (!err) {
      img.set({
        left: x, // 左上角位置
        top: y, // 左上角位置
        scaleX: w / img.width,
        scaleY: h / img.height,
        crossOrigin: 'anonymous',
        selectable: false,
        perPixelTargetFind: false //设置无法通过空白区域操作元素
      })
      canvas.add(img)
    }
  })
  let text = new fabric.IText(content, {
    left: x,
    top: y + 30,
    width: 5,
    height: 5,
    fill: '#000',
    fontSize: 14,
    fontFamily: 'Comic Sans',
    selectable: false,
    perPixelTargetFind: false //设置无法通过空白区域操作元素
  })
  canvas.add(text)

  // img.on('mouse:down', function (event) {
  //   console.log('click img')
  // })
}

function drawRouter(x, y, w, h) {
  return drawImg(x, y, routerUrl, w, h)
}

function drawLine(fromX, fromY, toX, toY, lineWidth = 1) {
  let line = new fabric.Line([fromX, fromY, toX, toY], {
    stroke: 'black',
    strokeWidth: lineWidth,
    // strokeDashArray: [3, 1], // 这是画虚线时要加的，每隔a个像素空b个像素
    // evented: false, // 设置为false时，对象不能成为事件的目标
    hasControls: false, // 设置为false时，选中的时候不出现旋转缩放标识
    hasBorders: false, // 设置为false时，选中的时候不出现边框
    selectable: false //设置为false时，禁止选中
    // perPixelTargetFind: false //设置无法通过空白区域操作元素
  })
  canvas.add(line)
}

function drawLineByNode(fromNode, endNode, lineWidth = 1) {
  let [fromX, fromY] = nodeList[fromNode]
  let [toX, toY] = nodeList[endNode]
  drawLine(fromX + 15, fromY + 15, toX + 15, toY + 15, lineWidth)
}

function drawRouterWithText(x, y, content, w, h) {
  return drawImgWithText(x, y, routerUrl, content, w, h)
}

function drawEllipse(x, y, rX, rY, color = 'rgb(214,213,255)') {
  let ellipse = new fabric.Ellipse({
    x: x,
    y: y,
    rx: rX,
    ry: rY,
    fill: color
  })
  canvas.add(ellipse)
}
onMounted(() => {
  init()
  for (let node in nodeList) {
    // console.log(nodeList[node][0], nodeList[node][1], node)
    drawRouterWithText(nodeList[node][0], nodeList[node][1], node, size, size)
  }
  for (let from in topoList) {
    topoList[from].forEach((item) => {
      drawLineByNode(from, item)
    })
  }
  for (let from in highlightTopoList) {
    highlightTopoList[from].forEach((item) => {
      drawLineByNode(from, item, 2)
    })
  }

  //横纵坐标不能超过1150和450
  // drawRouter(1150, 450, size, size)
  // drawRouter(100, 150, size, size)
  // drawRouterWithText(150, 150, '北京', size, size)
  // drawLine(110, 100, 110, 150)
})
</script>

<style lang="scss" scoped></style>
