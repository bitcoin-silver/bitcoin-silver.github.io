import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ThumbsUp } from "lucide-react";

export default function DeblockVotePopup() {
  const [visible, setVisible] = useState(true);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-4 right-4 z-[9999] w-[90%] max-w-[320px]"
        >
          <div
            className="rounded-2xl p-4 flex flex-col gap-3 shadow-xl border border-gray-700"
            style={{ backgroundColor: "#1c1c1c" }}
          >
            {/* Header */}
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <img src="/deblock.png" alt="Deblock" className="h-10 w-10" />
                <h3 className="text-lg font-semibold text-white">
                  Vote for Bitcoin Silver
                </h3>
              </div>
              <button
                onClick={() => setVisible(false)}
                className="text-gray-400 hover:text-gray-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <p className="text-sm text-gray-300">
              Bitcoin Silver is currently under consideration on Deblock.  
              Every single vote counts to get it listed.  
              Support BTCS now with just one click!
            </p>

            {/* Action button */}
            <a
              href="https://next.deblock.com/suggestions/678434/support-the-bitcoin-silver-blockchain"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex items-center justify-center gap-2 text-white font-medium py-2 px-4 rounded-xl transition-colors"
              style={{ backgroundColor: "#595959" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#4d4d4d")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#595959")}
            >
              <ThumbsUp className="w-4 h-4" />
              Vote for BTCS
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
