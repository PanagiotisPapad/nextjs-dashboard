import CustomersForm from '@/app/ui/customers/create-customer';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';

export default async function Page() {
  const customers = await fetchCustomers();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Customers', href: '/dashboard/customers' },
          {
            label: 'Create Customer',
            href: 'dashboard/customers/create',
            active: true,
          },
        ]}
      />
      <CustomersForm customers={customers} />
    </main>
  );
}
