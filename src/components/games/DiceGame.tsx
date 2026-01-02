import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import Icon from '@/components/ui/icon';

interface DiceGameProps {
  balance: number;
  setBalance: (balance: number) => void;
  addToHistory: (game: string, bet: number, result: number, win: boolean) => void;
}

export default function DiceGame({ balance, setBalance, addToHistory }: DiceGameProps) {
  const [bet, setBet] = useState(100);
  const [multiplier, setMultiplier] = useState(2);
  const [dice1, setDice1] = useState(1);
  const [dice2, setDice2] = useState(1);
  const [isRolling, setIsRolling] = useState(false);

  const rollDice = () => {
    if (bet > balance) {
      toast.error('Недостаточно средств!');
      return;
    }

    setIsRolling(true);
    setBalance(balance - bet);

    setTimeout(() => {
      const d1 = Math.floor(Math.random() * 6) + 1;
      const d2 = Math.floor(Math.random() * 6) + 1;
      setDice1(d1);
      setDice2(d2);

      const sum = d1 + d2;
      const won = sum >= 7;
      const winAmount = won ? bet * multiplier : 0;

      if (won) {
        setBalance((prev) => prev + winAmount);
        toast.success(`Выигрыш! +$${winAmount}`, {
          description: `Выпало: ${d1} + ${d2} = ${sum}`,
        });
      } else {
        toast.error(`Проигрыш! -$${bet}`, {
          description: `Выпало: ${d1} + ${d2} = ${sum}`,
        });
      }

      addToHistory('Dice', bet, winAmount, won);
      setIsRolling(false);
    }, 600);
  };

  return (
    <Card className="p-10 bg-gradient-to-br from-card/90 via-card/70 to-card/90 backdrop-blur-xl border-2 border-gold/30 gold-glow relative overflow-hidden rounded-3xl">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-gold/5 rounded-full blur-3xl"></div>
      
      <div className="text-center mb-10 relative z-10">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-gold-light via-gold to-gold-dark bg-clip-text text-transparent mb-3">
          🎲 Игра в кости
        </h2>
        <p className="text-gold/60 text-lg">Сумма ≥ 7 — выигрыш!</p>
      </div>

      <div className="flex justify-center gap-8 mb-10 relative z-10">
        <div className="relative">
          <div className="absolute inset-0 bg-gold/20 rounded-2xl blur-xl"></div>
          <div
            className={`w-28 h-28 bg-gradient-to-br from-gold via-gold-light to-gold-dark rounded-2xl flex items-center justify-center text-6xl font-bold text-black shadow-2xl border-4 border-gold/50 relative ${
              isRolling ? 'animate-bounce-dice' : ''
            }`}
          >
            {dice1}
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-gold/20 rounded-2xl blur-xl"></div>
          <div
            className={`w-28 h-28 bg-gradient-to-br from-gold via-gold-light to-gold-dark rounded-2xl flex items-center justify-center text-6xl font-bold text-black shadow-2xl border-4 border-gold/50 relative ${
              isRolling ? 'animate-bounce-dice' : ''
            }`}
            style={{ animationDelay: '0.1s' }}
          >
            {dice2}
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

        <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-gold/10">
          <label className="text-sm text-gold-light/90 mb-3 block uppercase tracking-wider">Множитель</label>
          <div className="grid grid-cols-4 gap-2">
            {[1.5, 2, 3, 5].map((mult) => (
              <Button
                key={mult}
                onClick={() => setMultiplier(mult)}
                variant={multiplier === mult ? 'default' : 'outline'}
                className={multiplier === mult 
                  ? 'bg-gradient-to-br from-gold to-gold-dark text-black hover:opacity-90 border-2 border-gold shadow-lg shadow-gold/30' 
                  : 'border-2 border-gold/20 text-gold hover:border-gold/40 hover:bg-gold/5'}
              >
                x{mult}
              </Button>
            ))}
          </div>
        </div>

        <Button
          onClick={rollDice}
          disabled={isRolling || bet > balance}
          className="w-full bg-gradient-to-r from-gold via-gold-light to-gold text-black font-bold text-2xl py-8 hover:scale-105 transition-all duration-300 gold-glow shadow-2xl shadow-gold/40 rounded-2xl border-2 border-gold-light disabled:opacity-50 disabled:hover:scale-100"
          size="lg"
        >
          {isRolling ? (
            <>
              <Icon name="Loader2" className="mr-3 animate-spin" size={28} />
              Бросаем...
            </>
          ) : (
            <>
              <Icon name="Dices" className="mr-3" size={28} />
              Бросить кости (${bet})
            </>
          )}
        </Button>
      </div>
    </Card>
  );
}