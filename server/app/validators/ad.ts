import vine from '@vinejs/vine'

export const createValidator = vine.compile(
  vine.object({
    title: vine.string().maxLength(155).trim(),
    description: vine.string().maxLength(300).trim(),
    price: vine.number().positive(),
  })
)

export const updateValidator = vine.compile(
  vine.object({
    title: vine.string().maxLength(155).trim(),
    description: vine.string().maxLength(300).trim(),
    price: vine.number().positive(),
  })
)
