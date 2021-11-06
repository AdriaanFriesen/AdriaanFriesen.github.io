function id(x) {
    return document.getElementById(x);
}

id("quad-a").addEventListener("keyup", doQuadFormula);
id("quad-b").addEventListener("keyup", doQuadFormula);
id("quad-c").addEventListener("keyup", doQuadFormula);
id("quad-approx").addEventListener("change", doQuadFormula);
id("quad-approx-digits").addEventListener("keyup", doQuadFormula);

function doQuadFormula() {
    var a = id("quad-a").value;
    var b = id("quad-b").value;
    var c = id("quad-c").value;
    var approxDigits = id("quad-approx-digits").value;

    if (!Number(approxDigits)) {
        approxDigits = 2;
    }

    else {
        approxDigits = Number(approxDigits)
    }
    if (a.length) {
        var a = Number(a);
        var b = Number(b);
        var c = Number(c);
        var discrim = b ** 2 - 4 * a * c;
        if (id("quad-approx").checked) { // User has requested approximate values
            if (discrim >= 0) { // Real solutions
                var sol1 = (-1 * b + ((b ** 2 - 4 * a * c) ** 0.5)) / (2 * a);
                var sol2 = (-1 * b - ((b ** 2 - 4 * a * c) ** 0.5)) / (2 * a);
                id("sol-1").innerHTML = Number(sol1.toFixed(approxDigits));
                id("sol-2").innerHTML = Number(sol2.toFixed(approxDigits));
            }
            else if (discrim < 0) { // Complex solutions
                var solReal = (-1 * b) / (2 * a);
                var solImag = ((-1 * (b ** 2 - 4 * a * c)) ** 0.5) / (2 * a);
                id("sol-1").innerHTML = Number(solReal.toFixed(approxDigits)) + " + " + Number(solImag.toFixed(approxDigits)) + "<i>i</i>";
                id("sol-2").innerHTML = Number(solReal.toFixed(approxDigits)) + " - " + Number(solImag.toFixed(approxDigits)) + "<i>i</i>";
            }
            id("vertex-x").innerHTML = Number(((-1 * b) / (2 * a)).toFixed(approxDigits));
            id("vertex-y").innerHTML = Number((a * ((-1 * b) / (2 * a)) ** 2 + b * ((-1 * b) / (2 * a)) + c).toFixed(approxDigits));
        }
        else { // Give exact square roots
            if (discrim >= 0 && discrim ** 0.5 % 1 == 0) { // Real perfect square solutions
                if (decimalReprisentable((2 * a))) {
                    var sol1 = (-1 * b + ((b ** 2 - 4 * a * c) ** 0.5)) / (2 * a);
                    var sol2 = (-1 * b - ((b ** 2 - 4 * a * c) ** 0.5)) / (2 * a);
                }
                else if (parseInt((a)) != a || parseInt(b) != b || parseInt(c) != c) {
                    var sol1 = (-1 * b + ((b ** 2 - 4 * a * c) ** 0.5)) / (2 * a);
                    var sol2 = (-1 * b - ((b ** 2 - 4 * a * c) ** 0.5)) / (2 * a);
                }
                else {
                    var wholeDiscrim = (discrim ** 0.5);
                    if (((-1 * b) + wholeDiscrim) == 0) {
                        sol1 = 0;
                    }
                    else {
                        var fracP1 = (((-1 * b) + wholeDiscrim) / GCF((Math.abs(((-1 * b) + wholeDiscrim))), Math.abs((2 * a))));
                        var fracP2 = ((2 * a) / GCF(Math.abs(((-1 * b) + wholeDiscrim)), Math.abs((2 * a))));
                        if (fracP1 == fracP2) {
                            var sol1 = 1;
                        }
                        else if (fracP1 == -1 && fracP2 == 1) {
                            var sol1 = -1;
                        }
                        else {
                            var sol1 = fracP1 + " / " + fracP2;
                        }
                    }
                    if (((-1 * b) - wholeDiscrim) == 0) {
                        sol2 = 0;
                    }
                    else {
                        var fracP1 = (((-1 * b) - wholeDiscrim) / GCF((Math.abs(((-1 * b) - wholeDiscrim))), Math.abs((2 * a))));
                        var fracP2 = ((2 * a) / GCF(Math.abs(((-1 * b) - wholeDiscrim)), Math.abs((2 * a))));
                        if (fracP1 == fracP2) {
                            var sol2 = 1;
                        }
                        else if (fracP1 == -1 && fracP2 == 1) {
                            var sol2 = -1;
                        }
                        else {
                            var sol2 = fracP1 + " / " + fracP2;
                        }
                    }
                }
                id("sol-1").innerHTML = sol1;
                id("sol-2").innerHTML = sol2;
            }
            else if (discrim < 0 && (-1 * discrim) ** 0.5 % 1 == 0) { // Complex perfect square solutions
                var solImag = ((-1 * discrim) ** 0.5) / (2 * a);
                if (decimalReprisentable((2 * a))) {
                    var solReal = (-1 * b)  / (2 * a);
                }
                else if (parseInt((a)) != a || parseInt(b) != b || parseInt(c) != c) {
                    var solReal = (-1 * b)  / (2 * a);
                }
                else {
                    var fracP1 = ((-1 * b) / GCF(Math.abs((-1 * b)), Math.abs((2 * a))));
                    var fracP2 = ((2 * a) / GCF(Math.abs((-1 * b)), Math.abs((2 * a))));
                    if (fracP1 == fracP2) {
                        var solReal = 1;
                    }
                    else if (fracP1 == -1 && fracP2 == 1) {
                        var solReal = -1;
                    }
                    else {
                        var solReal = fracP1 + " / " + fracP2;
                    }
                }
                id("sol-1").innerHTML = solReal + " + " + solImag + "<i>i</i>";
                id("sol-2").innerHTML = solReal + " - " + solImag + "<i>i</i>";
            }
            else if (discrim >= 0) { // Real solutions
                if (decimalReprisentable((2 * a))) {
                    var sol = (-1 * b) / (2 * a);
                }
                else if (parseInt((a)) != a || parseInt(b) != b || parseInt(c) != c) {
                    var sol = (-1 * b) / (2 * a);
                }
                else {
                    var fracP1 = ((-1 * b) / GCF(Math.abs((-1 * b)), Math.abs((2 * a))));
                    var fracP2 = ((2 * a) / GCF(Math.abs((-1 * b)), Math.abs((2 * a))));
                    if (fracP1 == fracP2) {
                        var sol = 1;
                    }
                    else if (fracP1 == -1 && fracP2 == 1) {
                        var sol = -1;
                    }
                    else {
                        var sol = fracP1 + " / " + fracP2;
                    }
                }
                var bottom = 2 * a;
                if (SQGPSF(discrim) > 1) {
                    console.log(SQGPSF(discrim))
                    var discrimCoef = SQGPSF(discrim);
                    discrim /= discrimCoef ** 2;
                    if (discrimCoef < bottom) {
                        bottom /= discrimCoef;
                        if (id("quad-approx").checked) {
                            id("sol-1").innerHTML = Number(sol.toFixed(approxDigits)) + " + " + "√<span class=\"overline\">" + discrim + "</span> / " + bottom;
                            id("sol-2").innerHTML = Number(sol.toFixed(approxDigits)) + " - " + "√<span class=\"overline\">" + discrim + "</span> / " + bottom;
                        }
                        else {
                            id("sol-1").innerHTML = sol + " + " + "√<span class=\"overline\">" + discrim + "</span> / " + bottom;
                            id("sol-2").innerHTML = sol + " - " + "√<span class=\"overline\">" + discrim + "</span> / " + bottom;
                        }
                    }
                    else if (discrimCoef > bottom) {
                        discrimCoef /= bottom;
                        if (id("quad-approx").checked) {
                            id("sol-1").innerHTML = Number(sol.toFixed(approxDigits)) + " + " + "√<span class=\"overline\">" + discrim + "</span>";
                            id("sol-2").innerHTML = Number(sol.toFixed(approxDigits)) + " - " + "√<span class=\"overline\">" + discrim + "</span>";
                        }
                        else {
                            id("sol-1").innerHTML = sol + " + " + "√<span class=\"overline\">" + discrim + "</span>";
                            id("sol-2").innerHTML = sol + " - " + "√<span class=\"overline\">" + discrim + "</span>";
                        }
                    }
                    else if (discrimCoef == bottom) {
                        if (id("quad-approx").checked) {
                            id("sol-1").innerHTML = Number(sol.toFixed(approxDigits)) + " + √<span class=\"overline\">" + discrim + "</span>";
                            id("sol-2").innerHTML = Number(sol.toFixed(approxDigits)) + " - √<span class=\"overline\">" + discrim + "</span>";
                        }
                        else {
                            id("sol-1").innerHTML = sol + " + √<span class=\"overline\">" + discrim + "</span>";
                            id("sol-2").innerHTML = sol + " - √<span class=\"overline\">" + discrim + "</span>";
                        }
                    }
                }
                else {
                    if (id("quad-approx").checked) {
                        id("sol-1").innerHTML = Number(sol.toFixed(approxDigits)) + " + √<span class=\"overline\">" + discrim + "</span> / " + bottom;
                        id("sol-2").innerHTML = Number(sol.toFixed(approxDigits)) + " - √<span class=\"overline\">" + discrim + "</span> / " + bottom;

                    }
                    else {
                        id("sol-1").innerHTML = sol + " + √<span class=\"overline\">" + discrim + "</span> / " + bottom;
                        id("sol-2").innerHTML = sol + " - √<span class=\"overline\">" + discrim + "</span> / " + bottom;
                    }
                }
            }
            else if (discrim < 0) { // Complex solutions
                if (decimalReprisentable((2 * a))) {
                    var sol = (-1 * b) / (2 * a);
                }
                else if (parseInt((a)) != a || parseInt(b) != b || parseInt(c) != c) {
                    var sol = (-1 * b) / (2 * a);
                }
                else {
                    var fracP1 = ((-1 * b) / GCF(Math.abs((-1 * b)), Math.abs((2 * a))));
                    var fracP2 = ((2 * a) / GCF(Math.abs((-1 * b)), Math.abs((2 * a))));
                    if (fracP1 == fracP2) {
                        var sol = 1;
                    }
                    else if (fracP1 == -1 && fracP2 == 1) {
                        var sol = -1;
                    }
                    else {
                        var sol = fracP1 + " / " + fracP2;
                    }
                }
                var bottom = 2 * a;
                if (SQGPSF(discrim) !== 1) {
                    var discrimCoef = SQGPSF(-1 * discrim);
                    discrim /= discrimCoef ** 2;
                    if (discrimCoef < bottom) {
                        bottom /= discrimCoef;
                        id("sol-1").innerHTML = sol + " + " + "<i>i</i>√<span class=\"overline\">" + -1 * discrim + "</span> / " + bottom;
                        id("sol-2").innerHTML = sol + " - " + "<i>i</i>√<span class=\"overline\">" + -1 * discrim + "</span> / " + bottom;
                    }
                    else if (discrimCoef > bottom) {
                        discrimCoef /= bottom;
                        id("sol-1").innerHTML = sol + " + " + "<i>i</i>√<span class=\"overline\">" + -1 * discrim + "</span>";
                        id("sol-2").innerHTML = sol + " - " + "<i>i</i>√<span class=\"overline\">" + -1 * discrim + "</span>";
                    }
                    else if (discrimCoef == bottom) {
                        id("sol-1").innerHTML = sol + " + <i>i</i>√<span class=\"overline\">" + -1 * discrim + "</span>";
                        id("sol-2").innerHTML = sol + " - <i>i</i>√<span class=\"overline\">" + -1 * discrim + "</span>";
                    }
                }
                else {
                    id("sol-1").innerHTML = sol + " + <i>i</i>√<span class=\"overline\">" + -1 * discrim + "</span> / " + bottom;
                    id("sol-2").innerHTML = sol + " - <i>i</i>√<span class=\"overline\">" + -1 * discrim + "</span> / " + bottom;
                }
            }
            if (decimalReprisentable((2 * a))) {
                vertexX = ((-1 * b) / (2 * a));
                vertexY = (a * ((-1 * b) / (2 * a)) ** 2 + b * ((-1 * b) / (2 * a)) + c);
            }
            else {
                var fracP1 = ((-1 * b) / GCF(Math.abs((-1 * b)), Math.abs((2 * a))));
                var fracP2 = ((2 * a) / GCF(Math.abs((-1 * b)), Math.abs((2 * a))));
                if (fracP1 == fracP2) {
                    var vertexX = 1;
                }
                else if (fracP1 == -1 && fracP2 == 1) {
                    var vertexX = -1;
                }
                else {
                    var vertexX = fracP1 + " / " + fracP2;
                }

                fracP1 = (a * ((-1 * b) / (2 * a)) ** 2 + b * ((-1 * b))) / (GCF(Math.abs((a * ((-1 * b) / (2 * a)) ** 2 + b * (-1 * b))), Math.abs(((2 * a) + c))));
                fracP2 = ((2 * a) + c) / (GCF(Math.abs((a * ((-1 * b) / (2 * a)) ** 2 + b * (-1 * b))), Math.abs(((2 * a) + c))));
                if (fracP1 == fracP2) {
                    var vertexY = 1;
                }
                else if (fracP1 == -1 && fracP2 == 1) {
                    var vertexY = -1;
                }
                else {
                    var vertexY = fracP1 + " / " + fracP2;
                }
            }
            id("vertex-x").innerHTML = vertexX;
            id("vertex-y").innerHTML = vertexY;
        }
    }
}

