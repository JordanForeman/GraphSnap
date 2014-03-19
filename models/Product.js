var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var Product;

try 
{
	if (mongoose.model('product')) 
		Product = mongoose.model('product');
} 
catch(e) 
{
	if (e.name === 'MissingSchemaError') {

		var productSchema = new Schema({

			productType: {
				type: Schema.Types.ObjectId,
				required: true,
				ref: 'productType'
			},

			customFields: [{
				type: Schema.Types.ObjectId,
				ref: 'customField'
			}],

			createdDate: {
				type: Date,
				default: Date.now,
				required: true
			},

		});

		productSchema.methods.getProductsOfType = function(productTypeId){
			
		};

		Product = mongoose.model('product', productSchema);
	}
}

module.exports = Product;
