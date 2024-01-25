import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AddSellingTransactionValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    customer_name: schema.string({trim:true}),
    payment_nominal: schema.number(),
    change_nominal: schema.number(),
    total_price: schema.number(),
    selling_item: schema.array().members(
      schema.object().members({
        payment_method_id: schema.number(),
        quantity: schema.number(),
        item_name: schema.string({trim:true}),
        item_price: schema.number(),
        subtotal_discount: schema.number(),
      })
    ),
  })

  public messages: CustomMessages = {
    'customer_name.required': 'Customer name is required',
    'payment_nominal.required': 'Payment nominal is required',
    'change_nominal.required': 'Change nominal is required',
    'total_price.required': 'Total price is required',
    'selling_item.required': 'Selling items are required',
    'selling_item.*.payment_method_id.required': 'Payment method ID is required for each selling item',
    'selling_item.*.quantity.required': 'Quantity is required for each selling item',
    'selling_item.*.item_name.required': 'Item name is required for each selling item',
    'selling_item.*.item_price.required': 'Item price is required for each selling item',
    'selling_item.*.subtotal_discount.required': 'Subtotal discount is required for each selling item',
  };  

}