id("foiler-a").addEventListener("keyup", doFOIL);
id("foiler-b").addEventListener("keyup", doFOIL);
id("foiler-c").addEventListener("keyup", doFOIL);
id("foiler-d").addEventListener("keyup", doFOIL);

function doFOIL() {
    id("foiled-poly").innerHTML = (Number(id("foiler-a").value) * Number(id("foiler-c").value)) + "x<sup>2</sup> + " + ((Number(id("foiler-b").value) + Number(id("foiler-d").value))) + "x + " + (Number(id("foiler-b").value) * Number(id("foiler-d").value));
}

id("points-x1").addEventListener("keyup", doPointOps);
id("points-y1").addEventListener("keyup", doPointOps);
id("points-x2").addEventListener("keyup", doPointOps);
id("points-y2").addEventListener("keyup", doPointOps);
id("point-approx").addEventListener("change", doPointOps);
id("point-approx-digits").addEventListener("keyup", doPointOps);

function doPointOps() {
    var x1 = id("points-x1").value;
    var y1 = id("points-y1").value;
    var x2 = id("points-x2").value;
    var y2 = id("points-y2").value;
    var approxDigits = id("point-approx-digits").value;

    if (!Number(approxDigits)) {
        approxDigits = 2;
    }
    else {
        approxDigits = Number(approxDigits)
    }

    if (x1.length > 0 && y1.length > 0 && x2.length > 0 && y2.length > 0) {
        var x1 = Number(x1);
        var y1 = Number(y1);
        var x2 = Number(x2);
        var y2 = Number(y2);
        var unRootedLength = (x1 - x2) ** 2 + (y1 - y2) ** 2;
        var length = unRootedLength ** 0.5;
        if (length % 1 == 0) { // Length is a whole number
                id("length").innerHTML = length;
        }

        else { // Length is an uneven square root
            if (id("point-approx").checked) { // User has requested approximate values
                id("length").innerHTML = Number(length.toFixed(approxDigits));

            }
            else { // Give exact square roots
                if (SQGPSF(unRootedLength) !== 1) {
                    lengthCoef = SQGPSF(unRootedLength);
                    unRootedLength /= lengthCoef ** 2;
                    id("length").innerHTML = lengthCoef + "√<span class=\"overline\">" + unRootedLength + "</span>";
                }
                else {
                    id("length").innerHTML = "√<span class=\"overline\">" + unRootedLength + "</span>";
                }
            }
        }
        var midpointX = (x1 + x2) / 2;
        var midpointY = (y1 + y2) / 2;
        id("midpoint-x").innerHTML = midpointX;
        id("midpoint-y").innerHTML = midpointY;
    }
}

