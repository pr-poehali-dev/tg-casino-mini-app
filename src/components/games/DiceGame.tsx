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
    <Card className="p-8 bg-card border-gold/30 gold-glow">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gold mb-2">Игра в кости</h2>
        <p className="text-muted-foreground">Сумма ≥ 7 — выигрыш!</p>
      </div>

      <div className="flex justify-center gap-8 mb-8">
        <div
          className={`w-24 h-24 bg-gradient-to-br from-gold to-gold-dark rounded-xl flex items-center justify-center text-5xl font-bold text-black shadow-2xl ${
            isRolling ? 'animate-bounce-dice' : ''
          }`}
        >
          {dice1}
        </div>
        <div
          className={`w-24 h-24 bg-gradient-to-br from-gold to-gold-dark rounded-xl flex items-center justify-center text-5xl font-bold text-black shadow-2xl ${
            isRolling ? 'animate-bounce-dice' : ''
          }`}
          style={{ animationDelay: '0.1s' }}
        >
          {dice2}
        </div>
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

        <div>
          <label className="text-sm text-gold-light mb-2 block">Множитель</label>
          <div className="flex gap-2">
            {[1.5, 2, 3, 5].map((mult) => (
              <Button
                key={mult}
                onClick={() => setMultiplier(mult)}
                variant={multiplier === mult ? 'default' : 'outline'}
                className={multiplier === mult ? 'bg-gold text-black' : 'border-gold/30 text-gold'}
              >
                x{mult}
              </Button>
            ))}
          </div>
        </div>

        <Button
          onClick={rollDice}
          disabled={isRolling || bet > balance}
          className="w-full bg-gradient-to-r from-gold via-gold-light to-gold text-black font-bold text-xl py-6 hover:opacity-90 transition-all gold-glow"
          size="lg"
        >
          {isRolling ? (
            <>
              <Icon name="Loader2" className="mr-2 animate-spin" size={24} />
              Бросаем...
            </>
          ) : (
            <>
              <Icon name="Dices" className="mr-2" size={24} />
              Бросить кости (${bet})
            </>
          )}
        </Button>
      </div>
    </Card>
  );
}
