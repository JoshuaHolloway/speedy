// ----------------------------------------------
const make_matrix = (r, c) => {
    let mat = new Array(r);
    for (let row = 0; row < r; row++)
        mat[row] = new Array(c);

    // Hard-code col-names
    mat[0][0] = 'Apple';
    mat[0][1] = 'Orange';
    mat[0][2] = 'Banana';

    return mat;
};
let matrix = make_matrix(3, 2);
// ----------------------------------------------
// NOTE: This will be replaced by an API-call
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
// ==============================================
$(document).ready(() => {
    // ----------------------------------------------
    $('#calculate_button').click(() => {
        console.log('update button has been pressed');

        $.ajax({
            url: 'foods/',
            type: 'GET',
            dataType: 'json',
            success: data => {
                console.log('Data from server at /foods:');

                const row_num = 0;
                const food = data[row_num];
                console.log(food.quantity);

                const total_cals = foods.grapenuts.cals * food.quantity;
                const total_protein = foods.grapenuts.macro.protein * food.quantity;
                // const total_fat = foods.grapenuts.protien  * food_quantity;


                // Update daily totals
                document.querySelectorAll('.Row .total_cals')[0].innerHTML = total_cals;
                document.querySelectorAll('.Row .total_protein')[0].innerHTML = total_protein;
            }
        });
    });
    // ----------------------------------------------
    $('#update_button').click(() => {
        console.log('update button pressed');

        // Grab values from first row of matrix
        const r1_nodelist = document.getElementsByClassName('r1');
        const r1_arr = Array.from(r1_nodelist);

        // Update first row of matrix
        r1_arr.forEach((item, idx, arr) => matrix[1][idx] = item.value);
        console.log(matrix);

        // forEach calls a function once for each element in an array, in order.
        // arr.forEach((elem, idx, arr) => {...})
        //
        // map() method creates a new array with the results of calling a function for every array element.
        //
        // filter() method creates an array filled with all array elements that pass a test (provided as a function)
        //
        // for-in loops through properties of the JS-object
        // for(x in arr)
        //   console.log(arr[x]);
        //
        // for-of loops through values of the JS-object
        // for(v of arr)
        //   console.log(v);
        //
        // Array are objects with indices as properties
        // arr: {
        //     0: val
        //     1: val
        //     .
        //     .
        //     .
        //    arr.length: val
        // }
        $.ajax({
            url: 'update',
            type: 'POST',
            data: {
                matrix: matrix // TODO: Grab from entry in table
            }
        });
    });
    // ----------------------------------------------
    $('#insert_button').click(() => {
        console.log('insert button pressed');
        $.ajax({
            url: 'insert',
            type: 'POST',
            data: {
                name: 'Kiwi', // TODO: Grab from column-number
                quantity: 5 // TODO: Grab from entry in table
            },
            success: data => {
                $('#status').html(data.message);
                console.log('OH YEAH!!!');
            }
        })
    });
    // ----------------------------------------------
});