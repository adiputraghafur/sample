// SimCalc
const keys = document.querySelectorAll(".key");
const DisplayIn = document.querySelector("#InputSimClac");
const DisplayOut = document.querySelector("#OutputSimClac");

let input = "";
for (let key of keys) {
  const value = key.dataset.key;
  key.addEventListener("click", () => {
    if (value == "Clear") {
      input = "";
      DisplayIn.innerHTML = "";
      DisplayOut.innerHTML = "";
    } else if (value == "Delete") {
      input = input.slice(0, -1);
      DisplayIn.innerHTML = cleaninput(input);
    } else if (value == "=") {
      let result = eval(PrepareInput(input));
      DisplayOut.innerHTML = CleanOutput(result);
    } else if (value == "Brackets") {
      if (
        input.indexOf("(") == -1 ||
        (input.indexOf("(") != -1 &&
          input.indexOf(")") != -1 &&
          input.lastIndexOfindexOf("(") < input.lastIndexOf(")"))
      ) {
        input += "(";
      } else if (
        (input.indexOf("(") != -1 && input.indexOf(")") == -1) ||
        (input.indexOf("(") != -1 &&
          input.indexOf(")") != -1 &&
          input.lastIndexOf("(") > input.lastIndexOf(")"))
      ) {
        input += ")";
      }
      DisplayIn.innerHTML = cleaninput(input);
    } else {
      if (ValidateInput(value)) {
        input += value;
        DisplayIn.innerHTML = cleaninput(input);
      }
    }
  });
}
function cleaninput(input) {
  let input_array = input.split("");
  let input_array_length = input_array.length;
  for (let i = 0; i < input_array_length; i++) {
    if (input_array[i] == "*") {
      input_array[i] = ` <span class="Op">*</span> `;
    } else if (input_array[i] == "/") {
      input_array[i] = ` <span class="Op">/</span> `;
    } else if (input_array[i] == "+") {
      input_array[i] = ` <span class="Op">+</span> `;
    } else if (input_array[i] == "-") {
      input_array[i] = ` <span class="Op">-</span> `;
    } else if (input_array[i] == "(") {
      input_array[i] = `<span class="Op">(</span>`;
    } else if (input_array[i] == ")") {
      input_array[i] = `<span class="Op">)</span>`;
    } else if (input_array[i] == "%") {
      input_array[i] = `<span class="Op">%</span>`;
    }
  }
  return input_array.join("");
}
function CleanOutput(output) {
  let output_string = output.toString();
  let decimal = output_string.split(".")[1];
  output_string = output_string.split(".")[0];
  let output_array = output_string.split("");
  if (output_array.length > 3) {
    for (let i = output_array.length - 3; i > 0; i -= 3) {
      output_array.splice(i, 0, ",");
    }
  }
  if (decimal) {
    output_array.push(".");
    output_array.push(decimal);
  }
  return output_array.join("");
}
function ValidateInput(value) {
  let last_input = input.slice(-1);
  let operators = ["+", "-", "*", "/"];
  if (value == "." && last_input == ".") {
    return false;
  }
  if (value == "%" && last_input == "%") {
    return false;
  }
  if (operators.includes(value)) {
    if (operators.includes(last_input)) {
      return false;
    } else {
      return true;
    }
  }
  return true;
}
function PrepareInput(input) {
  let input_array = input.split("");
  let preparedInput = input.replace(/%/g, "/100");
  let tokens = preparedInput.match(/(\d+\.\d+|\d+|\S)/g) || [];
  for (let i = 0; i < input_array.length; i++) {
    if (input_array[i] == "%") {
      input_array[i] = "/100";
    }
  }
  for (let i = 0; i < tokens.length; i++) {
    if (
      !isNaN(tokens[i]) &&
      tokens[i][0] === "0" &&
      tokens[i].length > 1 &&
      tokens[i][1] !== "."
    ) {
      tokens[i] = tokens[i].replace(/^0+/, "");
    }
  }
  return input_array.join("");
}
// TempCalc
const Celsius = document.querySelector("#Celsius");
const Kelvin = document.querySelector("#Kelvin");
const Fahrenheit = document.querySelector("#Fahrenheit");
const Rankine = document.querySelector("#Rankine");
const Réaumur = document.querySelector("#Réaumur");
const Rømer = document.querySelector("#Rømer");
const Newton = document.querySelector("#Newton");
const Delisle = document.querySelector("#Delisle");
const TempInputs = document.querySelectorAll(".TempInput");

