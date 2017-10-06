import { schema } from 'normalizr';

const company = new schema.Entity('workplace');

const user = new schema.Entity('users', {'workplace': company});
const usersSchema = [ user ];

const group = new schema.Entity('groups', {'users': usersSchema});
const groupSchema = new schema.Object({ groups: new schema.Array(group)});

export default groupSchema;