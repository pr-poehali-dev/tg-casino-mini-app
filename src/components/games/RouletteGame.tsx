import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import Icon from '@/components/ui/icon';

interface RouletteGameProps {
  balance: number;
  setBalance: (balance: number) => void;
  addToHistory: (game: string, bet: number, result: number, win: boolean) => void;
}

const RED_NUMBERS = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
const BLACK_NUMBERS = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35];

export default function RouletteGame({ balance, setBalance, addToHistory }: RouletteGameProps) {
  const [bet, setBet] = useState(100);
  const [betType, setBetType] = useState<'red' | 'black' | 'even' | 'odd'>('red');
  const [result, setResult] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);

  const spin = () => {
    if (bet > balance) {
      toast.error('Недостаточно средств!');
      return;
    }

    setIsSpinning(true);
    setBalance(balance - bet);

    setTimeout(() => {
      const number = Math.floor(Math.random() * 37);
      setResult(number);

      let won = false;
      if (betType === 'red' && RED_NUMBERS.includes(number)) won = true;
      if (betType === 'black' && BLACK_NUMBERS.includes(number)) won = true;
      if (betType === 'even' && number % 2 === 0 && number !== 0) won = true;
      if (betType === 'odd' && number % 2 === 1) won = true;

      const winAmount = won ? bet * 2 : 0;

      if (won) {
        setBalance((prev) => prev + winAmount);
        toast.success(`Выигрыш! +$${winAmount}`, {
          description: `Выпало: ${number}`,
        });
      } else {
        toast.error(`Проигрыш! -$${bet}`, {
          description: `Выпало: ${number}`,
        });
      }

      addToHistory('Roulette', bet, winAmount, won);
      setIsSpinning(false);
    }, 2000);
  };

  const getNumberColor = (num: number) => {
    if (num === 0) return 'bg-success';
    if (RED_NUMBERS.includes(num)) return 'bg-accent';
    return 'bg-foreground';
  };

  return (
    <Card className="p-8 bg-card border-gold/30 gold-glow">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gold mb-2">Рулетка</h2>
        <p className="text-muted-foreground">Делайте ставки!</p>
      </div>

      <div className="flex flex-col items-center mb-8">
        <div
          className={`w-48 h-48 rounded-full border-8 border-gold flex items-center justify-center relative ${
            isSpinning ? 'animate-spin-slow' : ''
          } bg-gradient-to-br from-card to-muted shadow-2xl`}
        >
          <div
            className={`w-24 h-24 rounded-full ${getNumberColor(
              result
            )} flex items-center justify-center text-4xl font-bold text-white shadow-xl`}
          >
            {result}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="text-sm text-gold-light mb-2 block">Тип ставки</label>
          <div className="grid grid-cols-2 gap-2">
            <Button
              onClick={() => setBetType('red')}
              variant={betType === 'red' ? 'default' : 'outline'}
              className={betType === 'red' ? 'bg-accent text-white' : 'border-accent/50 text-accent'}
            >
              <Icon name="Circle" className="mr-2 fill-current" size={20} />
              Красное
            </Button>
            <Button
              onClick={() => setBetType('black')}
              variant={betType === 'black' ? 'default' : 'outline'}
              className={
                betType === 'black' ? 'bg-foreground text-background' : 'border-foreground/50 text-foreground'
              }
            >
              <Icon name="Circle" className="mr-2 fill-current" size={20} />
              Черное
            </Button>
            <Button
              onClick={() => setBetType('even')}
              variant={betType === 'even' ? 'default' : 'outline'}
              className={betType === 'even' ? 'bg-gold text-black' : 'border-gold/30 text-gold'}
            >
              Четное
            </Button>
            <Button
              onClick={() => setBetType('odd')}
              variant={betType === 'odd' ? 'default' : 'outline'}
              className={betType === 'odd' ? 'bg-gold text-black' : 'border-gold/30 text-gold'}
            >
              Нечетное
            </Button>
          </div>
        </div>

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

        <Button
          onClick={spin}
          disabled={isSpinning || bet > balance}
          className="w-full bg-gradient-to-r from-gold via-gold-light to-gold text-black font-bold text-xl py-6 hover:opacity-90 transition-all gold-glow"
          size="lg"
        >
          {isSpinning ? (
            <>
              <Icon name="Loader2" className="mr-2 animate-spin" size={24} />
              Крутим...
            </>
          ) : (
            <>
              <Icon name="CircleDot" className="mr-2" size={24} />
              Запустить (${bet})
            </>
          )}
        </Button>
      </div>
    </Card>
  );
}
