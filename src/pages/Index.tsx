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
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0a0a0a] to-[#1a0f00] relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNEREFGMzciIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDE4YzAtOS45LTgtMTgtMTgtMThzLTE4IDguMS0xOCAxOCA4LjEgMTggMTggMTggMTgtOC4xIDE4LTE4eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
      
      <div className="container mx-auto px-4 py-8 max-w-6xl relative z-10">
        <header className="text-center mb-10 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/10 to-transparent blur-3xl"></div>
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-gold-light via-gold to-gold-dark bg-clip-text text-transparent mb-3 drop-shadow-2xl relative animate-pulse-glow">
            🎲 Dice Mins
          </h1>
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold"></div>
            <p className="text-gold-light text-xl tracking-widest uppercase">Casino Royale</p>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold"></div>
          </div>
          <p className="text-gold/60 text-sm">Premium Luxury Gaming Experience</p>
        </header>

        <div className="mb-8 bg-gradient-to-br from-card/80 via-card/60 to-card/80 backdrop-blur-xl border-2 border-gold/30 rounded-2xl p-8 gold-glow relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gold/5 rounded-full blur-3xl"></div>
          <div className="flex items-center justify-center gap-6 relative z-10">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center gold-glow">
              <Icon name="Wallet" className="text-black" size={32} />
            </div>
            <div>
              <p className="text-sm text-gold-light/80 tracking-wide uppercase mb-1">Ваш баланс</p>
              <p className="text-5xl font-bold bg-gradient-to-r from-gold-light via-gold to-gold-light bg-clip-text text-transparent">
                ${balance.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="dice" className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-card/50 backdrop-blur-xl border-2 border-gold/20 p-2 gap-2 rounded-2xl">
            <TabsTrigger 
              value="dice" 
              className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-gold data-[state=active]:to-gold-dark data-[state=active]:text-black data-[state=active]:shadow-lg data-[state=active]:shadow-gold/50 transition-all duration-300 rounded-xl"
            >
              <Icon name="Dices" size={20} className="mr-1" />
              <span className="hidden sm:inline">Кости</span>
            </TabsTrigger>
            <TabsTrigger 
              value="slots" 
              className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-gold data-[state=active]:to-gold-dark data-[state=active]:text-black data-[state=active]:shadow-lg data-[state=active]:shadow-gold/50 transition-all duration-300 rounded-xl"
            >
              <Icon name="Cherry" size={20} className="mr-1" />
              <span className="hidden sm:inline">Слоты</span>
            </TabsTrigger>
            <TabsTrigger 
              value="roulette" 
              className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-gold data-[state=active]:to-gold-dark data-[state=active]:text-black data-[state=active]:shadow-lg data-[state=active]:shadow-gold/50 transition-all duration-300 rounded-xl"
            >
              <Icon name="CircleDot" size={20} className="mr-1" />
              <span className="hidden sm:inline">Рулетка</span>
            </TabsTrigger>
            <TabsTrigger 
              value="profile" 
              className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-gold data-[state=active]:to-gold-dark data-[state=active]:text-black data-[state=active]:shadow-lg data-[state=active]:shadow-gold/50 transition-all duration-300 rounded-xl"
            >
              <Icon name="User" size={20} className="mr-1" />
              <span className="hidden sm:inline">Профиль</span>
            </TabsTrigger>
            <TabsTrigger 
              value="history" 
              className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-gold data-[state=active]:to-gold-dark data-[state=active]:text-black data-[state=active]:shadow-lg data-[state=active]:shadow-gold/50 transition-all duration-300 rounded-xl"
            >
              <Icon name="History" size={20} className="mr-1" />
              <span className="hidden sm:inline">История</span>
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