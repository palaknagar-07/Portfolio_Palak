// Vector2D utility class for 2D math operations
export class Vector2D {
  constructor(public x: number = 0, public y: number = 0) {}

  add(v: Vector2D): Vector2D {
    return new Vector2D(this.x + v.x, this.y + v.y);
  }

  subtract(v: Vector2D): Vector2D {
    return new Vector2D(this.x - v.x, this.y - v.y);
  }

  multiply(scalar: number): Vector2D {
    return new Vector2D(this.x * scalar, this.y * scalar);
  }

  divide(scalar: number): Vector2D {
    return scalar !== 0 ? new Vector2D(this.x / scalar, this.y / scalar) : new Vector2D(0, 0);
  }

  magnitude(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  normalize(): Vector2D {
    const mag = this.magnitude();
    return mag > 0 ? this.divide(mag) : new Vector2D(0, 0);
  }

  distance(v: Vector2D): number {
    return Math.sqrt((this.x - v.x) ** 2 + (this.y - v.y) ** 2);
  }

  limit(max: number): Vector2D {
    if (this.magnitude() > max) {
      return this.normalize().multiply(max);
    }
    return new Vector2D(this.x, this.y);
  }
}

// Fish types with different characteristics
export type FishType = 'tropical' | 'angelfish' | 'clownfish';

export interface FishCharacteristics {
  size: number;
  color: string;
  speed: number;
  separationRadius: number;
  alignmentRadius: number;
  cohesionRadius: number;
}

export const FISH_TYPES: Record<FishType, FishCharacteristics> = {
  tropical: {
    size: 12,
    color: '#FFD700', // Gold
    speed: 1.2,
    separationRadius: 25,
    alignmentRadius: 50,
    cohesionRadius: 50
  },
  angelfish: {
    size: 16,
    color: '#87CEEB', // Sky blue  
    speed: 0.8,
    separationRadius: 30,
    alignmentRadius: 60,
    cohesionRadius: 60
  },
  clownfish: {
    size: 10,
    color: '#FF6347', // Orange red
    speed: 1.5,
    separationRadius: 20,
    alignmentRadius: 40,
    cohesionRadius: 40
  }
};

// Individual fish in the school
export class Fish {
  public position: Vector2D;
  public velocity: Vector2D;
  public acceleration: Vector2D;
  public characteristics: FishCharacteristics;
  public angle: number = 0;
  private scatterTime: number = 0;

  constructor(x: number, y: number, public type: FishType) {
    this.position = new Vector2D(x, y);
    this.velocity = new Vector2D(
      (Math.random() - 0.5) * 2,
      (Math.random() - 0.5) * 2
    );
    this.acceleration = new Vector2D(0, 0);
    this.characteristics = FISH_TYPES[type];
  }

  // Apply boids rules: separation, alignment, cohesion
  flock(fishes: Fish[], mousePos: Vector2D | null, bounds: { width: number; height: number }): void {
    const separation = this.separate(fishes).multiply(2.0);
    const alignment = this.align(fishes).multiply(1.0);
    const cohesion = this.seek(this.cohesion(fishes)).multiply(1.0);
    const avoidMouse = mousePos ? this.avoid(mousePos).multiply(3.0) : new Vector2D(0, 0);
    const boundaries = this.boundaries(bounds).multiply(2.0);

    this.acceleration = this.acceleration
      .add(separation)
      .add(alignment)
      .add(cohesion)
      .add(avoidMouse)
      .add(boundaries);
  }

  // Separation: avoid crowding neighbors
  separate(fishes: Fish[]): Vector2D {
    const desiredSeparation = this.characteristics.separationRadius;
    const steer = new Vector2D(0, 0);
    let count = 0;

    for (const fish of fishes) {
      const distance = this.position.distance(fish.position);
      if (distance > 0 && distance < desiredSeparation) {
        const diff = this.position.subtract(fish.position).normalize().divide(distance);
        steer.x += diff.x;
        steer.y += diff.y;
        count++;
      }
    }

    if (count > 0) {
      const avgSteer = steer.divide(count).normalize().multiply(this.characteristics.speed);
      return avgSteer.subtract(this.velocity).limit(0.03);
    }
    return new Vector2D(0, 0);
  }

