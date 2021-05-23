console.log("ml5 version", ml5.version);
Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");
Webcam.attach('#camera');

function take_snap() {
    Webcam.snap(function(data_url) {
        document.getElementById("result").innerHTML = "<img id='captured_img' src='" + data_url + "'>";
    });
}

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/68AX9vrVp/model.json', modelLoaded);

function modelLoaded() {
    console.log("model loaded");
}

function check() {
    image = document.getElementById("captured_img");
    classifier.classify(image, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.log("error found");
    } else {
        console.log(results);
        document.getElementById("result_object_name").innerHTML = results[0].label;
        document.getElementById("result_accuracy_name").innerHTML = results[0].confidence.toFixed(3);
    }
}