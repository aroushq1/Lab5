function generateMatrices() {
    createMatrix('The 1st Matrix', 'matrix1', document.getElementById('matrix1Rows').value, document.getElementById('matrix1Cols').value);
    createMatrix('The 2nd Matrix','matrix2', document.getElementById('matrix2Rows').value, document.getElementById('matrix2Cols').value);
}

const createMatrix = (title, containerId, rows, cols) => {
    let container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear previous content
    let table = document.createElement('table');
    for (let i = 0; i < rows; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < cols; j++) {
            let td = document.createElement('td');
            let input = document.createElement('input');
            input.type = 'number';
            input.value = Math.floor(Math.random() * 100); // Random value between 0 and 99
            td.appendChild(input);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    let caption = table.createCaption();
    caption.textContent = title;
    container.appendChild(table);
};

const showResult = (title, containerId, rows, cols, dataArray) => {
    let container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear previous content
    let table = document.createElement('table');

    for (let i = 0; i < rows; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < cols; j++) {
            let td = document.createElement('td');
            let span = document.createElement('span');
            // Calculate the index in the dataArray based on current row and column
            let index = i * cols + j;
            if (index < dataArray.length) {
                span.innerHTML = dataArray[index];
            }
            td.appendChild(span);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }

    let caption = table.createCaption();
    caption.textContent = title;
    container.appendChild(table);
};

const showResult2D = (title, containerId, dataArray) => {
    let container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear previous content
    let table = document.createElement('table');

    for (let i = 0; i < dataArray.length; i++){
        let tr = document.createElement('tr');

        for (let j = 0; j < dataArray[i].length; j++) {
            let td = document.createElement('td');
            td.textContent = dataArray[i][j]; // Use textContent to set the cell content
            tr.appendChild(td);
        }

        table.appendChild(tr);
    }

    let caption = table.createCaption();
    caption.textContent = title;
    container.appendChild(table);
};


function performOperation(operation) {
    let matrix1 = getMatrixData2D('matrix1');
    let matrix2 = getMatrixData2D('matrix2');
    console.log("1st Matrix",matrix1);
    console.log("2nd Matrix", matrix2);
    console.log("Operation", operation);
    // Just a test result
    // Call your matrix calculation functions here
    // prints suitable messages for impossible situation
    let result;

    if (operation === 'add') {
        result = addMatrices(matrix1, matrix2);
    } else if (operation === 'subtract') {
        result = subtractMatrices(matrix1, matrix2);
    } else if (operation === 'multiply') {
        result = multiplyMatrices(matrix1, matrix2);
    } else{
        console.error("Invalid operation.");
        return;
    }

    if (result){
       showResult2D('The Result', 'matrix3', result);
    }

}

const getMatrixData1D = function (matrixId) {
    let matrixData = [];
    let inputs = document.querySelectorAll(`#${matrixId} input`);
    inputs.forEach(input => {
        matrixData.push(parseInt(input.value, 10));
    });
    return matrixData;
};

const getMatrixData2D = function (matrixId) {
    let matrixData = [];
    let rows = parseInt(document.getElementById(matrixId + 'Rows').value, 10);
    let cols = parseInt(document.getElementById(matrixId + 'Cols').value, 10);
    let inputs = document.querySelectorAll(`#${matrixId} input`);

    for (let i = 0; i < rows; i++) {
        let rowData = [];
        for (let j = 0; j < cols; j++) {
            // Calculate index in the flat list of inputs
            let index = i * cols + j;
            if (index < inputs.length) {
                rowData.push(parseInt(inputs[index].value, 10));
            } else {
                rowData.push(0); // Default value if input is missing
            }
        }
        matrixData.push(rowData);
    }
    return matrixData;
};


// Add your matrix calculation functions here
// The functions must check the posibility of calculation too.
function addMatrices(matrix1, matrix2){ 
	// provide the code
    if (matrix1.length !== matrix2.length || matrix1[0].length !== matrix2[0].length) {
        console.error("Matrix Addition is not possible.");
        return null;
    }
    //create empty matrix 3 to store results into
    let matrix3 = []

    if (matrix1.length === matrix2.length && matrix1[0].length == matrix2[0].length){
        for (let i = 0; i < matrix1.length; i++) {
            //empty row for matrix
            matrix3[i] = [];
    
            for (let j = 0; j < matrix1[0].length; j++){
                matrix3[i][j] = matrix1[i][j] + matrix2[i][j];
            }
        }
    }

    return matrix3;
}
const subtractMatrices = function (matrix1, matrix2) { 
	// provide the code
    if (matrix1.length !== matrix2.length || matrix1[0].length !== matrix2[0].length) {
        console.error("Matrix subtraction is not possible.");
        return null;
    }

    let matrix3 = []

    if (matrix1.length == matrix2.length && matrix1[0].length == matrix2[0].length){
        for (let i = 0; i < matrix1.length; i++) {
            //empty row for matrix
            matrix3[i] = [];

            for (let j = 0; j < matrix1[0].length; j++){
                matrix3[i][j] = matrix1[i][j] - matrix2[i][j];
            }
        }
    }
    return matrix3;
};
const multiplyMatrices = (matrix1, matrix2) => { 
    let result = [];

    for (let i = 0; i < matrix1.length; i++){
        result[i] = [];
        for(let j = 0; j < matrix2[0].length; j++){
            let sum = 0;
            for (let k = 0; k < matrix1[0].length; k++){
                sum += matrix1[i][k] * matrix2[k][j];
            }
            result[i][j] = sum;
        }
    }
    return result;
};
