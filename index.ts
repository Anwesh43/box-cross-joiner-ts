const parts : number = 3 
const strokeFactor : number = 90 
const colors : Array<string> = [
    "#3F51B5",
    "#009688",
    "#2196F3",
    "#4CAF50",
    "#FFC107"
]
const scGap : number = 0.02 / parts  
const sizeFactor : number = 5.9  
const delay : number = 20
const backColor : string = "#bdbdbd"
const w : number = window.innerWidth 
const h : number = window.innerHeight 

class ScaleUtil {

    static maxScale(scale : number, i : number, n : number) : number {
        return Math.max(0, scale - i / n)
    }

    static divideScale(scale : number, i : number, n : number) : number {
        return Math.min(1 / n, ScaleUtil.maxScale(scale, i, n)) * n 
    }

    static sinify(scale : number) : number {
        return Math.sin(scale * Math.PI)
    }
}
class DrawingUtil {

    static drawLine(context : CanvasRenderingContext2D, x1 : number, y1 : number, x2 : number, y2 : number) {
        context.beginPath()
        context.moveTo(x1, y1)
        context.lineTo(x2, y2)
        context.stroke()
    }

    static drawBoxCrossJoiner(context : CanvasRenderingContext2D, i : number, scale : number) {
        const size : number = Math.max(w, h) / sizeFactor 
        const sf : number = ScaleUtil.sinify(scale)
        const sf1 : number = ScaleUtil.divideScale(sf, 0, parts)
        const sf2 : number = ScaleUtil.divideScale(sf, 1, parts)
        const sf3 : number = ScaleUtil.divideScale(sf, 2, parts)
        const si : number = 1 - 2 * i
        const y : number = size * 0.5 * si
        context.save()
        context.translate(-w / 2, 0)
        context.fillRect(0, -size / 2, size * sf1, size)
        DrawingUtil.drawLine(context, size, -y, size + (w / 2 - size) * sf2, -y + size * sf2)
        DrawingUtil.drawLine(context, size, y, size + (w / 2 - size) * sf3, y + size * sf3)
        context.restore()
    }

    static drawBoxCrossJoiners(context : CanvasRenderingContext2D, scale : number) {
        context.save()
        context.translate(w / 2, h / 2)
        for (var j = 0; j < 2; j++) {
            context.save()
            context.scale(1 - 2 * j, 1)
            DrawingUtil.drawBoxCrossJoiner(context, j, scale)
            context.restore()
        }
        context.restore()
    }

    static drawBCJNode(context : CanvasRenderingContext2D, i : number, scale : number) {
        context.lineCap = 'round'
        context.lineWidth = Math.min(w, h) / strokeFactor 
        context.fillStyle = colors[i]
        context.strokeStyle = colors[i]
        DrawingUtil.drawBoxCrossJoiners(context, scale)
    }
}