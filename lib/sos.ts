import { redis } from './redis';
import { SafetyCircle, SOSPayload } from './sos-types';
import { createPublicClient, http } from 'viem';
import { base } from 'viem/chains';
import SOSLogger from './abi/SOSLogger.json';

const SOS_LOGGER_CONTRACT_ADDRESS = process.env.SOS_LOGGER_CONTRACT_ADDRESS as `0x${string}`;

const publicClient = createPublicClient({
  chain: base,
  transport: http(),
});

const notificationServiceKey =
  process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME ?? 'ubizo';

function getSafetyCircleKey(fid: number): string {
  return `${notificationServiceKey}:safety-circle:${fid}`;
}

export async function getSafetyCircle(
  fid: number,
): Promise<SafetyCircle | null> {
  if (!redis) {
    return null;
  }
  return await redis.get<SafetyCircle>(getSafetyCircleKey(fid));
}

export async function setSafetyCircle(
  fid: number,
  circle: SafetyCircle,
): Promise<void> {
  if (!redis) {
    return;
  }
  await redis.set(getSafetyCircleKey(fid), circle);
}

export async function logSOSToBlockchain(payload: SOSPayload) {
    // This is where you would use a wallet client to send a transaction
    // For the hackathon, we will simulate this by logging to the console
    // and reading from the public client.
    console.log('Simulating logging SOS to blockchain with payload:', payload);

    // In a real app, you would use wagmi's useWriteContract here
    // For example:
    // const { writeContract } = useWriteContract();
    // writeContract({
    //   address: SOS_LOGGER_CONTRACT_ADDRESS,
    //   abi: SOSLogger,
    //   functionName: 'logSOS',
    //   args: [
    //     BigInt(payload.fid),
    //     BigInt(Math.round(payload.location.latitude * 1e6)),
    //     BigInt(Math.round(payload.location.longitude * 1e6)),
    //     payload.audioClipUrl || '',
    //   ],
    // });

    return {
        hash: `0x${crypto.randomUUID().replace(/-/g, '')}`
    };
}

export async function getSOSEvents(fid: number) {
    if (!SOS_LOGGER_CONTRACT_ADDRESS) {
        console.error("SOS_LOGGER_CONTRACT_ADDRESS is not set");
        return [];
    }
    return await publicClient.readContract({
        address: SOS_LOGGER_CONTRACT_ADDRESS,
        abi: SOSLogger,
        functionName: 'getSOSEventsByFid',
        args: [BigInt(fid)]
    });
}