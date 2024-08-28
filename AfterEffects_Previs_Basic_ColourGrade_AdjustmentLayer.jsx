// Create a new adjustment layer for color grading 
var comp = app.project.activeItem; 
var adjustmentLayer = comp.layers.addSolid([1,1,1], "Color Grading", comp.width, comp.height, 1);
adjustmentLayer.adjustmentLayer = true;

// Apply Lumetri Color effect for primary color correction 
var lumetriEffect = adjustmentLayer.Effects.addProperty("ADBE Lumetri"); 
lumetriEffect.property("Curves").property("Tone Curve").setValueAtTime(0, [[0,0], [64,56], [128,128], [192,192], [255,255]]);

// Apply temperature and tint adjustments for cool tones 
lumetriEffect.property("Color Wheels").property("Color Wheels Midtones").setValue([0, 0.5, 1, 1]);

// Adds a cool blue tone to midtones 
lumetriEffect.property("Color Wheels").property("Color Wheels Shadows").setValue([0, 0.4, 0.8, 1]);
// Darkens and adds blue-green tone to shadows  

// Desaturate the image 
lumetriEffect.property("Saturation").setValue(70); 
// Reduce saturation to give a desaturated look 

// Increase contrast using Curves 
var curve = lumetriEffect.property("Curves").property("Tone Curve"); 
curve.setValueAtTime(0, [[0, 0], [64, 50], [128, 128], [192, 200], [255, 255]]); 
// Adjust the curve for contrast

// Apply a vignette for a vintage effect 
lumetriEffect.property("Vignette").property("Vignette Amount").setValue(-2.0);
// Adds a subtle vignette 

// Apply grain for a filmic look 
var grainEffect = adjustmentLayer.Effects.addProperty("ADBE Grain2"); grainEffect.property("Grain Amount").setValue(0.5);
// Adjust the amount of grain to your liking 

// Apply a subtle tint for a vintage feel
var tintEffect = adjustmentLayer.Effects.addProperty("ADBE Tint"); 
tintEffect.property("Map Black To").setValue([0.1, 0.15, 0.2]); 
// Tints blacks towards blue-green 
tintEffect.property("Map White To").setValue([0.9, 0.95, 1.0]); 
// Tints whites towards a cool white 
tintEffect.property("Amount to Tint").setValue(20); 
// Set the tint amount to a subtle level

// Add Noise & Grain -> Add Grain effect 
var addGrainEffect = adjustmentLayer.Effects.addProperty("ADBE Grain2"); 
addGrainEffect.property("ADBE Grain2-0001").setValue(0.5); 
// Set Intensity 
addGrainEffect.property("ADBE Grain2-0002").setValue(0); 

// Set Viewing Mode to Final Output 

// Add Distort -> Optics Compensation effect 
var opticsCompensation = adjustmentLayer.Effects.addProperty("ADBE Optics Compensation"); 
opticsCompensation.property("ADBE Optics Compensation-0001").setValue(100); 
// Field of View 
opticsCompensation.property("ADBE Optics Compensation-0002").setValue(true); 

// Reverse Lens Distortion
 
// Add Chromatic Aberration (using channel offsets) 
var redOffset = adjustmentLayer.Effects.addProperty("ADBE Channel Mixer"); 
var greenOffset = adjustmentLayer.Effects.addProperty("ADBE Channel Mixer"); 
var blueOffset = adjustmentLayer.Effects.addProperty("ADBE Channel Mixer");
redOffset.property("ADBE Channel Mixer-0001").setValue([1, 0, 0, 0]); 

// Red to Red 
redOffset.property("ADBE Channel Mixer-0002").setValue([0, 0, 0, 0]); 

// Red to Green 
redOffset.property("ADBE Channel Mixer-0003").setValue([0, 0, 0, 0]); 

// Red to Blue 
greenOffset.property("ADBE Channel Mixer-0004").setValue([0, 1, 0, 0]); 

// Green to Green 
greenOffset.property("ADBE Channel Mixer-0001").setValue([0, 0, 0, 0]); 

// Green to Red 
greenOffset.property("ADBE Channel Mixer-0003").setValue([0, 0, 0, 0]); 

// Green to Blue 
blueOffset.property("ADBE Channel Mixer-0007").setValue([0, 0, 1, 0]);
 
// Blue to Blue 
blueOffset.property("ADBE Channel Mixer-0001").setValue([0, 0, 0, 0]);
 
// Blue to Red 
blueOffset.property("ADBE Channel Mixer-0002").setValue([0, 0, 0, 0]);
 
// Blue to Green 

// Set the channel mixer offset for Chromatic Aberration 
redOffset.property("ADBE Channel Mixer-0009").expression = "[-2, 0]"; 
greenOffset.property("ADBE Channel Mixer-0009").expression = "[0, -2]"; 
blueOffset.property("ADBE Channel Mixer-0009");