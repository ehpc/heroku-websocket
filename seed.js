import './misc/env.js';
import db from './misc/db.js';
import Room from './models/room.js';

db.then(async (mongoose) => {
  await Room.deleteMany();
  await Room.insertMany([
    {
      name: 'Беседка',
      description: 'Любые темы и флуд',
    },
    {
      name: 'Птичник',
      description: 'Всё о птицах',
    },
    {
      name: 'Игротека',
      description: 'Обсуждаем игры (настольные и компьютерные)',
    },
  ]);
  mongoose.connection.close();
});
