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
    <Card className="p-8 bg-card border-gold/30 gold-glow">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gold mb-2">Слот-машина</h2>
        <p className="text-muted-foreground">3 одинаковых символа = джекпот!</p>
      </div>

      <div className="flex justify-center gap-4 mb-8 bg-black/40 p-8 rounded-xl border-2 border-gold/50">
        {reels.map((symbol, index) => (
          <div
            key={index}
            className={`w-32 h-32 bg-gradient-to-br from-gold-light to-gold rounded-xl flex items-center justify-center text-6xl shadow-2xl ${
              isSpinning ? 'animate-slot-spin' : ''
            }`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {symbol}
          </div>
        ))}
      </div>

      <div className="space-y-6">
        <div>
          <label className="text-sm text-gold-light mb-2 block">Размер ставки</label>
          <div className="flex gap-2">
            {[50, 100, 250, 500, 1000].map((amount) => (
              <Button
                key={amount}
                onClick={() => setBet(amount)}
                variant={bet === amount ? 'default' : 'outline'}
                className={bet === amount ? 'bg-gold text-black' : 'border-gold/30 text-gold'}
              >
                ${amount}
              </Button>
            ))}
          </div>
        </div>

        <div className="bg-muted/30 p-4 rounded-lg border border-gold/20">
          <p className="text-sm text-gold-light mb-2">Таблица выплат:</p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>7️⃣ 7️⃣ 7️⃣ → x10</div>
            <div>💎 💎 💎 → x7</div>
            <div>🍒 🍒 🍒 → x5</div>
            <div>Пара → x2</div>
          </div>
        </div>

        <Button
          onClick={spin}
          disabled={isSpinning || bet > balance}
          className="w-full bg-gradient-to-r from-gold via-gold-light to-gold text-black font-bold text-xl py-6 hover:opacity-90 transition-all gold-glow"
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
