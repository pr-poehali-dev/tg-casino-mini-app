import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface ProfileSectionProps {
  balance: number;
  history: any[];
}

export default function ProfileSection({ balance, history }: ProfileSectionProps) {
  const totalGames = history.length;
  const wins = history.filter((h) => h.win).length;
  const losses = totalGames - wins;
  const winRate = totalGames > 0 ? ((wins / totalGames) * 100).toFixed(1) : '0';
  const totalWagered = history.reduce((sum, h) => sum + h.bet, 0);
  const totalWon = history.filter((h) => h.win).reduce((sum, h) => sum + h.result, 0);

  const achievements = [
    { icon: 'Trophy', name: 'Первая победа', unlocked: wins >= 1 },
    { icon: 'Target', name: 'Везунчик', unlocked: wins >= 5 },
    { icon: 'Zap', name: 'Серия побед', unlocked: wins >= 3 },
    { icon: 'Star', name: 'Крупный выигрыш', unlocked: history.some((h) => h.result >= 1000) },
  ];

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card className="p-6 bg-card border-gold/30">
        <div className="flex items-center gap-3 mb-6">
          <Icon name="User" className="text-gold" size={32} />
          <h2 className="text-2xl font-bold text-gold">Профиль игрока</h2>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between py-3 border-b border-gold/20">
            <span className="text-muted-foreground">Баланс</span>
            <span className="font-bold text-gold text-xl">${balance.toLocaleString()}</span>
          </div>
          <div className="flex justify-between py-3 border-b border-gold/20">
            <span className="text-muted-foreground">Всего игр</span>
            <span className="font-bold text-foreground">{totalGames}</span>
          </div>
          <div className="flex justify-between py-3 border-b border-gold/20">
            <span className="text-muted-foreground">Побед</span>
            <span className="font-bold text-success">{wins}</span>
          </div>
          <div className="flex justify-between py-3 border-b border-gold/20">
            <span className="text-muted-foreground">Поражений</span>
            <span className="font-bold text-accent">{losses}</span>
          </div>
          <div className="flex justify-between py-3 border-b border-gold/20">
            <span className="text-muted-foreground">Винрейт</span>
            <span className="font-bold text-gold">{winRate}%</span>
          </div>
          <div className="flex justify-between py-3 border-b border-gold/20">
            <span className="text-muted-foreground">Поставлено</span>
            <span className="font-bold text-foreground">${totalWagered.toLocaleString()}</span>
          </div>
          <div className="flex justify-between py-3">
            <span className="text-muted-foreground">Выиграно</span>
            <span className="font-bold text-success">${totalWon.toLocaleString()}</span>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-card border-gold/30">
        <div className="flex items-center gap-3 mb-6">
          <Icon name="Award" className="text-gold" size={32} />
          <h2 className="text-2xl font-bold text-gold">Достижения</h2>
        </div>

        <div className="space-y-4">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className={`flex items-center gap-4 p-4 rounded-lg border transition-all ${
                achievement.unlocked
                  ? 'bg-gold/10 border-gold/30 gold-glow'
                  : 'bg-muted/20 border-muted/30 opacity-50'
              }`}
            >
              <Icon
                name={achievement.icon as any}
                className={achievement.unlocked ? 'text-gold' : 'text-muted-foreground'}
                size={28}
              />
              <div className="flex-1">
                <p className={`font-semibold ${achievement.unlocked ? 'text-gold' : 'text-muted-foreground'}`}>
                  {achievement.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {achievement.unlocked ? 'Разблокировано!' : 'Заблокировано'}
                </p>
              </div>
              {achievement.unlocked && <Icon name="CheckCircle2" className="text-success" size={24} />}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
