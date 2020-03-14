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

                // Update matrix
                (() => {
                    const r1c1 = document.getElementById('r1c1');
                    matrix[0][0] = r1c1.value;
                })();
                // TODO: Update the database here!
                // TODO: Update the database here!
                // TODO: Update the database here!


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
        $.ajax({
            url: 'insert',
            type: 'POST',
            data: {
                name: 'Apple', // TODO: Grab from column-number
                quantity: 5 // TODO: Grab from entry in table
            },
            success: data => {
                $('#status').html(data.message);
                console.log('OH YEAH!!!');
            }
        })
    });
    // ----------------------------------------------
    $('#allUsersButton').click(() => {
        console.log('JOSH: allUsersButton was clicked!');
        // -When we click button we want to call localhost:3000/users
        // -Achieve this via ajax request to server without reloading page.
        $.ajax({
                url: 'users/',
                type: 'GET',
                dataType: 'json', // json file returned parsed in js-object
                success: data => {
                // if visit to url is successful then call this function
                console.log('JOSH: /users was successful');
                console.log(data);
                $('#status').html('All users: ' + data);
            }
        }); // function call with one object as parameter
        // - - - - - - - - - - - - - - - - - - - - - - - - -
    });
    // ----------------------------------------------
    $('#insertButton').click(() => {
    console.log('insertButton clicked!!!');
    $.ajax({
        url: 'users',
        type: 'POST',
        data: {
            name: $('#insertNameBox').val(),
            job: $('#insertJobBox').val(),
            pet: $('#insertPetBox').val()
        },
        success: data => {
        $('#status').html(data.message);
        console.log('JOSH');
        }
    }); // $.ajax
    });
    // ----------------------------------------------
    $('#readButton').click(() => {
        const requestURL = 'users/' + $('#nameBox').val();
        console.log('making ajax request to:', requestURL);

        // From: http://learn.jquery.com/ajax/jquery-ajax-methods/
        // Using the core $.ajax() method since it's the most flexible.
        // ($.get() and $.getJSON() are nicer convenience functions)
        $.ajax({
        // all URLs are relative to http://localhost:3000/
        url: requestURL,
        type: 'GET',
        dataType: 'json', // this URL returns data in JSON format
        success: data => {
            console.log('You received some data!', data);

            if (data.job && data.pet) {
            $('#status').html('Successfully fetched data at URL: ' + requestURL);
            $('#jobDiv').html('My job is ' + data.job);
            $('#petImage')
                .attr('src', data.pet)
                .attr('width', '300px');
            } else {
            $('#status').html('Error: could not find user at URL: ' + requestURL);
            // clear the display
            $('#jobDiv').html('');
            $('#petImage')
                .attr('src', '')
                .attr('width', '0px');
            }
        }
        });
    });
});