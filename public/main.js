// ----------------------------------------------
// NOTE: This will be replaced by an API-call
const nutrition_facts = {
    'grapenuts': {
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
    },
    'apple': {
        cals: 95
    },
    'orange': {
        cals: 45
    },
    'banana': {
        cals: 105
    },
    'egg-whole': {
        cals: 78
    },
    'egg-white': {
        cals: 17
    },
    'strawbabies': {
        cals: 47
    },
    'chicken': {
        cals: 142
    },
    'bread': {
        cals: 130
    },
    'milk': {
        cals: 103
    },
};
// ----------------------------------------------
// Data for day
class Data_for_Day {

    // Properties
    foods = [];
    nutrients = {
        'cals': 0,
        'protien': 0,
        'sugar': 0,
        'fat': 0
    };

    // Methods
    constructor() {

        // Step 0: Upon page load create an object
        console.log('Data_for_Day object created');

        // Step 1: Run AJAX-call to update food quantities
        $.ajax({
            url: 'foods',
            type: 'GET',
            success: data => {

                // -data comes in as an array of objects
                // -each element is a {food-name: quantity}-object

                // update local js-object storing quantities for day
                data.forEach(d => {
                    this.foods[d.name] = d.quantity;

                    const tr = document.createElement('tr');
                    const table = document.getElementById('quantity-table');

                    const cals = nutrition_facts[d.name].cals * d.quantity;
                    
                    tr.innerHTML = `
                            <td>
                                <img src="assets/img/${d.name}.jpg" class="rounded-circle mr-2" width="30" height="30">
                                ${d.name}
                            </td>
                            <td>
                                <input value="${d.quantity}" type="number" class="food-quantity-input-field">
                                <span class="cals">
                                    ${cals}
                                </span>
                            </td>
                            <td>
                                <div class="dropdown">
                                    <button class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-expanded="false" type="button">
                                        Dropdown
                                    </button>
                                    <div class="dropdown-menu" role="menu">
                                        <a class="dropdown-item" role="presentation" href="#">
                                            First Item
                                        </a>
                                        <a class="dropdown-item" role="presentation" href="#">
                                            Second Item
                                        </a>
                                        <a class="dropdown-item" role="presentation" href="#">
                                            Third Item
                                        </a>
                                    </div>
                                </div>
                            </td>
                    `;

                    tr.dataset.food = d.name;
                    table.append(tr);
                });


                // DEBUG
                console.log('~~~~~~~~~~~~~~~~');
                console.log(this.foods);
                console.log('~~~~~~~~~~~~~~~~');

                // update quantities drawn to screen
                //this.update_quantity_display();

                // update daily totals
                //this.update_totals();

                // TODO: Create dedicated db-table for daily values
                // Step 2: Calculate daily values
                // TODO: Create dedicated db-table for daily values
                //this.update_totals();

                // Step 3: 
                //this.update_totals_display();
            }
        })

    }

    update_totals() {

        // TEMP
        this.nutrients['cals'] = this.food_quantities['apple'];

        // Loop over all the food quantities
        
    }

    update_totals_display() {
        const tota_cals = document.getElementById('total_cals');
        total_cals.innerHTML = this.nutrients['cals'];
    }
}
// ----------------------------------------------
// ==============================================
// Update todays quantities from database upon page load
document.addEventListener('DOMContentLoaded', function(){

    const data_for_day = new Data_for_Day();
});
// ==============================================
// TODO: Upon navigation away from daily/quantity-table page, update database
// ==============================================