'use client';

import PartnersTable from '@/src/components/admin/PartnersTable';

export default function ContactedPartnersPage() {
  return (
    <PartnersTable title="Contacted Partners" defaultStatus="CONTACTED" />
  );
}
