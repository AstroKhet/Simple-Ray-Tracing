class sphere {
    constructor(center, radius, material) {
        this.center = center;
        this.radius = radius;
        this.material = material;
    };

    hit(ray, t_interval, rec) {
        let oc = ray.ori.sub(this.center);
        let A = ray.dir.length2();
        let halfB = oc.dot(ray.dir);
        let C = oc.length2() - this.radius * this.radius;

        let discriminant = halfB * halfB - A * C;

        if (discriminant < 0) {
            return false;
        }

        let sqrtDisrciminant = Math.sqrt(discriminant);

        let root = (-halfB - sqrtDisrciminant) / A;
        if (!t_interval.contains(root)) {
            // see if the other root fits
            root = (-halfB + sqrtDisrciminant) / A;
            if (!t_interval.contains(root)) {
                // both roots are out of bounds
                return false;
            }
        }

        rec.t = root;
        rec.p = ray.at(root);
        rec.material = this.material;
        let outward_normal = rec.p.sub(this.center).div(this.radius);
        rec.setFaceNormal(ray, outward_normal);

        return true;
    };
};


class material {
    constructor(albedo) {
        this.albedo = albedo;
    };

    randint(min, max) {
        return Math.random() * (max - min) + min;
    };

    randomUnitVector() {
        let randomVec = new vec3(this.randint(-1, 1), this.randint(-1, 1), this.randint(-1, 1));
        return randomVec.unit();
    };

    reflect(dir, normal) {
        return dir.add(normal.mul(2 * Math.abs(dir.dot(normal))));
    };

    refract(unit_dir, normal, cos_theta, ri) {
        let dir_perpendicular = unit_dir.add(normal.mul(cos_theta)).mul(ri);
        let dir_parallel = normal.mul(-Math.sqrt(Math.abs(1 - dir_perpendicular.length2())));

        return dir_perpendicular.add(dir_parallel);
    };

    emitted() {
        return new colour(0, 0, 0);
    };
};


class lambertian extends material {
    constructor(albedo) {
        super(albedo);
    }

    scatter(ray, rec) {
        let direction = this.randomUnitVector().add(rec.normal.unit());
        if (direction.nearZero()) {
            direction = rec.normal;
        }

        let scattered = new ray3(rec.p, direction);

        return [scattered, this.albedo];
    }
};


class metal extends material {
    constructor(albedo, fuzz = 0) {
        super(albedo);
        this.fuzz = fuzz;
    };

    scatter(ray, rec) {
        let direction = this.reflect(ray.dir, rec.normal).add(this.randomUnitVector().mul(this.fuzz));
        let scattered = new ray3(rec.p, direction);

        return [scattered, this.albedo];
    }
};


class dielectric extends material {
    constructor(albedo, refraction_index) {
        super(albedo);
        this.refraction_index = refraction_index;
    };

    scatter(ray, rec) {
        let ri = rec.front_face ? 1 / this.refraction_index : this.refraction_index;

        let unit_dir = ray.dir.unit();
        let cos_theta = -Math.max(unit_dir.dot(rec.normal), -1.0);
        let sin_theta = Math.sqrt(1 - cos_theta * cos_theta);

        let direction;

        if (ri * sin_theta > 1 || this.reflectance(cos_theta) > Math.random()) {
            direction = this.reflect(unit_dir, rec.normal);
        } else {
            direction = this.refract(unit_dir, rec.normal, cos_theta, ri);
        }

        let scattered = new ray3(rec.p, direction);
        return [scattered, this.albedo];
    };

    reflectance(cosine) {
        let r0 = (1 - this.refraction_index) / (1 + this.refraction_index);
        r0 = r0 * r0;
        return r0 + (1 - r0) * Math.pow(1 - cosine, 5);
    };
};


class diffuse_light extends material {
    constructor(emission_colour) {
        super(emission_colour);
        this.emission_colour = emission_colour;
    };

    scatter(ray, rec) {
        return [null, null];
    }

    emitted() {
        return this.emission_colour;
    };
};
