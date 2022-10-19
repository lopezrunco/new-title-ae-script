var mainComp = app.project.activeItem
var mainLayer = mainComp.layer(1)

// UI
var scriptWindow = new Window('palette', 'Agregar título y cortar video', undefined)
scriptWindow.orientation = 'row'

var titleInputs = scriptWindow.add('panel', undefined, 'Introduce el texto y su duración')
var videoInputs = scriptWindow.add('panel', undefined, 'Introduce entrada y salida del vídeo')
titleInputs.orientation = 'column'
videoInputs.orientation = 'column'

var titleContent = titleInputs.add('edittext', undefined, 'Texto del título')
var titleLength = titleInputs.add('edittext', undefined, 'Duración del título (seg)')

var inCut = videoInputs.add('edittext', undefined, 'Punto de entrada (seg)')
var outCut = videoInputs.add('edittext', undefined, 'Punto de salida (seg)')

var buttonsGroup = scriptWindow.add('group', undefined, 'Buttons')
buttonsGroup.orientation = 'column'

var startBtn = buttonsGroup.add('button', undefined, 'Ejecutar')
var cancelBtn = buttonsGroup.add('button', undefined, 'Cancelar')

// Script
function runScript() {
    var compLenght = mainComp.duration
    var titleLengthParsed = parseInt(titleLength.text)
    var inCutLengthParsed = parseInt(inCut.text)
    var outCutLengthParsed = parseInt(outCut.text)

    var titleText = mainComp.layers.addText(titleContent.text)
    titleText.outPoint = titleLengthParsed

    var middleLayer = mainLayer.duplicate()
    var topLayer = middleLayer.duplicate()

    mainLayer.outPoint = inCutLengthParsed
    middleLayer.inPoint = inCutLengthParsed
    middleLayer.outPoint = outCutLengthParsed    
    topLayer.inPoint = outCutLengthParsed
    topLayer.outPoint = compLenght
    scriptWindow.close()
    app.endUndoGroup('Custom AE script')
}

scriptWindow.show()
scriptWindow.center()

startBtn.onClick = function() {
    // Inputs validation
    if (titleContent.text === '' || titleContent.text === 'Texto del título') {
        alert('Ingresa un título')
    } else if (titleLength.text === '' || titleLength.text === 'Duración del título (seg)') {
        alert('Ingresa la duración del título')
    } else if (isNaN(titleLength.text)) {
        alert('Ingresa la duración del título en caracteres numéricos')
    } else if (inCut.text === '' || inCut.text === 'Punto de entrada (seg)') {
        alert('Ingresa el punto de entrada del video')
    } else if (isNaN(inCut.text)) {
        alert('Ingresa el punto de entrada del video en caracteres numéricos')
    } else if (outCut.text === '' || outCut.text === 'Punto de salida (seg)') {
        alert('Ingresa el punto de salida del video')
    } else if (isNaN(outCut.text)) {
        alert('Ingresa el punto de salida del video en caracteres numéricos')
    } else {
        app.beginUndoGroup('Custom AE script')
        runScript()
    }
}

cancelBtn.onClick = function() {
    scriptWindow.close()
}