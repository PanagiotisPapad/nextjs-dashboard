import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
import Search from '@/app/ui/search';
import { FormattedCustomersTable } from '@/app/lib/definitions';
import { CreateCustomer, DeleteCustomer, UpdateCustomer } from './buttons';
import { formatDateToLocal } from '@/app/lib/utils';

export default async function CustomersTable({
  customers,
}: {
  customers: FormattedCustomersTable[];
}) {
  return (
    <div className="w-full">
      <h1 className={`${lusitana.className} mb-8 text-xl md:text-2xl`}>
        Customers
      </h1>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search customers..." />
        <CreateCustomer />
      </div>
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
              <div className="md:hidden">
                {customers?.map((customer) => (
                  <div
                    key={customer.id}
                    className="mb-2 w-full rounded-md bg-white p-4"
                  >
                    <div className="flex items-center justify-between border-b pb-4">
                      <div>
                        <div className="mb-2 flex items-center">
                          <div className="flex items-center gap-3">
                            <Image
                              src={customer.image_url}
                              className="rounded-full"
                              alt={`${customer.name}'s profile picture`}
                              width={28}
                              height={28}
                            />
                            <p>{customer.name}</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">
                          {customer.email}
                        </p>
                        <p className="text-sm text-gray-500">
                          {customer.phone_number}
                        </p>
                      </div>
                    </div>
                    <div className="flex w-full items-center justify-between border-b py-5">
                      <div className="flex w-1/2 flex-col">
                        <p className="text-xs">Deposit</p>
                        <p className="font-medium">{customer.amount_deposit}</p>
                      </div>
                      <div className="flex w-1/2 flex-col">
                        <p className="text-xs">Total</p>
                        <p className="font-medium">{customer.amount_total}</p>
                      </div>
                    </div>
                    <div className="flex w-full items-center justify-between border-b py-5">
                      <div className="flex w-1/2 flex-col">
                        <p className="text-xs">Rooms</p>
                        <p className="font-medium">
                          {customer.rooms ? customer.rooms : ''}
                        </p>
                      </div>
                      <div className="flex w-1/2 flex-col">
                        <p className="text-xs">Status</p>
                        <p className="font-medium">{customer.status}</p>
                      </div>
                    </div>
                    <div className="pt-4 text-sm">
                      <p>{customer.total_invoices} invoices</p>
                    </div>
                  </div>
                ))}
              </div>
              <table className="hidden min-w-full rounded-md text-gray-900 md:table">
                <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                  <tr>
                    <th scope="col" className="px-24 py-5 font-medium sm:pl-6">
                      Name
                    </th>
                    <th scope="col" className="px-12 py-5 font-medium">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-5 font-medium">
                      Phone Number
                    </th>
                    <th scope="col" className="px-12 py-5 font-medium">
                      Deposit
                    </th>
                    <th scope="col" className="px-12 py-5 font-medium">
                      Total
                    </th>
                    <th scope="col" className="px-12 py-5 font-medium">
                      Rooms
                    </th>
                    <th scope="col" className="px-12 py-5 font-medium">
                      Status
                    </th>
                    <th scope="col" className="px-12 py-5 font-medium">
                      Date From
                    </th>
                    <th scope="col" className="px-12 py-5 font-medium">
                      Date To
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-gray-900">
                  {customers.map((customer) => (
                    <tr key={customer.id} className="group">
                      <td className="whitespace-nowrap bg-white py-5 pl-16 pr-12 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                        <div className="flex items-center gap-3">
                          <Image
                            src={customer.image_url}
                            className="rounded-full"
                            alt={`${customer.name}'s profile picture`}
                            width={28}
                            height={28}
                          />
                          <p>{customer.name}</p>
                        </div>
                      </td>
                      <td className="whitespace-nowrap bg-white px-12 py-5 text-sm">
                        {customer.email}
                      </td>
                      <td className="whitespace-nowrap bg-white px-8 py-5 text-sm">
                        {customer.phone_number}
                      </td>
                      <td className="whitespace-nowrap bg-white px-12 py-5 text-sm">
                        {customer.amount_deposit}
                      </td>
                      <td className="whitespace-nowrap bg-white px-12 py-5 text-sm">
                        {customer.amount_total}
                      </td>
                      <td className="whitespace-nowrap bg-white px-12 py-5 text-sm">
                        {customer.rooms ? customer.rooms : ''}
                      </td>
                      <td className="whitespace-nowrap bg-white px-12 py-5 text-sm">
                        {customer.status}
                      </td>
                      <td className="whitespace-nowrap bg-white px-12 py-5 text-sm">
                        {formatDateToLocal(customer.date_from)}
                      </td>
                      <td className="whitespace-nowrap bg-white px-12 py-5 text-sm">
                        {formatDateToLocal(customer.date_to)}
                      </td>
                      <td className="whitespace-nowrap py-3 pl-6 pr-3">
                        <div className="flex justify-end gap-3">
                          <UpdateCustomer id={customer.id} />
                          <DeleteCustomer id={customer.id} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
