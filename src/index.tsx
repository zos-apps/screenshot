import { useState } from 'react';

interface ScreenshotProps {
  onClose: () => void;
}

type CaptureMode = 'fullscreen' | 'window' | 'selection' | 'timed';

const Screenshot: React.FC<ScreenshotProps> = ({ onClose: _onClose }) => {
  const [mode, setMode] = useState<CaptureMode>('fullscreen');
  const [timer, setTimer] = useState(5);
  const [showPointer, setShowPointer] = useState(true);
  const [playSound, setPlaySound] = useState(true);
  const [recentCaptures, setRecentCaptures] = useState<string[]>([]);

  const capture = () => {
    const timestamp = new Date().toLocaleTimeString();
    setRecentCaptures(prev => [`Screenshot at ${timestamp}`, ...prev.slice(0, 4)]);
  };

  const modes: { id: CaptureMode; icon: string; label: string }[] = [
    { id: 'fullscreen', icon: '🖥️', label: 'Full Screen' },
    { id: 'window', icon: '⬜', label: 'Window' },
    { id: 'selection', icon: '✂️', label: 'Selection' },
    { id: 'timed', icon: '⏱️', label: 'Timed' },
  ];

  return (
    <div className="h-full flex flex-col bg-[#2d2d2d] text-white">
      <div className="p-4 border-b border-white/10">
        <h2 className="text-lg font-semibold mb-3">Capture Mode</h2>
        <div className="grid grid-cols-4 gap-2">
          {modes.map(m => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={`p-3 rounded-lg text-center transition-colors
                ${mode === m.id ? 'bg-blue-600' : 'bg-white/10 hover:bg-white/20'}
              `}
            >
              <div className="text-2xl mb-1">{m.icon}</div>
              <div className="text-xs">{m.label}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 border-b border-white/10 space-y-3">
        {mode === 'timed' && (
          <div className="flex items-center justify-between">
            <span className="text-sm">Delay</span>
            <div className="flex gap-2">
              {[3, 5, 10].map(t => (
                <button
                  key={t}
                  onClick={() => setTimer(t)}
                  className={`px-3 py-1 rounded text-sm
                    ${timer === t ? 'bg-blue-600' : 'bg-white/10'}
                  `}
                >
                  {t}s
                </button>
              ))}
            </div>
          </div>
        )}

        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-sm">Show mouse pointer</span>
          <input
            type="checkbox"
            checked={showPointer}
            onChange={e => setShowPointer(e.target.checked)}
            className="w-4 h-4 accent-blue-500"
          />
        </label>

        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-sm">Play sound</span>
          <input
            type="checkbox"
            checked={playSound}
            onChange={e => setPlaySound(e.target.checked)}
            className="w-4 h-4 accent-blue-500"
          />
        </label>
      </div>

      <div className="flex-1 p-4 overflow-auto">
        <h3 className="text-xs font-semibold text-white/50 uppercase mb-2">Recent Captures</h3>
        {recentCaptures.length === 0 ? (
          <div className="text-sm text-white/40 text-center py-4">No recent captures</div>
        ) : (
          <div className="space-y-2">
            {recentCaptures.map((c, i) => (
              <div key={i} className="p-2 bg-white/5 rounded text-sm">
                📷 {c}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="p-4 border-t border-white/10">
        <button
          onClick={capture}
          className="w-full py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium transition-colors"
        >
          📷 Capture
        </button>
      </div>
    </div>
  );
};

export default Screenshot;