for (let i = 0; i < TempInputs.length; i++) {
  let TempInput = TempInputs[i];
  TempInput.addEventListener("input", function (e) {
    let value = parseFloat(e.target.value);
    switch (e.target.name) {
      case "Celsius":
        Kelvin.value = value + 273.15;
        Fahrenheit.value = value * 1.8 + 32;
        Rankine.value = (value + 273.15) * 1.8;
        Réaumur.value = value * 0.8;
        Rømer.value = (value * 21) / 40 + 7.5;
        Newton.value = (value * 33) / 100;
        Delisle.value = (100 - value) * (3 / 2);
        break;
      case "Kelvin":
        Celsius.value = value - 273.15;
        Fahrenheit.value = (value - 273.15) * 1.8 + 32;
        Rankine.value = value * 1.8;
        Réaumur.value = (value - 273.15) * 0.8;
        Rømer.value = ((value - 273.15) * 21) / 40 + 7.5;
        Newton.value = ((value - 273.15) * 33) / 100;
        Delisle.value = (373.15 - value) * (3 / 2);
        break;
      case "Fahrenheit":
        Celsius.value = (value - 32) / 1.8;
        Kelvin.value = (value - 32) / 1.8 + 273.15;
        Rankine.value = value + 273.15 * 1.8 - 32;
        Réaumur.value = (value - 32) / 2.25;
        Rømer.value = ((value - 32) * 7) / 24 + 7.5;
        Newton.value = ((value - 32) * 11) / 60;
        Delisle.value = (100 * 1.8 + 32 - value) * (5 / 6);
        break;
      case "Rankine":
        Celsius.value = value / 1.8 - 273.15;
        Kelvin.value = value / 1.8;
        Fahrenheit.value = value + 32 - 273.15 * 1.8;
        Réaumur.value = (value - 273.15 * 1.8) / 2.25;
        Rømer.value = ((value - 273.15 * 1.8) * 7) / 24 + 7.5;
        Newton.value = ((value - 273.15 * 1.8) * 11) / 60;
        Delisle.value = ((100 + 273.15) * 1.8 - value) * (5 / 6);
        break;
      case "Réaumur":
        Celsius.value = value / 0.8;
        Kelvin.value = value / 0.8 + 273.15;
        Fahrenheit.value = value * 2.25 + 32;
        Rankine.value = value * 2.25 + 273.15 * 1.8;
        Rømer.value = (value * 21) / 32 + 7.5;
        Newton.value = (value * 33) / 80;
        Delisle.value = (80 - value) * (15 / 8);
        break;
      case "Rømer":
        Celsius.value = ((value - 7.5) * 40) / 21;
        Kelvin.value = ((value - 7.5) * 40) / 21 + 273.15;
        Fahrenheit.value = ((value - 7.5) * 24) / 7 + 32;
        Rankine.value = ((value - 7.5) * 24) / 7 + 273.15 * 1.8;
        Réaumur.value = ((value - 7.5) * 32) / 21;
        Newton.value = ((value - 7.5) * 22) / 35;
        Delisle.value = ((60 - value) * 7) / 20;
        break;
      case "Newton":
        Celsius.value = (value * 100) / 33;
        Kelvin.value = (value * 100) / 33 + 273.15;
        Fahrenheit.value = (value * 60) / 11 + 32;
        Rankine.value = (value * 60) / 11 + 273.15 * 1.8;
        Réaumur.value = (value * 80) / 33;
        Rømer.value = (value * 35) / 22 + 7.5;
        Delisle.value = ((33 - value) * 50) / 11;
        break;
      case "Delisle":
        Celsius.value = 100 - value * (2 / 3);
        Kelvin.value = 373.15 - value * (2 / 3);
        Fahrenheit.value = 100 * 1.8 + 32 - (value * 6) / 5;
        Rankine.value = (100 + 273.15) * 1.8 - (value * 6) / 5;
        Réaumur.value = 80 - value * (8 / 15);
        Rømer.value = 60 - (value * 7) / 20;
        Newton.value = 33 - (value * 11) / 50;
        break;
    }
  });
}
// CirCalc
const Radius = document.querySelector("#Radius");
const Diameter = document.querySelector("#Diameter");
const Circumference = document.querySelector("#Circumference");
const Area = document.querySelector("#Area");
const Height = document.querySelector("#Height");
const SurfaceArea = document.querySelector("#SurfaceArea");
const Volume = document.querySelector("#Volume");
const RadiusSel = document.querySelector("#RadiusSelect");
const DiameterSel = document.querySelector("#DiameterSelect");
const CircumferenceSel = document.querySelector("#CircumferenceSelect");
const AreaSel = document.querySelector("#AreaSelect");
const HeightSel = document.querySelector("#HeightSelect");
const SurfaceAreaSel = document.querySelector("#SurfaceAreaSelect");
const VolumeSel = document.querySelector("#VolumeSelect");
const CirInputs = document.querySelectorAll(".CirInput");

