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