id("trig-a").addEventListener("keyup", doTrig);
id("trig-b").addEventListener("keyup", doTrig);
id("trig-c").addEventListener("keyup", doTrig);
id("trig-A").addEventListener("keyup", doTrig);
id("trig-B").addEventListener("keyup", doTrig);
id("trig-C").addEventListener("keyup", doTrig);
id("trig-approx").addEventListener("change", doTrig);
id("trig-approx-digits").addEventListener("keyup", doTrig);

function doTrig() {
    var a = id("trig-a").value;
    var b = id("trig-b").value;
    var c = id("trig-c").value;
    var A = id("trig-A").value;
    var B = id("trig-B").value;
    var C = id("trig-C").value;
    var approxDigits = id("trig-approx-digits").value;

    if (!Number(approxDigits) && approxDigits !== "0") {
        approxDigits = 2;
    }
    else {
        approxDigits = Number(approxDigits)
    }

    var sides = 0;
    var angles = 0;
    
    if (a) sides += 1;
    if (b) sides += 1;
    if (c) sides += 1;
    if (A) angles += 1;
    if (B) angles += 1;
    if (C) angles += 1;

    a = Number(a);
    b = Number(b);
    c = Number(c);
    A = Number(A);
    B = Number(B);
    C = Number(C);

    if (angles + sides == 3) {
        id("trig-sol").style.display = "flex";
        id("trig-no-sol").style.display = "none";

        if (sides == 3 && angles == 3) {}

        else if (sides >= 1 && angles >= 2) {
            if (angles != 3) {
                if (A && B) {
                    C = 180 - (A + B);
                }
                else if (B && C) {
                    A = 180 - (B + C);
                }
                else if (C && A) {
                    B = 180 - (C + A);
                }
            }
            if (a) {
                c = (a / Math.sin(radians(A))) * Math.sin(radians(C));
                b = (c / Math.sin(radians(C))) * Math.sin(radians(B));
            }
            else if (b) {
                a = (b / Math.sin(radians(B))) * Math.sin(radians(A));
                c = (a / Math.sin(radians(A))) * Math.sin(radians(C));
            }
            else if (c) {
                b = (c / Math.sin(radians(c))) * Math.sin(radians(B));
                a = (b / Math.sin(radians(B))) * Math.sin(radians(A));
            }
        }
        else if (sides == 3) {
            A = degrees(Math.acos((a ** 2 - b ** 2 - c ** 2) / (-2 * c * b)));
            B = degrees(Math.acos((b ** 2 - a ** 2 - c ** 2) / (-2 * a * c)));
            C = degrees(Math.acos((a ** 2 - a ** 2 - b ** 2) / (-2 * a * b)));
        }
        else if (a && b && C || b && c && A || c && a && B) {
            if (!a) {
                a = (b ** 2 + c ** 2 - 2 * b * c * Math.cos(radians(A)));
                B = degrees(Math.acos((b ** 2 - a ** 2 - c ** 2) / (-2 * a * c)));
                C = degrees(Math.acos((a ** 2 - a ** 2 - b ** 2) / (-2 * a * b)));
            }
            if (!b) {
                b = (a ** 2 + c ** 2 - 2 * a * c * Math.cos(radians(B)));
                A = degrees(Math.acos((a ** 2 - b ** 2 - c ** 2) / (-2 * c * b)));
                C = degrees(Math.acos((a ** 2 - a ** 2 - b ** 2) / (-2 * a * b)));
            }
            if (!c) {
                c = (a ** 2 + b ** 2 - 2 * a * b * Math.cos(radians(C))) ** 0.5;
                A = degrees(Math.acos((a ** 2 - b ** 2 - c ** 2) / (-2 * c * b)));
                B = degrees(Math.acos((b ** 2 - a ** 2 - c ** 2) / (-2 * a * c)));
            }
        }
        else {
            id("trig-no-sol").innerHTML = "Unsolvable (ASS) triangle";
            id("trig-no-sol").style.display = "unset";
            id("trig-sol").style.display = "none";
        }
        id("trig-output-b").innerHTML = Number(b.toFixed(approxDigits));
        id("trig-output-c").innerHTML = Number(c.toFixed(approxDigits));
        id("trig-output-a").innerHTML = Number(a.toFixed(approxDigits));
        id("trig-output-A").innerHTML = Number(A.toFixed(approxDigits)) + "°";
        id("trig-output-B").innerHTML = Number(B.toFixed(approxDigits)) + "°";
        id("trig-output-C").innerHTML = Number(C.toFixed(approxDigits)) + "°";
    }
    else {
        if (angles + sides > 3) {
            id("trig-no-sol").innerHTML="Too many inputs";
        }
        else {
            id("trig-no-sol").innerHTML="Not enough inputs";
        }
        id("trig-no-sol").style.display = "unset";
        id("trig-sol").style.display = "none";
    }
}

