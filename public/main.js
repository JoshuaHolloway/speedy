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
// Quantities for day
const quants = {
    // 'apple': 0,
    // 'orange': 0,
    // 'banana': 0,

    update(name, quant) {
        this[name] = quant;
    }
};
// Update todays quantities from database upon page load
document.addEventListener('DOMContentLoaded', function(){

    // Get quantities from food.db
    $.ajax({
        url: 'foods',
        type: 'GET',
        // data: {
        //     name: 'Kiwi', // TODO: Grab from column-number
        //     quantity: 5 // TODO: Grab from entry in table
        // },
        success: data => {
            // $('#status').html(data.message);
            console.log('OH YEAH!!!');

            console.log(data);

            // update local js-object
            data.forEach((elem, idx, arr) => {
                const food_name = elem.name;
                const food_quant = elem.quantity;
                quants.update(food_name, food_quant);
            });

            console.log('foods:');
            console.log(quants);
        }
    })

});
// ----------------------------------------------
const day_totals = {
    'cals': 0,
    'protien': 0,
    'sugar': 0,
    'fat': 0,

    update_totals() {
        document.querySelectorAll('#total_cals')[0].innerHTML = this.cals;
    }
};
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
// TODO: Upon navigation away from daily/quantity-table page, update database
// ==============================================
// Upon change of any value in quantities fields, update totals for day.
const joshs_nodelist = document.getElementsByClassName('JOSH');
joshs = Array.from(joshs_nodelist);
joshs.forEach((elem, idx, arr) => {
    elem.addEventListener('change', (event) => {
        
        console.log('Value Changed');

        // Step 0: Grab value in field
        const radix = 10;
        const quantity = parseInt(elem.value, radix);
        console.log(`quantity: ${quantity}`);

        // Step 1: Grab name of food from html
        const food_name = elem.parentElement.parentElement.dataset.josh;

        // Step 2: Index into JS-Object with name and update quantity
        quants[food_name] = quantity;
        console.log(quants[food_name]);

        // Step 3: Update daily totals
        const food__name = 'grapenuts';
        day_totals.cals = quantity * foods[food__name].cals;
        // TODO: Change to food_name!

        // Step 4: Update display
        day_totals.update_totals();

        // TODO: CHANGE TO ONLY UPDATE DB ON PAGE CHANGE
        // Step 5: Update Database
        $.ajax({url: 'update2', type: 'POST', data: { day_totals: day_totals } });
    });
});

// ==============================================
// ==============================================
// ==============================================
$(document).ready(() => {
    // ----------------------------------------------
    $('#calculate_button').click(() => {
        console.log('calculate button has been pressed');

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
                document.querySelectorAll('#total_cals')[0].innerHTML = total_cals;
                // document.querySelectorAll('.Row .total_protein')[0].innerHTML = total_protein;
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