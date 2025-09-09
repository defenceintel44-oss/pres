/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
type BasicFaceProps = {
  ctx: CanvasRenderingContext2D;
  mouthScale: number;
  eyeScale: number;
  color?: string;
};

// Uzay arka planı için yıldız sınıfı
class Star {
  x: number;
  y: number;
  size: number;
  brightness: number;
  twinkleSpeed: number;
  color: string;
  
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 3 + 0.5;
    this.brightness = Math.random();
    this.twinkleSpeed = Math.random() * 0.02 + 0.005;
    const colors = ['#ffffff', '#ffffcc', '#ccccff', '#ffcccc', '#ccffcc'];
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }
  
  update() {
    this.brightness += this.twinkleSpeed;
    if (this.brightness > 1 || this.brightness < 0.1) {
      this.twinkleSpeed *= -1;
    }
  }
  
  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.globalAlpha = this.brightness;
    
    // Yıldız glow efekti
    const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 3);
    gradient.addColorStop(0, this.color);
    gradient.addColorStop(0.5, this.color + '80');
    gradient.addColorStop(1, 'transparent');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
    ctx.fill();
    
    // Yıldız merkezi
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
  }
}

// Nebula parçacığı sınıfı
class NebulaParticle {
  x: number;
  y: number;
  size: number;
  opacity: number;
  color: string;
  drift: { x: number; y: number };
  
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 80 + 20;
    this.opacity = Math.random() * 0.3 + 0.1;
    const colors = ['#4a0e4e', '#1a0033', '#0d1b2a', '#2d1b69', '#415a77'];
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.drift = {
      x: (Math.random() - 0.5) * 0.2,
      y: (Math.random() - 0.5) * 0.2
    };
  }
  
  update() {
    this.x += this.drift.x;
    this.y += this.drift.y;
  }
  
  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    
    const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
    gradient.addColorStop(0, this.color + '60');
    gradient.addColorStop(0.5, this.color + '30');
    gradient.addColorStop(1, 'transparent');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
  }
}

// Global yıldız ve nebula dizileri
let stars: Star[] = [];
let nebulaParticles: NebulaParticle[] = [];
let lastCanvasSize = { width: 0, height: 0 };

// Uzay arka planını çizen fonksiyon
function drawSpaceBackground(ctx: CanvasRenderingContext2D) {
  const { width, height } = ctx.canvas;
  
  // Canvas boyutu değiştiyse yıldızları yeniden oluştur
  if (width !== lastCanvasSize.width || height !== lastCanvasSize.height) {
    stars = [];
    nebulaParticles = [];
    
    // Yıldızları oluştur
    for (let i = 0; i < 150; i++) {
      stars.push(new Star(
        Math.random() * width,
        Math.random() * height
      ));
    }
    
    // Nebula parçacıklarını oluştur
    for (let i = 0; i < 8; i++) {
      nebulaParticles.push(new NebulaParticle(
        Math.random() * width,
        Math.random() * height
      ));
    }
    
    lastCanvasSize = { width, height };
  }
  
  // Uzay gradyanı arka plan
  const spaceGradient = ctx.createRadialGradient(
    width / 2, height / 2, 0,
    width / 2, height / 2, Math.max(width, height) / 2
  );
  spaceGradient.addColorStop(0, '#0a0a23');
  spaceGradient.addColorStop(0.3, '#1a1a3a');
  spaceGradient.addColorStop(0.6, '#0d1b2a');
  spaceGradient.addColorStop(1, '#000000');
  
  ctx.fillStyle = spaceGradient;
  ctx.fillRect(0, 0, width, height);
  
  // Nebula parçacıklarını çiz ve güncelle
  nebulaParticles.forEach(particle => {
    particle.update();
    particle.draw(ctx);
  });
  
  // Yıldızları çiz ve güncelle
  stars.forEach(star => {
    star.update();
    star.draw(ctx);
  });
  
  // Galaktik ışık efekti
  const centerX = width / 2;
  const centerY = height / 2;
  const time = Date.now() * 0.001;
  
  // Dönen galaktik spiral
  ctx.save();
  ctx.globalAlpha = 0.1;
  ctx.translate(centerX, centerY);
  ctx.rotate(time * 0.1);
  
  for (let i = 0; i < 3; i++) {
    const spiralGradient = ctx.createRadialGradient(0, 0, 50, 0, 0, 200);
    spiralGradient.addColorStop(0, '#4a90e2');
    spiralGradient.addColorStop(0.5, '#7b68ee');
    spiralGradient.addColorStop(1, 'transparent');
    
    ctx.fillStyle = spiralGradient;
    ctx.rotate((Math.PI * 2) / 3);
    ctx.fillRect(-200, -10, 400, 20);
  }
  
  ctx.restore();
}

