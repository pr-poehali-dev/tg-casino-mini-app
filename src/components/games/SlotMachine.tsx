import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import Icon from '@/components/ui/icon';

interface SlotMachineProps {
  balance: number;
  setBalance: (balance: number) => void;
  addToHistory: (game: string, bet: number, result: number, win: boolean) => void;
}

const SYMBOLS = ['🍒', '🍋', '🍊', '🍇', '💎', '7️⃣'];

export default function SlotMachine({ balance, setBalance, addToHistory }: SlotMachineProps) {
  const [bet, setBet] = useState(100);
  const [reels, setReels] = useState(['🍒', '🍋', '🍊']);
  const [isSpinning, setIsSpinning] = useState(false);

  const spin = () => {
    if (bet > balance) {
      toast.error('Недостаточно средств!');
      return;
    }

    setIsSpinning(true);
    setBalance(balance - bet);

    setTimeout(() => {
      const newReels = [
        SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
        SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
        SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
      ];
      setReels(newReels);

      let multiplier = 0;
      if (newReels[0] === newReels[1] && newReels[1] === newReels[2]) {
        if (newReels[0] === '7️⃣') multiplier = 10;
        else if (newReels[0] === '💎') multiplier = 7;
        else multiplier = 5;
      } else if (newReels[0] === newReels[1] || newReels[1] === newReels[2]) {
        multiplier = 2;
      }

      const won = multiplier > 0;
      const winAmount = won ? bet * multiplier : 0;

      if (won) {
        setBalance((prev) => prev + winAmount);
        toast.success(`Джекпот! +$${winAmount}`, {
          description: `Множитель x${multiplier}`,
        });
      } else {
        toast.error(`Не повезло! -$${bet}`);
      }

      addToHistory('Slots', bet, winAmount, won);
      setIsSpinning(false);
    }, 1000);
  };

  return (
    <Card className="p-10 bg-gradient-to-br from-card/90 via-card/70 to-card/90 backdrop-blur-xl border-2 border-gold/30 gold-glow relative overflow-hidden rounded-3xl">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-gold/5 rounded-full blur-3xl"></div>
      
      <div className="text-center mb-10 relative z-10">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-gold-light via-gold to-gold-dark bg-clip-text text-transparent mb-3">
          🎰 Слот-машина
        </h2>
        <p className="text-gold/60 text-lg">3 одинаковых символа = джекпот!</p>
      </div>

      <div className="relative mb-10 z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-gold/10 via-gold/5 to-gold/10 rounded-3xl blur-2xl"></div>
        <div className="bg-gradient-to-br from-black via-black/90 to-black p-10 rounded-3xl border-4 border-gold/40 shadow-2xl relative">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-gold to-transparent opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-gold to-transparent opacity-50"></div>
          <div className="flex justify-center gap-6">
            {reels.map((symbol, index) => (
              <div key={index} className="relative">
                <div className="absolute inset-0 bg-gold/20 rounded-2xl blur-lg"></div>
                <div
                  className={`w-32 h-32 bg-gradient-to-br from-gold-light via-gold to-gold-dark rounded-2xl flex items-center justify-center text-7xl shadow-2xl border-4 border-gold-light/50 relative ${
                    isSpinning ? 'animate-slot-spin' : ''
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {symbol}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-6 relative z-10">
        <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-gold/10">
          <label className="text-sm text-gold-light/90 mb-3 block uppercase tracking-wider">Размер ставки</label>
          <div className="grid grid-cols-5 gap-2">
            {[50, 100, 250, 500, 1000].map((amount) => (
              <Button
                key={amount}
                onClick={() => setBet(amount)}
                variant={bet === amount ? 'default' : 'outline'}
                className={bet === amount 
                  ? 'bg-gradient-to-br from-gold to-gold-dark text-black hover:opacity-90 border-2 border-gold shadow-lg shadow-gold/30' 
                  : 'border-2 border-gold/20 text-gold hover:border-gold/40 hover:bg-gold/5'}
              >
                ${amount}
              </Button>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm p-6 rounded-2xl border-2 border-gold/20">
          <p className="text-base text-gold font-semibold mb-4 uppercase tracking-wider">💰 Таблица выплат</p>
          <div className="grid grid-cols-2 gap-3 text-base">
            <div className="flex items-center gap-2 bg-gold/5 p-3 rounded-xl border border-gold/10">
              <span className="text-2xl">7️⃣ 7️⃣ 7️⃣</span>
              <span className="text-gold font-bold">→ x10</span>
            </div>
            <div className="flex items-center gap-2 bg-gold/5 p-3 rounded-xl border border-gold/10">
              <span className="text-2xl">💎 💎 💎</span>
              <span className="text-gold font-bold">→ x7</span>
            </div>
            <div className="flex items-center gap-2 bg-gold/5 p-3 rounded-xl border border-gold/10">
              <span className="text-2xl">🍒 🍒 🍒</span>
              <span className="text-gold font-bold">→ x5</span>
            </div>
            <div className="flex items-center gap-2 bg-gold/5 p-3 rounded-xl border border-gold/10">
              <span className="text-xl">Пара</span>
              <span className="text-gold font-bold">→ x2</span>
            </div>
          </div>
        </div>

        <Button
          onClick={spin}
          disabled={isSpinning || bet > balance}
          className="w-full bg-gradient-to-r from-gold via-gold-light to-gold text-black font-bold text-2xl py-8 hover:scale-105 transition-all duration-300 gold-glow shadow-2xl shadow-gold/40 rounded-2xl border-2 border-gold-light disabled:opacity-50 disabled:hover:scale-100"
          size="lg"
        >
          {isSpinning ? (
            <>
              <Icon name="Loader2" className="mr-2 animate-spin" size={24} />
              Вращение...
            </>
          ) : (
            <>
              <Icon name="Cherry" className="mr-2" size={24} />
              Крутить (${bet})
            </>
          )}
        </Button>
      </div>
    </Card>
  );
}