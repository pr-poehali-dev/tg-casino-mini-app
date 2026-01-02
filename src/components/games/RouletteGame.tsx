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
    <Card className="p-10 bg-gradient-to-br from-card/90 via-card/70 to-card/90 backdrop-blur-xl border-2 border-gold/30 gold-glow relative overflow-hidden rounded-3xl">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-gold/5 rounded-full blur-3xl"></div>
      
      <div className="text-center mb-10 relative z-10">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-gold-light via-gold to-gold-dark bg-clip-text text-transparent mb-3">
          🎯 Рулетка
        </h2>
        <p className="text-gold/60 text-lg">Делайте ставки!</p>
      </div>

      <div className="flex flex-col items-center mb-10 relative z-10">
        <div className="relative">
          <div className="absolute inset-0 bg-gold/20 rounded-full blur-2xl"></div>
          <div
            className={`w-64 h-64 rounded-full border-8 border-gold shadow-2xl shadow-gold/30 flex items-center justify-center relative ${
              isSpinning ? 'animate-spin-slow' : ''
            } bg-gradient-to-br from-black via-card to-black`}
          >
            <div className="absolute inset-4 rounded-full border-4 border-gold/30"></div>
            <div
              className={`w-32 h-32 rounded-full ${getNumberColor(
                result
              )} flex items-center justify-center text-6xl font-bold text-white shadow-2xl border-4 border-white/20 relative z-10`}
            >
              {result}
            </div>
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gold/50"></div>
            <div className="absolute top-0 left-1/2 w-1 h-full bg-gold/50"></div>
          </div>
        </div>
      </div>

      <div className="space-y-6 relative z-10">
        <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-gold/10">
          <label className="text-sm text-gold-light/90 mb-3 block uppercase tracking-wider">Тип ставки</label>
          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={() => setBetType('red')}
              variant={betType === 'red' ? 'default' : 'outline'}
              className={betType === 'red' 
                ? 'bg-gradient-to-br from-red-600 to-red-800 text-white hover:opacity-90 border-2 border-red-400 shadow-lg shadow-red-500/30' 
                : 'border-2 border-red-500/30 text-red-400 hover:border-red-500/50 hover:bg-red-500/5'}
            >
              <Icon name="Circle" className="mr-2 fill-current" size={20} />
              Красное
            </Button>
            <Button
              onClick={() => setBetType('black')}
              variant={betType === 'black' ? 'default' : 'outline'}
              className={betType === 'black'
                ? 'bg-gradient-to-br from-gray-700 to-black text-white hover:opacity-90 border-2 border-gray-400 shadow-lg shadow-gray-500/30'
                : 'border-2 border-gray-500/30 text-gray-300 hover:border-gray-500/50 hover:bg-gray-500/5'}
            >
              <Icon name="Circle" className="mr-2 fill-current" size={20} />
              Черное
            </Button>
            <Button
              onClick={() => setBetType('even')}
              variant={betType === 'even' ? 'default' : 'outline'}
              className={betType === 'even' 
                ? 'bg-gradient-to-br from-gold to-gold-dark text-black hover:opacity-90 border-2 border-gold shadow-lg shadow-gold/30' 
                : 'border-2 border-gold/20 text-gold hover:border-gold/40 hover:bg-gold/5'}
            >
              Четное
            </Button>
            <Button
              onClick={() => setBetType('odd')}
              variant={betType === 'odd' ? 'default' : 'outline'}
              className={betType === 'odd' 
                ? 'bg-gradient-to-br from-gold to-gold-dark text-black hover:opacity-90 border-2 border-gold shadow-lg shadow-gold/30' 
                : 'border-2 border-gold/20 text-gold hover:border-gold/40 hover:bg-gold/5'}
            >
              Нечетное
            </Button>
          </div>
        </div>

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

        <Button
          onClick={spin}
          disabled={isSpinning || bet > balance}
          className="w-full bg-gradient-to-r from-gold via-gold-light to-gold text-black font-bold text-2xl py-8 hover:scale-105 transition-all duration-300 gold-glow shadow-2xl shadow-gold/40 rounded-2xl border-2 border-gold-light disabled:opacity-50 disabled:hover:scale-100"
          size="lg"
        >
          {isSpinning ? (
            <>
              <Icon name="Loader2" className="mr-3 animate-spin" size={28} />
              Крутим...
            </>
          ) : (
            <>
              <Icon name="CircleDot" className="mr-3" size={28} />
              Запустить (${bet})
            </>
          )}
        </Button>
      </div>
    </Card>
  );
}