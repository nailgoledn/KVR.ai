import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateFoundingPartnerDto } from './dto/create-founding-partner.dto';
import { UpdateFoundingPartnerDto } from './dto/update-founding-partner.dto';
import { FoundingPartnerFilterDto } from './dto/founding-partner-filter.dto';
import { FoundingPartnerRepository } from './repository/founding-partner.repository';
import {
  FoundingPartnerStats,
  FoundingPartnerStatus,
  PaginatedFoundingPartners,
} from './interfaces/founding-partner.interface';
import { FoundingPartner } from './entities/founding-partner.entity';

@Injectable()
export class PartnersService {
  constructor(
    private readonly foundingPartnerRepository: FoundingPartnerRepository,
  ) {}

  async create(dto: CreateFoundingPartnerDto): Promise<FoundingPartner> {
    const partner = this.foundingPartnerRepository.create({
      ...dto,
      status: FoundingPartnerStatus.NEW,
    });

    return this.foundingPartnerRepository.save(partner);
  }

  findAll(filter: FoundingPartnerFilterDto): Promise<PaginatedFoundingPartners> {
    return this.foundingPartnerRepository.findPaginated(filter);
  }

  async findOne(id: number): Promise<FoundingPartner> {
    const partner = await this.foundingPartnerRepository.findById(id);

    if (!partner) {
      throw new NotFoundException('Founding partner not found');
    }

    return partner;
  }

  async update(
    id: number,
    dto: UpdateFoundingPartnerDto,
  ): Promise<FoundingPartner> {
    const partner = await this.findOne(id);
    Object.assign(partner, dto);
    return this.foundingPartnerRepository.save(partner);
  }

  async remove(id: number): Promise<{ message: string }> {
    await this.findOne(id);
    await this.foundingPartnerRepository.delete(id);

    return { message: 'Founding partner deleted successfully' };
  }

  async getStats(): Promise<FoundingPartnerStats> {
    const counts = await this.foundingPartnerRepository.countByStatus();

    return {
      total: Object.values(counts).reduce((sum, count) => sum + count, 0),
      new: counts[FoundingPartnerStatus.NEW],
      contacted: counts[FoundingPartnerStatus.CONTACTED],
      approved: counts[FoundingPartnerStatus.APPROVED],
      rejected: counts[FoundingPartnerStatus.REJECTED],
      archived: counts[FoundingPartnerStatus.ARCHIVED],
    };
  }

  exportCsv(filter: FoundingPartnerFilterDto): Promise<string> {
    return this.foundingPartnerRepository
      .findAllFiltered(filter)
      .then((partners) => this.buildCsv(partners));
  }

  private buildCsv(partners: FoundingPartner[]): string {
    const headers = [
      'ID',
      'Company Name',
      'Full Name',
      'Country',
      'City',
      'Phone',
      'Email',
      'Website',
      'Business Type',
      'Industry',
      'Products',
      'Message',
      'Preferred Language',
      'Communication Method',
      'Status',
      'Notes',
      'Created At',
      'Updated At',
    ];

    const rows = partners.map((p) =>
      [
        p.id,
        p.companyName,
        p.fullName,
        p.country,
        p.city,
        p.phone,
        p.email,
        p.website ?? '',
        p.businessType,
        p.industry,
        p.products ?? '',
        p.message ?? '',
        p.preferredLanguage,
        p.communicationMethod,
        p.status,
        p.notes ?? '',
        p.createdAt.toISOString(),
        p.updatedAt.toISOString(),
      ]
        .map((value) => `"${String(value).replace(/"/g, '""')}"`)
        .join(','),
    );

    return [headers.join(','), ...rows].join('\n');
  }
}
