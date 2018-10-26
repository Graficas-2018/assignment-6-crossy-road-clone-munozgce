var renderer = null, 
scene = null, 
camera = null,
root = null, //robot_idle = null,
group = null,
orbitControls = null,
//raycaster = null, currentSize = null;
crossy = null;

//var robot_mixer = {};
//var animator = null,
//duration = 2, // sec
//loopAnimation = false;
//var morphs = [];

var duration = 20000; // ms

var currentTime = Date.now();

//var animation = "idle";

//var killed = null, play = null, alive = true, gOver = true;
//var highScore = 0, score = 0;
var canvas = null;

var crossyCollider = null,
crossyColliderClone = null;
var move = null;
var colliderObjects = [], obstacles = [], obsColl = [], vehicles = [], logs = [];
var crossyColliderSize = new THREE.Vector3( 1.5, 1.5, 1.5 );

var vehicleAnimation = null, logAnimation = [];

var collidesWater = false, collidesWood = false;

function Down(event)
{


    switch(event.keyCode)
    {
        case 38:
            crossy.position.z -= 1;
            camera.position.z += 1;
            break;

        case 37:
            crossy.position.x -= 1;
            camera.position.z += 1;
            break;

        case 39:
            crossy.position.x += 1;
            camera.position.z += 1;
            break;

    }


}


function DrawMap() {

    geometry = new THREE.PlaneGeometry(200, 6, 50, 50);
    var grass = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({color:0xffff00, side:THREE.DoubleSide}));
    grass.rotation.x = -Math.PI / 2;
    grass.position.y = -1;
    grass.position.z = -2;
    grass.tag = 'grass';
    let x = Math.floor(Math.random() * 13 - 6) * 2;
    let z = Math.floor(Math.random() * 3) * 2;
    material = new THREE.MeshPhongMaterial({ color: 0xff00ff });
    group.add(grass);



    geometry = new THREE.PlaneGeometry(200, 600, 50, 50);
    road = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({color:0xffff00, side:THREE.DoubleSide}));
    road.rotation.x = -Math.PI / 2;
    road.position.y = -1;
    road.position.z = -8;
    road.tag = 'road';
    x = Math.floor(Math.random() * 13 - 6) * 2;
    z = Math.floor(Math.random() * 3) * 2 + 6;
    material = new THREE.MeshPhongMaterial({ color: 0xff0000 });
    group.add(road);

    geometry = new THREE.CubeGeometry(5, 2, 2);
    vehicle = new THREE.Mesh(geometry, material);
    vehicle.position.x = x;
    vehicle.position.z = -z;
    vehCollClone = new THREE.Box3().setFromObject(vehicle);
    colliderObjects.push(vehCollClone);
    obstacles.push(vehicle);
    vehicles.push(vehicle);
    group.add(vehicle);

    geometry = new THREE.CubeGeometry(5, 2, 2);
    vehicle = new THREE.Mesh(geometry, material);
    vehicle.position.x = x;
    vehicle.position.z = -z -5;
    vehCollClone = new THREE.Box3().setFromObject(vehicle);
    colliderObjects.push(vehCollClone);
    obstacles.push(vehicle);
    vehicles.push(vehicle);
    group.add(vehicle);

    geometry = new THREE.CubeGeometry(5, 2, 2);
    vehicle = new THREE.Mesh(geometry, material);
    vehicle.position.x = x;
    vehicle.position.z = -z -10;
    vehCollClone = new THREE.Box3().setFromObject(vehicle);
    colliderObjects.push(vehCollClone);
    obstacles.push(vehicle);
    vehicles.push(vehicle);
    group.add(vehicle);

     geometry = new THREE.CubeGeometry(5, 2, 2);
    vehicle = new THREE.Mesh(geometry, material);
    vehicle.position.x = x;
    vehicle.position.z = -z -15;
    vehCollClone = new THREE.Box3().setFromObject(vehicle);
    colliderObjects.push(vehCollClone);
    obstacles.push(vehicle);
    vehicles.push(vehicle);
    group.add(vehicle);

    geometry = new THREE.CubeGeometry(5, 2, 2);
    vehicle = new THREE.Mesh(geometry, material);
    vehicle.position.x = x;
    vehicle.position.z = -z -20;
    vehCollClone = new THREE.Box3().setFromObject(vehicle);
    colliderObjects.push(vehCollClone);
    obstacles.push(vehicle);
    vehicles.push(vehicle);
    group.add(vehicle);

    geometry = new THREE.CubeGeometry(5, 2, 2);
    vehicle = new THREE.Mesh(geometry, material);
    vehicle.position.x = x;
    vehicle.position.z = -z -25;
    vehCollClone = new THREE.Box3().setFromObject(vehicle);
    colliderObjects.push(vehCollClone);
    obstacles.push(vehicle);
    vehicles.push(vehicle);
    group.add(vehicle);

    geometry = new THREE.CubeGeometry(5, 2, 2);
    vehicle = new THREE.Mesh(geometry, material);
    vehicle.position.x = x;
    vehicle.position.z = -z -30;
    vehCollClone = new THREE.Box3().setFromObject(vehicle);
    colliderObjects.push(vehCollClone);
    obstacles.push(vehicle);
    vehicles.push(vehicle);
    group.add(vehicle);

    geometry = new THREE.CubeGeometry(5, 2, 2);
    vehicle = new THREE.Mesh(geometry, material);
    vehicle.position.x = x;
    vehicle.position.z = -z -35;
    vehCollClone = new THREE.Box3().setFromObject(vehicle);
    colliderObjects.push(vehCollClone);
    obstacles.push(vehicle);
    vehicles.push(vehicle);
    group.add(vehicle);

    geometry = new THREE.CubeGeometry(5, 2, 2);
    vehicle = new THREE.Mesh(geometry, material);
    vehicle.position.x = x;
    vehicle.position.z = -z -40;
    vehCollClone = new THREE.Box3().setFromObject(vehicle);
    colliderObjects.push(vehCollClone);
    obstacles.push(vehicle);
    vehicles.push(vehicle);
    group.add(vehicle);



    for (let x = 0; x < 3; x++)
        logAnimation.push(new KF.KeyFrameAnimator)

}



