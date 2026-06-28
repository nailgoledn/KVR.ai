'use client';

import PartnersTable from '@/src/components/admin/PartnersTable';

export default function ArchivedPartnersPage() {
  return (
    <PartnersTable title="Archived Partners" defaultStatus="ARCHIVED" />
  );
}
