import IdentitySerializer from './identity-serializer';
import { DIDScheme, Identity, IDENTITY_TYPE, ResolverIdentity } from './types';

jest.mock('ethers', () => {
  const original = jest.requireActual('ethers');

  return {
    ...original, // keep any other non-mocked exports
    Wallet: {
      createRandom: jest.fn(() => ({
        privateKey: '0x'.padEnd(66, '0'), // 32 bytes hex
        publicKey: '0x'.padEnd(132, '0'), // 64 bytes hex
        signMessage: jest.fn(async () => '0x'.padEnd(132, '0')),
      })),
      verifyMessage: jest.fn(
        async () => '0x'.padEnd(42, '0'), // mock Ethereum address
      ),
    },
    keccak256: jest.fn(() => '0x'.padEnd(66, '0')),
    hexToBytes: jest.fn(
      (hex: string) =>
        new Uint8Array(
          hex
            .slice(2)
            .match(/.{1,2}/g)
            ?.map((b) => parseInt(b, 16)) || [],
        ),
    ),
  };
});

describe('IdentitySerializer', () => {
  test('serializes and deserializes a PublicKey identity', () => {
    const pkIdentity: Identity = {
      protocolVersion: 1,
      type: IDENTITY_TYPE.PublicKey,
      scheme: new Uint8Array([1, 2, 3, 4, 5]),
    };

    const serialized = IdentitySerializer.serialize(pkIdentity);
    expect(serialized[0]).toBe(pkIdentity.protocolVersion);
    expect(serialized[1]).toBe(pkIdentity.type);

    const deserialized = IdentitySerializer.deserialize(serialized);
    expect(deserialized).toEqual(pkIdentity);
  });

  test('serializes and deserializes a DID identity without resolver', () => {
    const didIdentity: Identity<DIDScheme> = {
      protocolVersion: 2,
      type: IDENTITY_TYPE.DID,
      scheme: { did: 'did:example:12345' },
    };

    const serialized = IdentitySerializer.serialize(didIdentity);
    expect(serialized[0]).toBe(didIdentity.protocolVersion);
    expect(serialized[1]).toBe(didIdentity.type);

    const deserialized = IdentitySerializer.deserialize(serialized);
    expect((deserialized.scheme as DIDScheme).did).toBe(didIdentity.scheme.did);
    expect((deserialized.scheme as DIDScheme).resolver).toBeUndefined();
  });

  test('serializes and deserializes a DID identity with resolver', () => {
    const resolver: ResolverIdentity = {
      type: 1,
      endpoint: 'https://resolver.example.com',
      version: 3,
    };
    const didIdentity: Identity<DIDScheme> = {
      protocolVersion: 1,
      type: IDENTITY_TYPE.DID,
      scheme: { did: 'did:example:67890', resolver },
    };

    const serialized = IdentitySerializer.serialize(didIdentity);

    const deserialized = IdentitySerializer.deserialize(serialized) as Identity<DIDScheme>;
    expect(deserialized.scheme.did).toBe(didIdentity.scheme.did);
    expect(deserialized.scheme.resolver).toEqual(resolver);
  });
});
