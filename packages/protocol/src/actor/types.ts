export const ACTOR_TYPE = {
  developer: 0,
  plugin: 1,
  consumer: 2,
} as const;

export type ActorType = (typeof ACTOR_TYPE)[keyof typeof ACTOR_TYPE];