id("circle-radius").addEventListener("keyup", doCircle);
id("circle-diameter").addEventListener("keyup", doCircle);
id("circle-circumference").addEventListener("keyup", doCircle);
id("circle-area").addEventListener("keyup", doCircle);
id("circle-approx").addEventListener("change", doCircle);
id("circle-approx-digits").addEventListener("keyup", doCircle);

function doCircle() {
    var radius = id("circle-radius").value;
    var diameter = id("circle-diameter").value;
    var circumference = id("circle-circumference").value;
    var area = id("circle-area").value;
    var approxDigits = id("circle-approx-digits").value;

    if (!Number(approxDigits)) {
        approxDigits = 2;
    }
    else {
        approxDigits = Number(approxDigits)
    }

    var inputs = 0;
    if (radius) inputs += 1;
    if (diameter) inputs += 1;
    if (circumference) inputs += 1;
    if (area) inputs += 1;

    radius = Number(radius);
    diameter = Number(diameter);
    circumference = Number(circumference);
    area = Number(area);

    if (inputs == 1) {
        if (id("circle-approx").checked) {
            if (radius) {
                diameter = 2 * radius
                circumference = Math.PI * diameter;
                area = Math.PI * radius ** 2;
            }
            else if (diameter) {
                radius = diameter / 2;
                circumference = Math.PI * diameter;
                area = Math.PI * radius ** 2;
            }
            else if (circumference) {
                diameter = circumference / Math.PI;
                radius = diameter / 2;
                area = Math.PI * radius ** 2;
            }
            else if (area) {
                radius = (area / Math.PI) ** 0.5;
                diameter = 2 * radius;
                circumference = Math.PI * diameter;
            }
            radius = Number(radius.toFixed(approxDigits));
            diameter = Number(diameter.toFixed(approxDigits));
            circumference = Number(circumference.toFixed(approxDigits));
            area = Number(area.toFixed(approxDigits));
        }
        else {
            if (radius) {
                diameter = 2 * radius;
                circumference = diameter + "π"
                area = radius ** 2 + "π"
            }
            else if (diameter) {
                circumference = diameter + "π"
                area = radius ** 2 + "π"
            }
            else if (circumference) {
                radius = circumference + " / 2π";
                diameter = circumference + " / π";
                area = circumference ** 2 + " / 4π";
            }
            else if (area) {
                radius = "√<span class=\"overline\">" + area + " / π</span>"
                diameter = "√<span class=\"overline\">" + 4 * area + " / π</span>"
                circumference = "2√<span class=\"overline\">" + area + "π</span>"
                area = area;
            }
        }
        id("circle-sol").style.display = "flex";
        id("circle-no-sol").style.display = "none";
        
        id("circle-output-radius").innerHTML = radius;
        id("circle-output-diameter").innerHTML = diameter;
        id("circle-output-circumference").innerHTML = circumference;
        id("circle-output-area").innerHTML = area;
    }
    else {
        if (inputs > 1) {
            id("circle-no-sol").innerHTML = "Too many inputs"
        }
        else {
            id("circle-no-sol").innerHTML = "Not enough inputs"
        }
        id("circle-no-sol").style.display = "unset";
        id("circle-sol").style.display = "none";
    }
}

