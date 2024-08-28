// Ensure a composition is selected
var comp = app.project.activeItem;
if (comp && comp instanceof CompItem) {

    // Function to get After Effects version
    function getAEVersion() {
        var version = app.version;
        return parseFloat(version.split('.')[0]);
    }

    var aeVersion = getAEVersion();

    // Create a new adjustment layer for color grading
    var adjustmentLayer = comp.layers.addSolid([1, 1, 1], "Color Grading", comp.width, comp.height, 1);
    adjustmentLayer.adjustmentLayer = true;

    // Apply Lumetri Color effect
    var lumetriEffect = adjustmentLayer.property("Effects").addProperty("ADBE Lumetri");
    if (lumetriEffect) {
        try {
            var exposureProp = lumetriEffect.property("Exposure") || lumetriEffect.property("Exposure Control");
            var saturationProp = lumetriEffect.property("Saturation");
            
            if (exposureProp) exposureProp.setValue(1.0); // Basic exposure adjustment
            if (saturationProp) saturationProp.setValue(70); // Saturation adjustment
        } catch (e) {
            alert("Lumetri properties might not be available in this version.");
        }
    } else {
        alert("Lumetri effect was not applied.");
    }

    // Apply Optics Compensation Effect
    var opticsCompensation = adjustmentLayer.property("Effects").addProperty("ADBE Optics Compensation");
    if (opticsCompensation) {
        try {
            var fovProp = opticsCompensation.property("Field of View");
            var reverseDistortionProp = opticsCompensation.property("Reverse Lens Distortion");
            
            if (fovProp) fovProp.setValue(100); // Adjust Field of View
            if (reverseDistortionProp) reverseDistortionProp.setValue(true); // Reverse Lens Distortion
        } catch (e) {
            alert("Optics Compensation properties might not be available in this version.");
        }
    } else {
        alert("Optics Compensation effect was not applied.");
    }

    // Apply Noise HLS Auto Effect
    var noiseHLSAuto = adjustmentLayer.property("Effects").addProperty("ADBE Noise HLS Auto");
    if (noiseHLSAuto) {
        try {
            var amountProp = noiseHLSAuto.property("Amount") || noiseHLSAuto.property("ADBE Noise HLS Auto-0001");
            var colorNoiseProp = noiseHLSAuto.property("Color Noise") || noiseHLSAuto.property("ADBE Noise HLS Auto-0002");
            
            if (amountProp) amountProp.setValue(5.0); // Adjust the noise amount
            if (colorNoiseProp) colorNoiseProp.setValue(true); // Enable color noise
        } catch (e) {
            alert("Noise HLS Auto effect properties might not be available.");
        }
    } else {
        alert("Noise HLS Auto effect was not applied.");
    }

} else {
    alert("Please select a composition.");
}

