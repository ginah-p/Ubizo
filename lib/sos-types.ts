export interface TrustedContact {
  name: string;
  phone?: string; // For SMS fallback
  email?: string;
}

export interface SafetyCircle {
  ownerFid: number;
  contacts: TrustedContact[];
}

export interface SOSPayload {
  fid: number;
  location: {
    latitude: number;
    longitude: number;
  };
  audioClipUrl?: string; // URL to audio clip on IPFS
  timestamp: number;
}