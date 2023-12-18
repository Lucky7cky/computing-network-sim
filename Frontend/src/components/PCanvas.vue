<template>
    <!-- <div></div> -->
    <canvas :width="sizes[props.scene][0]" :height="sizes[props.scene][1]" id="d"
        style="margin-top: 10px; border: 1px solid gray"></canvas>
</template>

<script setup>
import { fabric } from 'fabric'
import { onMounted } from 'vue'
import routerUrl from '../image/router.png'
import edgeDC from '../image/dc.jpg'
import switchM from '../image/switch.jpg'
import whiteCloud from '../image/white.jpg'
import greenCircle from '../image/blue.jpg'
import wurenji from '../image/wurenji.jpg'
import stick from '../image/stick.jpg'
import dataC from '../image/dataC.jpg'
import edgeP from '../image/edgeP.jpg'
import jidi from '../image/jidi.jpg'
import {
    CountryNetworkNode,
    CountryNetworkTopo,
    CountryNetworkHighLightTopo,
    PowerAggregationNetworkNode,
    PowerAggregationNetworkTopo,
    visualInspectionNetworkNode,
    visualInspectionNetworkTopo,
    edgeIotNetworkNode,
    edgeIotNetworkTopo,
    newEnergyNetworkNode,
    newEnergyNetworkTopo
} from '../common/data/canvasSetting'

const props = defineProps({
    scene: {
        type: String,
        default: 'loadbalance'
    }
})
let sizes = {
    visualInspection: [844, 1012],
    edgeIotAgent: [728, 1033],
    newEnergyConsume: [2035, 1155]
};

let nodeList, topoList
if (props.scene === 'visualInspection') {
    nodeList = visualInspectionNetworkNode
    topoList = visualInspectionNetworkTopo
    // highlightTopoList = []
} else if (props.scene === 'edgeIotAgent') {
    nodeList = edgeIotNetworkNode
    topoList = edgeIotNetworkTopo
    // highlightTopoList = CountryNetworkHighLightTopo
} else if (props.scene === 'newEnergyConsume') {
    nodeList = newEnergyNetworkNode
    topoList = newEnergyNetworkTopo
    // highlightTopoList = CountryNetworkHighLightTopo
}

