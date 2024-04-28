
class vec3 {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    };

    values() {
        return [this.x, this.y, this.z];
    };

    add(that) {
        return new vec3(
            this.x + that.x,
            this.y + that.y,
            this.z + that.z
        );
    };

    sub(that) {
        return new vec3(
            this.x - that.x,
            this.y - that.y,
            this.z - that.z
        );
    };

    mul(k) {
        return new vec3(
            this.x * k,
            this.y * k,
            this.z * k
        );
    };

    emul(v) {  // element-wise product between two vectors
        return new vec3(
            this.x * v.x,
            this.y * v.y,
            this.z * v.z
        );
    };

    div(k) {
        return new vec3(
            this.x / k,
            this.y / k,
            this.z / k
        );
    };

    dot(that) {
        return this.x * that.x + this.y * that.y + this.z * that.z;
    };

    cross(that) {
        return new vec3(
            this.y * that.z - this.z * that.y,
            this.z * that.x - this.x * that.z,
            this.x * that.y - this.y * that.x
        );
    };

    length() {
        return Math.sqrt(this.length2());
    };

    length2() {
        return this.x * this.x + this.y * this.y + this.z * this.z;
    };

    unit() {
        return this.mul(1 / this.length());
    };

    nearZero() {
        return this.length2() <= 10 ** -8;
    };

    print() {
        console.log('(', this.x, ', ', this.y, ', ', this.z, ')');
    };
};


class colour {
    constructor(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
    };

    values() {
        return [this.r, this.g, this.b];
    };

    attenuate(other) {
        return new colour(
            this.r * other.r,
            this.g * other.g,
            this.b * other.b
        );
    };

    add(other) {
        return new colour(
            this.r + other.r,
            this.g + other.g,
            this.b + other.b
        );
    };

    mul(k) {
        return new colour(
            this.r * k,
            this.g * k,
            this.b * k
        );
    };

    normalise() {
        this.r = Math.round(this.r / 255);
        this.g = Math.round(this.g / 255);
        this.b = Math.round(this.b / 255);
    };

    scale255() {
        this.r = Math.min(Math.round(this.r * 255), 255);
        this.g = Math.min(Math.round(this.g * 255), 255);
        this.b = Math.min(Math.round(this.b * 255), 255);
    };
};
