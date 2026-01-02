import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface HistorySectionProps {
  history: any[];
}

export default function HistorySection({ history }: HistorySectionProps) {
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getGameIcon = (game: string) => {
    switch (game) {
      case 'Dice':
        return 'Dices';
      case 'Slots':
        return 'Cherry';
      case 'Roulette':
        return 'CircleDot';
      default:
        return 'GamepadIcon';
    }
  };

  return (
    <Card className="p-6 bg-card border-gold/30">
      <div className="flex items-center gap-3 mb-6">
        <Icon name="History" className="text-gold" size={32} />
        <h2 className="text-2xl font-bold text-gold">История игр</h2>
      </div>

      {history.length === 0 ? (
        <div className="text-center py-12">
          <Icon name="PackageOpen" className="mx-auto text-muted-foreground mb-4" size={48} />
          <p className="text-muted-foreground">История игр пуста</p>
          <p className="text-sm text-muted-foreground mt-2">Начните играть, чтобы увидеть свою статистику</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-[600px] overflow-y-auto">
          {history.map((entry) => (
            <div
              key={entry.id}
              className={`flex items-center gap-4 p-4 rounded-lg border transition-all ${
                entry.win
                  ? 'bg-success/10 border-success/30'
                  : 'bg-accent/10 border-accent/30'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  entry.win ? 'bg-success/20' : 'bg-accent/20'
                }`}
              >
                <Icon
                  name={getGameIcon(entry.game) as any}
                  className={entry.win ? 'text-success' : 'text-accent'}
                  size={24}
                />
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-foreground">{entry.game}</span>
                  <span className="text-xs text-muted-foreground">{formatDate(entry.timestamp)}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Ставка: ${entry.bet}
                </div>
              </div>

              <div className="text-right">
                <div
                  className={`text-xl font-bold ${
                    entry.win ? 'text-success' : 'text-accent'
                  }`}
                >
                  {entry.win ? '+' : '-'}${entry.win ? entry.result : entry.bet}
                </div>
                <div className="text-xs text-muted-foreground">
                  {entry.win ? 'Выигрыш' : 'Проигрыш'}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