for (let i = 0; i < CirInputs.length; i++) {
  let CirInput = CirInputs[i];
  CirInput.addEventListener("input", function (e) {
    let value = parseFloat(e.target.value);
    switch (e.target.name) {
      case "Radius":
        Diameter.value = value * 2 * (RadiusSel.value / DiameterSel.value);
        Circumference.value =
          value * 2 * Math.PI * (RadiusSel.value / CircumferenceSel.value);
        Area.value =
          Math.pow(value, 2) * Math.PI * (RadiusSel.value / AreaSel.value);
        SurfaceArea.value =
          (Math.pow(value, 2) * Math.PI * 2 +
            value * 2 * Math.PI * Height.value) *
          (RadiusSel.value / HeightSel.value);
        Volume.value =
          Math.pow(value, 2) *
          Math.PI *
          Height.value *
          (RadiusSel.value / VolumeSel.value);
        break;
      case "Diameter":
        Radius.value = (value / 2) * (DiameterSel.value / RadiusSel.value);
        Circumference.value =
          value * Math.PI * (DiameterSel.value / CircumferenceSel.value);
        Area.value =
          ((Math.pow(value, 2) * Math.PI) / 4) *
          (DiameterSel.value / AreaSel.value);
        SurfaceArea.value =
          ((Math.pow(value, 2) * Math.PI) / 2 +
            value * Math.PI * Height.value) *
          (DiameterSel.value / SurfaceAreaSel.value);
        Volume.value =
          ((Math.pow(value, 2) * Math.PI * Height.value) / 4) *
          (DiameterSel.value / VolumeSel.value);
        break;
      case "Circumference":
        Radius.value =
          (value / (2 * Math.PI)) * (CircumferenceSel.value / RadiusSel.value);
        Diameter.value =
          (value / Math.PI) * (CircumferenceSel.value / DiameterSel.value);
        Area.value =
          (value / 2) *
          (value / (2 * Math.PI)) *
          (CircumferenceSel.value / AreaSel.value);
        // SurfaceArea.value =
        //   (value * Height.value + (value / 2) * (value / (2 * Math.PI))) *
        //   (CircumferenceSel.value / SurfaceAreaSel.value);
        Volume.value =
          (value / 2) *
          (value / (2 * Math.PI)) *
          Height.value *
          (CircumferenceSel.value / VolumeSel.value);
        break;
      case "Area":
        Radius.value =
          Math.sqrt(value / Math.PI) * (AreaSel.value / RadiusSel.value);
        Diameter.value =
          Math.sqrt((4 * value) / Math.PI) *
          (AreaSel.value / DiameterSel.value);
        Circumference.value =
          ((value * 2) / Math.sqrt(value / Math.PI)) *
          (AreaSel.value / CircumferenceSel.value);
        SurfaceArea.value =
          (value * 2 +
            (value * 2 * Height.value) / Math.sqrt(value / Math.PI)) *
          (AreaSel.value / SurfaceAreaSel.value);
        Volume.value = value * Height.value * (AreaSel.value / VolumeSel.value);
        break;
      case "Height":
        SurfaceArea.value =
          ((Math.pow(Diameter.value, 2) * Math.PI) / 2 +
            Diameter.value * Math.PI * value) *
          (HeightSel.value / SurfaceAreaSel.value);
        Volume.value =
          Math.pow(Radius.value, 2) *
          Math.PI *
          value *
          (HeightSel.value / VolumeSel.value);
        break;
      case "SurfaceArea":
        // Circumference.value =
        //   (value / (Radius.value + Height.value)) *
        //   (SurfaceAreaSel.value / CircumferenceSel.value);
        Area.value =
          (value / 2 - Math.PI * Radius.value * Height.value) *
          (SurfaceAreaSel.value / AreaSel.value);
        Height.value =
          (value / (2 * Math.PI * Radius.value) - Radius.value) *
          (SurfaceAreaSel.value / HeightSel.value);
        break;
      case "Volume":
        Radius.value =
          Math.sqrt(value / (Math.PI * Height.value)) *
          (VolumeSel.value / RadiusSel.value);
        Diameter.value =
          Math.sqrt((4 * value) / (Math.PI * Height.value)) *
          (VolumeSel.value / DiameterSel.value);
        Circumference.value =
          ((2 * value) / (Radius.value * Height.value)) *
          (VolumeSel.value / CircumferenceSel.value);
        Area.value = (value / Height.value) * (VolumeSel.value / AreaSel.value);
        Height.value =
          (value / (Math.PI * Math.pow(Radius.value, 2))) *
          (VolumeSel.value / HeightSel.value);
        break;
    }
  });
}
