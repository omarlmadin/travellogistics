export type PlugType =
  | 'A'
  | 'B'
  | 'C'
  | 'D'
  | 'E'
  | 'F'
  | 'G'
  | 'H'
  | 'I'
  | 'J'
  | 'K'
  | 'L'
  | 'M'
  | 'N'
  | 'O';

export type VisaCategory =
  | 'visa_free'
  | 'eta_required'
  | 'e_visa'
  | 'visa_on_arrival'
  | 'visa_required';

export interface CurrencyInfo {
  code: string;
  symbol: string;
  name: string;
}

export interface Country {
  slug: string;
  code: string; // ISO 2-letter uppercase (e.g., "US")
  name: string;
  flagEmoji: string;
  region: string;
  plugTypes: PlugType[];
  voltage: number; // in Volts (e.g. 120, 230)
  frequency: number; // in Hertz (50 or 60)
  currency: CurrencyInfo;
  emergencyNumber: string;
  tapWaterDrinkable: boolean;
  drivingSide: 'left' | 'right';
  callingCode: string;
  tippingCulture: string;
  cardAcceptance: 'very_high' | 'high' | 'moderate' | 'cash_preferred';
}

export interface VisaRule {
  originCode: string;
  destinationCode: string;
  category: VisaCategory;
  maxStayDays?: number;
  notes?: string;
  officialPortalUrl?: string;
  affiliateCtaUrl?: string;
}

export interface PlugCompatibilityResult {
  needsAdapter: boolean;
  needsVoltageConverter: boolean;
  originPlugs: PlugType[];
  destinationPlugs: PlugType[];
  sharedPlugs: PlugType[];
  originVoltage: number;
  destVoltage: number;
  originFreq: number;
  destFreq: number;
  advice: string;
}

export interface RouteLogistics {
  origin: Country;
  destination: Country;
  plugCompatibility: PlugCompatibilityResult;
  visaRule: VisaRule;
}
