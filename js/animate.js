
class animator {
    constructor(camera, objects=new hittableList()){
        this.camera = camera;
        this.objects = objects;
    };

    generate(scene_id){
        switch (scene_id){
            case 0:
                let leftBall = new sphere(new vec3(-1, 0, -1), 0.5, new dielectric(new colour(1, 1, 1), 1.5));
                let leftBallHole = new sphere(new vec3(-1, 0, -1), 0.4, new dielectric(new colour(1, 1, 1), 1/1.5));

                let centerBall = new sphere(new vec3(0, 0, -1), 0.5, new lambertian(new colour(0.1, 0.2, 0.5)));

                let rightBall = new sphere(new vec3(1, 0, -1), 0.5, new metal(new colour(0.8, 0.6, 0.2), 0.5));

                let floorBall = new sphere(new vec3(0, -100.5, -1), 100, new lambertian(new colour(0.9, 0.9, 0)));

                this.objects.add(floorBall);
                this.objects.add(leftBall);
                this.objects.add(centerBall);
                this.objects.add(leftBallHole);
                this.objects.add(rightBall);

            case 1:
                /* 
                List of objects:
                - Lambertian          Red
                - Metal               Yellow
                - Metal (fuzz)        Green
                - Glass (hollow)      Blue
                - Glass (with metal)  Purple
                > to be arranged cirularly like a pentagon, around a center on the x-z plane
                > to rotate clockwise at constant angular velocity
                
                Lighting:
                - White light source x1
                > to be radially further from said center
                > to rotate anti-clockwise with greater angular velocity

                Camera:
                > To begin at center
                > Slowly pan out in z direction
                > Concurrently, rotate camera center and view direction to look down in the y direction
                
                Background: If no light intersection, remain black
                */
                return;

            case 2:
                // testing case
                let sun = new sphere(new vec3(0, 0, 0), new lambertian(new colour(1.5, 1, 0)));
        }
    };

    render(anim_id=null){
        // ...
        this.camera.render(this.objects);
    }


}