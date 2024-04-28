class renderer {
    constructor(camera, objects = new hittableList()) {
        this.camera = camera;
        this.objects = objects;
    };

    generate(scene_id) {
        switch (scene_id) {
            case 0:
                let left_ball =          new sphere(new vec3(-1, 0, -1), 0.5, new metal(new colour(1, 0.2, 0.2)));
                let center_ball =        new sphere(new vec3(0, 0, -1), 0.35, new dielectric(new colour(1, 1, 1), 2));
                let center_ball_center = new sphere(new vec3(0, 0, -1), 0.2, new metal(new colour(0.6, 0, 1)))
                let right_ball =         new sphere(new vec3(1, 0, -1), 0.5, new metal(new colour(0.2, 0.2, 1)));
                let ground_ball =        new sphere(new vec3(0, -100.5, -1), 100, new lambertian(new colour(0.9, 0.9, 0)));

                this.objects.add(ground_ball);
                this.objects.add(left_ball);
                this.objects.add(center_ball);
                this.objects.add(center_ball_center);
                this.objects.add(right_ball);
                break;

            case 1:
                let sun =    new sphere(new vec3(0, 5, -50), 25, new diffuse_light(new colour(6, 6, 6)));
                let planet = new sphere(new vec3(0, -200.5, -1), 200, new lambertian(new colour(0.8, 0.8, 0.25)));
                let ball =   new sphere(new vec3(0, 0, -1), 0.5, new metal(new colour(0.5, 0.6, 0.8), 1));
                let ball2 =  new sphere(new vec3(1, 0, -1), 0.5, new dielectric(new colour(1, 0.9, 0.9), 1.15));

                this.objects.add(sun);
                this.objects.add(planet);
                this.objects.add(ball);
                this.objects.add(ball2);
                break;

            default:
                return;
        };
    };

    render() {
        this.camera.render(this.objects);
    };
};
