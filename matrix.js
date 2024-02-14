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
	// dataArray is a 2D array
	// complete this function based on the showResult function
    let container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear previous content
    let table = document.createElement('table');

    for (let i = 0; i < dataArray.length; i++) {
        let tr = document.createElement('tr');
    for (let j = 0; j < dataArray[0].length; j++) {
        let td = document.createElement('td');
        let span = document.createElement('span');
        span.innerHTML = dataArray[i][j];
        td.appendChild(span);
        tr.appendChild(td);
    }
    table.appendChild(tr);
    }

    let caption = table.createCaption();
    caption.textContent = title;
    container.appendChild(table);
}

function performOperation(operation) {
    let matrix1 = getMatrixData2D('matrix1');
    let matrix2 = getMatrixData2D('matrix2');
    console.log("1st Matrix",matrix1);
    console.log("2nd Matrix", matrix2);
    console.log("Operation", operation);
    // Just a test result
    let result = [1, 2, 3, 4, 5, 6, 7, 8];
    // Call your matrix calculation functions here
    if (operation === 'Add') { addMatrices(matrix1, matrix2); }
    else if (operation === 'Minus') { subtractMatrices(matrix1, matrix2); }
	// prints suitable messages for impossible situation
    showResult('The Result', 'matrix3', 2, 4, result); // use suitable function for printing results
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
    let matrix3 = [];

    // Check if the matrices can be multiplied (number of columns in matrix1 equals the number of rows in matrix2)
    if (matrix1[0].length == matrix2.length) {
        // Iterate over rows of matrix1
        for (let i = 0; i < matrix1.length; i++) {
            matrix3[i] = [];

            for (let j = 0; j < matrix2[0].length; j++) {
                let sum = 0;

                for (let k = 0; k < matrix1[0].length; k++) {
                    sum += matrix1[i][k] * matrix2[k][j];
                }
                matrix3[i][j] = sum;
            }
        }
    } else {
        console.log("Matrices cannot be multiplied due to incompatible dimensions.");
    }

    return matrix3;
};
