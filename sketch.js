var cp = [  ["#d7e3fc","#abc4ff", "#abc4ff","Sky"], ["#d7e3fc","#abc4ff", "#abc4ff","Sky"], ["#d7e3fc","#abc4ff", "#abc4ff","Sky"],  ["#80b918","#dddf00", "#ba181b","Veggie"], ["#80b918","#dddf00", "#ba181b","Veggie"], ["#80b918","#dddf00", "#ba181b","Veggie"],  ["#AAAAAA","#DDDDDD", "#ba181b","Concrete"], ["#AAAAAA","#DDDDDD", "#ba181b","Concrete"], ["#AAAAAA","#DDDDDD", "#ba181b","Concrete"],  ["#e8b2c3","#b37495", "#b37495","Barbie"],  ["#e9d8a6","#94d2bd", "#005f73","Pastel"], ["#e9d8a6","#94d2bd", "#005f73","Pastel"],  ["#e9d8a6","#ee9b00", "#80b918","Sunrise"], ["#e9d8a6","#ee9b00", "#80b918","Sunrise"]  ]
var pp = [0.8, 0.8, 0.8, 0.8, 0.5, 0.9, 0.4, 0.2] //Pack level
var ss = [3,3,3,4,4,4,4,4,4,4,4,5,6] //Depth level
var img, HCOLOR_PARAM, VCOLOR_PARAM, TILT_PARAM, PACK_RAND_PARAM, SIZE_PARAM
var TRI_COLOR_PARAM = false
function setup() { 
  BG_COLOR_PARAM = 0
  if (fxrand(1) > 0.85)  BG_COLOR_PARAM = 255
  TILT_PARAM = fxrand(1) 
  c = cp[Math.floor(fxrand()*cp.length)]
  VCOLOR_PARAM = c[0]
  HCOLOR_PARAM = c[1]
  h2color = c[2]  
  if (fxrand(1) > 0.5)  TRI_COLOR_PARAM = true
  PORTAL_PARAM = 1
  PACK_RAND_PARAM = pp[Math.floor(fxrand()*pp.length)]
  SIZE_PARAM = ss[Math.floor(fxrand()*ss.length)]
  if (PACK_RAND_PARAM <= 0.5) density = "Loose"; else if (PACK_RAND_PARAM > 0.8) density = "Packed"; else  density = "Normal"
  if (SIZE_PARAM < 4) depth = "Shallow"; else if (SIZE_PARAM > 4) depth = "Deep"; else  depth = "Normal"
  if (BG_COLOR_PARAM == 0) bgcolor = "Black"; else bgcolor = "White"
  window.$fxhashFeatures = {  
    "Pallete": c[3],
    "Tri-Color": TRI_COLOR_PARAM,
    "Background" : bgcolor,
    "Density": density,
    "Depth": depth
  }  
  pg = createGraphics(1000, 1000)
  pg.background(BG_COLOR_PARAM)
  pg.noStroke()
  pg.rectMode(CENTER)
  pg.translate(pg.width/2,pg.height/2)
  pack(0.8*pg.width,0.8*pg.height,0)
  pg.translate(-pg.width/2,-pg.height/2)  
  g = createGraphics(1000,1000)
  grain()
  createCanvas(min(windowWidth,windowHeight), min(windowWidth,windowHeight))
  CREATE()
}    
function windowResized() {
  resizeCanvas(min(windowWidth,windowHeight), min(windowWidth,windowHeight))
  CREATE()
}
function CREATE() {
  image(pg, 0, 0, width, height)
  blendMode(DIFFERENCE)
  image(g, 0, 0, width, height)
}
function pack(w, h, depth) {  
  let start = -1  * (w *1/4)
  let rand = PACK_RAND_PARAM
  if (depth == SIZE_PARAM)  rand = 0  
  let div = 0.8*0.01*pg.width
  for (let x = start; x <= -1*start; x+= w/2) 
    for (let y = start; y <= -1*start; y+= w/2) {      
      pg.translate(x,y)    
      if (depth > 0 && fxrand(1) > rand){ //DRAW
        pg.push()      
        if (fxrand(1) > TILT_PARAM) {
          pg.fill(VCOLOR_PARAM)
          pg.rect(0,0,w/2 - div,w/2)
        }
        else {
          pg.fill(HCOLOR_PARAM)
          if (TRI_COLOR_PARAM && fxrand(1) > 0.97)  pg.fill(h2color)
          pg.rect(0,0,w/2,w/2 - div)
        }            
        pg.pop()
      }
      else  pack(w/2,h/2,depth+1) //DIVIDE    
      pg.translate(-x,-y)
    }
}
function grain() {
  for (let y = 0; y < g.height; y++)
    for (let x = 0; x < g.width; x++){
      r = random(0,25)
      g.set(x,y,[r,r,r,255])
    }
  g.updatePixels()
}