  // Alignment: steer towards average heading of neighbors
  align(fishes: Fish[]): Vector2D {
    const neighborDistance = this.characteristics.alignmentRadius;
    const sum = new Vector2D(0, 0);
    let count = 0;

    for (const fish of fishes) {
      const distance = this.position.distance(fish.position);
      if (distance > 0 && distance < neighborDistance) {
        sum.x += fish.velocity.x;
        sum.y += fish.velocity.y;
        count++;
      }
    }

    if (count > 0) {
      const avgVelocity = sum.divide(count).normalize().multiply(this.characteristics.speed);
      return avgVelocity.subtract(this.velocity).limit(0.03);
    }
    return new Vector2D(0, 0);
  }

  // Cohesion: steer towards average position of neighbors
  cohesion(fishes: Fish[]): Vector2D {
    const neighborDistance = this.characteristics.cohesionRadius;
    const sum = new Vector2D(0, 0);
    let count = 0;

    for (const fish of fishes) {
      const distance = this.position.distance(fish.position);
      if (distance > 0 && distance < neighborDistance) {
        sum.x += fish.position.x;
        sum.y += fish.position.y;
        count++;
      }
    }

    if (count > 0) {
      return sum.divide(count);
    }
    return this.position;
  }

  // Seek a target position
  seek(target: Vector2D): Vector2D {
    const desired = target.subtract(this.position);
    const distance = desired.magnitude();
    
    if (distance > 0) {
      const normalizedDesired = desired.normalize().multiply(this.characteristics.speed);
      const steer = normalizedDesired.subtract(this.velocity);
      return steer.limit(0.03);
    }
    return new Vector2D(0, 0);
  }

  // Avoid mouse cursor
  avoid(mousePos: Vector2D): Vector2D {
    const distance = this.position.distance(mousePos);
    const avoidDistance = 80;
    
    if (distance < avoidDistance) {
      this.scatterTime = 60; // Scatter for 60 frames
      const force = this.position.subtract(mousePos).normalize().multiply(3 / distance);
      return force;
    }
    
    if (this.scatterTime > 0) {
      this.scatterTime--;
    }
    
    return new Vector2D(0, 0);
  }

  // Stay within bounds
  boundaries(bounds: { width: number; height: number }): Vector2D {
    const margin = 50;
    const force = new Vector2D(0, 0);

    if (this.position.x < margin) {
      force.x = this.characteristics.speed;
    } else if (this.position.x > bounds.width - margin) {
      force.x = -this.characteristics.speed;
    }

    if (this.position.y < margin) {
      force.y = this.characteristics.speed;
    } else if (this.position.y > bounds.height - margin) {
      force.y = -this.characteristics.speed;
    }

    return force.multiply(0.5);
  }

  // Update fish position and velocity
  update(): void {
    this.velocity = this.velocity.add(this.acceleration).limit(this.characteristics.speed);
    this.position = this.position.add(this.velocity);
    
    // Calculate angle for rotation
    this.angle = Math.atan2(this.velocity.y, this.velocity.x);
    
    // Reset acceleration
    this.acceleration = new Vector2D(0, 0);
  }

  // Render fish on canvas
  render(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    ctx.translate(this.position.x, this.position.y);
    ctx.rotate(this.angle);
    
    const size = this.characteristics.size;
    const halfSize = size / 2;
    
    // Draw fish body (oval)
    ctx.fillStyle = this.characteristics.color;
    ctx.beginPath();
    ctx.ellipse(0, 0, size, halfSize, 0, 0, 2 * Math.PI);
    ctx.fill();
    
    // Add darker outline
    ctx.strokeStyle = this.getDarkerColor(this.characteristics.color);
    ctx.lineWidth = 1;
    ctx.stroke();
    
    // Draw tail
    ctx.fillStyle = this.characteristics.color;
    ctx.beginPath();
    ctx.moveTo(-size, 0);
    ctx.lineTo(-size * 1.5, -halfSize * 0.7);
    ctx.lineTo(-size * 1.8, 0);
    ctx.lineTo(-size * 1.5, halfSize * 0.7);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    // Draw eye
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(halfSize * 0.3, -halfSize * 0.3, halfSize * 0.4, 0, 2 * Math.PI);
    ctx.fill();
    
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(halfSize * 0.4, -halfSize * 0.3, halfSize * 0.2, 0, 2 * Math.PI);
    ctx.fill();
    
    ctx.restore();
  }

  private getDarkerColor(color: string): string {
    // Simple color darkening function
    const colorMap: Record<string, string> = {
      '#FFD700': '#B8860B', // Gold -> DarkGoldenRod
      '#87CEEB': '#4682B4', // SkyBlue -> SteelBlue
      '#FF6347': '#CD5C5C', // Tomato -> IndianRed
    };
    return colorMap[color] || '#333333';
  }
}