function checkColliders() {
    crossyColliderClone.update();
    crossyCollider = new THREE.Box3().setFromCenterAndSize(crossy.position, crossyColliderSize);
    crossyDownBox = new THREE.Box3().setFromCenterAndSize(new THREE.Vector3(crossy.position.x, crossy.position.y - 0.5, crossy.position.z),
       new THREE.Vector3(0, 1, 0));

    for (var collider of colliderObjects) {
        if (crossyCollider.intersectsBox(collider)) {

            switch(move) {
                case 'up':
                        crossy.position.z += 2;
                        camera.position.z += 2;
                        break;

                case 'right':
                        crossy.position.x -= 2;
                        camera.position.x += 2;
                        break;

                case 'left':
                        crossy.position.x += 2;
                        camera.position.x += 2;
                        break;

                default:
                        break;
            }

            move = 'else';
        }

        if (crossyDownBox.intersectsBox(collider)) {

        }
    }

    for (var collider of obsColl) {
        if (crossyCollider.intersectsBox(collider)) {

            crossy.position.x = 0;
            crossy.position.y = 0;
            crossy.position.z += 6;
            camera.position.set(0, 60, 35);
        }

        if (crossyDownBox.intersectsBox(collider)) {
            if (collider.tag == 'log') {
                collidesWood = true;
                crossy.position.x = collider.getCenter().x;

            }
        }
    }


}

function upColl() {
    obsColl = [];
    for (var moveColliders of obstacles) {
        cubeBBox = new THREE.Box3().setFromObject(moveColliders);

        obsColl.push(cubeBBox);
    }
}

function movementAnimation() {

    for (var vehicle of vehicles) {
        duration = (Math.random() * 8 + 1) * 500;
        vehicleAnimation = new KF.KeyFrameAnimator;
        vehicleAnimation.init({
            interps:
                [
                    {
                        keys:[0, .5, 1],
                        values:[
                                { x : 25 },
                                { x : -25 },
                                { x : 25 },
                                ],
                        target:vehicle.position
                    }
                ],
            loop: true,
            duration: duration
        });
        vehicleAnimation.start();
    }

}

function run() {
    requestAnimationFrame(function() { run(); });

        // Render the scene
        renderer.render( scene, camera );

        // Update objects that can move
        upColl();

        // Collider detection
        checkColliders();

        // Update the animations
        KF.update();

        // Update the camera controller
        orbitControls.update();
}



var directionalLight = null;
var spotLight = null;
var ambientLight = null;
var mapUrl = "../images/checker_large.gif";

var SHADOW_MAP_WIDTH = 2048, SHADOW_MAP_HEIGHT = 2048;

function createScene(canvas) {

    this.canvas = canvas;

    // Create the Three.js renderer and attach it to our canvas
    renderer = new THREE.WebGLRenderer( { canvas: canvas, antialias: true } );

    // Set the viewport size
    renderer.setSize(canvas.width, canvas.height);

    // Turn on shadows
    renderer.shadowMap.enabled = true;
    // Options are THREE.BasicShadowMap, THREE.PCFShadowMap, PCFSoftShadowMap
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Create a new Three.js scene
    scene = new THREE.Scene();

    // Add  a camera so we can view the scene
    camera = new THREE.PerspectiveCamera( 20, canvas.width / canvas.height, 1, 4000 );
    camera.position.set(0, 60, 35);
    scene.add(camera);

    orbitControls = new THREE.OrbitControls(camera, renderer.domElement);

    // Create a group to hold all the objects
    root = new THREE.Object3D;

    spotLight = new THREE.SpotLight (0xffffff);
    spotLight.position.set(-30, 8, -10);
    spotLight.target.position.set(-2, 0, -2);
    root.add(spotLight);

    spotLight.castShadow = true;

    spotLight.shadow.camera.near = 1;
    spotLight.shadow.camera.far = 200;
    spotLight.shadow.camera.fov = 45;

    spotLight.shadow.mapSize.width = SHADOW_MAP_WIDTH;
    spotLight.shadow.mapSize.height = SHADOW_MAP_HEIGHT;

    ambientLight = new THREE.AmbientLight ( 0x888888 );
    root.add(ambientLight);

    // Create the objects
    // loadFBX();
    /*geometry = new THREE.BoxBufferGeometry( 1, 1, 1 );
    var object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: Math.random() * 0xffffff } ) );
    scene.add(object);*/

    // Create a group to hold the objects
    group = new THREE.Object3D;
    root.add(group);




    var material = new THREE.MeshPhongMaterial({ color: 0x0000ff });
    geometry = new THREE.CubeGeometry(2, 2, 2);

    // And put the geometry and material together into a mesh
    crossy = new THREE.Mesh(geometry, material);

    crossyColliderClone =new THREE.BoxHelper(crossy, 0x00ff00);



    group.add(crossy);
    group.add(crossyColliderClone);

    DrawMap();

    // Create the animations
    movementAnimation();

    // Now add the group to our scene
    scene.add( root );
}