function SQGPSF(n) {
    // Return the square root of the greatest perfect sqaure factor of n
    for (let i = n - 1; i > 0; i--) {
        if (n % i == 0 && i ** 0.5 % 1 == 0) {
            return i ** 0.5;
        }
    }
}

function factor(n) {
    let factorList = [];
    for (let i = n; i > 0; i--) {
        if (n % i == 0) {
            factorList.push(i);
        }
    }
    return factorList;
}

function decimalReprisentable(x) {
    if (parseInt(x) != x) {
        return false;
    }
    let factorList = factor(x);
    factorList.splice(0, 1);
    let representable = true;
    if (factorList.length == 1 && ![2, 4, 5].includes(x)) {
        representable = false
    }
    else {
        for (f of factorList) {
            if (![2, 4, 5].includes(f)) {
                if (!decimalReprisentable(f)) {
                    representable = false
                }
            }
        }
    }
    return representable;
}

function GCF(x, y) {
    let xFactors = factor(x);
    let yFactors = factor(y);
    for (xFactor of xFactors) {
        if (yFactors.includes(xFactor)) {
            return xFactor;
        }
    }
}

function radians(degrees) {
    return degrees * (Math.PI / 180);
}

function degrees(radians) {
    return radians * (180 / Math.PI);
}

doQuadFormula();
doFOIL();
doPointOps();
doTrig();
doCircle();