// Hex rengini RGB'ye çeviren yardımcı fonksiyon
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 66, g: 133, b: 244 }; // varsayılan mavi
}

// Rengi açan/koyulaştıran yardımcı fonksiyon
function adjustColor(color: string, amount: number): string {
  const rgb = hexToRgb(color);
  const r = Math.max(0, Math.min(255, rgb.r + amount));
  const g = Math.max(0, Math.min(255, rgb.g + amount));
  const b = Math.max(0, Math.min(255, rgb.b + amount));
  return `rgb(${r}, ${g}, ${b})`;
}

// 3D gölge efekti oluşturan fonksiyon
function createShadowGradient(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  radius: number,
  baseColor: string
): CanvasGradient {
  const gradient = ctx.createRadialGradient(
    centerX - radius * 0.3, centerY - radius * 0.3, 0,
    centerX, centerY, radius
  );
  
  gradient.addColorStop(0, adjustColor(baseColor, 60)); // Açık ton (highlight)
  gradient.addColorStop(0.3, baseColor); // Ana renk
  gradient.addColorStop(0.7, adjustColor(baseColor, -30)); // Orta gölge
  gradient.addColorStop(1, adjustColor(baseColor, -60)); // Koyu gölge
  
  return gradient;
}

// Göz için 3D gradyan
function createEyeGradient(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  radius: number
): CanvasGradient {
  const gradient = ctx.createRadialGradient(
    centerX - radius * 0.4, centerY - radius * 0.4, 0,
    centerX, centerY, radius
  );
  
  gradient.addColorStop(0, '#333333'); // Açık gri
  gradient.addColorStop(0.5, '#1a1a1a'); // Orta gri
  gradient.addColorStop(1, '#000000'); // Siyah
  
  return gradient;
}

