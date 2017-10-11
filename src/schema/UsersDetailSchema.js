import { schema } from 'normalizr';

//формат описания информации о пользователе
const positionSchema = new schema.Entity('position');
const workplaceSchema = new schema.Entity('workplace', {'position': positionSchema });
const oneUserSchema = new schema.Entity('users', {'workplace': workplaceSchema });
const usersDetailsSchema = new schema.Object({users: new schema.Array(oneUserSchema)});
export default usersDetailsSchema;
