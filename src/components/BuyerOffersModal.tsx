import React, { useState } from 'react';
import {
  X,
  Send,
  Building2,
  MapPin,
  CheckCircle,
  Phone,
  DollarSign,
  Scale,
} from 'lucide-react';
import { BuyerProfile, LocationState } from '../types';

interface BuyerOffersModalProps {
  buyer: BuyerProfile | null;
  currentLocation: LocationState;
  onClose: () => void;
}

export const BuyerOffersModal: React.FC<BuyerOffersModalProps> = ({
  buyer,
  currentLocation,
  onClose,
}) => {
  const [offerQuantityKg, setOfferQuantityKg] = useState<number>(500);
  const [offeredPricePerKg, setOfferedPricePerKg] = useState<number>(
    buyer?.expectedPricePerKg || 35,
  );
  const [selectedCrop, setSelectedCrop] = useState<string>(
    buyer?.cropsWanted?.[0] || 'Tomatoes',
  );
  const [notes, setNotes] = useState<string>(
    'Fresh harvested batch ready at farm gate with AI quality Grade A certification.',
  );
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  if (!buyer) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-md glass-modal rounded-2xl border border-[#b7efc5]/30 shadow-2xl p-6 text-[#dfe4e0]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#414844]">
          <div className="flex items-center gap-2">
            <Send className="w-4 h-4 text-[#b7efc5]" />
            <h3 className="font-bold text-base text-white font-['Montserrat']">
              Send Trade Offer
            </h3>
          </div>
          <button onClick={onClose} className="p-1 text-[#8b938d] hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-2">
            <CheckCircle className="w-12 h-12 text-[#b7efc5] mx-auto animate-bounce" />
            <h4 className="font-bold text-base text-white">Trade Offer Transmitted!</h4>
            <p className="text-xs text-[#a5d0b9]">
              {buyer.name} has been notified. You can expect a response or phone call within 30 minutes.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 mt-4 text-xs">
            {/* Buyer Brief */}
            <div className="p-3 rounded-xl bg-[#181d1a] border border-[#414844]/50 flex items-center gap-3">
              <img
                src={buyer.avatar}
                alt={buyer.name}
                className="w-10 h-10 rounded-lg object-cover border border-[#b7efc5]/30"
              />
              <div className="min-w-0">
                <h4 className="font-bold text-white text-xs truncate">{buyer.name}</h4>
                <div className="text-[11px] text-[#95d4b3] flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>{buyer.district}, {buyer.state}</span>
                </div>
              </div>
            </div>

            {/* Crop selection */}
            <div>
              <label className="block text-[#c1c8c2] mb-1 font-medium">Select Crop</label>
              <select
                value={selectedCrop}
                onChange={(e) => setSelectedCrop(e.target.value)}
                className="w-full bg-[#181d1a] border border-[#414844] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#b7efc5]"
              >
                {buyer.cropsWanted.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Quantity and Price */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[#c1c8c2] mb-1 font-medium">Quantity (kg)</label>
                <input
                  type="number"
                  min={50}
                  step={50}
                  required
                  value={offerQuantityKg}
                  onChange={(e) => setOfferQuantityKg(Number(e.target.value))}
                  className="w-full bg-[#181d1a] border border-[#414844] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#b7efc5]"
                />
              </div>

              <div>
                <label className="block text-[#c1c8c2] mb-1 font-medium">Offered Price (₹/kg)</label>
                <input
                  type="number"
                  min={1}
                  required
                  value={offeredPricePerKg}
                  onChange={(e) => setOfferedPricePerKg(Number(e.target.value))}
                  className="w-full bg-[#181d1a] border border-[#414844] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#b7efc5]"
                />
              </div>
            </div>

            {/* Total Deal Value Calculation */}
            <div className="p-3 rounded-xl bg-[#1b4332]/40 border border-[#b7efc5]/30 flex items-center justify-between">
              <span className="text-[#a5d0b9] font-medium">Total Offer Value:</span>
              <strong className="text-base font-bold text-[#b7efc5] font-['Montserrat']">
                ₹{(offerQuantityKg * offeredPricePerKg).toLocaleString('en-IN')}
              </strong>
            </div>

            {/* Farmer Farm Address */}
            <div>
              <label className="block text-[#c1c8c2] mb-1 font-medium">Pickup Farm Location</label>
              <div className="p-2.5 rounded-xl bg-[#141a17] border border-[#414844]/40 text-[#a5d0b9] flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#b7efc5]" />
                <span>{currentLocation.cityVillage}, {currentLocation.district}, {currentLocation.state} - {currentLocation.pincode}</span>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-[#c1c8c2] mb-1 font-medium">Message to Buyer</label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-[#181d1a] border border-[#414844] rounded-xl p-2.5 text-white focus:outline-none focus:border-[#b7efc5]"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl border border-[#414844] text-[#c1c8c2] hover:bg-[#262b29]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-[#b7efc5] text-[#0a0f0d] font-bold hover:bg-[#a5d0b9] shadow-md flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                Submit Offer
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