// Ağız için 3D gradyan
function createMouthGradient(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  width: number,
  height: number
): CanvasGradient {
  const gradient = ctx.createLinearGradient(
    centerX, centerY - height,
    centerX, centerY + height
  );
  
  gradient.addColorStop(0, '#000000'); // Üst siyah
  gradient.addColorStop(0.3, '#1a0000'); // Koyu kırmızı
  gradient.addColorStop(0.7, '#330000'); // Orta kırmızı
  gradient.addColorStop(1, '#000000'); // Alt siyah
  
  return gradient;
}
const eye = (
  ctx: CanvasRenderingContext2D,
  pos: [number, number],
  radius: number,
  scaleY: number,
  gradient: CanvasGradient
) => {
  ctx.save();
  ctx.translate(pos[0], pos[1]);
  ctx.scale(1, scaleY);
  
  // Göz gölgesi (3D efekt için)
  ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
  ctx.beginPath();
  ctx.arc(2, 2, radius, 0, Math.PI * 2);
  ctx.fill();
  
  // Ana göz
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.fill();
  
  // Göz parlaklığı (highlight)
  ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.beginPath();
  ctx.arc(-radius * 0.3, -radius * 0.3, radius * 0.3, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.restore();
};

export function renderBasicFace(props: BasicFaceProps) {
  const {
    ctx,
    eyeScale: eyesOpenness,
    mouthScale: mouthOpenness,
    color,
  } = props;
  const { width, height } = ctx.canvas;

  // Clear the canvas
  ctx.clearRect(0, 0, width, height);
  
  // Uzay arka planını çiz
  drawSpaceBackground(ctx);

  const faceRadius = width / 2 - 20;
  const faceCenter = [width / 2, height / 2];
  
  // Yüz gölgesi (3D derinlik için)
  ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
  ctx.beginPath();
  ctx.arc(faceCenter[0] + 5, faceCenter[1] + 5, faceRadius, 0, Math.PI * 2);
  ctx.fill();
  
  // Ana yüz - 3D gradyan ile
  const faceGradient = createShadowGradient(
    ctx, 
    faceCenter[0], 
    faceCenter[1], 
    faceRadius, 
    color || '#4285f4'
  );
  ctx.fillStyle = faceGradient;
  ctx.beginPath();
  ctx.arc(faceCenter[0], faceCenter[1], faceRadius, 0, Math.PI * 2);
  ctx.fill();
  
  // Yüz kenar vurgusu
  ctx.strokeStyle = adjustColor(color || '#4285f4', -40);
  ctx.lineWidth = 2;
  ctx.stroke();

  const eyesCenter = [width / 2, height / 2.425];
  const eyesOffset = width / 15;
  const eyeRadius = width / 30;
  const eyesPosition: Array<[number, number]> = [
    [eyesCenter[0] - eyesOffset, eyesCenter[1]],
    [eyesCenter[0] + eyesOffset, eyesCenter[1]],
  ];

  // Gözler için gradyan oluştur
  const leftEyeGradient = createEyeGradient(ctx, eyesPosition[0][0], eyesPosition[0][1], eyeRadius);
  const rightEyeGradient = createEyeGradient(ctx, eyesPosition[1][0], eyesPosition[1][1], eyeRadius);
  
  // Gözleri çiz
  eye(ctx, eyesPosition[0], eyeRadius, eyesOpenness + 0.1, leftEyeGradient);
  eye(ctx, eyesPosition[1], eyeRadius, eyesOpenness + 0.1, rightEyeGradient);

  const mouthCenter = [width / 2, (height / 2.875) * 1.55];
  const mouthExtent = [width / 10, (height / 5) * mouthOpenness + 10];

  // Ağız gölgesi
  ctx.save();
  ctx.translate(mouthCenter[0] + 2, mouthCenter[1] + 2);
  ctx.scale(1, mouthOpenness + height * 0.002);
  ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
  ctx.beginPath();
  ctx.ellipse(0, 0, mouthExtent[0], mouthExtent[1], 0, 0, Math.PI, false);
  ctx.ellipse(0, 0, mouthExtent[0], mouthExtent[1] * 0.45, 0, 0, Math.PI, true);
  ctx.fill();
  ctx.restore();
  
  // Ana ağız - 3D gradyan ile
  ctx.save();
  ctx.translate(mouthCenter[0], mouthCenter[1]);
  ctx.scale(1, mouthOpenness + height * 0.002);
  
  const mouthGradient = createMouthGradient(
    ctx, 
    0, 
    0, 
    mouthExtent[0], 
    mouthExtent[1]
  );
  ctx.fillStyle = mouthGradient;
  ctx.beginPath();
  ctx.ellipse(0, 0, mouthExtent[0], mouthExtent[1], 0, 0, Math.PI, false);
  ctx.ellipse(0, 0, mouthExtent[0], mouthExtent[1] * 0.45, 0, 0, Math.PI, true);
  ctx.fill();
  
  // Ağız kenar vurgusu
  ctx.strokeStyle = 'rgba(100, 0, 0, 0.5)';
  ctx.lineWidth = 1;
  ctx.stroke();
  
  ctx.restore();
}
