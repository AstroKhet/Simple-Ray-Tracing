class ray3 {
    constructor(origin, direction) {
        this.ori = origin;
        this.dir = direction;
    };

    at(t) {
        // Linear eq: ori + t * dir
        return this.ori.add(this.dir.mul(t));
    };
};


class hitRecord {
    constructor() {
        this.t;
        this.point;
        this.normal;
        this.front_face;
        this.material;
    };

    setFaceNormal(ray, outward_normal) {
        this.front_face = ray.dir.dot(outward_normal) < 0; // <0 means ray directs against surface from the front
        this.normal = this.front_face ? outward_normal : outward_normal.mul(-1);
    };
};


// List of balls in the scene
class hittableList {
    constructor() {
        this.list = [];
    };

    add(hittable) {
        this.list.push(hittable);
    };

    hit(ray, t_interval, rec) {
        let temp_rec = new hitRecord(); // Should record the hit info of the nearest object
        let hit_something = false; // bool

        for (let obj of this.list) {
            if (obj.hit(ray, t_interval, temp_rec)) {
                hit_something = true;
                t_interval.max = temp_rec.t;
                rec = temp_rec;
            }
        }
        return [hit_something, rec]; // this function was not writing rec into the outside one so we got to return it here
    };
};


class interval {
    constructor(min, max) {
        this.min = min;
        this.max = max;
    };

    contains(x) {
        return (this.min <= x) && (x <= this.max);
    };

    surrounds(x) {
        return (this.min < x) && (x < this.max);
    };

    clamp(x) {
        if (x < this.min) {
            return this.min;
        } else if (x > this.max) {
            return this.max;
        }
        return x;
    };
};
