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
  } else if (key === 'r' || key === 'R') {
    generateOctagonPoints();
  }
}

function mousePressed() {
  // マウス位置がキャンバス内かどうか確認
  if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
    generateOctagonPoints();
  }
}