let classifier;
let net;

let trainingSets = [0, 0]



async function loadClassifier() {
    classifier = knnClassifier.create()
    net = await mobilenet.load()

    document.querySelector(".loading").classList.add("hidden")
}
loadClassifier()

const addExample = label => {
    const Image = tf.browser.fromPixels(canvas)
    const feature = net.infer(Image, 'conv_preds')

    classifier.addExample(feature, label)

    context.clearRect(0,0, canvas.width, canvas.height)

    label === "santa" ?
        santaButton.innerText = `Santa (${++trainingSets[0]})` :
        elderlyButton.innerText = `Elderly (${++trainingSets[1]})`;

    document.querySelector(".info").innerText = `Trained classifier with ${label}`;

    Image.dispose();
}

async function predict(){
    if(classifier.getNumClasses() > 0){
        const Image = tf.browser.fromPixels(canvas)
        const feature = net.infer(Image, "conv_preds")

        const result = await classifier.predictClass(feature);

        context.clearRect(0, 0, canvas.width, canvas.height)

        document.querySelector(".info").innerText = `Predicted to be ${result.label}`;

        Image.dispose()
    }
}