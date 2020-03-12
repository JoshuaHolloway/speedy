const make_matrix = (r, c) => {
    let mat = new Array(r);
    for (let row = 0; row < r; row++)
        mat[row] = new Array(c);
    return mat;
};

let matrix = make_matrix(2, 2);

const r1c1 = document.getElementById('r1c1');

r1c1.addEventListener('change', () => {

    console.log(r1c1.value);
    matrix[0][0] = r1c1.value;

    console.log(matrix);
});


const submit = document.getElementById('submit');
submit.addEventListener('click', () => {

    console.log(matrix);
});