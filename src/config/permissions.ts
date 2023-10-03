export const ALL_PERMISSIONS = [
  // USERS
  'users:roles:write', // allowed to add a role to a user
  'users:roles:delete', // allowed to remove a role from a user
  // POSTS
  'posts:write', // allowed to create a post
  'posts:read', // allowed to read a post
  'posts:delete', // allowed to delete posts
  'posts:edit-own', // only allowed to edit own posts
] as const;

export type TPermission = (typeof ALL_PERMISSIONS)[number];

function toPermissionsRecord<T extends string>(
  array: Readonly<T[]>
): Record<T, T> {
  return array.reduce(
    (obj, key) => {
      obj[key] = key;
      return obj;
    },
    {} as Record<T, T>
  );
}

export const PERMISSIONS = toPermissionsRecord<TPermission>(ALL_PERMISSIONS);

export const USER_ROLE_PERMISSIONS = [
  PERMISSIONS['posts:write'],
  PERMISSIONS['posts:read'],
];

export const SYSTEM_ROLES = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  APPLICATION_USER: 'APPLICATION_USER',
};
