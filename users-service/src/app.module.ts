import { Module } from '@nestjs/common';

import { UsersModule } from './features/users/users.module';
import { DatabaseModule } from './modules/database.module';

@Module({
  imports: [DatabaseModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
