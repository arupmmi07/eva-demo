import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Component2SarahChenFileIsBroughtToTheViewNoPaymentMethodIsSelected from '../imports/2SarahChenFileIsBroughtToTheViewNoPaymentMethodIsSelected/2SarahChenFileIsBroughtToTheViewNoPaymentMethodIsSelected';
import Component3PaymentIsChargedToCcInFile from '../imports/3PaymentIsChargedToCcInFile/3PaymentIsChargedToCcInFile';
import PaymentConfirmed from '../imports/PaymentConfirmed-1/PaymentConfirmed';

type PaymentStep = 'select' | 'processing' | 'confirmed';

export default function App() {
  const [step, setStep] = useState<PaymentStep>('select');
  const [autoProgress, setAutoProgress] = useState(false);

  useEffect(() => {
    if (!autoProgress) return;

    if (step === 'select') {
      const timer = setTimeout(() => setStep('processing'), 2500);
      return () => clearTimeout(timer);
    }

    if (step === 'processing') {
      const timer = setTimeout(() => setStep('confirmed'), 3000);
      return () => clearTimeout(timer);
    }
  }, [step, autoProgress]);

  const handleStart = () => {
    setAutoProgress(true);
    setStep('processing');
  };

  const handleReset = () => {
    setAutoProgress(false);
    setStep('select');
  };

  return (
    <div className="size-full relative overflow-hidden bg-[#fcfcfd]">
      <AnimatePresence mode="wait">
        {step === 'select' && (
          <motion.div
            key="select"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute inset-0"
          >
            <Component2SarahChenFileIsBroughtToTheViewNoPaymentMethodIsSelected />
          </motion.div>
        )}

        {step === 'processing' && (
          <motion.div
            key="processing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute inset-0"
          >
            <Component3PaymentIsChargedToCcInFile />
          </motion.div>
        )}

        {step === 'confirmed' && (
          <motion.div
            key="confirmed"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute inset-0"
          >
            <PaymentConfirmed />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Flow Control Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 flex gap-3"
      >
        {step === 'select' && (
          <motion.button
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
            onClick={handleStart}
            className="px-8 py-4 bg-gradient-to-r from-[#135bec] to-[#0047d1] text-white rounded-xl shadow-[0_8px_32px_rgba(19,91,236,0.3)] hover:shadow-[0_12px_48px_rgba(19,91,236,0.4)] transition-all duration-300 hover:scale-105 active:scale-95"
            style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 600, letterSpacing: '0.02em' }}
          >
            Start Payment Flow
          </motion.button>
        )}

        {step === 'confirmed' && (
          <motion.button
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.3 }}
            onClick={handleReset}
            className="px-8 py-4 bg-white text-[#135bec] border-2 border-[#135bec] rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:bg-[#135bec] hover:text-white transition-all duration-300 hover:scale-105 active:scale-95"
            style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 600, letterSpacing: '0.02em' }}
          >
            Reset Flow
          </motion.button>
        )}

        {step === 'processing' && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            className="px-8 py-4 bg-white/95 backdrop-blur-sm rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.12)] flex items-center gap-3"
          >
            <div className="w-5 h-5 border-3 border-[#135bec] border-t-transparent rounded-full animate-spin" />
            <span
              className="text-[#135bec]"
              style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 500 }}
            >
              Processing payment...
            </span>
          </motion.div>
        )}
      </motion.div>

      {/* Step Indicator */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        className="absolute top-8 left-8 z-50 flex gap-2"
      >
        {(['select', 'processing', 'confirmed'] as const).map((s, i) => (
          <motion.div
            key={s}
            className="relative"
            whileHover={{ scale: 1.1 }}
          >
            <div
              className={`w-3 h-3 rounded-full transition-all duration-500 ${
                step === s
                  ? 'bg-[#135bec] shadow-[0_0_16px_rgba(19,91,236,0.6)] scale-125'
                  : i < ['select', 'processing', 'confirmed'].indexOf(step)
                  ? 'bg-[#135bec]/60'
                  : 'bg-gray-300'
              }`}
            />
            {step === s && (
              <motion.div
                layoutId="activeStep"
                className="absolute inset-0 rounded-full border-2 border-[#135bec]"
                initial={false}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                style={{ scale: 1.8, opacity: 0.4 }}
              />
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}