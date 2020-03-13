// ----------------------------------------------
const make_matrix = (r, c) => {
    let mat = new Array(r);
    for (let row = 0; row < r; row++)
        mat[row] = new Array(c);
    return mat;
};
let matrix = make_matrix(2, 2);
// ----------------------------------------------
const foods = {
    grapenuts: {
        cals: 200,
        macro: {
            fat: {
                total: 1,
                saturated: 0,
                trans: 0,
                poly: 0.5,
                mono: 0
            },
            carbs: {
                total: 47,
                fiber: {
                    soluble: 1,
                    insoluble: 6
                },
                sugar: {
                    total: 5,
                    added: 0
                }
            },
            protein: 6   
        },
        micro: {
            cholesterol: 0,
            sodium: .280,
            D: 0,
            calcium: 0.02,
            iron: 0.0162,
            potassium: 0.260
        }
    }
};
// ----------------------------------------------
const update_matrix = () => {
    const r1c1 = document.getElementById('r1c1');
    matrix[0][0] = r1c1.value;
};
// ----------------------------------------------
const submit = document.getElementById('submit');
submit.addEventListener('click', () => {

    update_matrix();
    console.log(matrix);

    const food_quantity = matrix[0][0];

    const total_cals = foods.grapenuts.cals * food_quantity;
     const total_protein = foods.grapenuts.macro.protein  * food_quantity;
    // const total_fat = foods.grapenuts.protien  * food_quantity;


    // Update daily totals
    document.querySelectorAll('.Row .total_cals')[0].innerHTML = total_cals;
    document.querySelectorAll('.Row .total_protein')[0].innerHTML = total_protein;
});
// ----------------------------------------------