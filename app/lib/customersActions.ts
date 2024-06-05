'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const FormSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  phone_number: z.string(),
  amount_deposit: z.coerce.number(),
  amount_total: z.coerce.number(),
  rooms: z.string(),
  status: z.enum(['deposit', 'pending', 'paid']),
  date_from: z.string(),
  date_to: z.string(),
  image_url: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });

export async function createCustomer(formData: FormData) {
  const {
    name,
    email,
    phone_number,
    amount_deposit,
    amount_total,
    rooms,
    status,
    date_from,
    date_to,
    image_url,
  } = CreateInvoice.parse({
    name: formData.get('name'),
    email: formData.get('email'),
    phone_number: formData.get('phone_number'),
    amount_deposit: formData.get('amount_deposit'),
    amount_total: formData.get('amount_total'),
    rooms: formData.get('rooms'),
    status: formData.get('status'),
    date_from: formData.get('date_from'),
    date_to: formData.get('date_to'),
    image_url: '/customers/emil-kowalski.png',
  });
  const amountDepositInCents = amount_deposit * 100;
  const amountTotalInCents = amount_total * 100;
  const dateFrom = new Date(date_from).toISOString().split('T')[0];
  const dateTo = new Date(date_to).toISOString().split('T')[0];
  const dateCreated = new Date().toISOString().split('T')[0];

  try {
    await sql`
        INSERT INTO customers (name, email, phone_number, amount_deposit, amount_total, rooms, status, date_from, date_to, image_url, date_created)
        VALUES (${name}, ${email}, ${phone_number}, ${amountDepositInCents}, ${amountTotalInCents}, ${rooms}, ${status}, ${dateFrom}, ${dateTo}, ${image_url}, ${dateCreated}) 
    `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Customer.',
    };
  }

  revalidatePath('/dashboard/customers');
  redirect('/dashboard/customers');
}
