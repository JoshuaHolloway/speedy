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

    const grapenuts_calories = 210;
    const grapenuts_protien = 6;

    const total_cals = grapenuts_calories * matrix[0][0];
    console.log(total_cals);

    // Update total-calories
    document.querySelectorAll('.Row .total_cals')[0].innerHTML = total_cals;
});