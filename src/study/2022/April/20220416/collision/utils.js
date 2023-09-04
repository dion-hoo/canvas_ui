export const randomIntFromRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getDistance = (x1, y1, x2, y2) => {
    const x = Math.abs(x2 - x1);
    const y = Math.abs(y2 - y1);
    const z = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));

    return z;
};

export const rotate = (velocity, angle) => {
    const rotatedVelocities = {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle),
    };

    return rotatedVelocities;
};

export const resolveCollision = (particle, otherParticle) => {
    const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
    const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

    const xDist = otherParticle.location.x - particle.location.x;
    const yDist = otherParticle.location.y - particle.location.y;

    // Prevent accidental overlap of particles
    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
        // Grab angle between the two colliding particles
        const angle = -Math.atan2(otherParticle.location.y - particle.location.y, otherParticle.location.x - particle.location.x);

        // Store mass in var for better readability in collision equation
        const m1 = particle.mass;
        const m2 = otherParticle.mass;

        // Velocity before equation
        const u1 = rotate(particle.velocity, angle);
        const u2 = rotate(otherParticle.velocity, angle);

        // Velocity after 1d collision equation
        const v1 = { x: (u1.x * (m1 - m2)) / (m1 + m2) + (u2.x * 2 * m2) / (m1 + m2), y: u1.y };
        const v2 = { x: (u2.x * (m1 - m2)) / (m1 + m2) + (u1.x * 2 * m2) / (m1 + m2), y: u2.y };

        // Final velocity after rotating axis back to original location
        const vFinal1 = rotate(v1, -angle);
        const vFinal2 = rotate(v2, -angle);

        // Swap particle velocities for realistic bounce effect
        particle.velocity.x = vFinal1.x;
        particle.velocity.y = vFinal1.y;

        otherParticle.velocity.x = vFinal2.x;
        otherParticle.velocity.y = vFinal2.y;
    }
};
