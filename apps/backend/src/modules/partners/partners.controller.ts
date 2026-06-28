import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Query,
  UseGuards,
  Res,
  ParseIntPipe,
} from '@nestjs/common';
import type { Response } from 'express';

import { PartnersService } from './partners.service';
import { CreateFoundingPartnerDto } from './dto/create-founding-partner.dto';
import { UpdateFoundingPartnerDto } from './dto/update-founding-partner.dto';
import { FoundingPartnerFilterDto } from './dto/founding-partner-filter.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';

@Controller('api/founding-partners')
export class PartnersController {
  constructor(private readonly partnersService: PartnersService) {}

  @Post()
  create(@Body() dto: CreateFoundingPartnerDto) {
    return this.partnersService.create(dto);
  }

  @Get('stats')
  @UseGuards(JwtAuthGuard)
  getStats() {
    return this.partnersService.getStats();
  }

  @Get('export')
  @UseGuards(JwtAuthGuard)
  async exportCsv(
    @Query() filter: FoundingPartnerFilterDto,
    @Res() res: Response,
  ) {
    const csv = await this.partnersService.exportCsv(filter);

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader(
      'Content-Disposition',
      'attachment; filename="founding-partners.csv"',
    );
    res.send('\uFEFF' + csv);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Query() filter: FoundingPartnerFilterDto) {
    return this.partnersService.findAll(filter);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.partnersService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateFoundingPartnerDto,
  ) {
    return this.partnersService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.partnersService.remove(id);
  }
}
