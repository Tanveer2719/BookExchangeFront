import {createClient} from '@sanity/client'
// Import using ESM URL imports in environments that supports it:
// import {createClient} from 'https://esm.sh/@sanity/client'

export const client = createClient({
  projectId: 'cpxwq60y',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-10-03', 
})

export async function fetchUsers() {
    const users = await client.fetch('*[_type == "user"]');
    return users;
}