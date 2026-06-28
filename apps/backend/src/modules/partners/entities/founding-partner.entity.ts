import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { FoundingPartnerStatus } from '../interfaces/founding-partner.interface';

@Entity('founding_partners')
export class FoundingPartner {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'company_name' })
  companyName!: string;

  @Column({ name: 'full_name' })
  fullName!: string;

  @Column()
  country!: string;

  @Column()
  city!: string;

  @Column()
  phone!: string;

  @Column()
  email!: string;

  @Column({ nullable: true })
  website?: string;

  @Column({ name: 'business_type' })
  businessType!: string;

  @Column()
  industry!: string;

  @Column({ type: 'text', nullable: true })
  products?: string;

  @Column({ type: 'text', nullable: true })
  message?: string;

  @Column({ name: 'preferred_language' })
  preferredLanguage!: string;

  @Column({ name: 'communication_method' })
  communicationMethod!: string;

  @Column({
    type: 'varchar',
    default: FoundingPartnerStatus.NEW,
  })
  status!: FoundingPartnerStatus;

  @Column({ type: 'text', nullable: true })
  notes?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
