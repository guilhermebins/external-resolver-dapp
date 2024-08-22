import {
  DateWithValue,
  DecodedAddr,
  DecodedText,
} from "@ensdomains/ensjs/dist/types/types";
import { InternalGetContentHashReturnType } from "@ensdomains/ensjs/public";
import { Address } from "viem";

export interface TextRecords {
  [key: string]: string | undefined;
}

export interface CoinInfo {
  address: string;
  coin: string;
}

export interface SubgraphEnsDate {
  expiry?: DateWithValue<bigint> | undefined;
  contentHash: InternalGetContentHashReturnType;
  texts: DecodedText[];
  coins: DecodedAddr[];
  resolverAddress: `0x${string}`;
  owner: Address;
  newAvatar?: string | null;
}

export interface DomainData {
  id: string;
  owner: string;
  resolvedAddress: string;
  parent: string;
  subdomains: string[];
  subdomainCount: number;
  resolver: {
    id: string;
    address: string;
    texts: Record<string, string>;
    addresses: {
      address: string;
      name: string;
      coin: string;
    }[];
  };
  expiryDate: number;
}

export interface QueryDomain {
  id: string;
  owner: string;
  resolvedAddress: string;
  parent: string;
  subdomains: string[];
  subdomainCount: number;
  resolver: {
    id: string;
    address: string;
    texts: {
      key: string;
      value: string;
    }[];
    addresses: {
      address: string;
      coin: string;
    }[];
  };
  expiryDate: string;
}

export interface QueryResponse {
  domain: QueryDomain;
}
