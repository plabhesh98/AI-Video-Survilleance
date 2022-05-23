objects = [];
video = "";
Status = "";

function preload(){
    video = createVideo('video.mp4');
    video.hide();
}

function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded(){
    console.log("Cocossd is Initialized");
    Status = true;
    video.loop();
    video.speed(1);
    video.volume(2);
}

function draw(){
    image(video, 0, 0, 380, 380);
    if (Status != ""){
        objectDetector.detect(video, gotResults);
        for (i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Detecting Objects";
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected are: " + objects.length;

            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "% ", objects[i].x + 15, objects[i].y + 15);
            stroke("#FF0000");
            noFill();
            rect(objects[i].x, objects[i].y, objects[i].height, objects[i].width);
        }
    }
}

function gotResults(error, results){
    if (error){
        console.error(error);
    }
        console.log(results);
        objects = results;
}