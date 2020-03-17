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

                // update local js-object storing quantities for day
                data.forEach(d => this.foods[d.name] = d.quantity);

                // DEBUG
                console.log('~~~~~~~~~~~~~~~~');
                console.log(this.foods);
                console.log('~~~~~~~~~~~~~~~~');

                // update quantities drawn to screen
                this.update_quantity_display();

                // update daily totals
                this.update_totals();

                // TODO: Create dedicated db-table for daily values
                // Step 2: Calculate daily values
                // TODO: Create dedicated db-table for daily values
                this.update_totals();        

                // Step 3: 
                this.update_totals_display();
            }
        })

    }


    // TODO: Generate the row with data-name based on the foods retrieved from database
    update_quantity_display() {
        const input_fields = Array.from(document.getElementsByClassName('food-quantity-input-field'));
        input_fields.forEach((elem, idx, arr) => {

            // Step 1: Grab name of row:
            const food_name = elem.parentElement.parentElement.dataset.food;

            // Step 2: Set HTML value to quantity
            elem.value = this.foods[food_name];
        });
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