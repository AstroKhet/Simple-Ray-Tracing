class renderer {
    constructor(camera, objects = new hittableList()) {
        this.camera = camera;
        this.objects = objects;
    };

    generate(scene_id) {
        switch (scene_id) {
            case 0:
                let leftBall = new sphere(new vec3(-1, 0, -1), 0.5, new dielectric(new colour(1, 1, 1), 1.5));
                let leftBallHole = new sphere(new vec3(-1, 0, -1), 0.4, new dielectric(new colour(1, 1, 1), 1 / 1.5));

                let centerBall = new sphere(new vec3(0, 0, -1), 0.5, new lambertian(new colour(0.1, 0.2, 0.5)));

                let rightBall = new sphere(new vec3(1, 0, -1), 0.5, new metal(new colour(0.8, 0.6, 0.2), 0.5));

                let floorBall = new sphere(new vec3(0, -100.5, -1), 100, new lambertian(new colour(0.9, 0.9, 0)));

                this.objects.add(floorBall);
                this.objects.add(leftBall);
                this.objects.add(centerBall);
                this.objects.add(leftBallHole);
                this.objects.add(rightBall);
                break;

            case 1:
                // Light source
                let sun = new sphere(new vec3(0, 5, -50), 25, new diffuse_light(new colour(6, 6, 6)));
                let planet = new sphere(new vec3(0, -200.5, -1), 200, new lambertian(new colour(0.8, 0.8, 0.25)));
                let ball = new sphere(new vec3(0, 0, -1), 0.5, new metal(new colour(0.5, 0.6, 0.8), 1));
                let ball2 = new sphere(new vec3(1, 0, -1), 0.5, new dielectric(new colour(1, 0.9, 0.9), 1.15));

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
