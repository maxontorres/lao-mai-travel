import { type SchemaTypeDefinition } from 'sanity'
import { schemas } from '../schemas/index'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: schemas as SchemaTypeDefinition[],
}
