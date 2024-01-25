import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AddPurchaseTransactionValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    drug_factory_id: schema.number(),
    purchase_date: schema.date({ format: 'yyyy-MM-dd' }),
    purchase_item: schema.array().members(
      schema.object().members({
        drug_id: schema.number(),
        drug_purchase_price: schema.number(),
        subtotal_discount: schema.number(),
        expired: schema.date({ format: 'yyyy-MM-dd'}),
        quantity: schema.number(),
      })
    ),
  })

  public messages: CustomMessages = {
    'drug_factory_id.required': 'Drug factory ID is required',
    'purchase_date.required': 'Purchase date is required',
    'purchase_date.date.format': 'Invalid date format. Please use yyyy-MM-dd',
    'purchase_item.required': 'Purchase items are required',
    'purchase_item.*.drug_id.required': 'Drug ID is required for each purchase item',
    'purchase_item.*.drug_purchase_price.required': 'Drug purchase price is required for each purchase item',
    'purchase_item.*.subtotal_discount.required': 'Subtotal discount is required for each purchase item',
    'purchase_item.*.expired.required': 'Expiration date is required for each purchase item',
    'purchase_item.*.expired.date.format': 'Invalid expiration date format. Please use yyyy-MM-dd',
    'purchase_item.*.quantity.required': 'Quantity is required for each purchase item',
  }
}
