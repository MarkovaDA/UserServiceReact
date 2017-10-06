import { schema } from 'normalizr';


/*const company = new schema.Entity('workplace');
const user = new schema.Entity('users', {'workplace': company});
const usersDetailsSchema = [ user ];
const group = new schema.Entity('groups', {'users': usersDetailsSchema});
const groupSchema = new schema.Object({ groups: new schema.Array(group)});*/
const workplaceSchema = new schema.Entity('workplace');
const positionSchema = new schema.Entity('position');
const dataSchema = new schema.Entity('data',{'workplace':workplaceSchema, 'position':positionSchema},{idAttribute: 'mail'});
const oneUserSchema = new schema.Entity('users', {'data': dataSchema});
const usersDetailsSchema = new schema.Object({users: new schema.Array(oneUserSchema)});
export default usersDetailsSchema;

