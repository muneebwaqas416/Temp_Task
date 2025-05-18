import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const uri = configService.get<string>('MONGODB_URI');
        if (!uri) throw new Error('MONGODB_URI is not defined');
        return {
          uri,
          connectionFactory: (connection) => {
            connection.once('open', () => {
              console.log('✅ MongoDB connected to:', uri);
            });
            connection.on('error', (err) => {
              console.error('❌ MongoDB connection error:', err);
            });
            return connection;
          },
        };
      },
      inject: [ConfigService],
    }),    
    CartModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
