export const ACTOR_ROLE = {
  developer: 0,
  plugin: 1,
  consumer: 2,
} as const;

export type ActorRole = (typeof ACTOR_ROLE)[keyof typeof ACTOR_ROLE];
