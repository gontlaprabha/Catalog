const fs = require('fs');

function decodeValue(base, value) {
    return parseInt(value, base);
}

function lagrangeInterpolation(points) {
    let constantTerm = 0;

    for (let i = 0; i < points.length; i++) {
        let xi = points[i].x;
        let yi = points[i].y;
        


        let li = 1;

        for (let j = 0; j < points.length; j++) {
            if (i !== j) {
                let xj = points[j].x;
                li *= (0 - xj) / (xi - xj);  // Lagrange basis
            }
        }

        constantTerm += yi * li;
    }

    return constantTerm;
}

function findConstantTerm(jsonFile) {
    const data = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));

    const n = data.keys.n; 
    const k = data.keys.k; 

    let points = [];

    for (let i = 1; i <= n; i++) {
        const key = i.toString();
        if (data.hasOwnProperty(key)) {
            let base = parseInt(data[key].base);
            let value = data[key].value;

            let x = i;  
            let y = decodeValue(base, value); 
            
            points.push({ x, y });
        }
    }

    points = points.slice(0, k);

    const constantTerm = lagrangeInterpolation(points);

    console.log("The constant term 'c' is:", constantTerm);
}

findConstantTerm('testcase.json');
