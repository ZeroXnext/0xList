import { Identity } from '../utils/types';
import { ActorType } from './types';

export class Actor {
  constructor(
    private identity: Identity,
    public type: ActorType,
  ) {}
}
