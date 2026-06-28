import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';

import { FoundingPartner } from '../entities/founding-partner.entity';
import { FoundingPartnerFilterDto } from '../dto/founding-partner-filter.dto';
import {
  FoundingPartnerStatus,
  PaginatedFoundingPartners,
} from '../interfaces/founding-partner.interface';

@Injectable()
export class FoundingPartnerRepository {
  constructor(
    @InjectRepository(FoundingPartner)
    private readonly repo: Repository<FoundingPartner>,
  ) {}

  create(data: Partial<FoundingPartner>): FoundingPartner {
    return this.repo.create(data);
  }

  save(entity: FoundingPartner): Promise<FoundingPartner> {
    return this.repo.save(entity);
  }

  findById(id: number): Promise<FoundingPartner | null> {
    return this.repo.findOne({ where: { id } });
  }

  delete(id: number): Promise<void> {
    return this.repo.delete(id).then(() => undefined);
  }

  async findPaginated(
    filter: FoundingPartnerFilterDto,
  ): Promise<PaginatedFoundingPartners> {
    const page = filter.page ?? 1;
    const limit = filter.limit ?? 20;
    const sortBy = filter.sortBy ?? 'createdAt';
    const sortOrder = filter.sortOrder ?? 'DESC';

    const qb = this.applyFilters(this.repo.createQueryBuilder('partner'), filter);

    const sortColumnMap: Record<string, string> = {
      createdAt: 'partner.createdAt',
      companyName: 'partner.companyName',
      fullName: 'partner.fullName',
      country: 'partner.country',
      status: 'partner.status',
    };

    qb.orderBy(sortColumnMap[sortBy] ?? 'partner.createdAt', sortOrder);
    qb.skip((page - 1) * limit).take(limit);

    const [data, total] = await qb.getManyAndCount();

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit) || 1,
    };
  }

  findAllFiltered(filter: FoundingPartnerFilterDto): Promise<FoundingPartner[]> {
    const qb = this.applyFilters(this.repo.createQueryBuilder('partner'), filter);
    qb.orderBy('partner.createdAt', 'DESC');
    return qb.getMany();
  }

  async countByStatus(): Promise<Record<string, number>> {
    const rows = await this.repo
      .createQueryBuilder('partner')
      .select('partner.status', 'status')
      .addSelect('COUNT(*)', 'count')
      .groupBy('partner.status')
      .getRawMany<{ status: string; count: string }>();

    const counts: Record<string, number> = {
      [FoundingPartnerStatus.NEW]: 0,
      [FoundingPartnerStatus.CONTACTED]: 0,
      [FoundingPartnerStatus.APPROVED]: 0,
      [FoundingPartnerStatus.REJECTED]: 0,
      [FoundingPartnerStatus.ARCHIVED]: 0,
    };

    for (const row of rows) {
      counts[row.status] = Number(row.count);
    }

    return counts;
  }

  private applyFilters(
    qb: SelectQueryBuilder<FoundingPartner>,
    filter: FoundingPartnerFilterDto,
  ): SelectQueryBuilder<FoundingPartner> {
    if (filter.search?.trim()) {
      const term = `%${filter.search.trim()}%`;
      qb.andWhere(
        '(partner.companyName LIKE :term OR partner.fullName LIKE :term OR partner.email LIKE :term)',
        { term },
      );
    }

    if (filter.country?.trim()) {
      qb.andWhere('partner.country = :country', {
        country: filter.country.trim(),
      });
    }

    if (filter.businessType?.trim()) {
      qb.andWhere('partner.businessType = :businessType', {
        businessType: filter.businessType.trim(),
      });
    }

    if (filter.status) {
      qb.andWhere('partner.status = :status', { status: filter.status });
    }

    return qb;
  }
}
