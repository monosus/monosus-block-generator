function setup() {
  createCanvas(400, 500, SVG);
  generateOctagonPoints();
}

let points = [];

function generateOctagonPoints() {
  points = [];
  
  const minPercent = 0.1;    // 辺の端から10%の位置
  const maxPercent = 0.9;    // 辺の端から90%の位置
  const minGapPercent = 0.2; // 2点間の最低ギャップは20%
  
  // 上辺の2点（最低ギャップを確保してランダムに生成）
  const topRange = maxPercent - minPercent - minGapPercent; // 利用可能な範囲
  const topFirstPoint = random(minPercent, minPercent + topRange);
  const topSecondPoint = random(topFirstPoint + minGapPercent, maxPercent);
  
  points.push(createVector(width * topFirstPoint, 0));
  points.push(createVector(width * topSecondPoint, 0));
  
  // 右辺の2点（最低ギャップを確保してランダムに生成）
  const rightRange = maxPercent - minPercent - minGapPercent;
  const rightFirstPoint = random(minPercent, minPercent + rightRange);
  const rightSecondPoint = random(rightFirstPoint + minGapPercent, maxPercent);
  
  points.push(createVector(width, height * rightFirstPoint));
  points.push(createVector(width, height * rightSecondPoint));
  
  // 下辺の2点（最低ギャップを確保してランダムに生成）
  const bottomRange = maxPercent - minPercent - minGapPercent;
  const bottomFirstPoint = random(minPercent, minPercent + bottomRange);
  const bottomSecondPoint = random(bottomFirstPoint + minGapPercent, maxPercent);
  
  points.push(createVector(width * (1 - bottomFirstPoint), height)); // 右から左へ
  points.push(createVector(width * (1 - bottomSecondPoint), height));
  
  // 左辺の2点（最低ギャップを確保してランダムに生成）
  const leftRange = maxPercent - minPercent - minGapPercent;
  const leftFirstPoint = random(minPercent, minPercent + leftRange);
  const leftSecondPoint = random(leftFirstPoint + minGapPercent, maxPercent);
  
  points.push(createVector(0, height * (1 - leftFirstPoint))); // 下から上へ
  points.push(createVector(0, height * (1 - leftSecondPoint)));
}

function draw() {
  clear();
  fill('#FF5C8D');
  noStroke();
  beginShape();
  for (let i = 0; i < points.length; i++) {
    vertex(points[i].x, points[i].y);
  }
  endShape(CLOSE);
}

function keyPressed() {
  if (key === 's' || key === 'S') {
    save("monosus-block.svg");
  } else if (key === 'p' || key === 'P') {
    savePNG();
  } else if (key === 'r' || key === 'R') {
    generateOctagonPoints();
  }
}

function savePNG() {
  // キャンバスからPNGデータを取得
  let canvas = document.querySelector('canvas');
  if (!canvas) {
    // SVGモードの場合、一時的なキャンバスを作成して描画
    canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    let ctx = canvas.getContext('2d');
    
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#FF5C8D';
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.closePath();
    ctx.fill();
  }  
  let link = document.createElement('a');
  link.download = 'monosus-block.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
}

function mouseReleased() {
  if (mouseButton === LEFT && 
      mouseX >= 0 && mouseX <= width && 
      mouseY >= 0 && mouseY <= height) {
    generateOctagonPoints();
  }
  return false;
}