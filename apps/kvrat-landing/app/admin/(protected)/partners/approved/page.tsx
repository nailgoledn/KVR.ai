'use client';

import PartnersTable from '@/src/components/admin/PartnersTable';

export default function ApprovedPartnersPage() {
  return (
    <PartnersTable title="Approved Partners" defaultStatus="APPROVED" />
  );
}
