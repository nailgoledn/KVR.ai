'use client';

import PartnersTable from '@/src/components/admin/PartnersTable';

export default function NewRequestsPage() {
  return (
    <PartnersTable title="New Requests" defaultStatus="NEW" />
  );
}
