import { MigrationBuilder } from 'node-pg-migrate'
import { Option } from '../src/Option'
import { Poll } from '../src/Poll'

const tableName = Option.tableName

exports.up = (pgm: MigrationBuilder) => {
  pgm.createTable(
    tableName,
    {
      id: { type: 'INT', primaryKey: true, notNull: true, comment: null },
      name: { type: 'TEXT', notNull: true, comment: null },
      poll_id: { type: 'INT', references: Poll.tableName, comment: null },
      created_at: { type: 'TIMESTAMP', notNull: true, comment: null },
      updated_at: { type: 'TIMESTAMP', comment: null }
    },
    { ifNotExists: true, comment: null }
  )
}

exports.down = (pgm: MigrationBuilder) => {
  pgm.dropTable(tableName, {})
}