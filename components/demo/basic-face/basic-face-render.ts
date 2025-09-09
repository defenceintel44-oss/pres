type BasicFaceProps = {
  ctx: CanvasRenderingContext2D;
  mouthScale: number;
  eyeScale: number;
  color?: string;
};

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

// Galaktik arka plan efekti
function createGalacticBackground(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  radius: number,
  time: number
): void {
  // Uzay arka planı - koyu gradyan
  const spaceGradient = ctx.createRadialGradient(
    centerX, centerY, radius * 0.8,
    centerX, centerY, radius * 2
  );
  spaceGradient.addColorStop(0, 'rgba(10, 10, 30, 0.3)');
  spaceGradient.addColorStop(0.5, 'rgba(20, 10, 50, 0.6)');
  spaceGradient.addColorStop(1, 'rgba(5, 5, 15, 0.9)');
  
  ctx.fillStyle = spaceGradient;
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  
  // Yıldızlar
  for (let i = 0; i < 50; i++) {
    const angle = (i * 137.5 + time * 0.5) * Math.PI / 180;
    const distance = radius * 1.2 + Math.sin(time * 0.01 + i) * 20;
    const x = centerX + Math.cos(angle) * distance;
    const y = centerY + Math.sin(angle) * distance;
    
    const starSize = Math.random() * 2 + 0.5;
    const opacity = 0.3 + Math.sin(time * 0.02 + i) * 0.3;
    
    ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
    ctx.beginPath();
    ctx.arc(x, y, starSize, 0, Math.PI * 2);
    ctx.fill();
  }
  
  // Nebula efekti
  for (let i = 0; i < 3; i++) {
    const angle = (i * 120 + time * 0.3) * Math.PI / 180;
    const distance = radius * 1.5;
    const x = centerX + Math.cos(angle) * distance;
    const y = centerY + Math.sin(angle) * distance;
    
    const nebulaGradient = ctx.createRadialGradient(x, y, 0, x, y, radius * 0.8);
    nebulaGradient.addColorStop(0, `rgba(${100 + i * 50}, ${50 + i * 30}, ${200 - i * 20}, 0.1)`);
    nebulaGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    
    ctx.fillStyle = nebulaGradient;
    ctx.beginPath();
    ctx.arc(x, y, radius * 0.8, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Gelişmiş 3D gölge efekti
function createAdvanced3DShadow(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  radius: number,
  baseColor: string,
  time: number
): CanvasGradient {
  // Dinamik ışık pozisyonu
  const lightX = centerX - radius * 0.4 + Math.sin(time * 0.001) * radius * 0.2;
  const lightY = centerY - radius * 0.4 + Math.cos(time * 0.001) * radius * 0.2;
  
  const gradient = ctx.createRadialGradient(
    lightX, lightY, 0,
    centerX, centerY, radius
  );
  
  const rgb = hexToRgb(baseColor);
  
  // Çok katmanlı gradyan
  gradient.addColorStop(0, `rgba(${Math.min(255, rgb.r + 80)}, ${Math.min(255, rgb.g + 80)}, ${Math.min(255, rgb.b + 80)}, 1)`); // Parlak merkez
  gradient.addColorStop(0.2, `rgba(${Math.min(255, rgb.r + 40)}, ${Math.min(255, rgb.g + 40)}, ${Math.min(255, rgb.b + 40)}, 1)`); // Açık ton
  gradient.addColorStop(0.4, baseColor); // Ana renk
  gradient.addColorStop(0.7, adjustColor(baseColor, -40)); // Orta gölge
  gradient.addColorStop(0.9, adjustColor(baseColor, -70)); // Koyu gölge
  gradient.addColorStop(1, adjustColor(baseColor, -100)); // En koyu kenar
  
  return gradient;
}

// Enerji halkası efekti
function createEnergyRing(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  radius: number,
  time: number,
  baseColor: string
): void {
  const rgb = hexToRgb(baseColor);
  
  // Ana enerji halkası
  for (let i = 0; i < 3; i++) {
    const ringRadius = radius + 15 + i * 8;
    const opacity = 0.3 - i * 0.1;
    const phase = time * 0.002 + i * Math.PI / 3;
    
    ctx.strokeStyle = `rgba(${rgb.r}, ${Math.min(255, rgb.g + 50)}, ${Math.min(255, rgb.b + 100)}, ${opacity})`;
    ctx.lineWidth = 3 - i;
    ctx.setLineDash([10, 5]);
    ctx.lineDashOffset = -time * 0.1;
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, ringRadius, 0, Math.PI * 2);
    ctx.stroke();
  }
  
  // Parçacık efekti
  for (let i = 0; i < 20; i++) {
    const angle = (i * 18 + time * 0.5) * Math.PI / 180;
    const particleRadius = radius + 20 + Math.sin(time * 0.01 + i) * 10;
    const x = centerX + Math.cos(angle) * particleRadius;
    const y = centerY + Math.sin(angle) * particleRadius;
    
    const size = 2 + Math.sin(time * 0.02 + i) * 1;
    const opacity = 0.5 + Math.sin(time * 0.03 + i) * 0.3;
    
    ctx.fillStyle = `rgba(${rgb.r}, ${Math.min(255, rgb.g + 100)}, 255, ${opacity})`;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  }
  
  ctx.setLineDash([]); // Reset dash
}

// Gelişmiş göz efekti
function createAdvancedEyeGradient(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  radius: number,
  time: number
): CanvasGradient {
  const gradient = ctx.createRadialGradient(
    centerX - radius * 0.3, centerY - radius * 0.3, 0,
    centerX, centerY, radius
  );
  
  // Dinamik göz rengi
  const intensity = 0.5 + Math.sin(time * 0.003) * 0.2;
  
  gradient.addColorStop(0, `rgba(100, 100, 150, ${intensity})`);
  gradient.addColorStop(0.3, `rgba(50, 50, 100, ${intensity})`);
  gradient.addColorStop(0.7, `rgba(20, 20, 50, ${intensity})`);
  gradient.addColorStop(1, '#000000');
  
  return gradient;
}

// Gelişmiş ağız gradyanı
function createAdvancedMouthGradient(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  width: number,
  height: number,
  time: number
): CanvasGradient {
  const gradient = ctx.createLinearGradient(
    centerX, centerY - height,
    centerX, centerY + height
  );
  
  const glow = 0.3 + Math.sin(time * 0.004) * 0.2;
  
  gradient.addColorStop(0, '#000000');
  gradient.addColorStop(0.2, `rgba(50, 0, 0, ${glow})`);
  gradient.addColorStop(0.5, `rgba(100, 20, 20, ${glow})`);
  gradient.addColorStop(0.8, `rgba(50, 0, 0, ${glow})`);
  gradient.addColorStop(1, '#000000');
  
  return gradient;
}

const eye = (
  ctx: CanvasRenderingContext2D,
  pos: [number, number],
  radius: number,
  scaleY: number,
  gradient: CanvasGradient,
  time: number
) => {
  ctx.save();
  ctx.translate(pos[0], pos[1]);
  ctx.scale(1, scaleY);
  
  // Göz gölgesi (3D efekt için)
  ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
  ctx.beginPath();
  ctx.arc(3, 3, radius + 1, 0, Math.PI * 2);
  ctx.fill();
  
  // Ana göz
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.fill();
  
  // Dinamik göz parlaklığı
  const glowIntensity = 0.4 + Math.sin(time * 0.005) * 0.2;
  ctx.fillStyle = `rgba(255, 255, 255, ${glowIntensity})`;
  ctx.beginPath();
  ctx.arc(-radius * 0.3, -radius * 0.3, radius * 0.4, 0, Math.PI * 2);
  ctx.fill();
  
  // İç parlaklık
  ctx.fillStyle = `rgba(200, 200, 255, ${glowIntensity * 0.5})`;
  ctx.beginPath();
  ctx.arc(-radius * 0.1, -radius * 0.1, radius * 0.2, 0, Math.PI * 2);
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
  const time = Date.now();

  // Clear the canvas
  ctx.clearRect(0, 0, width, height);

  const faceRadius = width / 2 - 40; // Daha fazla alan bırak
  const faceCenter = [width / 2, height / 2];
  
  // Galaktik arka plan
  createGalacticBackground(ctx, faceCenter[0], faceCenter[1], faceRadius, time);
  
  // Enerji halkası
  createEnergyRing(ctx, faceCenter[0], faceCenter[1], faceRadius, time, color || '#4285f4');
  
  // Yüz gölgesi (daha büyük ve yumuşak)
  ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
  ctx.filter = 'blur(8px)';
  ctx.beginPath();
  ctx.arc(faceCenter[0] + 8, faceCenter[1] + 8, faceRadius, 0, Math.PI * 2);
  ctx.fill();
  ctx.filter = 'none';
  
  // Ana yüz - gelişmiş 3D gradyan ile
  const faceGradient = createAdvanced3DShadow(
    ctx, 
    faceCenter[0], 
    faceCenter[1], 
    faceRadius, 
    color || '#4285f4',
    time
  );
  ctx.fillStyle = faceGradient;
  ctx.beginPath();
  ctx.arc(faceCenter[0], faceCenter[1], faceRadius, 0, Math.PI * 2);
  ctx.fill();
  
  // Yüz kenar ışıltısı
  const rgb = hexToRgb(color || '#4285f4');
  ctx.strokeStyle = `rgba(${Math.min(255, rgb.r + 100)}, ${Math.min(255, rgb.g + 100)}, ${Math.min(255, rgb.b + 100)}, 0.6)`;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(faceCenter[0], faceCenter[1], faceRadius - 1, 0, Math.PI * 2);
  ctx.stroke();
  
  // İç ışık halkası
  ctx.strokeStyle = `rgba(255, 255, 255, 0.3)`;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(faceCenter[0], faceCenter[1], faceRadius - 10, 0, Math.PI * 2);
  ctx.stroke();

  const eyesCenter = [width / 2, height / 2.425];
  const eyesOffset = width / 15;
  const eyeRadius = width / 30;
  const eyesPosition: Array<[number, number]> = [
    [eyesCenter[0] - eyesOffset, eyesCenter[1]],
    [eyesCenter[0] + eyesOffset, eyesCenter[1]],
  ];

  // Gözler için gelişmiş gradyan
  const leftEyeGradient = createAdvancedEyeGradient(ctx, eyesPosition[0][0], eyesPosition[0][1], eyeRadius, time);
  const rightEyeGradient = createAdvancedEyeGradient(ctx, eyesPosition[1][0], eyesPosition[1][1], eyeRadius, time);
  
  // Gözleri çiz
  eye(ctx, eyesPosition[0], eyeRadius, eyesOpenness + 0.1, leftEyeGradient, time);
  eye(ctx, eyesPosition[1], eyeRadius, eyesOpenness + 0.1, rightEyeGradient, time);

  const mouthCenter = [width / 2, (height / 2.875) * 1.55];
  const mouthExtent = [width / 10, (height / 5) * mouthOpenness + 10];

  // Ağız gölgesi
  ctx.save();
  ctx.translate(mouthCenter[0] + 3, mouthCenter[1] + 3);
  ctx.scale(1, mouthOpenness + height * 0.002);
  ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
  ctx.filter = 'blur(2px)';
  ctx.beginPath();
  ctx.ellipse(0, 0, mouthExtent[0], mouthExtent[1], 0, 0, Math.PI, false);
  ctx.ellipse(0, 0, mouthExtent[0], mouthExtent[1] * 0.45, 0, 0, Math.PI, true);
  ctx.fill();
  ctx.filter = 'none';
  ctx.restore();
  
  // Ana ağız - gelişmiş gradyan ile
  ctx.save();
  ctx.translate(mouthCenter[0], mouthCenter[1]);
  ctx.scale(1, mouthOpenness + height * 0.002);
  
  const mouthGradient = createAdvancedMouthGradient(
    ctx, 
    0, 
    0, 
    mouthExtent[0], 
    mouthExtent[1],
    time
  );
  ctx.fillStyle = mouthGradient;
  ctx.beginPath();
  ctx.ellipse(0, 0, mouthExtent[0], mouthExtent[1], 0, 0, Math.PI, false);
  ctx.ellipse(0, 0, mouthExtent[0], mouthExtent[1] * 0.45, 0, 0, Math.PI, true);
  ctx.fill();
  
  // Ağız kenar ışıltısı
  ctx.strokeStyle = 'rgba(255, 100, 100, 0.4)';
  ctx.lineWidth = 1;
  ctx.stroke();
  
  ctx.restore();
}