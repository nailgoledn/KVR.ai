import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PartnersController } from './partners.controller';
import { PartnersService } from './partners.service';
import { FoundingPartner } from './entities/founding-partner.entity';
import { FoundingPartnerRepository } from './repository/founding-partner.repository';

@Module({
  imports: [TypeOrmModule.forFeature([FoundingPartner])],
  controllers: [PartnersController],
  providers: [PartnersService, FoundingPartnerRepository],
  exports: [PartnersService],
})
export class PartnersModule {}
