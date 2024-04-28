class camera {
    constructor() {
        // Display image sizing
        this.aspect_ratio = 9 / 16;
        this.width = 1000;
        this.height = Math.round(this.width * this.aspect_ratio);
        this.rayCanv = new canv(this.width, this.height, "image-output");

        // Camera settings
        this.camera_center = new vec3(0, 0, 2);
        this.vertical_up = new vec3(0, 1, 0);
        this.look_at = new vec3(0, 0, 0);
        this.focal_distance = (this.look_at.sub(this.camera_center)).length();

        this.defocus_angle = (Math.PI / 180) * 0.6;

        // Viewport
        this.vertical_view_angle = (Math.PI / 180) * 35;
        this.vp_height = 2 * Math.tan(this.vertical_view_angle / 2) * this.focal_distance;
        this.vp_width = this.vp_height * (this.width / this.height);

        // Configure viewport to camera with axis u, v, w
        this.w = (this.camera_center.sub(this.look_at)).unit();
        this.u = (this.vertical_up.cross(this.w)).unit(); // Make sure camera doesn't directly look up or down
        this.v = this.w.cross(this.u);

        // Viewport dimension vectors
        this.vp_u = this.u.mul(this.vp_width);
        this.vp_v = this.v.mul(-this.vp_height); // Points downwards like a 2D array

        this.vp_center = this.camera_center.sub(this.w.mul(this.focal_distance));
        this.vp_upper_left = this.vp_center.sub((this.vp_u.add(this.vp_v)).mul(0.5));

        // Viewport traversal vectors
        this.pixel_du = this.vp_u.mul(1 / this.width);
        this.pixel_dv = this.vp_v.mul(1 / this.height);

        this.pixel_0_0_pos = this.vp_upper_left.add((this.pixel_du.add(this.pixel_dv)).mul(0.5));

        // Defocus disk (thin lens)
        this.defocus_radius = this.focal_distance * Math.tan(this.defocus_angle / 2);
        this.defocus_disk_u = this.u.mul(this.defocus_radius);
        this.defocus_disk_v = this.v.mul(this.defocus_radius);

        // Rendering settings
        this.samples_per_pixel = 250;
        this.pixel_sample_scale = 1 / this.samples_per_pixel;
        this.max_depth = 15;
    };

    render(objects) {
        let ray;
        let avg_pxl_colour;

        for (let j = 0; j < this.height; j += 1) {
            for (let i = 0; i < this.width; i += 1) {

                avg_pxl_colour = new colour(0, 0, 0);

                for (let s = 0; s < this.samples_per_pixel; s += 1) {
                    ray = this.get_ray(i, j);

                    avg_pxl_colour = avg_pxl_colour.add(this.rayColour(ray, objects, this.max_depth));
                };

                avg_pxl_colour = avg_pxl_colour.mul(this.pixel_sample_scale);
                this.rayCanv.drawPixel(i, j, avg_pxl_colour);
            };
        };
    };

    get_ray(i, j) {
        let pxl_u_pos = this.pixel_du.mul(i + this.randint(-0.5, 0.5));
        let pxl_v_pos = this.pixel_dv.mul(j + this.randint(-0.5, 0.5));

        let pixel_sample = this.pixel_0_0_pos.add(pxl_u_pos.add(pxl_v_pos));

        let ray_origin = this.defocus_disk_sample();
        let ray_direction = pixel_sample.sub(ray_origin);

        return new ray3(ray_origin, ray_direction);
    };

    defocus_disk_sample() {
        let p;
        while (true) {
            p = new vec3(this.randint(-1, 1), this.randint(-1, 1), 0);
            if (p.length2() <= 1) {
                break;
            }
        };

        let defocus_u = this.defocus_disk_u.mul(p.x);
        let defocus_v = this.defocus_disk_v.mul(p.y);
        let defocus = defocus_u.add(defocus_v);

        return this.camera_center.add(defocus);
    };

    rayColour(ray, objects, depth) {
        // t > 0 to indicate that the object is in front of the camera
        let rec = new hitRecord();
        let hit;
        let t_interval = new interval(0.001, Infinity);

        if (depth <= 0) {
            return new colour(0, 0, 0); // Light has bounced on too many objects and approx fully absorbed
        };

        while (true) {
            [hit, rec] = objects.hit(ray, t_interval, rec); // rec is not being correctly written !!
            if (hit) {
                let [scattered, attenuation] = rec.material.scatter(ray, rec);
                if (scattered) { // i.e. if light ray hits an object that is a non-light source
                    return this.rayColour(scattered, objects, depth - 1).attenuate(attenuation).add(rec.material.emitted());
                } else {
                    return rec.material.emitted();
                }

            } else {
                break;
            };
        }

        // Blue sky background
        let a = 0.5 * (ray.dir.unit().y + 1);
        return (new colour(1, 1, 1).mul(1 - a)).add(new colour(0.5, 0.7, 1.0).mul(a));
    };

    randint(min, max) {
        return Math.random() * (max - min) + min;
    };
};
