import { createUserSettingsRoute } from '@/lib/api-helpers';

const { GET, PUT } = createUserSettingsRoute('/api/user/me/security');

export { GET, PUT };
