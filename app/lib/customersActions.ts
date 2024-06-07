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

const UpdateCustomer = FormSchema.omit({ id: true, date: true });

export async function updateCustomer(id: string, formData: FormData) {
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
  } = UpdateCustomer.parse({
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

  // if (!validatedFields.success) {
  //   return {
  //     errors: validatedFields.error.flatten().fieldErrors,
  //     message: 'Missing Fields. Failed to Update Invoice.',
  //   };
  // }

  // const { customerId, amount, status } = validatedFields.data;
  const amountDepositInCents = amount_deposit * 100;
  const amountTotalInCents = amount_total * 100;
  const dateFrom = new Date(date_from).toISOString().split('T')[0];
  const dateTo = new Date(date_to).toISOString().split('T')[0];

  try {
    await sql`
        UPDATE customers
        SET 
          name = ${name}, 
          email = ${email}, 
          phone_number = ${phone_number},
          amount_deposit = ${amountDepositInCents},
          amount_total = ${amountTotalInCents},
          rooms = ${rooms},
          status = ${status},
          date_from = ${dateFrom}, 
          date_to = ${dateTo},
          image_url = ${image_url}
        WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database error: Failed to Update Customer.' };
  }

  revalidatePath('/dashboard/customers');
  redirect('/dashboard/customers');
}

export async function deleteCustomer(id: string) {
  try {
    await sql`DELETE FROM customers WHERE id = ${id}`;
    revalidatePath('/dashboard/customers');
    return { message: 'Deleted Customer.' };
  } catch (error) {
    return { message: 'Database error: Failed to Delete Customer' };
  }
}