let canvas
let size = 30
function init () {
    canvas = new fabric.Canvas('d')
    // canvas = new fabric.StaticCanvas('c')
    canvas.on('mouse:down', function (event) {
        console.log(event.e.offsetX, event.e.offsetY)
        if (event.target) {
            // console.log(event.target.type)
            if (event.target.type === 'image') {
                console.log("img");
            } else if (event.target.type === 'line') {
                console.log("line");
            } else if (event.target.type === 'i-text') {
                console.log("text");
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
function drawImg (x, y, imgUrl, w = 30, h = 30) {
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

function drawImgWithText (x, y, imgUrl, content, w = 30, h = 30, flag = true) {
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
            // content.includes("白云") && img.sendToBack()
            content.includes("环网") && img.sendToBack()
        }
    })
    let text = new fabric.IText(content, {
        left: x,
        top: y + h,
        width: 5,
        height: 5,
        zIndex: 999,
        fill: '#000',
        fontSize: 14,
        fontFamily: 'Comic Sans',
        selectable: false,
        perPixelTargetFind: false //设置无法通过空白区域操作元素
    })
    flag && canvas.add(text)

    // img.on('mouse:down', function (event) {
    //   console.log('click img')
    // })
}

function drawRouter (x, y, w, h) {
    return drawImg(x, y, routerUrl, w, h)
}

function drawLine (fromX, fromY, toX, toY, lineWidth = 1) {
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

function drawLineByNode (fromNode, endNode, lineWidth = 1) {
    if(nodeList[fromNode] === undefined || nodeList[endNode] === undefined) console.log(fromNode, endNode)
    let [fromX, fromY, fromType] = nodeList[fromNode]
    let [toX, toY, toType] = nodeList[endNode]
    let offsetx1 = 15, offsetx2 = 15, offsety1 = 15, offsety2 = 15;

    switch (fromType) {
        case 'router':
            offsetx1 = 15;
            offsety1 = 15;
            break;
        case 'dc':
            offsetx1 = 60;
            offsety1 = 30;
            break;
        case 'switch':
            offsetx1 = 15;
            offsety1 = 15;
            break;
        case 'whiteCloud':
            offsetx1 = 60;
            offsety1 = 30;
            break;
        case 'greenCircle':
            offsetx1 = 60;
            offsety1 = 30;
            break;
        case 'wurenji':
            offsetx1 = 15;
            offsety1 = 15;
            break;
        case 'stick':
            offsetx1 = 15;
            offsety1 = 15;
            break;
        case 'CE':
            offsetx1 = 15;
            offsety1 = 15;
            break;
        default:
            offsetx1 = 15;
            offsety1 = 15;
            break;
    }
    switch (toType) {
        case 'router':
            offsetx2 = 15;
            offsety2 = 15;
            break;
        case 'dc':
            offsetx2 = 60;
            offsety2 = 30;
            break;
        case 'switch':
            offsetx2 = 15;
            offsety2 = 15;
            break;
        case 'whiteCloud':
            offsetx2 = 60;
            offsety2 = 30;
            break;
        case 'greenCircle':
            offsetx2 = 60;
            offsety2 = 30;
            break;
        case 'wurenji':
            offsetx2 = 15;
            offsety2 = 15;
            break;
        case 'stick':
            offsetx2 = 15;
            offsety2 = 15;
            break;
        case 'CE':
            offsetx2 = 15;
            offsety2 = 15;
            break;
        default:
            offsetx2 = 15;
            offsety2 = 15;
            break;
    }

    drawLine(fromX + offsetx1, fromY + offsety1, toX + offsetx2, toY + offsety2, lineWidth)
}

function drawThingWithText (x, y, name, w, h, type) {
    if (type === 'router') {
        return drawImgWithText(x, y, routerUrl, name, w, h)
    } else if (type === 'dc') {
        return drawImgWithText(x, y, edgeDC, name, w * 4, h * 2)
    } else if (type === 'switch') {
        return drawImgWithText(x, y, switchM, name, w, h)
    } else if (type === 'whiteCloud') {
        return drawImgWithText(x, y, whiteCloud, name, w * 4, h * 2.2, false)
    } else if (type === 'greenCircle') {
        return drawImgWithText(x, y, greenCircle, name, w * 4.5, h * 3, false)
    } else if (type === 'wurenji') {
        return drawImgWithText(x, y, wurenji, name, w, h)
    } else if (type === 'stick') {
        return drawImgWithText(x, y, stick, name, w, h)
    } else if (type === 'CE') {
        return drawImgWithText(x, y, switchM, name, w, h)
    } else if (type === 'edgeP') {
        return drawImgWithText(x, y, edgeP, name, w, h)
    } else if (type === 'dataC') {
        return drawImgWithText(x, y, dataC, name, w, h)
    } else if (type === 'jidi') {
        return drawImgWithText(x, y, jidi, name, w, h)
    }
}

function drawEllipse (x, y, rX, rY, color = 'rgb(214,213,255)') {
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
        drawThingWithText(nodeList[node][0], nodeList[node][1], node, size, size, nodeList[node][2])
    }
    for (let from in topoList) {
        topoList[from].forEach((item) => {
            drawLineByNode(from, item)
        })
    }
    /* for (let from in topoList) {
        topoList[from].forEach((item) => {
            drawLineByNode(from, item)
        })
    }
    for (let from in highlightTopoList) {
        highlightTopoList[from].forEach((item) => {
            drawLineByNode(from, item, 2)
        })
    } */
})
</script>

<style lang="scss" scoped></style>
