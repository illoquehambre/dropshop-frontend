// app/stores/create/page.tsx
import { cookies } from 'next/headers';
import StoreCreation from '../../components_admin/StoreCreation'

export default function StoreCreationPage() {
    const token = cookies().get('token')?.value || '';
    return <StoreCreation token={token} />;
}
