import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DiceGame from '@/components/games/DiceGame';
import SlotMachine from '@/components/games/SlotMachine';
import RouletteGame from '@/components/games/RouletteGame';
import ProfileSection from '@/components/ProfileSection';
import HistorySection from '@/components/HistorySection';
import Icon from '@/components/ui/icon';

export default function Index() {
  const [balance, setBalance] = useState(10000);
  const [history, setHistory] = useState<any[]>([]);

  const addToHistory = (game: string, bet: number, result: number, win: boolean) => {
    const newEntry = {
      id: Date.now(),
      game,
      bet,
      result,
      win,
      timestamp: new Date().toISOString(),
    };
    setHistory([newEntry, ...history]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gold gold-text-glow mb-2">
            🎲 Dice Mins Casino
          </h1>
          <p className="text-gold-light text-lg">Premium Luxury Gaming Experience</p>
        </header>

        <div className="mb-6 bg-card border border-gold/20 rounded-xl p-6 gold-glow">
          <div className="flex items-center justify-center gap-4">
            <Icon name="Wallet" className="text-gold" size={32} />
            <div>
              <p className="text-sm text-muted-foreground">Ваш баланс</p>
              <p className="text-3xl font-bold text-gold">${balance.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="dice" className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-card border border-gold/20 p-1">
            <TabsTrigger value="dice" className="data-[state=active]:bg-gold data-[state=active]:text-black">
              <Icon name="Dices" size={20} className="mr-2" />
              Кости
            </TabsTrigger>
            <TabsTrigger value="slots" className="data-[state=active]:bg-gold data-[state=active]:text-black">
              <Icon name="Cherry" size={20} className="mr-2" />
              Слоты
            </TabsTrigger>
            <TabsTrigger value="roulette" className="data-[state=active]:bg-gold data-[state=active]:text-black">
              <Icon name="CircleDot" size={20} className="mr-2" />
              Рулетка
            </TabsTrigger>
            <TabsTrigger value="profile" className="data-[state=active]:bg-gold data-[state=active]:text-black">
              <Icon name="User" size={20} className="mr-2" />
              Профиль
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-gold data-[state=active]:text-black">
              <Icon name="History" size={20} className="mr-2" />
              История
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dice" className="mt-6">
            <DiceGame
              balance={balance}
              setBalance={setBalance}
              addToHistory={addToHistory}
            />
          </TabsContent>

          <TabsContent value="slots" className="mt-6">
            <SlotMachine
              balance={balance}
              setBalance={setBalance}
              addToHistory={addToHistory}
            />
          </TabsContent>

          <TabsContent value="roulette" className="mt-6">
            <RouletteGame
              balance={balance}
              setBalance={setBalance}
              addToHistory={addToHistory}
            />
          </TabsContent>

          <TabsContent value="profile" className="mt-6">
            <ProfileSection balance={balance} history={history} />
          </TabsContent>

          <TabsContent value="history" className="mt-6">
            <HistorySection history={history} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
