import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, PanInfo, AnimatePresence, useAnimation } from 'framer-motion';
import confetti from 'canvas-confetti';
import { ANIMALS, ZONES } from './constants';
import { Animal, Habitat } from './types';

const App: React.FC = () => {
  const [currentAnimal, setCurrentAnimal] = useState<Animal | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [score, setScore] = useState(0);
  
  // We use a separate animation control for the INNER container to handle shaking.
  // This prevents conflicts with the OUTER container's drag coordinates.
  const shakeControls = useAnimation();

  // Pick a random animal
  const pickRandomAnimal = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * ANIMALS.length);
    setCurrentAnimal(ANIMALS[randomIndex]);
    setIsSuccess(false);
  }, []);

  // Initial load
  useEffect(() => {
    pickRandomAnimal();
  }, [pickRandomAnimal]);

  // Success Logic
  const handleSuccess = () => {
    setIsSuccess(true);
    setScore(prev => prev + 1);
    
    // Confetti
    const end = Date.now() + 1000;
    const colors = ['#FFC0CB', '#87CEEB', '#98FB98', '#FFD700'];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());

    setTimeout(() => {
      pickRandomAnimal();
    }, 1500);
  };

  // Error Logic
  const handleError = async () => {
    // Trigger the shake on the INNER container
    await shakeControls.start({
      x: [-10, 10, -10, 10, 0],
      rotate: [-5, 5, -5, 5, 0],
      transition: { duration: 0.4 }
    });
  };

  // Drag End Handler
  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (!currentAnimal || isSuccess) return;

    // Simple collision detection based on pointer coordinates
    // This is more robust than layout projection for simple grids
    const point = { x: info.point.x, y: info.point.y };
    const elements = document.elementsFromPoint(point.x, point.y);
    
    // Find if we dropped it on a valid zone
    const droppedZone = elements.find(el => el.hasAttribute('data-zone-id'));
    
    if (droppedZone) {
      const zoneId = droppedZone.getAttribute('data-zone-id') as Habitat;
      if (zoneId === currentAnimal.habitat) {
        handleSuccess();
      } else {
        handleError();
      }
    } else {
      // If dropped in empty space, just shake to indicate "not here"
      // The dragSnapToOrigin prop handles the return movement automatically
      handleError();
    }
  };

  const handleZoneClick = (zoneId: Habitat) => {
    if (!currentAnimal || isSuccess) return;
    if (zoneId === currentAnimal.habitat) {
      handleSuccess();
    } else {
      handleError();
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-yellow-50 font-sans overflow-hidden select-none">
      
      {/* Score Board */}
      <div className="absolute top-4 right-4 z-50 pointer-events-none">
        <div className="bg-white/90 backdrop-blur-sm px-6 py-2 rounded-full shadow-lg border-2 border-orange-200">
          <span className="text-2xl font-bold text-orange-500">⭐️ {score}</span>
        </div>
      </div>

      {/* --- Game Zones (Top 70%) --- */}
      <div className="flex-1 flex flex-col w-full h-[70%]">
        {ZONES.map((zone) => (
          <div
            key={zone.id}
            data-zone-id={zone.id} // Critical for collision detection
            onClick={() => handleZoneClick(zone.id)}
            className={`flex-1 w-full relative flex items-center justify-between px-6 transition-colors duration-300 ${zone.colorClass} border-b-4 ${zone.borderColor}`}
          >
            {/* Background Icon (Decorative) */}
            <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none overflow-hidden">
              <span className="text-[10rem] transform scale-150">{zone.icon}</span>
            </div>

            {/* Label */}
            <div className={`z-10 flex items-center gap-4 ${zone.textClass} pointer-events-none`}>
              <span className="text-5xl filter drop-shadow-sm">{zone.icon}</span>
              <span className="text-3xl font-black tracking-wide">{zone.label.split(' ')[0]}</span>
            </div>
            
            {/* Target Hint */}
            <div className={`z-10 w-20 h-20 border-4 border-dashed rounded-xl opacity-50 ${zone.borderColor} flex items-center justify-center pointer-events-none`}>
                 <span className="text-2xl">📍</span>
            </div>
          </div>
        ))}
      </div>

      {/* --- Spawning Area (Bottom 30%) --- */}
      <div className="h-[30%] bg-white relative flex flex-col items-center justify-center shadow-[0_-10px_30px_rgba(0,0,0,0.05)] z-40">
        
        {/* Instruction Text */}
        <p className="absolute top-4 text-gray-400 text-sm font-bold uppercase tracking-widest pointer-events-none opacity-60">
          拖动动物到它的家
        </p>

        <AnimatePresence mode="wait">
          {currentAnimal && !isSuccess && (
            /* 
              OUTER MOTION DIV: Handles Enter/Exit Animation + Dragging. 
              It does NOT handle the Shake animation. This separation is key.
            */
            <motion.div
              key={currentAnimal.id} // Forces remount on new animal -> Plays initial animation
              initial={{ scale: 0, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0, opacity: 0, transition: { duration: 0.2 } }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              
              // Drag Configuration
              drag
              dragSnapToOrigin={true} // Automatically bounces back if released
              dragElastic={0.1}
              dragMomentum={false}
              onDragEnd={handleDragEnd}
              
              // Interaction Styling
              whileHover={{ scale: 1.05, cursor: 'grab' }}
              whileTap={{ scale: 1.1, cursor: 'grabbing' }}
              
              className="z-50 touch-none"
              style={{ 
                width: '9rem', 
                height: '9rem', 
                touchAction: 'none' // Critical for preventing browser scroll interference
              }}
            >
              {/* 
                INNER MOTION DIV: Handles Shake Animation independently.
                This ensures shaking doesn't reset the drag position coordinates.
              */}
              <motion.div
                animate={shakeControls}
                className="w-full h-full bg-white rounded-3xl shadow-2xl border-4 border-white overflow-hidden relative"
              >
                <img 
                  src={currentAnimal.imageUrl} 
                  alt={currentAnimal.name}
                  className="w-full h-full object-cover pointer-events-none"
                  draggable={false} // Disable native HTML5 drag to avoid conflicts
                />
              </motion.div>
            </motion.div>
          )}

          {/* Success Indicator */}
          {isSuccess && (
             <motion.div
               key="success-indicator"
               initial={{ scale: 0, rotate: -180 }}
               animate={{ scale: 1, rotate: 0 }}
               exit={{ scale: 0, opacity: 0 }}
               className="flex flex-col items-center justify-center z-50 pointer-events-none"
             >
               <div className="text-[6rem] leading-none drop-shadow-xl filter">✅</div>
               <div className="text-3xl font-bold text-green-500 mt-2">答对了!</div>
             </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default App;