import React from 'react';
import { Country } from '@/types';
import { CountryFlag } from './CountryFlag';
import { MapPin, Camera, Info, ShieldCheck, Sparkles } from 'lucide-react';

interface Props {
  origin: Country;
  destination: Country;
}

export function DestinationShowcase({ origin, destination }: Props) {
  const landmarkImg =
    destination.landmarkImage ||
    'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&w=800&q=75&fm=webp';

  const landmarkTitle = destination.landmarkTitle || `Iconic Landmarks of ${destination.name}`;
  const landmarkDesc =
    destination.landmarkDescription ||
    `When traveling to ${destination.name}, remember to check your device compatibility with local Type ${destination.plugTypes.join('/')} electrical outlets and ${destination.voltage}V power systems.`;

  return (
    <section className="mt-12 overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm">
      <div className="grid lg:grid-cols-12">
        {/* Left: Optimized Mid-Site Image with Lazy Loading & Semantic Alt */}
        <div className="relative min-h-[260px] lg:col-span-6 lg:min-h-full overflow-hidden bg-slate-900">
          <img
            src={landmarkImg}
            alt={`${landmarkTitle} - Essential travel logistics and landmark in ${destination.name}`}
            className="h-full w-full object-cover object-center transition-transform duration-500 hover:scale-105"
            loading="lazy"
            width={600}
            height={450}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-slate-950/30" />
          
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold backdrop-blur-md">
              <Camera className="h-3.5 w-3.5 text-sky-400" />
              <span>Destination Landmark</span>
            </div>
            <p className="mt-1.5 text-sm font-bold text-white drop-shadow-sm">
              {landmarkTitle}
            </p>
          </div>
        </div>

        {/* Right: Contextual Travel & Infrastructure Logistics Brief */}
        <div className="p-6 sm:p-8 lg:col-span-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-600">
              <CountryFlag code={destination.code} name={destination.name} emoji={destination.flagEmoji} size="sm" />
              <span>{destination.name} Practical Travel Infrastructure</span>
            </div>

            <div className="mt-2.5 text-xl sm:text-2xl font-black tracking-tight text-slate-900">
              What to Expect on the Ground in {destination.name}
            </div>

            <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-600">
              {landmarkDesc}
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-3.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Voltage Standard
                </span>
                <p className="mt-1 text-sm font-black text-slate-900">
                  {destination.voltage}V • {destination.frequency}Hz
                </p>
                <p className="mt-0.5 text-[11px] text-slate-500">
                  Type {destination.plugTypes.join(', ')} Wall Sockets
                </p>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-3.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Road System
                </span>
                <p className="mt-1 text-sm font-black capitalize text-slate-900">
                  Drives on {destination.drivingSide}
                </p>
                <p className="mt-0.5 text-[11px] text-slate-500">
                  {origin.drivingSide !== destination.drivingSide
                    ? `⚠️ Opposite to ${origin.name} (${origin.drivingSide})`
                    : `Same side as ${origin.name}`}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-2 rounded-xl bg-blue-50/70 p-3 text-xs text-blue-900 border border-blue-100">
            <Sparkles className="h-4 w-4 shrink-0 text-blue-600" />
            <span>
              Always verify voltage ratings on single-voltage high-heat styling tools before plugging in.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
